'use client';

import { Suspense, useState } from 'react';
import { ChevronsUpDownIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Controller, UseFormReturn } from 'react-hook-form';
import { PropertyFormData } from '@/schema/property';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { useQuery } from '@tanstack/react-query';
import { getAgentsForSelect } from '@/lib/actions/admin/agent/get-agents-for-select';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from 'use-debounce';
import { Agent } from '@/lib/generated/prisma';
import { cn, formatAgentRole } from '@/lib/utils';

const AssignAgentField = ({
  form,
}: {
  form: UseFormReturn<PropertyFormData>;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<
    Pick<Agent, 'id' | 'name' | 'image'> | undefined
  >();
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const {
    data: agents,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['agents', debouncedSearch],
    queryFn: () => getAgentsForSelect(debouncedSearch),
    refetchOnWindowFocus: false,
  });

  const agentId = form.watch('agentId');
  const defaultAgent = agents?.find((agent) => agent.id === agentId);

  const agent = selectedAgent || defaultAgent;

  return (
    <Controller
      name='agentId'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            Agent <span className='text-destructive'>*</span>
          </FieldLabel>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className={cn(
                  'w-full justify-between px-0 pl-4 pr-2.5 h-12 py-1 hover:bg-transparent hover:text-none',
                  fieldState.invalid && 'border-destructive',
                )}
              >
                {isLoading ? (
                  <p className='text-muted-foreground'>Loading...</p>
                ) : agent ? (
                  <span className='flex items-center gap-2'>
                    <Avatar className='size-7.5'>
                      <Suspense
                        fallback={
                          <AvatarFallback>
                            {agent.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        }
                      >
                        <Image
                          src={agent.image}
                          alt={agent.name}
                          width={30}
                          height={30}
                          className='rounded-full object-cover'
                        />
                      </Suspense>
                    </Avatar>
                    <span className='font-medium'>{agent.name}</span>
                  </span>
                ) : (
                  <span className='text-muted-foreground'>
                    Assign an Agent...
                  </span>
                )}
                <ChevronsUpDownIcon
                  className='text-muted-foreground/80 shrink-0'
                  aria-hidden='true'
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[250px] py-1.5 px-0' align='start'>
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder='Search agent...'
                  value={search}
                  onValueChange={(e) => setSearch(e)}
                />
                <CommandList>
                  <CommandGroup className='py-2'>
                    {isFetching ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <div
                          key={index}
                          className='flex flex-col gap-2.5 py-1 px-2'
                        >
                          <div className='flex items-center gap-2.5'>
                            <Skeleton className='w-8 h-8 rounded-full' />
                            <Skeleton className='h-4 w-[80%]' />
                          </div>
                        </div>
                      ))
                    ) : !agents || agents.length === 0 ? (
                      <CommandEmpty>No agents found.</CommandEmpty>
                    ) : (
                      agents.map((agent) => (
                        <CommandItem
                          key={agent.id}
                          value={agent.id}
                          onSelect={() => {
                            field.onChange(agent.id);
                            setSelectedAgent(agent);
                            setOpen(false);
                          }}
                          className='cursor-pointer'
                        >
                          <span className='flex items-center gap-2'>
                            <Avatar className='size-8.5'>
                              <Suspense
                                fallback={
                                  <AvatarFallback>
                                    {agent.name.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                }
                              >
                                <Image
                                  src={agent.image}
                                  alt={agent.name}
                                  width={35}
                                  height={35}
                                  className='rounded-full object-cover'
                                />
                              </Suspense>
                            </Avatar>
                            <span className='flex flex-col'>
                              <span className='font-medium'>{agent.name}</span>
                              <span className='text-muted-foreground text-xs'>
                                {formatAgentRole(agent.role)}
                              </span>
                            </span>
                          </span>
                        </CommandItem>
                      ))
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default AssignAgentField;
