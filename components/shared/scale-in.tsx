'use client';

import { motion } from 'motion/react';

type ScaleInProps = {
  children: React.ReactNode;
  className?: string;
};

const ScaleIn = ({ children, className }: ScaleInProps) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;
