import { ClipLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='flex items-center justify-center min-h-[90vh] relative'>
      <div className='absolute inset-0 w-full h-full backdrop-blur-lg z-1' />
      <ClipLoader size={100} className='z-2' />
    </div>
  );
};

export default Loading;
