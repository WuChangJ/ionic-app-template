# Ionic Demo Router MyApp

基于 **Ionic Framework v8** + **Vue 3** + **Vite** 构建的移动端示例应用，演示了 Ionic 的 Tab 导航、路由嵌套以及自定义导航栏的使用。

---

## 技术栈

| 类别         | 技术                          |
| ------------ | ----------------------------- |
| 框架         | Vue 3 (Composition API + `<script setup>`) |
| UI 组件库    | Ionic Framework v8 + IonIcons |
| 路由         | Vue Router 4 + @ionic/vue-router |
| 构建工具     | Vite 5                        |
| 语言         | TypeScript 5.9                |
| 单元测试     | Vitest + @vue/test-utils      |
| E2E 测试     | Cypress 13                    |
| 代码规范     | ESLint + @vue/eslint-config-typescript |

---

## 项目结构

```
ionic-demo-router-myApp/
├── public/                     # 静态资源
│   └── favicon.png
├── src/
│   ├── components/             # 公共组件
│   ├── layout/                 # 布局组件
│   │   ├── main.vue            # 主布局（含底部 Tab 栏）
│   │   └── navBar.vue          # 自定义导航栏组件
│   ├── router/
│   │   └── index.ts            # 路由配置
│   ├── theme/
│   │   └── variables.css       # Ionic 主题变量
│   ├── views/                  # 页面视图
│   │   ├── home/
│   │   │   └── index.vue       # 首页
│   │   ├── goods/
│   │   │   └── index.vue       # 商品页
│   │   ├── my/
│   │   │   └── index.vue       # 我的页
│   │   └── safetyCenter/       # 安全中心（二级页面）
│   │       └── index.vue
│   ├── App.vue                 # 根组件
│   └── main.ts                 # 应用入口
├── tests/
│   ├── e2e/                    # Cypress E2E 测试
│   │   ├── fixtures/
│   │   ├── specs/
│   │   └── support/
│   └── unit/                   # 单元测试
│       └── example.spec.ts
├── cypress.config.ts           # Cypress 配置
├── vite.config.ts              # Vite 配置
├── tsconfig.json               # TypeScript 配置
├── ionic.config.json           # Ionic 项目配置
├── .eslintrc.cjs               # ESLint 配置
└── package.json
```

---

## 路由设计

| 路径             | 页面       | 说明               |
| ---------------- | ---------- | ------------------ |
| `/`              | -          | 重定向到 `/tabs/home` |
| `/tabs/home`     | 首页        | 第一个 Tab 页       |
| `/tabs/goods`    | 商品        | 第二个 Tab 页       |
| `/tabs/my`       | 我的        | 第三个 Tab 页，含安全中心入口和退出登录 |
| `/safetyCenter`  | 安全中心     | 二级子页面，全屏无 Tab 栏 |

- 使用 `@ionic/vue-router` 的 `createRouter` + `createWebHistory` 模式。
- `/tabs/` 路径使用 `layout/main.vue` 作为父布局，内嵌 `<ion-tabs>` 和 `<ion-tab-bar>`，子路由通过 `<ion-router-outlet>` 渲染。
- 路由采用懒加载（动态 import）。

---

## 内置组件

### `layout/main.vue` — 主布局

- 底部 Tab 栏，包含三个 Tab 按钮（首页 / 商品 / 我的），使用 IonIcons 图标。
- 每个 Tab 按钮通过 `href` 属性关联路由路径。

### `layout/navBar.vue` — 自定义导航栏

- 支持返回按钮 (`showBack`) 显隐控制。
- 自动检测是否为移动设备，桌面端增加状态栏高度的 padding。
- 提供具名插槽 `right` 用于右侧自定义内容。
- 默认插槽用于标题文本。

---

## 可用命令

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview

# 运行 E2E 测试
npm run test:e2e

# 运行单元测试
npm run test:unit

# 运行 ESLint 检查
npm run lint
```

---

## 开发说明

- 路径别名 `@` 映射到 `src/` 目录。
- CSS 预处理使用 Less（`navBar.vue` 中使用 `<style scoped lang="less">`）。
- 暗黑模式默认跟随系统设置（`dark.system.css`）。
- Ionic 自动适配 iOS / Android / 桌面端平台样式。

---

## License

MIT License © 2026 WuChangJ
