# Prettier 和 ESLint 配置指南

## 📋 已完成的配置

### 1. 安装的依赖包
- ✅ `prettier` - 代码格式化工具
- ✅ `eslint-config-prettier` - 解决 Prettier 与 ESLint 规则冲突
- ✅ `eslint-plugin-prettier` - 将 Prettier 作为 ESLint 规则运行

### 2. 创建的配置文件

#### `.prettierrc` - Prettier 配置
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "proseWrap": "preserve"
}
```

#### `.prettierignore` - Prettier 忽略文件
- 排除 `node_modules/`, `.next/`, `build/` 等目录
- 排除配置文件和生成文件

#### `eslint.config.mjs` - ESLint 配置
- 集成了 Prettier 规则
- 配置了 TypeScript 和 React 相关规则
- 设置了合理的忽略目录

#### `.editorconfig` - 编辑器配置
- 确保跨编辑器的代码风格一致性

### 3. VS Code 配置

#### `.vscode/settings.json`
- 启用保存时自动格式化
- 设置 Prettier 为默认格式化工具
- 配置 ESLint 自动修复

#### `.vscode/extensions.json`
- 推荐安装的 VS Code 扩展列表

### 4. Package.json 脚本

```json
{
  "scripts": {
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "check-all": "npm run type-check && npm run lint && npm run format:check"
  }
}
```

## 🚀 使用方法

### 手动执行命令

```bash
# 检查代码格式
npm run format:check

# 格式化所有文件
npm run format

# 运行 ESLint 检查
npm run lint

# 自动修复 ESLint 问题
npm run lint:fix

# 类型检查
npm run type-check

# 运行所有检查
npm run check-all
```

### VS Code 自动化

1. **安装推荐扩展**：
   - ESLint
   - Prettier - Code formatter
   - 其他推荐扩展

2. **自动格式化**：
   - 保存文件时自动运行 Prettier 格式化
   - 保存时自动修复 ESLint 问题

3. **实时提示**：
   - 编辑器中显示 ESLint 错误和警告
   - 实时显示格式化建议

## ⚙️ 配置说明

### Prettier 规则
- 使用分号
- 单引号
- 行宽 80 字符
- 2 空格缩进
- 尾随逗号（ES5 兼容）

### ESLint 规则
- 继承 Next.js 推荐配置
- TypeScript 严格模式
- React Hooks 规则
- Prettier 集成

### 忽略文件
- 构建输出目录（`.next/`, `build/`, `dist/`）
- 依赖目录（`node_modules/`）
- 配置文件
- 生成的类型文件

## 🔧 自定义配置

### 修改 Prettier 规则
编辑 `.prettierrc` 文件：

```json
{
  "semi": false,        // 不使用分号
  "singleQuote": false, // 使用双引号
  "printWidth": 120     // 行宽 120 字符
}
```

### 修改 ESLint 规则
编辑 `eslint.config.mjs` 文件的 `rules` 部分：

```javascript
rules: {
  "prettier/prettier": "error",
  "@typescript-eslint/no-unused-vars": "error", // 改为错误级别
  "react/no-unescaped-entities": "warn",        // 改为警告级别
}
```

## 📝 注意事项

1. **首次运行**：
   - 运行 `npm run format` 格式化所有现有文件
   - 检查并修复 ESLint 警告

2. **团队协作**：
   - 确保所有团队成员安装相同的 VS Code 扩展
   - 提交前运行 `npm run check-all` 确保代码质量

3. **CI/CD 集成**：
   - 在构建流程中添加 `npm run check-all`
   - 确保代码格式和质量检查通过

4. **性能优化**：
   - ESLint 只检查 `src` 目录，避免检查生成文件
   - 使用 `.prettierignore` 和 ESLint 忽略配置排除不必要的文件

## 🐛 故障排除

### 常见问题

1. **ESLint 和 Prettier 冲突**：
   - 确保安装了 `eslint-config-prettier`
   - 检查 ESLint 配置中是否正确继承了 `prettier`

2. **VS Code 不自动格式化**：
   - 检查是否安装了 Prettier 扩展
   - 确认 `.vscode/settings.json` 配置正确
   - 重启 VS Code

3. **类型检查错误**：
   - 运行 `npm run type-check` 查看详细错误
   - 检查 TypeScript 配置和依赖版本

### 重置配置

如果遇到问题，可以删除以下文件重新配置：
- `.prettierrc`
- `eslint.config.mjs`
- `.vscode/settings.json`

然后重新运行配置步骤。

---

✅ **配置完成！** 现在你的项目已经配置了完整的代码格式化和质量检查工具链。