'use client';
import Plasma from './reactbits-animations/plasma';
import { ReactNode } from 'react';

interface PlasmaBackgroundProps {
  children?: ReactNode;
  className?: string;
  height?: string;
}

export default function PlasmaBackground({
  children,
  className = '',
  height = '100vh',
}: PlasmaBackgroundProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: '100%', height }}
    >
      {/* 背景层 - Plasma动画 */}
      <div
        className='absolute inset-0'
        style={{
          zIndex: -1,
          pointerEvents: 'none', // 确保背景不影响上层元素的交互
        }}
      >
        <Plasma
          color='#B19EEF'
          speed={0.6}
          direction='forward'
          scale={1.1}
          opacity={0.8}
          mouseInteractive={false} // 禁用鼠标交互，避免影响上层内容
        />
      </div>

      {/* 内容层 - 可以放置任何需要显示在背景上的内容 */}
      <div
        className='relative z-10 w-full h-full'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
