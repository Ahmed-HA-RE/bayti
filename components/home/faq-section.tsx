import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQS } from '@/lib/constants';
import { MotionPreset } from '../shared/motion-preset';
import SectionEyebrow from '../shared/section-eyebrow';
import Image from 'next/image';

const FAQ = () => {
  return (
    <section className='section-spacing'>
      <div className='container'>
        <div className='flex flex-col gap-6 lg:gap-10'>
          <MotionPreset
            fade
            blur
            zoom
            delay={0.1}
            className='flex flex-col gap-1'
          >
            <SectionEyebrow title="FAQ'S" />
            <h2 className='section-title'>Frequently Asked Questions</h2>
          </MotionPreset>
          <div className='flex flex-col lg:flex-row items-center lg:gap-10'>
            <MotionPreset
              fade
              blur
              zoom
              delay={0.2}
              className='relative h-[500px] w-full max-w-md max-lg:hidden'
            >
              <Image
                src='/images/faq.jpg'
                alt='FAQ Image'
                className='object-cover rounded-xl'
                fill
              />
            </MotionPreset>
            <MotionPreset fade blur zoom delay={0.3} className='w-full'>
              <Accordion>
                {FAQS.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className='text-lg font-medium'>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className='text-muted-foreground'>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </MotionPreset>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
