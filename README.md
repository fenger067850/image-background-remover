# 📄 Image Background Remover - MVP 需求文档

## 1. 项目概述
*   **项目目标**：利用 Cloudflare + Remove.bg API，快速上线一个能够自动去除图片背景的 Web 工具。
*   **核心逻辑**：前端上传 -> Cloudflare Worker 中转 -> Remove.bg 处理 -> 前端即时预览与下载。
*   **最高准则**：轻量化、无存储、内存转发、极速响应。

## 2. 核心功能 (MVP Scope)

### 2.1 图片上传 (Frontend)
*   **上传方式**：支持点击上传及拖拽（Drag & Drop）上传。
*   **限制条件**：
    *   格式限制：`.jpg`, `.jpeg`, `.png`。
    *   大小限制：单张图片不超过 10MB（适配 Cloudflare Worker 内存与 Remove.bg API 限制）。
*   **即时性**：上传后前端立即显示原始图片缩略图。

### 2.2 背景移除 (Backend/API)
*   **API 交互**：Cloudflare Worker 接收前端 `FormData` 并透传至 Remove.bg API。
*   **内存处理**：图片数据不落地存储，直接在 Worker 内存中完成流式转发。
*   **错误处理**：若 API 余额不足或图片格式错误，需返回明确的错误提示（如：“API 额度已耗尽”或“图片解析失败”）。

### 2.3 预览与下载 (Frontend)
*   **对比展示**：提供简单的“原图/处理后”对比预览（Loading 状态需有转圈动画）。
*   **结果下载**：处理完成后，提供一个明显的“下载透明背景图 (PNG)”按钮。
*   **临时性**：刷新页面后预览消失（符合“无存储”原则）。

## 3. 技术架构 (Tech Stack)

| 模块 | 技术选型 | 理由 |
| :--- | :--- | :--- |
| **部署/CDN** | Cloudflare Pages + Workers | 零成本、全球加速、无服务器化 |
| **前端框架** | Next.js (Static Export) | 极速首屏加载，优秀的 SEO 潜力 |
| **样式库** | Tailwind CSS | 快速响应式布局开发 |
| **API 服务** | Remove.bg API | 行业顶尖效果，集成成本极低 |

## 4. 非功能性需求
*   **安全性**：API Key 必须存储在 Cloudflare Worker 的 `Environment Secret` 中，严禁暴露在前端。
*   **性能**：端到端响应时间（不计 API 处理时间）控制在 100ms 内。
*   **响应式**：必须适配移动端。

## 5. 待确定项 (Pending)
*   **API 额度控制**：MVP 阶段建议先通过 Cloudflare WAF 频率限制 IP 访问。
