'use client';
import PlasmaBackground from './plasma-damo';

export default function PlasmaExample() {
  return (
    <PlasmaBackground height='100vh' className=''>
      {/* 这里可以放置任何内容，它们会显示在Plasma背景之上 */}
      <div className='text-center text-white'>
        <h1 className='text-4xl font-bold mb-4'>欢迎来到我的博客</h1>
        <p className='text-lg mb-8'>这些内容显示在Plasma动画背景之上</p>
        <button
          className='px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-30 text-white hover:bg-opacity-30 transition-all duration-300'
          onClick={() => alert('按钮点击正常工作！')}
        >
          点击测试交互
        </button>
      </div>

      {/* 可以添加更多内容 */}
      <div className='absolute bottom-10 left-10 text-white text-sm opacity-70'>
        <p>背景动画不会干扰这些元素的交互</p>
      </div>

      <div className='absolute top-10 right-10'>
        <div className='w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white'>
          Logo
        </div>
      </div>
    </PlasmaBackground>
  );
}
