---

```markdown
# 🤖 AI 智能客服聊天机器人项目开发文档

本项目基于 **React + TypeScript + Vite + Tailwind CSS** 构建，接入 AI 模型（如 DeepSeek/OpenAI）实现流式对话、Markdown 渲染与代码高亮功能，并作为个人简历项目展示。

---

## 📁 项目结构草图（建议结构）

```

react-ai-chatbot/
├── public/
│   └── index.html
├── src/
│   ├── components/         # 通用组件
│   │   ├── ChatBubble.tsx  # 对话气泡组件
│   │   ├── MessageList.tsx # 聊天列表组件
│   │   └── Header.tsx
│   ├── hooks/              # 自定义 Hook
│   │   └── useChat.ts      # 核心对话逻辑处理
│   ├── utils/              # 工具函数
│   │   └── api.ts          # 请求封装
│   ├── types/              # 类型定义
│   │   └── message.ts
│   ├── pages/
│   │   └── Chat.tsx        # 主聊天页面
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.local              # API 密钥等私密配置
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md

```

---

## 🗂️ 分页开发任务安排（共 4 阶段）

---

### ✅ 第一阶段：基础功能（Day 1-2）

| 任务 | 技术点 | 说明 |
|------|--------|------|
| 初始化项目 | Vite + React + TS | `npm create vite@latest` |
| 接入 Tailwind CSS | tailwind.config.ts 配置 | 使用 `npx tailwindcss init` |
| 创建对话页面 Chat.tsx | useState/useEffect | 输入框 + 消息展示区域 |
| 封装 API 请求 | fetch / axios | stream 请求 DeepSeek 或 OpenAI |
| 实现流式响应展示 | ReadableStream | 使用 `reader.read()` 持续追加内容 |

---

### ✅ 第二阶段：核心体验优化（Day 3-4）

| 任务 | 技术点 | 说明 |
|------|--------|------|
| Markdown 渲染 | react-markdown | 支持内容格式化展示 |
| 代码高亮 | highlight.js | `import 'highlight.js/styles/github.css'` |
| 自动滚动到底部 | useRef + scrollIntoView | 体验流畅 |
| 打字动画或 Loading 效果 | useState 控制 | 加载中可展示三点闪烁等动画 |
| 输入状态管理优化 | useReducer 或状态拆分 | 管理 loading / 输入框状态等 |

---

### ✅ 第三阶段：功能进阶（Day 5-6）

| 任务 | 技术点 | 说明 |
|------|--------|------|
| 多轮对话上下文管理 | useReducer / Message[] | 支持上下文持续传递 |
| 参数配置面板 | temperature / top_p 控制 | 通过 UI 控制请求参数 |
| 模型切换 | 支持 DeepSeek / OpenAI | 可通过 select 切换 |
| 聊天记录本地缓存 | localStorage | 保存历史记录、刷新不丢失 |
| 错误处理和提示优化 | try/catch / Toast | 处理 401/429 等错误状态码提示 |

---

### ✅ 第四阶段：部署与亮点（Day 7）

| 任务 | 技术点 | 说明 |
|------|--------|------|
| 深色模式支持 | Tailwind `dark:` | 使用 `class="dark"` 切换主题 |
| Vercel 部署 | 自动构建 | 部署为公开项目地址 |
| README 编写 | markdown | 项目介绍、功能、技术栈、部署链接等 |
| 简历项目描述撰写 | 项目亮点归纳 | 用于简历撰写与面试讲解 |
| 项目打包演示视频（可选） | screen recording | 可用于面试时展示作品或 B 站投放 |

---

## ✨ 可选扩展任务（进阶展示）

- 用户登录（OAuth、Firebase）
- 聊天导出为 Markdown/PDF
- 聊天插件系统（天气、翻译）
- 服务端代理接口（隐藏 API Key）

---

## 📌 技术栈列表

- **前端框架**：React + TypeScript + Vite
- **样式系统**：Tailwind CSS + dark mode
- **AI 接口**：DeepSeek / OpenAI Chat Completions
- **Markdown 渲染**：react-markdown + highlight.js
- **状态管理**：React Hook / useReducer
- **本地存储**：localStorage
- **部署**：Vercel / Netlify

---

> 开源地址（若有）：`https://github.com/yourname/react-ai-chatbot`  
> 在线体验：`https://ai-chat-yourname.vercel.app`

```

---
