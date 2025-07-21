# Tailwind CSS 设置和问题解决指南

## 问题描述
在 React + Vite + TypeScript 项目中，Tailwind CSS 不生效，`font-semibold` 等属性没有效果。

## 解决方案

### 1. 安装必要的依赖包

```bash
npm install -D tailwindcss postcss autoprefixer
```

### 2. 创建配置文件

由于项目 `package.json` 中设置了 `"type": "module"`，需要使用 `.cjs` 扩展名来创建 CommonJS 格式的配置文件。

#### PostCSS 配置 (`postcss.config.cjs`)

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### Tailwind 配置 (`tailwind.config.cjs`)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. 配置 CSS 文件

在 `src/index.css` 中添加 Tailwind 指令：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. 修复样式冲突

移除 `src/index.css` 中可能覆盖 Tailwind 样式的全局规则：

```css
/* 移除这些可能冲突的样式 */
:root {
  /* 移除 font-weight: 400; */
}

button {
  /* 移除 font-weight: 500; */
}
```

## 常见错误及解决方案

### 错误 1: "Unknown at rule @tailwind"
**原因**: 缺少 Tailwind CSS 依赖包
**解决**: 安装 `tailwindcss postcss autoprefixer`

### 错误 2: "Cannot find module 'ts-node'"
**原因**: 尝试使用 TypeScript 配置文件但缺少 ts-node
**解决**: 安装 `ts-node` 或使用 `.cjs` 配置文件

### 错误 3: "module is not defined in ES module scope"
**原因**: 在 ES 模块环境中使用 CommonJS 语法
**解决**: 将配置文件扩展名改为 `.cjs`

### 错误 4: "Must use import to load ES Module"
**原因**: 配置文件格式与项目模块类型不匹配
**解决**: 使用 `.cjs` 扩展名创建 CommonJS 格式配置文件

## 验证安装

1. 启动开发服务器：`npm run dev`
2. 在组件中使用 Tailwind 类名，如 `className="font-semibold"`
3. 检查样式是否生效

## 注意事项

- 确保 `src/index.css` 在 `main.tsx` 中被正确导入
- 避免在全局 CSS 中设置可能覆盖 Tailwind 的样式
- 使用 `.cjs` 扩展名来兼容 ES 模块项目
- 重启开发服务器以应用配置更改 