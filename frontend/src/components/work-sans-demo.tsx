'use client';

import React from 'react';

/**
 * Work Sans 字体使用示例组件
 * 演示如何在 Tailwind CSS 中使用 Work Sans 字体
 */
export default function WorkSansDemo() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Work Sans 字体使用示例</h1>
      
      {/* 使用 Work Sans 字体的标题 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          使用 Work Sans 字体的方法
        </h2>
        
        {/* 方法1: 使用 font-work-sans 类 */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-medium mb-2">方法1: 使用自定义字体类</h3>
          <p className="font-[family-name:var(--font-work-sans)] text-base">
            这段文字使用了 Work Sans 字体 - 通过 CSS 变量方式
          </p>
        </div>
        
        {/* 方法2: 使用 Tailwind 配置 */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-lg font-medium mb-2">方法2: 扩展 Tailwind 配置</h3>
          <p className="text-base text-gray-700 dark:text-gray-300">
            如果需要更方便的使用，可以在 tailwind.config.js 中扩展字体配置
          </p>
        </div>
        
        {/* 字体权重示例 */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Work Sans 字体权重示例</h3>
          <div className="space-y-2">
            <p className="font-[family-name:var(--font-work-sans)] font-light">
              Work Sans Light (300)
            </p>
            <p className="font-[family-name:var(--font-work-sans)] font-normal">
              Work Sans Regular (400)
            </p>
            <p className="font-[family-name:var(--font-work-sans)] font-medium">
              Work Sans Medium (500)
            </p>
            <p className="font-[family-name:var(--font-work-sans)] font-semibold">
              Work Sans SemiBold (600)
            </p>
            <p className="font-[family-name:var(--font-work-sans)] font-bold">
              Work Sans Bold (700)
            </p>
          </div>
        </div>
        
        {/* 使用说明 */}
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h3 className="text-lg font-medium mb-2">使用说明</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>Work Sans 字体已在 layout.tsx 中配置</li>
            <li>字体变量 --font-work-sans 已在 globals.css 中定义</li>
            <li>支持 300, 400, 500, 600, 700 字体权重</li>
            <li>使用 font-[family-name:var(--font-work-sans)] 类来应用字体</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * 使用 Work Sans 字体的简单示例
 */
export function SimpleWorkSansExample() {
  return (
    <div className="font-[family-name:var(--font-work-sans)]">
      <h1 className="text-2xl font-bold">Work Sans 标题</h1>
      <p className="text-base font-medium">Work Sans 正文内容</p>
    </div>
  );
}