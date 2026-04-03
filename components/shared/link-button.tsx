import Link from 'next/link';
import { Button } from '../ui/button';
import { FiArrowUpRight } from 'react-icons/fi';
import { cn } from '@/lib/utils';

const MainLinkButton = ({
  text,
  href,
  className,
  size = 'default',
}: {
  text: string;
  href: string;
  className?: string;
  size?:
    | 'default'
    | 'icon'
    | 'sm'
    | 'lg'
    | 'icon-xs'
    | 'icon-sm'
    | 'icon-lg'
    | null
    | undefined;
}) => {
  return (
    <Button
      className={`relative ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer ${className}`}
      asChild
      size={size}
    >
      <Link href={href}>
        <span className='relative z-10 transition-all duration-500'>
          {text}
        </span>
        <div
          className={cn(
            'absolute right-1 w-10 h-10 text-accent rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45 bg-white',
            size === 'sm'
              ? 'w-8 h-8'
              : size === 'lg'
                ? 'w-12 h-12'
                : 'w-10 h-10',
          )}
        >
          <FiArrowUpRight />
        </div>
      </Link>
    </Button>
  );
};

export default MainLinkButton;
