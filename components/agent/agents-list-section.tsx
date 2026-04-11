import { Agent } from '@/lib/generated/prisma';
import { Alert, AlertTitle } from '../ui/alert';
import { LuBadgeInfo } from 'react-icons/lu';
import Image from 'next/image';
import { MotionPreset } from '../shared/motion-preset';
import { Separator } from '../ui/separator';
import { formatAgentRole } from '@/lib/utils';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../ui/card';

const AgentsListSection = ({
  agents,
}: {
  agents: Pick<Agent, 'id' | 'name' | 'image' | 'role' | 'slug'>[];
}) => {
  return (
    <section className='section-spacing'>
      <div className='container'>
        {agents.length === 0 ? (
          <Alert variant='info' className='max-w-md mx-auto'>
            <LuBadgeInfo />
            <AlertTitle>
              No Agents Are Listed Yet. Please Check Back Soon
            </AlertTitle>
          </Alert>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
            {agents.map((agent, index) => (
              <Link href={`/agents/${agent.slug}`} key={agent.id}>
                <Card className='border-0 shadow-none'>
                  <CardHeader className='px-0'>
                    <MotionPreset fade blur zoom delay={0.1 + index * 0.1}>
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        width={0}
                        height={0}
                        sizes='100vw'
                        className='object-cover w-full h-[480px] rounded-xl'
                      />
                    </MotionPreset>
                  </CardHeader>
                  <CardContent className='px-0'>
                    <MotionPreset fade blur zoom delay={0.2 + index * 0.1}>
                      <h2 className='text-lg'>{agent.name}</h2>
                      <Separator className='my-2' />
                      <p className='text-muted-foreground'>
                        [{formatAgentRole(agent.role)}]
                      </p>
                    </MotionPreset>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AgentsListSection;
