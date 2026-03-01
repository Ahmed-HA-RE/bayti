import { MotionPreset } from '../shared/motion-preset';
import { Marquee } from '../ui/marquee';
import Image from 'next/image';

const TrustedBySection = () => {
  return (
    <section className='py-8 sm:py-10 lg:py-12'>
      <div>
        <MotionPreset
          slide={{ direction: 'right' }}
          fade
          className='mb-8 text-2xl md:text-2xl font-bold text-center'
          component='h2'
        >
          Trusted by teams worldwide
        </MotionPreset>
        <MotionPreset
          component='div'
          slide={{ direction: 'right' }}
          fade
          delay={0.1}
        >
          <Marquee gap={2} duration={15}>
            <Image
              src='/svg/google-logo.svg'
              alt='Google Logo'
              width={100}
              height={100}
            />
            <Image
              src='/svg/microsoft-logo.svg'
              alt='Microsoft Logo'
              width={130}
              height={130}
            />
            <Image
              src='/svg/airbnb-logo.svg'
              alt='Airbnb Logo'
              width={100}
              height={100}
            />
            <Image
              src='/svg/zillow-logo.svg'
              alt='Zillow Logo'
              width={100}
              height={100}
            />
            <Image
              src='/svg/autodesk-logo.svg'
              alt='Autodesk Logo'
              width={140}
              height={140}
            />
            <Image
              src='/svg/visa-logo.svg'
              alt='Visa Logo'
              width={70}
              height={70}
            />
            <Image
              src='/svg/jll-logo.svg'
              alt='JLL Logo'
              width={70}
              height={70}
            />
            <Image
              src='/svg/cbre-logo.svg'
              alt='CBRE Logo'
              width={70}
              height={70}
            />
          </Marquee>
        </MotionPreset>
      </div>
    </section>
  );
};

export default TrustedBySection;
