import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const LoadingProperty = () => {
  return (
    <>
      {/* Header Section */}
      <section className='section-top-spacing'>
        <div className='container'>
          <div className='grid grid-cols-1 gap-4'>
            {/* Title row */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
              <Skeleton className='h-12 w-2/3 md:w-1/2' />
              <Skeleton className='h-9 w-44' />
            </div>

            {/* Stats + Address + Price row */}
            <div className='flex flex-col lg:flex-row gap-6 justify-between items-start mt-2'>
              {/* Left — stats + address */}
              <div className='flex flex-col gap-4'>
                <div className='flex items-center'>
                  <div className='flex flex-col gap-1'>
                    <Skeleton className='h-5 w-12' />
                    <Skeleton className='h-4 w-20' />
                  </div>
                  <Separator orientation='vertical' className='mx-8 h-8' />
                  <div className='flex flex-col gap-1'>
                    <Skeleton className='h-5 w-20' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                  <Separator orientation='vertical' className='mx-8 h-8' />
                  <div className='flex flex-col gap-1'>
                    <Skeleton className='h-5 w-20' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                </div>
                {/* Address */}
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-4 w-4 rounded-full' />
                  <Skeleton className='h-4 w-52' />
                </div>
              </div>

              {/* Right — price */}
              <div className='flex flex-col items-start lg:items-end gap-1.5 lg:self-end'>
                <Skeleton className='h-3 w-24' />
                <Skeleton className='h-10 w-36' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className='container py-14'>
        <div className='grid grid-cols-3 gap-4'>
          {/* Main large image */}
          <Skeleton className='col-span-3 aspect-[3/2] max-h-[400px] md:max-h-[500px] xl:max-h-[600px] w-full rounded-lg' />
          {/* Smaller images */}
          <Skeleton className='aspect-[3/2] max-h-[250px] w-full rounded-lg' />
          <Skeleton className='aspect-[3/2] max-h-[250px] w-full rounded-lg' />
          <Skeleton className='aspect-[3/2] max-h-[250px] w-full rounded-lg' />
        </div>
      </section>

      {/* Details Section */}
      <section className='container'>
        <div className='flex flex-col md:flex-row gap-10 lg:gap-16'>
          {/* Left Side */}
          <div className='flex flex-col gap-16 md:flex-1/2'>
            {/* Overview */}
            <div className='flex flex-col gap-6'>
              <Skeleton className='h-9 w-36' />
              <div className='flex flex-col gap-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-4/6' />
              </div>
            </div>

            {/* Amenities */}
            <div className='space-y-10'>
              <div className='flex flex-col gap-6'>
                <Skeleton className='h-9 w-36' />
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-6'>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className='flex items-center gap-3'>
                      <Skeleton className='size-6 rounded' />
                      <Skeleton className='h-4 w-24' />
                    </div>
                  ))}
                </div>
              </div>
              {/* CTA buttons */}
              <div className='flex items-center gap-4'>
                <Skeleton className='h-10 w-36' />
                <Skeleton className='h-10 w-36' />
              </div>
            </div>
          </div>

          {/* Right Side — Agent Card */}
          <aside className='md:flex-1/9'>
            <div className='border rounded-xl py-6 px-8 flex flex-col gap-4'>
              {/* Agent info */}
              <div className='flex items-center gap-4'>
                <Skeleton className='size-16 rounded-full' />
                <div className='flex flex-col gap-1.5'>
                  <Skeleton className='h-5 w-32' />
                  <Skeleton className='h-4 w-24' />
                </div>
              </div>
              <Separator />
              {/* Contact info */}
              <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-3'>
                  <Skeleton className='size-4 rounded' />
                  <Skeleton className='h-4 w-40' />
                </div>
                <div className='flex items-center gap-3'>
                  <Skeleton className='size-4 rounded' />
                  <Skeleton className='h-4 w-44' />
                </div>
                <div className='flex items-center gap-3'>
                  <Skeleton className='size-4 rounded' />
                  <Skeleton className='h-4 w-36' />
                </div>
              </div>
              <Separator />
              {/* Contact form fields */}
              <div className='flex flex-col gap-4 mt-2'>
                <Skeleton className='h-5 w-32' />
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-24 w-full' />
                <Skeleton className='h-10 w-full' />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Map Section */}
      <section className='container py-14'>
        <Skeleton className='h-[400px] w-full rounded-lg' />
      </section>

      {/* Related Properties */}
      <section className='pb-14'>
        <div className='container'>
          <Skeleton className='h-9 w-52 mb-6' />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='flex flex-col gap-3'>
                <Skeleton className='aspect-[4/3] w-full rounded-lg' />
                <Skeleton className='h-6 w-3/4' />
                <Skeleton className='h-4 w-1/2' />
                <Skeleton className='h-5 w-1/3' />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LoadingProperty;
