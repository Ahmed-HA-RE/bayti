import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';

const SecondaryLinkButton = ({
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
      variant={'secondary'}
      className={cn(
        'relative overflow-hidden group cursor-pointer transition-all',
        className,
      )}
      asChild
      size={size}
    >
      <Link href={href}>
        <span className='absolute left-1/2 -translate-x-1/2 top-full -translate-y-1/2 w-8 h-8 bg-primary dark:bg-gray-950 rounded-full scale-0 transition-transform duration-700 ease-in-out group-hover:scale-[18]' />
        <span className='relative z-10 transition-colors duration-500 group-hover:text-secondary-foreground dark:group-hover:text-white'>
          {text}
        </span>
      </Link>
    </Button>
  );
};

export default SecondaryLinkButton;
