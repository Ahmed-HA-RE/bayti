import { APP_NAME, STEPS } from '@/lib/constants';
import { MotionPreset } from '../shared/motion-preset';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import SectionEyebrow from '../shared/section-eyebrow';

const HowItWorksSection = () => {
  return (
    <section className='section-spacing'>
      <div className='container'>
        <div className='flex flex-col gap-12'>
          <MotionPreset
            fade
            blur
            slide={{ direction: 'up' }}
            delay={0.1}
            className='flex flex-col items-center md:items-start gap-4'
          >
            <SectionEyebrow title='how it works' />
            <h2 className='section-title'>
              A Seamless Journey to Your Dream Home
            </h2>
            <p className='section-subtitle'>
              {APP_NAME} makes finding and securing your home simple, fast and
              effortless - every step guided with care and expertise.
            </p>
          </MotionPreset>
          {/* Steps */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {STEPS.map((step, index) => (
              <MotionPreset
                fade
                blur
                slide={{ direction: 'up' }}
                delay={index * 0.2}
                key={index}
              >
                <Card className='gap-12'>
                  <CardHeader className='px-6'>
                    <CardTitle className='uppercase tracking-wide bg-[#ff6b00] rounded-full p-2 text-white text-center text-sm'>
                      step {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='text-center flex flex-col justify-between gap-8 px-6'>
                    <div className='space-y-4'>
                      <h2 className='text-3xl font-medium'>{step.title}</h2>
                      <p className='text-muted-foreground text-base'>
                        {step.description}
                      </p>
                    </div>
                    <div className='w-full relative aspect-[16/9]'>
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className='object-cover rounded-2xl'
                      />
                    </div>
                  </CardContent>
                </Card>
              </MotionPreset>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
