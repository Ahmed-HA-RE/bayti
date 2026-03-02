import { GoDotFill } from 'react-icons/go';

const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className='flex items-center gap-2'>
      <GoDotFill className='text-[#ff6b00]' />
      <h2 className='tracking-widest uppercase text-lg'>{title}</h2>
    </div>
  );
};

export default SectionHeader;
