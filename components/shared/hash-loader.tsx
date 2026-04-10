import { HashLoader as Loader } from 'react-spinners';

const HashLoader = () => {
  return (
    <div className='flex min-h-screen items-center justify-center pb-40'>
      <Loader color='#e17613' size={60} />
    </div>
  );
};

export default HashLoader;
