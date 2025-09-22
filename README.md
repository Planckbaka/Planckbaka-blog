# Planckbaka 个人博客平台

> 基于现代简洁设计理念的个人博客平台，融合数据可视化和个人品牌展示功能

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.12-38B2AC)

## 🌐 在线演示

**部署地址**: [https://blog-f1ud1uxlm-planckbakas-projects.vercel.app](https://blog-f1ud1uxlm-planckbakas-projects.vercel.app)

> 💡 **提示**: 项目已成功部署到 Vercel，支持自动部署和 HTTPS 访问

## 📖 项目简介

Planckbaka 是一个现代化的个人博客平台，专为技术从业者、内容创作者和数字游牧者设计。平台以故事叙述为核心，通过多维度的数据展示和交互式体验，打造独特的个人数字名片。

### ✨ 核心特色

- 🎨 **现代化设计**：深色主题，极简主义风格，响应式布局
- 📊 **数据可视化**：多维度数据展示，交互式图表和统计
- 🗺️ **足迹地图**：旅行轨迹展示，地理位置标记
- 📝 **智能编辑**：Markdown 编辑器，实时预览，语法高亮
- 🔍 **SEO 优化**：服务端渲染，语义化 HTML，结构化数据
- 🌐 **多语言支持**：中英文切换，国际化内容管理
- 🎭 **主题切换**：明暗主题，自定义配色方案
- 📱 **移动优先**：完全响应式设计，触摸优化
- ⚡ **性能优化**：使用 Turbopack 构建，支持增量静态再生成
- 🎯 **交互体验**：GSAP 动画，Lenis 平滑滚动，Motion 过渡效果
- 🔧 **开发体验**：TypeScript 类型安全，ESLint + Prettier 代码规范
- 🚀 **部署便捷**：一键部署到 Vercel，支持自动 CI/CD

## 🏗️ 技术架构

### 前端技术栈

- **框架**: Next.js 15.5.0 + React 19.1.0
- **语言**: TypeScript 5.x
- **样式**: Tailwind CSS 4.1.12
- **组件库**: shadcn/ui + Radix UI 组件
  - `@radix-ui/react-avatar` ^1.1.10
  - `@radix-ui/react-dropdown-menu` ^2.1.16
  - `@radix-ui/react-navigation-menu` ^1.2.14
  - `@radix-ui/react-select` ^2.2.6
- **动画库**: 
  - GSAP ^3.13.0 (高性能动画)
  - Motion ^12.23.12 (React 动画)
  - Lenis ^1.3.11 (平滑滚动)
- **图标**: Lucide React ^0.540.0 + React Icons ^5.5.0
- **表单**: React Hook Form ^7.62.0 + Zod ^4.1.5
- **主题**: next-themes ^0.4.6
- **工具库**: 
  - class-variance-authority ^0.7.1
  - clsx ^2.1.1
  - tailwind-merge ^3.3.1

### 后端架构（推荐方案）

- **BaaS**: Supabase (PostgreSQL + 实时功能 + 认证 + 存储)
- **AI 服务**: OpenAI API
- **部署**: Vercel (前端) + Supabase (后端服务)

### 备选方案

- **后端**: Go + Gin + GORM + PostgreSQL + Redis
- **部署**: Docker + Kubernetes/云服务器

## 🚀 快速开始

### 环境要求

- Node.js 18.0.0 或更高版本
- npm 或 yarn 或 pnpm
- Git

### 安装步骤

1. **克隆项目**

```bash
git clone https://github.com/your-username/Planckbaka-blog.git
cd Planckbaka-blog
```

2. **安装依赖**

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install
# 或
yarn install
# 或
pnpm install
```

3. **环境配置**

```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量
vim .env.local
```

4. **启动开发服务器**

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

5. **访问应用**

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构

```
Planckbaka-blog/
├── .trae/
│   └── documents/          # 项目文档
│       ├── 产品需求文档.md
│       ├── 技术架构文档.md
│       └── 技术学习文档.md
├── backend/                # 后端代码（备选方案）
├── frontend/               # 前端应用
│   ├── src/
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # React 组件
│   │   │   ├── ui/       # shadcn/ui 组件
│   │   │   └── ...       # 自定义组件
│   │   └── lib/          # 工具函数
│   ├── public/           # 静态资源
│   ├── package.json      # 依赖配置
│   └── ...
├── LICENSE
└── README.md
```

## 🎯 功能模块

### 核心页面

| 页面 | 路由 | 功能描述 |
|------|------|----------|
| 首页 | `/` | 个人介绍、导航菜单、核心亮点展示 |
| 关于 | `/about` | 详细个人简介、职业经历、技能矩阵、项目作品集 |
| 数据统计 | `/stats` | 多维度数据可视化、时间分配图表、兴趣爱好统计 |
| 足迹地图 | `/map` | 旅行轨迹展示、地理位置标记、生活足迹 |
| 博客文章 | `/blog` | 技术文章、生活感悟、创作内容 |
| 联系页面 | `/contact` | 联系方式、社交媒体链接、合作邀请 |

### 用户角色

- **访客用户**: 浏览所有公开内容、查看统计数据、互动体验
- **博主**: 内容管理、数据更新、个性化配置、访问统计

## 🛠️ 开发指南

### 可用脚本

```bash
# 开发模式（使用 Turbopack 加速构建）
npm run dev

# 构建生产版本（使用 Turbopack）
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 自动修复代码问题
npm run lint:fix

# 代码格式化
npm run format

# 检查代码格式
npm run format:check

# TypeScript 类型检查
npm run type-check

# 运行所有检查（类型检查 + 代码检查 + 格式检查）
npm run check-all
```

### 代码规范

#### 基础规范
- **TypeScript**: 严格模式，完整类型注解
- **ESLint**: 基于 Next.js 推荐配置 + Prettier 集成
- **Prettier**: 统一代码格式，2 空格缩进
- **组件**: 函数式组件 + React Hooks
- **样式**: Tailwind CSS 原子类，避免内联样式

#### 命名规范
- **组件**: PascalCase (如 `UserProfile.tsx`)
- **文件**: kebab-case (如 `user-profile.tsx`)
- **变量/函数**: camelCase (如 `getUserData`)
- **常量**: UPPER_SNAKE_CASE (如 `API_BASE_URL`)
- **类型/接口**: PascalCase (如 `UserData`, `ApiResponse`)

#### 提交规范
```bash
# 提交格式
<type>(<scope>): <description>

# 示例
feat(components): add user profile component
fix(api): resolve authentication issue
docs(readme): update installation guide
style(ui): improve button hover effects
```

#### 类型定义
- 优先使用 `interface` 而非 `type`
- 为所有 props 定义接口
- 使用泛型提高代码复用性

### 组件开发

```tsx
// 示例组件
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
  children: React.ReactNode;
}

export function Component({ className, children }: ComponentProps) {
  return (
    <div className={cn('base-styles', className)}>
      {children}
    </div>
  );
}
```

## 🔧 配置说明

### 环境变量配置

创建 `.env.local` 文件并配置以下环境变量：

```bash
# 应用基础配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Planckbaka Blog"
NEXT_PUBLIC_APP_DESCRIPTION="现代化个人博客平台"

# Supabase 配置（可选，用于数据存储）
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI 服务配置（可选，用于智能功能）
OPENAI_API_KEY=your_openai_api_key

# 分析和监控（可选）
NEXT_PUBLIC_GA_ID=your_google_analytics_id
VERCEL_ANALYTICS_ID=your_vercel_analytics_id

# 邮件服务（可选，用于联系表单）
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email@gmail.com
EMAIL_SERVER_PASSWORD=your_app_password
EMAIL_FROM=noreply@yourdomain.com
```

> **注意**: 
> - 生产环境请使用真实的 API 密钥
> - 不要将 `.env.local` 文件提交到版本控制
> - Vercel 部署时需要在项目设置中配置环境变量

### Tailwind CSS 配置

项目使用 Tailwind CSS v4，配置文件位于 `postcss.config.mjs`：

```js
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

### 自定义动画

在 `globals.css` 中定义了渐变动画：

```css
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  animation: gradient 8s linear infinite;
}
```

## 📊 性能指标

- **首屏加载时间**: < 2秒
- **Lighthouse 评分**: 性能 > 90分
- **SEO 友好**: 服务端渲染、语义化 HTML
- **无障碍访问**: WCAG 2.1 AA级标准

## 🌐 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 注意事项

1. **开发环境**: 确保 Node.js 版本 >= 18.0.0
2. **依赖管理**: 推荐使用 pnpm 以获得更好的性能
3. **环境变量**: 生产环境需要配置相应的环境变量
4. **图片优化**: 使用 Next.js Image 组件进行图片优化
5. **SEO**: 确保每个页面都有适当的 meta 标签
6. **性能**: 使用 React.memo 和 useMemo 优化组件性能
7. **安全**: 不要在客户端暴露敏感的 API 密钥

## 🚀 部署

### Vercel 部署（推荐）

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

### 手动部署

```bash
# 构建项目
npm run build

# 启动生产服务器
npm run start
```

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- 作者: Aki Wayne
- 邮箱: your-email@example.com
- 项目链接: [https://github.com/your-username/Planckbaka-blog](https://github.com/your-username/Planckbaka-blog)

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - 组件库
- [Supabase](https://supabase.com/) - 后端服务
- [Vercel](https://vercel.com/) - 部署平台
