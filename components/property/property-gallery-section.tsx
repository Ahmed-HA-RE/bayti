'use client';

import { cn } from '@/lib/utils';
import { MotionPreset } from '@/components/shared/motion-preset';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';
import { PropertyImage } from '@/lib/generated/prisma';

type PropertyGallerySectionProps = {
  images: Pick<PropertyImage, 'url'>[];
  alt: string;
};

const PropertyGallerySection = ({
  galleryImage,
}: {
  galleryImage: PropertyGallerySectionProps;
}) => {
  return (
    <section className='py-14'>
      <div className='container'>
        {/* Gallery Grid */}
        <div className='grid grid-cols-3 gap-4'>
          <Gallery>
            {galleryImage.images.map((image, index) => (
              <MotionPreset
                key={index}
                className={cn(
                  'overflow-hidden relative rounded-lg aspect-[3/2] max-h-[250px] w-full cursor-pointer',
                  index === 0 &&
                    'col-span-3 aspect-[3/2] max-h-[400px] md:max-h-[500px] xl:max-h-[600px]',
                )}
                fade
                blur
                slide={{ direction: 'down', offset: 20 }}
                transition={{ duration: 0.8 }}
                delay={0.6 + index * 0.15}
              >
                <Item original={image.url} width='1200' height='800'>
                  {({ ref, open }) => (
                    <Image
                      src={image.url}
                      alt={galleryImage.alt}
                      fill
                      sizes='auto'
                      onClick={open}
                      ref={ref}
                      className='object-cover transition-transform duration-300 hover:scale-105'
                      loading='eager'
                    />
                  )}
                </Item>
              </MotionPreset>
            ))}
          </Gallery>
        </div>
      </div>
    </section>
  );
};

export default PropertyGallerySection;
