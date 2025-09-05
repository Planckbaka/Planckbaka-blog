// components/AdvancedScrollStack.tsx
'use client';

import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import { useState } from 'react';

interface CardData {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    title: '设计',
    description: '创造美观且用户友好的界面设计',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    icon: '🎨',
  },
  {
    id: 2,
    title: '开发',
    description: '使用现代技术栈构建高性能应用',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    icon: '💻',
  },
  {
    id: 3,
    title: '部署',
    description: '将应用部署到生产环境',
    color: 'bg-gradient-to-br from-green-500 to-emerald-500',
    icon: '🚀',
  },
  {
    id: 4,
    title: '优化',
    description: '持续优化性能和用户体验',
    color: 'bg-gradient-to-br from-orange-500 to-red-500',
    icon: '⚡',
  },
];

const AdvancedScrollStack = () => {
  const [completedStacks, setCompletedStacks] = useState(0);

  return (
    <div className='relative h-500 p-0 bg-gray-900'>
      {/* Hero Section */}
      <div className='h-screen flex flex-col items-center justify-center text-white px-4'>
        <h1 className='text-5xl md:text-7xl font-bold mb-6 text-center'>
          我们的流程
        </h1>
        <p className='text-xl md:text-2xl text-gray-300 text-center max-w-2xl'>
          从设计到部署，每一步都精心打造
        </p>
        <div className='mt-8 text-sm text-gray-400'>
          已完成堆叠: {completedStacks}
        </div>
      </div>

      {/* Scroll Stack */}
      <ScrollStack
        className='px-4 md:px-8 lg:px-16'
        itemDistance={150}
        itemScale={0.08}
        itemStackDistance={40}
        stackPosition='30%'
        scaleEndPosition='15%'
        baseScale={0.88}
        scaleDuration={0.8}
        rotationAmount={3}
        blurAmount={2}
        onStackComplete={() => {
          setCompletedStacks(prev => prev + 1);
          console.log('堆叠动画完成');
        }}
      >
        {cardData.map(card => (
          <ScrollStackItem key={card.id}>
            <div
              className={`w-full max-w-lg mx-auto ${card.color} rounded-2xl shadow-2xl p-8 text-white transform transition-all duration-300 hover:scale-105`}
            >
              <div className='text-6xl mb-6 text-center'>{card.icon}</div>
              <h2 className='text-3xl font-bold mb-4 text-center'>
                {card.title}
              </h2>
              <p className='text-lg text-center opacity-90 leading-relaxed'>
                {card.description}
              </p>
              <div className='mt-6 flex justify-center'>
                <button className='bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors'>
                  了解更多
                </button>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>

      {/* Footer */}
      <div className='h-screen flex items-center justify-center text-white'>
        <div className='text-center'>
          <h2 className='text-4xl font-bold mb-4'>准备开始了吗？</h2>
          <p className='text-xl text-gray-300'>让我们一起创造令人惊叹的体验</p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedScrollStack;
