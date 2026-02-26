'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';

type LinkButtonProps = {
  variant?:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'destructive'
    | 'link';
  href: string;
  children: React.ReactNode | string;
  className?: string;
  size?: 'default' | 'md' | 'lg';
};

const LinkButton = ({
  variant = 'default',
  href,
  children,
  className,
  size = 'default',
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: variant, size }), className)}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
