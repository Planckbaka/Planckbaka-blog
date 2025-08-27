# Supabase 学习文档

## 1. 产品概述

Supabase 是一个开源的后端即服务（BaaS）平台，基于 PostgreSQL 数据库构建，提供数据库、认证、存储和实时服务。它是 Firebase 的强大替代方案，支持通过 RESTful API 和 SDK 实现前后端交互，让前端开发者能够快速构建现代应用程序。<mcreference link="https://blog.csdn.net/qq_23311271/article/details/150275757" index="1">1</mcreference>

### 核心特性
- **PostgreSQL 数据库**：基于成熟的关系型数据库
- **用户认证**：内置身份验证系统
- **实时数据同步**：支持实时数据更新
- **文件存储**：提供文件上传和管理功能
- **边缘函数**：支持服务端逻辑处理
- **行级安全性**：确保数据访问控制安全

## 2. 快速开始

### 2.1 注册并设置 Supabase 账户

#### 步骤 1：注册账户
1. 访问 [Supabase 官网](https://supabase.com)
2. 点击 "Start your project" 按钮
3. 使用 GitHub 账户登录（推荐）或邮箱注册 <mcreference link="https://dev.to/longlikun/supabsezhu-ce-bing-chuang-jian-xiang-mu-he-tian-jia-shu-ju-biao-467p" index="3">3</mcreference>
4. 无需电话或短信验证，注册过程非常简单

#### 步骤 2：选择套餐
- **免费计划**：适合个人开发者和学习者
- **Pro 计划**：适合生产环境
- **Team 计划**：适合团队协作

### 2.2 创建第一个 Supabase 项目

#### 步骤 1：创建新项目
1. 登录后点击 "New Project" 按钮
2. 选择你的组织（Organization）
3. 填写项目信息：
   - **项目名称**：为你的项目起一个有意义的名称
   - **数据库密码**：设置一个强密码（请妥善保存）
   - **地区选择**：建议选择亚太地区（新加坡、首尔或东京）<mcreference link="https://dev.to/longlikun/supabsezhu-ce-bing-chuang-jian-xiang-mu-he-tian-jia-shu-ju-biao-467p" index="3">3</mcreference>

#### 步骤 2：等待项目初始化
- 项目创建需要大约 2-3 分钟时间
- 创建完成后会自动跳转到项目仪表板

### 2.3 配置数据库和 API 设置

#### 获取项目配置信息
在项目仪表板中，点击 "Settings" → "API"，获取以下信息：

```javascript
// 项目配置
const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseAnonKey = 'your-anon-key'
```

#### 安装 Supabase 客户端

```bash
# 使用 npm
npm install @supabase/supabase-js

# 使用 yarn
yarn add @supabase/supabase-js
```

#### 初始化 Supabase 客户端

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_PROJECT_URL'
const supabaseAnonKey = 'YOUR_ANON_KEY'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
```

## 3. 核心功能详解

### 3.1 用户认证

Supabase 提供了完整的用户认证系统，支持多种登录方式。<mcreference link="https://document.memfiredb.com/docs/guides/auth" index="2">2</mcreference>

#### 3.1.1 邮箱密码注册

```javascript
// 用户注册
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

if (error) {
  console.error('注册失败:', error.message)
} else {
  console.log('注册成功:', data.user)
}
```

#### 3.1.2 用户登录

```javascript
// 用户登录
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

if (error) {
  console.error('登录失败:', error.message)
} else {
  console.log('登录成功:', data.user)
}
```

#### 3.1.3 第三方登录

```javascript
// GitHub 登录
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    redirectTo: 'http://localhost:3000/callback'
  }
})

// Google 登录
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
})
```

#### 3.1.4 获取当前用户

```javascript
// 获取当前登录用户
const { data: { user } } = await supabase.auth.getUser()

if (user) {
  console.log('当前用户:', user)
} else {
  console.log('用户未登录')
}
```

#### 3.1.5 用户登出

```javascript
// 用户登出
const { error } = await supabase.auth.signOut()

if (error) {
  console.error('登出失败:', error.message)
} else {
  console.log('登出成功')
}
```

#### 3.1.6 监听认证状态变化

```javascript
// 监听认证状态
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('用户已登录:', session.user)
  } else if (event === 'SIGNED_OUT') {
    console.log('用户已登出')
  }
})
```

### 3.2 数据库操作

Supabase 基于 PostgreSQL，支持完整的 CRUD 操作。<mcreference link="https://blog.csdn.net/qq_23311271/article/details/150275757" index="1">1</mcreference>

#### 3.2.1 创建数据表

在 Supabase Studio 中执行 SQL：

```sql
-- 创建用户资料表
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建文章表
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3.2.2 插入数据

```javascript
// 插入单条记录
const { data, error } = await supabase
  .from('posts')
  .insert({
    title: '我的第一篇文章',
    content: '这是文章内容...',
    author_id: user.id
  })
  .select()

if (error) {
  console.error('插入失败:', error)
} else {
  console.log('插入成功:', data)
}

// 批量插入
const { data, error } = await supabase
  .from('posts')
  .insert([
    { title: '文章1', content: '内容1', author_id: user.id },
    { title: '文章2', content: '内容2', author_id: user.id }
  ])
```

#### 3.2.3 查询数据

```javascript
// 查询所有记录
const { data, error } = await supabase
  .from('posts')
  .select('*')

// 条件查询
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('author_id', user.id)
  .order('created_at', { ascending: false })

// 分页查询
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .range(0, 9) // 获取前10条记录

// 关联查询
const { data, error } = await supabase
  .from('posts')
  .select(`
    *,
    profiles:author_id (
      username,
      full_name
    )
  `)
```

#### 3.2.4 更新数据

```javascript
// 更新记录
const { data, error } = await supabase
  .from('posts')
  .update({ 
    title: '更新后的标题',
    updated_at: new Date().toISOString()
  })
  .eq('id', postId)
  .select()

if (error) {
  console.error('更新失败:', error)
} else {
  console.log('更新成功:', data)
}
```

#### 3.2.5 删除数据

```javascript
// 删除记录
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId)

if (error) {
  console.error('删除失败:', error)
} else {
  console.log('删除成功')
}
```

### 3.3 存储管理

Supabase Storage 提供文件上传、下载和管理功能。<mcreference link="https://blog.csdn.net/ddrfan/article/details/139045706" index="3">3</mcreference>

#### 3.3.1 创建存储桶

在 Supabase Studio 中创建存储桶：

1. 进入 "Storage" 页面
2. 点击 "New bucket"
3. 设置桶名称（如：avatars、documents）
4. 配置访问权限

#### 3.3.2 上传文件

```javascript
// 上传文件
const uploadFile = async (file, fileName) => {
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(`public/${fileName}`, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('上传失败:', error)
    return null
  }

  return data
}

// 使用示例
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const fileName = `${Date.now()}-${file.name}`
  const result = await uploadFile(file, fileName)
  
  if (result) {
    console.log('文件上传成功:', result)
  }
}
```

#### 3.3.3 获取文件 URL

```javascript
// 获取公共文件 URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar.jpg')

console.log('文件 URL:', data.publicUrl)

// 获取签名 URL（私有文件）
const { data, error } = await supabase.storage
  .from('documents')
  .createSignedUrl('private/document.pdf', 60) // 60秒有效期

if (error) {
  console.error('获取签名 URL 失败:', error)
} else {
  console.log('签名 URL:', data.signedUrl)
}
```

#### 3.3.4 下载文件

```javascript
// 下载文件
const downloadFile = async (fileName) => {
  const { data, error } = await supabase.storage
    .from('avatars')
    .download(`public/${fileName}`)

  if (error) {
    console.error('下载失败:', error)
    return null
  }

  // 创建下载链接
  const url = URL.createObjectURL(data)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}
```

#### 3.3.5 删除文件

```javascript
// 删除文件
const { data, error } = await supabase.storage
  .from('avatars')
  .remove(['public/old-avatar.jpg'])

if (error) {
  console.error('删除失败:', error)
} else {
  console.log('删除成功:', data)
}
```

### 3.4 实时订阅

Supabase 提供实时数据同步功能，支持监听数据库变化。<mcreference link="https://opendeep.wiki/supabase/supabase/examples" index="2">2</mcreference>

#### 3.4.1 监听表变化

```javascript
// 监听表的所有变化
const subscription = supabase
  .channel('posts-channel')
  .on(
    'postgres_changes',
    {
      event: '*', // 监听所有事件
      schema: 'public',
      table: 'posts'
    },
    (payload) => {
      console.log('数据变化:', payload)
      // 处理数据变化
      handleDataChange(payload)
    }
  )
  .subscribe()

// 取消订阅
const unsubscribe = () => {
  supabase.removeChannel(subscription)
}
```

#### 3.4.2 监听特定事件

```javascript
// 只监听插入事件
const insertSubscription = supabase
  .channel('posts-insert')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'posts'
    },
    (payload) => {
      console.log('新增文章:', payload.new)
      // 更新 UI
      addPostToList(payload.new)
    }
  )
  .subscribe()

// 监听更新事件
const updateSubscription = supabase
  .channel('posts-update')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'posts'
    },
    (payload) => {
      console.log('文章更新:', payload.new)
      console.log('原始数据:', payload.old)
      // 更新 UI
      updatePostInList(payload.new)
    }
  )
  .subscribe()
```

#### 3.4.3 监听特定行

```javascript
// 监听特定用户的文章
const userPostsSubscription = supabase
  .channel('user-posts')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'posts',
      filter: `author_id=eq.${userId}`
    },
    (payload) => {
      console.log('用户文章变化:', payload)
    }
  )
  .subscribe()
```

#### 3.4.4 Presence API（在线状态）

```javascript
// 创建 Presence 频道
const presenceChannel = supabase.channel('online-users', {
  config: {
    presence: {
      key: user.id
    }
  }
})

// 跟踪用户在线状态
presenceChannel
  .on('presence', { event: 'sync' }, () => {
    const state = presenceChannel.presenceState()
    console.log('在线用户:', state)
  })
  .on('presence', { event: 'join' }, ({ key, newPresences }) => {
    console.log('用户上线:', key, newPresences)
  })
  .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
    console.log('用户下线:', key, leftPresences)
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      // 发送用户状态
      await presenceChannel.track({
        user_id: user.id,
        username: user.username,
        online_at: new Date().toISOString()
      })
    }
  })
```

## 4. 最佳实践

### 4.1 安全性最佳实践

#### 4.1.1 行级安全性（RLS）

```sql
-- 启用 RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能查看自己的文章
CREATE POLICY "Users can view own posts" ON posts
  FOR SELECT USING (auth.uid() = author_id);

-- 创建策略：用户只能插入自己的文章
CREATE POLICY "Users can insert own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- 创建策略：用户只能更新自己的文章
CREATE POLICY "Users can update own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);
```

#### 4.1.2 环境变量管理

```javascript
// .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

// 配置文件
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 4.2 性能优化

#### 4.2.1 查询优化

```javascript
// 只选择需要的字段
const { data } = await supabase
  .from('posts')
  .select('id, title, created_at')
  .limit(10)

// 使用索引
// 在数据库中为常用查询字段创建索引
// CREATE INDEX idx_posts_author_id ON posts(author_id);
// CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

// 分页查询
const pageSize = 10
const page = 1
const { data, error, count } = await supabase
  .from('posts')
  .select('*', { count: 'exact' })
  .range((page - 1) * pageSize, page * pageSize - 1)
```

#### 4.2.2 缓存策略

```javascript
// 使用 React Query 进行缓存
import { useQuery } from '@tanstack/react-query'

const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    },
    staleTime: 5 * 60 * 1000, // 5分钟
    cacheTime: 10 * 60 * 1000, // 10分钟
  })
}
```

### 4.3 错误处理

```javascript
// 统一错误处理
const handleSupabaseError = (error) => {
  console.error('Supabase Error:', error)
  
  switch (error.code) {
    case 'PGRST116':
      return '数据不存在'
    case '23505':
      return '数据已存在'
    case '42501':
      return '权限不足'
    default:
      return error.message || '操作失败'
  }
}

// 使用示例
const createPost = async (postData) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert(postData)
      .select()
    
    if (error) {
      throw error
    }
    
    return { success: true, data }
  } catch (error) {
    return { 
      success: false, 
      error: handleSupabaseError(error) 
    }
  }
}
```

## 5. 常见问题解决方案

### 5.1 认证相关问题

#### Q: 用户注册后需要邮箱验证吗？
A: 默认情况下需要邮箱验证。可以在 Authentication → Settings 中关闭邮箱验证。

```javascript
// 检查邮箱验证状态
const { data: { user } } = await supabase.auth.getUser()
if (user && !user.email_confirmed_at) {
  console.log('请验证邮箱')
}
```

#### Q: 如何自定义邮箱模板？
A: 在 Authentication → Email Templates 中可以自定义邮箱模板。

### 5.2 数据库相关问题

#### Q: 如何处理数据库连接超时？
A: 设置合适的超时时间和重试机制。

```javascript
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' },
  },
})
```

#### Q: 如何处理大量数据查询？
A: 使用分页查询和流式处理。

```javascript
// 流式查询大量数据
const fetchAllPosts = async () => {
  let allPosts = []
  let page = 0
  const pageSize = 1000
  
  while (true) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .range(page * pageSize, (page + 1) * pageSize - 1)
    
    if (error) throw error
    if (data.length === 0) break
    
    allPosts = [...allPosts, ...data]
    page++
  }
  
  return allPosts
}
```

### 5.3 存储相关问题

#### Q: 如何限制文件上传大小？
A: 在客户端和服务端都进行限制。

```javascript
// 客户端限制
const validateFile = (file) => {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  
  if (file.size > maxSize) {
    throw new Error('文件大小不能超过 5MB')
  }
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('只支持 JPEG、PNG、GIF 格式')
  }
  
  return true
}
```

### 5.4 实时订阅问题

#### Q: 实时订阅连接断开怎么办？
A: 实现重连机制。

```javascript
const createRealtimeSubscription = () => {
  const subscription = supabase
    .channel('posts-channel')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'posts'
    }, handleDataChange)
    .subscribe((status, err) => {
      if (status === 'SUBSCRIBED') {
        console.log('实时订阅已连接')
      } else if (status === 'CHANNEL_ERROR') {
        console.error('订阅错误:', err)
        // 重连逻辑
        setTimeout(() => {
          createRealtimeSubscription()
        }, 5000)
      }
    })
  
  return subscription
}
```

## 6. 进阶功能

### 6.1 边缘函数

边缘函数允许你在 Supabase 平台上运行服务端代码。

```typescript
// supabase/functions/hello/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { name } = await req.json()
  
  // 访问数据库
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  )
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('name', name)
  
  return new Response(
    JSON.stringify({ message: `Hello ${name}!`, data }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

### 6.2 数据库函数

```sql
-- 创建数据库函数
CREATE OR REPLACE FUNCTION get_user_posts(user_id UUID)
RETURNS TABLE (
  id INTEGER,
  title TEXT,
  content TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.title, p.content, p.created_at
  FROM posts p
  WHERE p.author_id = user_id
  ORDER BY p.created_at DESC;
END;
$$;
```

```javascript
// 调用数据库函数
const { data, error } = await supabase
  .rpc('get_user_posts', { user_id: userId })

if (error) {
  console.error('调用函数失败:', error)
} else {
  console.log('用户文章:', data)
}
```

## 7. 部署和监控

### 7.1 生产环境配置

```javascript
// 生产环境配置
const supabaseConfig = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-application-name': 'my-app'
    }
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseConfig
)
```

### 7.2 监控和日志

```javascript
// 添加请求日志
const loggedSupabase = {
  ...supabase,
  from: (table) => {
    console.log(`查询表: ${table}`)
    return supabase.from(table)
  }
}

// 性能监控
const performanceWrapper = async (operation, operationName) => {
  const start = performance.now()
  try {
    const result = await operation()
    const end = performance.now()
    console.log(`${operationName} 耗时: ${end - start}ms`)
    return result
  } catch (error) {
    console.error(`${operationName} 失败:`, error)
    throw error
  }
}
```

## 8. 总结

Supabase 是一个功能强大的后端即服务平台，提供了完整的后端解决方案。通过本文档的学习，你应该能够：

1. **快速上手**：注册账户、创建项目、配置基本设置
2. **掌握核心功能**：用户认证、数据库操作、文件存储、实时订阅
3. **应用最佳实践**：安全性配置、性能优化、错误处理
4. **解决常见问题**：认证、数据库、存储、实时订阅相关问题
5. **使用进阶功能**：边缘函数、数据库函数、生产环境部署

### 下一步建议

1. **实践项目**：创建一个简单的博客或待办事项应用
2. **深入学习**：研究 PostgreSQL 高级特性
3. **社区参与**：加入 Supabase 社区，获取最新信息
4. **性能优化**：学习数据库索引、查询优化等技术
5. **安全加固**：深入了解行级安全性和权限管理

通过持续实践和学习，你将能够充分利用 Supabase 的强大功能，构建出高质量的现代应用程序。