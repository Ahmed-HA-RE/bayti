import HashLoader from 'react-spinners/HashLoader';

const Loading = () => {
  return (
    <div className='flex min-h-screen items-center justify-center pb-40'>
      <HashLoader color='#e17613' size={60} />
    </div>
  );
};

export default Loading;
