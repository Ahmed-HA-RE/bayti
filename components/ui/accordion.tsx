'use client';

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { cn } from '@/lib/utils';
import { PlusIcon, MinusIcon } from 'lucide-react';

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot='accordion'
      className={cn('flex w-full flex-col', className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot='accordion-item'
      className={cn('not-last:border-b', className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        className={cn(
          'group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-4 text-left text-lg font-medium transition-all outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground cursor-pointer',
          className,
        )}
        {...props}
      >
        {children}
        <span
          data-slot='accordion-trigger-icon'
          className='relative ml-auto shrink-0'
        >
          <PlusIcon className='pointer-events-none size-4 transition-all duration-300 ease-in-out group-aria-expanded/accordion-trigger:rotate-90 group-aria-expanded/accordion-trigger:opacity-0 group-aria-expanded/accordion-trigger:scale-50' />
          <MinusIcon className='pointer-events-none absolute inset-0 size-4 scale-50 opacity-0 transition-all duration-300 ease-in-out group-aria-expanded/accordion-trigger:scale-100 group-aria-expanded/accordion-trigger:opacity-100' />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot='accordion-content'
      className='overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up'
      {...props}
    >
      <div
        className={cn(
          'h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4 text-base',
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
