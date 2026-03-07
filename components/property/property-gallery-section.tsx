'use client';

import { cn } from '@/lib/utils';
import { MotionPreset } from '@/components/shared/motion-preset';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';

type PropertyGallerySectionProps = {
  images: string[];
  alt: string;
};

const PropertyGallerySection = ({
  galleryImage,
}: {
  galleryImage: PropertyGallerySectionProps;
}) => {
  return (
    <section className='py-8 md:py-12 lg:py-14'>
      <div className='container'>
        {/* Gallery Grid */}
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
          <Gallery>
            {galleryImage.images.map((image, index) => (
              <MotionPreset
                key={index}
                className={cn(
                  'overflow-hidden relative rounded-lg aspect-[4/3] w-full cursor-pointer',
                  index === 0
                    ? 'col-span-2 row-span-2 aspect-[3/2] md:aspect-auto'
                    : index === galleryImage.images.length - 1
                      ? 'col-span-2 max-h-70'
                      : '',
                )}
                fade
                blur
                slide={{ direction: 'down', offset: 20 }}
                transition={{ duration: 0.8 }}
                delay={0.6 + index * 0.15}
              >
                <Item original={image} width='1200' height='800'>
                  {({ ref, open }) => (
                    <Image
                      src={image}
                      alt={galleryImage.alt}
                      fill
                      onClick={open}
                      ref={ref}
                      className='object-cover transition-transform duration-300 hover:scale-105'
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
