import { GoDotFill } from 'react-icons/go';

const SectionEyebrow = ({ title }: { title: string }) => {
  return (
    <div className='flex items-center gap-2 justify-center md:justify-start'>
      <GoDotFill className='text-[#ff6b00]' />
      <h2 className='tracking-widest uppercase text-lg'>{title}</h2>
    </div>
  );
};

export default SectionEyebrow;
