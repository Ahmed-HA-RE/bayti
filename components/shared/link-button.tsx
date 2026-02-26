'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';

type LinkButtonProps = {
  variant:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'destructive'
    | 'link';
  href: string;
  children: React.ReactNode | string;
  className?: string;
};

const LinkButton = ({
  variant = 'default',
  href,
  children,
  className,
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: variant }), className)}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
