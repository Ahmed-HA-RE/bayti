import { MotionPreset } from './motion-preset';
import SectionEyebrow from './section-eyebrow';

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <section className='section-header-spacing'>
      <div className='container'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <MotionPreset fade slide={{ direction: 'right' }} delay={0.1} blur>
            <SectionEyebrow title='Explore Our Properties' />
          </MotionPreset>
          <MotionPreset
            fade
            slide={{ direction: 'left' }}
            delay={0.2}
            blur
            className='space-y-4 lg:space-y-6'
          >
            <h1 className='text-4xl md:text-4xl lg:text-6xl max-w-3xl mx-auto text-center'>
              {title}
            </h1>
            <p className='text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto text-center text-sm md:text-base'>
              {subtitle}
            </p>
          </MotionPreset>
        </div>
      </div>
    </section>
  );
};

export default SectionHeader;
