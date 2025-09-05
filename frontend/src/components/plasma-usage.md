# PlasmaBackground 组件使用指南

## 概述

`PlasmaBackground` 是一个优化后的React组件，将Plasma动画作为背景层，允许其他元素覆盖在上面。

## 主要优化点

### 1. 层级管理

- **背景层**: 使用 `z-index: -1` 确保Plasma动画始终在最底层
- **内容层**: 使用 `z-index: 10` 确保内容显示在背景之上

### 2. 交互优化

- **pointerEvents: 'none'**: 背景层不响应鼠标事件，避免干扰上层元素交互
- **mouseInteractive: false**: 禁用Plasma组件的鼠标交互功能

### 3. 布局灵活性

- 支持自定义高度 (`height` prop)
- 支持自定义CSS类名 (`className` prop)
- 内容区域使用flexbox布局，默认居中对齐

## 使用方法

### 基础用法

```tsx
import PlasmaBackground from './plasma';

export default function MyPage() {
  return (
    <PlasmaBackground>
      <h1>你的内容</h1>
      <p>这些内容会显示在Plasma背景之上</p>
    </PlasmaBackground>
  );
}
```

### 自定义高度

```tsx
<PlasmaBackground height='600px'>
  <div>固定高度的背景</div>
</PlasmaBackground>
```

### 添加自定义样式

```tsx
<PlasmaBackground className='my-custom-class'>
  <div>带有自定义样式的背景</div>
</PlasmaBackground>
```

### 复杂布局示例

```tsx
<PlasmaBackground height='100vh'>
  {/* 主要内容 */}
  <div className='text-center'>
    <h1 className='text-4xl font-bold mb-4'>标题</h1>
    <button className='px-6 py-3 bg-blue-500 text-white rounded'>按钮</button>
  </div>

  {/* 绝对定位的元素 */}
  <div className='absolute top-4 right-4'>
    <nav>导航菜单</nav>
  </div>
</PlasmaBackground>
```

## Props 说明

| Prop        | 类型        | 默认值      | 说明                 |
| ----------- | ----------- | ----------- | -------------------- |
| `children`  | `ReactNode` | `undefined` | 要显示在背景上的内容 |
| `className` | `string`    | `""`        | 额外的CSS类名        |
| `height`    | `string`    | `"100vh"`   | 容器高度             |

## 注意事项

1. **性能**: Plasma动画可能消耗较多GPU资源，在移动设备上需要注意性能
2. **可访问性**: 确保文本内容与背景有足够的对比度
3. **响应式**: 在不同屏幕尺寸下测试效果
4. **交互**: 所有交互元素都应该正常工作，不受背景影响

## 样式建议

为了更好的视觉效果，建议为上层内容添加以下样式：

```css
/* 半透明背景 */
.content-overlay {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 2rem;
}

/* 文本阴影增强可读性 */
.text-with-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
```
