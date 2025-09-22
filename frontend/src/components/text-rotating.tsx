'use client';

import RotatingText from '@/components/RotatingText';
import { LayoutGroup, motion } from 'motion/react';

export default function TextRotating() {
  const words = ['thinking', 'coding', 'design'];
  return (
    <div className='flex '>
      <LayoutGroup>
        <motion.p className='text-8xl flex  items-center' layout>
          <motion.span
            className='pt-0.5 sm:pt-1 md:pt-2 whitespace-nowrap mr-4'
            layout
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          >
            Creative{' '}
          </motion.span>
          <RotatingText
            texts={words}
            mainClassName='px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg inline-block'
            staggerFrom={'last'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName='rotating-text-split'
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.p>
      </LayoutGroup>
    </div>
  );
}
