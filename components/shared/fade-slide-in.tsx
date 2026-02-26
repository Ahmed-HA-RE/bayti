'use client';

import { motion } from 'motion/react';

type FadeSlideInProps = {
  children: React.ReactNode;
  slideType?: 'left' | 'right' | 'up' | 'down';
  className?: string;
};

import React from 'react';

const FadeSlideIn = ({ children, slideType, className }: FadeSlideInProps) => {
  const getInitialPosition = () => {
    switch (slideType) {
      case 'left':
        return { opacity: 0, x: -70 };
      case 'right':
        return { opacity: 0, x: 70 };
      case 'up':
        return { opacity: 0, y: -70 };
      case 'down':
        return { opacity: 0, y: 70 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeSlideIn;
