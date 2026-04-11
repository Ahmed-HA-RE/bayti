import { MotionPreset } from './motion-preset';
import SectionEyebrow from './section-eyebrow';

const SectionHeader = ({
  eyebrowTitle,
  title,
  subtitle,
}: {
  eyebrowTitle: string;
  title: string;
  subtitle: string;
}) => {
  return (
    <section className='section-header-spacing'>
      <div className='container'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <MotionPreset fade slide={{ direction: 'right' }} delay={0.1} blur>
            <SectionEyebrow title={eyebrowTitle} />
          </MotionPreset>
          <MotionPreset
            fade
            slide={{ direction: 'left' }}
            delay={0.2}
            blur
            className='space-y-2'
          >
            <h1 className='text-4xl lg:text-6xl max-w-4xl mx-auto text-center leading-tight'>
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
