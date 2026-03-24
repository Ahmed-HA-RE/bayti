'use client';

import { MotionPreset } from '../shared/motion-preset';
import { Card } from '../ui/card';
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
} from '@/components/ui/map';
import { PiMapPinFill } from 'react-icons/pi';

const styles = {
  openstreetmap: 'https://tiles.openfreemap.org/styles/liberty',
};

const PropertyMapSection = ({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) => {
  return (
    <section>
      <div className='container'>
        <MotionPreset
          component='h3'
          slide={{ direction: 'left' }}
          fade
          blur
          className='text-2xl md:text-3xl mb-8'
        >
          Map Location
        </MotionPreset>
        <MotionPreset fade blur slide={{ direction: 'up' }} delay={0.2}>
          <Card className='h-[520px] p-0 overflow-hidden'>
            <Map
              className='w-full'
              theme='light'
              center={[longitude, latitude]}
              zoom={9}
              styles={{
                light: styles.openstreetmap,
              }}
            >
              <MapControls position='top-left' showFullscreen showZoom />
              <MapMarker longitude={longitude} latitude={latitude}>
                <MarkerContent>
                  <PiMapPinFill className='size-10 text-red-500' />
                </MarkerContent>
              </MapMarker>
            </Map>
          </Card>
        </MotionPreset>
      </div>
    </section>
  );
};

export default PropertyMapSection;
