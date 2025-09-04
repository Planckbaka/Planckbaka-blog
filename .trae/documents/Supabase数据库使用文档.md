# Supabase 数据库使用文档

## 概述

Supabase 是一个开源的 Firebase 替代方案，提供了构建现代应用所需的后端服务。它基于 PostgreSQL 数据库，提供实时订阅、认证、存储、边缘函数等功能，让开发者能够快速构建全栈应用。

## 核心功能

### 1. 数据库 (Database)
- **PostgreSQL**：完整的关系型数据库
- **实时订阅**：数据变化的实时监听
- **行级安全 (RLS)**：细粒度的数据访问控制
- **SQL 编辑器**：在线 SQL 查询和管理

### 2. 认证 (Auth)
- **多种登录方式**：邮箱、OAuth、魔法链接等
- **用户管理**：用户注册、登录、密码重置
- **会话管理**：JWT 令牌和刷新机制
- **多因素认证**：增强安全性

### 3. 存储 (Storage)
- **文件上传**：图片、视频、文档等文件存储
- **CDN 加速**：全球内容分发网络
- **访问控制**：基于策略的文件访问权限
- **图片变换**：自动图片优化和变换

### 4. 边缘函数 (Edge Functions)
- **Serverless**：按需执行的服务端逻辑
- **全球部署**：低延迟的边缘计算
- **TypeScript 支持**：类型安全的函数开发

## 快速开始

### 1. 创建项目

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 点击 "New Project"
3. 填写项目信息：
   - **Name**: 项目名称
   - **Database Password**: 数据库密码
   - **Region**: 选择最近的区域
4. 等待项目创建完成

### 2. 获取项目配置

```bash
# 项目 URL 和 API Key
Project URL: https://your-project.supabase.co
API Key (anon): your-anon-key
API Key (service_role): your-service-role-key
```

### 3. 安装客户端库

```bash
# JavaScript/TypeScript
npm install @supabase/supabase-js

# React 专用钩子
npm install @supabase/auth-helpers-react

# Next.js 专用
npm install @supabase/auth-helpers-nextjs
```

### 4. 初始化客户端

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 类型安全的客户端
import { Database } from '@/types/supabase'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```

## 数据库操作

### 1. 创建表结构

```sql
-- 在 Supabase SQL 编辑器中执行

-- 用户配置表
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 博客文章表
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 分类表
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 文章分类关联表
CREATE TABLE post_categories (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- 标签表
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 文章标签关联表
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- 评论表
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id),
  parent_id UUID REFERENCES comments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. 设置行级安全 (RLS)

```sql
-- 启用 RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 用户配置策略
CREATE POLICY "Users can view all profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 文章策略
CREATE POLICY "Anyone can view published posts" ON posts
  FOR SELECT USING (published = true);

CREATE POLICY "Authors can view own posts" ON posts
  FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Authors can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete own posts" ON posts
  FOR DELETE USING (auth.uid() = author_id);

-- 评论策略
CREATE POLICY "Anyone can view comments" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own comments" ON comments
  FOR DELETE USING (auth.uid() = author_id);
```

### 3. 创建数据库函数

```sql
-- 更新时间戳函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 创建触发器
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 自动创建用户配置
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 客户端操作

### 1. 基础 CRUD 操作

```typescript
// types/database.ts
export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image?: string
  published: boolean
  author_id: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  username?: string
  full_name?: string
  avatar_url?: string
  bio?: string
  created_at: string
  updated_at: string
}
```

```typescript
// lib/database.ts
import { supabase } from './supabase'
import { Post, Profile } from '@/types/database'

// 获取所有已发布的文章
export async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:author_id (
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data as (Post & { profiles: Profile })[]
}

// 根据 slug 获取文章
export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:author_id (
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return data as Post & { profiles: Profile }
}

// 创建文章
export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()

  if (error) {
    console.error('Error creating post:', error)
    throw error
  }

  return data as Post
}

// 更新文章
export async function updatePost(id: string, updates: Partial<Post>) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating post:', error)
    throw error
  }

  return data as Post
}

// 删除文章
export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}

// 获取用户配置
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data as Profile
}

// 更新用户配置
export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating profile:', error)
    throw error
  }

  return data as Profile
}
```

### 2. 实时订阅

```typescript
// hooks/useRealtimePosts.ts
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Post } from '@/types/database'

export function useRealtimePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 初始加载
    async function fetchPosts() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
      
      if (data) {
        setPosts(data)
      }
      setLoading(false)
    }

    fetchPosts()

    // 设置实时订阅
    const subscription = supabase
      .channel('posts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
          filter: 'published=eq.true'
        },
        (payload) => {
          console.log('Change received!', payload)
          
          if (payload.eventType === 'INSERT') {
            setPosts(current => [payload.new as Post, ...current])
          } else if (payload.eventType === 'UPDATE') {
            setPosts(current => 
              current.map(post => 
                post.id === payload.new.id ? payload.new as Post : post
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setPosts(current => 
              current.filter(post => post.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { posts, loading }
}
```

### 3. 分页查询

```typescript
// hooks/usePaginatedPosts.ts
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Post } from '@/types/database'

interface UsePaginatedPostsOptions {
  pageSize?: number
  category?: string
  tag?: string
}

export function usePaginatedPosts(options: UsePaginatedPostsOptions = {}) {
  const { pageSize = 10, category, tag } = options
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const loadPosts = async (pageNum: number, reset = false) => {
    setLoading(true)
    
    let query = supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id (
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(pageNum * pageSize, (pageNum + 1) * pageSize - 1)

    // 添加分类过滤
    if (category) {
      query = query.contains('categories', [category])
    }

    // 添加标签过滤
    if (tag) {
      query = query.contains('tags', [tag])
    }

    const { data, error } = await query

    if (error) {
      console.error('Error loading posts:', error)
      setLoading(false)
      return
    }

    if (data) {
      if (reset) {
        setPosts(data)
      } else {
        setPosts(current => [...current, ...data])
      }
      
      setHasMore(data.length === pageSize)
    }

    setLoading(false)
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      loadPosts(nextPage)
    }
  }

  const refresh = () => {
    setPage(0)
    setPosts([])
    setHasMore(true)
    loadPosts(0, true)
  }

  useEffect(() => {
    loadPosts(0, true)
  }, [category, tag])

  return {
    posts,
    loading,
    hasMore,
    loadMore,
    refresh
  }
}
```

## 认证系统

### 1. 认证配置

```typescript
// lib/auth.ts
import { supabase } from './supabase'

// 邮箱注册
export async function signUp(email: string, password: string, metadata?: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  })

  if (error) {
    throw error
  }

  return data
}

// 邮箱登录
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

// OAuth 登录
export async function signInWithProvider(provider: 'google' | 'github' | 'discord') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    throw error
  }

  return data
}

// 魔法链接登录
export async function signInWithMagicLink(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    throw error
  }

  return data
}

// 登出
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw error
  }
}

// 获取当前用户
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    throw error
  }
  
  return user
}

// 更新用户信息
export async function updateUser(updates: any) {
  const { data, error } = await supabase.auth.updateUser(updates)
  
  if (error) {
    throw error
  }
  
  return data
}

// 重置密码
export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
  
  if (error) {
    throw error
  }
  
  return data
}
```

### 2. 认证 Hook

```typescript
// hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 获取初始会话
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 监听认证状态变化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return {
    user,
    loading,
    isAuthenticated: !!user,
  }
}
```

### 3. 认证组件

```tsx
// components/AuthForm.tsx
import { useState } from 'react'
import { signIn, signUp, signInWithProvider } from '@/lib/auth'

interface AuthFormProps {
  mode: 'signin' | 'signup'
  onSuccess?: () => void
}

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (mode === 'signin') {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
      onSuccess?.()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    try {
      await signInWithProvider(provider)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => handleOAuthSignIn('google')}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Google
          </button>
          <button
            onClick={() => handleOAuthSignIn('github')}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            GitHub
          </button>
        </div>
      </div>
    </div>
  )
}
```

## 文件存储

### 1. 存储配置

```sql
-- 创建存储桶
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true);

-- 设置存储策略
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Anyone can upload an avatar" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Anyone can update their own avatar" ON storage.objects
  FOR UPDATE USING (auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Post images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'post-images');

CREATE POLICY "Authenticated users can upload post images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'post-images' AND auth.role() = 'authenticated');
```

### 2. 文件上传

```typescript
// lib/storage.ts
import { supabase } from './supabase'

// 上传头像
export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}.${fileExt}`
  const filePath = `${userId}/${fileName}`

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) {
    throw error
  }

  // 获取公共 URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  return publicUrl
}

// 上传文章图片
export async function uploadPostImage(file: File) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `posts/${fileName}`

  const { data, error } = await supabase.storage
    .from('post-images')
    .upload(filePath, file)

  if (error) {
    throw error
  }

  const { data: { publicUrl } } = supabase.storage
    .from('post-images')
    .getPublicUrl(filePath)

  return publicUrl
}

// 删除文件
export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) {
    throw error
  }
}

// 获取文件列表
export async function listFiles(bucket: string, folder?: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder, {
      limit: 100,
      offset: 0,
    })

  if (error) {
    throw error
  }

  return data
}
```

### 3. 图片上传组件

```tsx
// components/ImageUpload.tsx
import { useState } from 'react'
import { uploadPostImage } from '@/lib/storage'

interface ImageUploadProps {
  onUpload: (url: string) => void
  className?: string
}

export default function ImageUpload({ onUpload, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setUploading(true)
    try {
      const url = await uploadPostImage(file)
      onUpload(url)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  return (
    <div
      className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors ${
        dragOver ? 'border-blue-400 bg-blue-50' : ''
      } ${className}`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
    >
      {uploading ? (
        <div className="text-gray-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          Uploading...
        </div>
      ) : (
        <div>
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Drop an image here or click to upload
              </span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
```

## 边缘函数

### 1. 创建边缘函数

```typescript
// supabase/functions/send-email/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, html } = await req.json()

    // 验证输入
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // 发送邮件逻辑（使用 SendGrid、Resend 等服务）
    const response = await fetch('https://api.sendgrid.v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: 'noreply@yourdomain.com' },
        subject,
        content: [{ type: 'text/html', value: html }],
      }),
    })

    if (response.ok) {
      return new Response(
        JSON.stringify({ message: 'Email sent successfully' }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
```

### 2. 调用边缘函数

```typescript
// lib/functions.ts
import { supabase } from './supabase'

// 发送邮件
export async function sendEmail(to: string, subject: string, html: string) {
  const { data, error } = await supabase.functions.invoke('send-email', {
    body: { to, subject, html },
  })

  if (error) {
    throw error
  }

  return data
}

// 处理联系表单
export async function handleContactForm(formData: {
  name: string
  email: string
  message: string
}) {
  const { data, error } = await supabase.functions.invoke('contact-form', {
    body: formData,
  })

  if (error) {
    throw error
  }

  return data
}
```

## 最佳实践

### 1. 类型安全

```bash
# 生成类型定义
npx supabase gen types typescript --project-id your-project-id > types/supabase.ts
```

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// 类型安全的查询
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
```

### 2. 错误处理

```typescript
// lib/errors.ts
export class DatabaseError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

export function handleSupabaseError(error: any): never {
  if (error.code === 'PGRST116') {
    throw new DatabaseError('Record not found', 'NOT_FOUND')
  }
  
  if (error.code === '23505') {
    throw new DatabaseError('Record already exists', 'DUPLICATE')
  }
  
  throw new DatabaseError(error.message || 'Database operation failed', error.code)
}
```

### 3. 性能优化

```typescript
// 使用索引
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

// 使用视图优化复杂查询
CREATE VIEW post_with_author AS
SELECT 
  p.*,
  pr.username,
  pr.full_name,
  pr.avatar_url
FROM posts p
JOIN profiles pr ON p.author_id = pr.id
WHERE p.published = true;

// 使用连接池
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

## 总结

Supabase 提供了一个完整的后端即服务解决方案，让开发者能够快速构建现代化的全栈应用。通过合理使用其数据库、认证、存储和边缘函数功能，可以构建出功能强大、性能优异的应用程序。

### 核心优势

1. **开源透明**：基于 PostgreSQL，完全开源
2. **实时功能**：内置实时订阅和协作功能
3. **类型安全**：完整的 TypeScript 支持
4. **安全性**：行级安全策略和 JWT 认证
5. **可扩展性**：从原型到生产环境的无缝扩展
6. **开发体验**：直观的 Dashboard 和丰富的文档

通过遵循本文档的最佳实践，你可以充分发挥 Supabase 的优势，构建出安全、高效、可维护的应用程序。