# shadcn/ui 使用指南

## 概述

shadcn/ui 不是传统的组件库，而是一套构建组件库的方法论。它提供开放的组件代码，让开发者拥有完全的控制权来定制和扩展组件。

## 核心理念

### 1. 开放代码 (Open Code)
- **完全透明**：可以看到每个组件的具体实现
- **易于定制**：直接修改组件代码以满足设计需求
- **AI 友好**：开放的代码便于 AI 工具理解和改进

### 2. 组合性 (Composition)
- **统一接口**：所有组件共享通用的可组合接口
- **可预测性**：对团队和 AI 工具都是可预测的
- **一致性**：不需要学习不同组件的不同 API

### 3. 分发系统 (Distribution)
- **扁平化架构**：定义组件、依赖和属性的扁平文件结构
- **CLI 工具**：跨项目和跨框架分发组件的命令行工具

### 4. 美观默认值 (Beautiful Defaults)
- **开箱即用**：精心选择的默认样式
- **统一设计**：组件自然契合，保持 UI 一致性
- **易于定制**：简单覆盖和扩展默认样式

## 安装和设置

### 1. 初始化项目

```bash
# 使用 Next.js 创建项目
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app

# 初始化 shadcn/ui
npx shadcn@latest init
```

### 2. 配置选项

在初始化过程中，你需要选择：

```bash
✔ Which style would you like to use? › New York
✔ Which color would you like to use as base color? › Slate
✔ Would you like to use CSS variables for colors? › yes
```

### 3. 项目结构

```
my-app/
├── components/
│   └── ui/           # shadcn/ui 组件
├── lib/
│   └── utils.ts      # 工具函数
├── app/
├── public/
└── ...
```

## 组件使用

### 1. 添加组件

```bash
# 添加单个组件
npx shadcn@latest add button

# 添加多个组件
npx shadcn@latest add button card dialog

# 查看可用组件
npx shadcn@latest add
```

### 2. 基础组件示例

#### Button 组件

```tsx
import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="space-x-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
```

#### Card 组件

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CardDemo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            {/* 表单内容 */}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
```

### 3. 表单组件

#### Input 和 Label

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}
```

#### Select 组件

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

## 主题定制

### 1. CSS 变量配置

在 `globals.css` 中定制主题：

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... 其他暗色主题变量 */
  }
}
```

### 2. 组件变体定制

```tsx
// 自定义 Button 变体
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        // 自定义变体
        gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

## 高级用法

### 1. 复合组件

```tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setOpen(false)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### 2. 表单集成

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## 最佳实践

### 1. 组件组织

```
components/
├── ui/              # shadcn/ui 基础组件
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── forms/           # 表单组件
│   ├── login-form.tsx
│   └── profile-form.tsx
├── layout/          # 布局组件
│   ├── header.tsx
│   ├── sidebar.tsx
│   └── footer.tsx
└── features/        # 功能组件
    ├── auth/
    ├── blog/
    └── dashboard/
```

### 2. 类型安全

```tsx
import { type VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button"

interface CustomButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export function CustomButton({ 
  className, 
  variant, 
  size, 
  loading, 
  children, 
  ...props 
}: CustomButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  )
}
```

### 3. 响应式设计

```tsx
export function ResponsiveCard() {
  return (
    <Card className="w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <CardHeader className="text-center sm:text-left">
        <CardTitle className="text-lg sm:text-xl md:text-2xl">
          Responsive Title
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* 响应式网格内容 */}
      </CardContent>
    </Card>
  )
}
```

## 常见问题

### 1. 样式覆盖

```tsx
// 使用 cn 工具函数合并类名
import { cn } from "@/lib/utils"

<Button className={cn("custom-styles", className)}>
  Custom Button
</Button>
```

### 2. 主题切换

```tsx
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </Button>
  )
}
```

### 3. 动画集成

```tsx
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        {/* 卡片内容 */}
      </Card>
    </motion.div>
  )
}
```

## 总结

shadcn/ui 提供了一种全新的组件库使用方式，通过开放代码和统一接口，让开发者能够构建真正符合项目需求的组件系统。它不仅提供了美观的默认样式，更重要的是给予了开发者完全的控制权和定制能力。

### 核心优势

1. **完全控制**：拥有组件的完整源代码
2. **易于定制**：直接修改组件以满足需求
3. **类型安全**：完整的 TypeScript 支持
4. **现代化**：基于最新的 React 和 CSS 技术
5. **可访问性**：内置无障碍访问支持
6. **AI 友好**：开放的代码结构便于 AI 工具理解和改进

通过遵循本指南的最佳实践，你可以构建出既美观又功能强大的用户界面。