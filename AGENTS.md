# AGENTS.md — 项目开发指南（供 AI Agent 阅读）

> 本文档描述 **ionic-demo-router-myApp** 的架构、约定与工作流，帮助 Agent 在此仓库中高效协作。

---

## 1. 项目概要

| 项目            | 说明                                      |
| --------------- | ----------------------------------------- |
| **名称**        | `ionic-demo-router-myApp`                 |
| **类型**        | Ionic Vue 移动端 Hybrid App（纯前端 SPA） |
| **包管理器**    | npm                                       |
| **Node 版本**   | 无锁死，兼容 LTS                          |
| **构建输出**    | `dist/`                                   |
| **仓库**        | Git，主分支 `main`                        |
| **许可证**      | MIT                                       |

---

## 2. 技术栈速查

| 层           | 库 / 版本                      | 用途                          |
| ------------ | ------------------------------ | ----------------------------- |
| 框架         | Vue **3.3+** (`<script setup>`) | 声明式 UI                     |
| UI 组件      | `@ionic/vue` **^8.0.0**        | Ionic 移动端组件               |
| 图标         | `ionicons` **^7.0.0**          | Ionic 图标集                   |
| 路由         | `vue-router` **^4.2.0** + `@ionic/vue-router` | SPA 路由，支持 Tab 视图 |
| 构建         | Vite **^5.0.0**                | 开发服务器 & 打包              |
| 语言         | TypeScript **~5.9.0**          | 类型安全                      |
| 单元测试     | Vitest **^0.34.6** + jsdom     | 组件单元测试                   |
| E2E 测试     | Cypress **^13.5.0**            | 端到端测试                    |
| Lint         | ESLint **^8.35.0** + `@vue/eslint-config-typescript` | 代码规范    |
| CSS 预处理   | Less *(无显式依赖，Vite 内置支持)* | `navBar.vue` 中使用 `<style lang="less">` |
| 浏览器兼容   | `@vitejs/plugin-legacy` **^5.0.0** | 旧浏览器降级              |

---

## 3. 目录结构

```
ionic-demo-router-myApp/
│
├── index.html                    # SPA 入口 HTML，挂载点 <div id="app">
├── package.json                  # 依赖 & 脚本
├── ionic.config.json             # Ionic CLI 配置（type: "vue-vite"）
├── vite.config.ts                # Vite 配置（别名 @ → src、legacy 插件、vitest）
├── tsconfig.json                 # TS 编译配置（strict: true, path alias @/*）
├── tsconfig.node.json            # Vite 配置文件的 TS 配置
├── cypress.config.ts             # Cypress E2E 配置（baseUrl: http://localhost:5173）
├── .eslintrc.cjs                 # ESLint 规则（vue3-essential + TS）
│
├── public/
│   └── favicon.png               # 网站图标
│
├── src/
│   ├── main.ts                   # 入口：createApp → IonicVue → Router → mount('#app')
│   ├── App.vue                   # 根组件：<ion-app><ion-router-outlet /></ion-app>
│   ├── vite-env.d.ts             # Vite 客户端类型声明
│   │
│   ├── router/
│   │   └── index.ts              # 路由定义（见第 4 节）
│   │
│   ├── layout/
│   │   ├── main.vue              # Tab 主布局（ion-tabs + ion-tab-bar）
│   │   └── navBar.vue            # 自定义导航栏（返回按钮 + 标题 + 右侧插槽）
│   │
│   ├── views/
│   │   ├── home/
│   │   │   └── index.vue          # 首页（"去往二级页面"按钮）
│   │   ├── goods/
│   │   │   └── index.vue          # 商品页（"去往二级页面"按钮）
│   │   ├── my/
│   │   │   └── index.vue          # 我的页（安全中心入口 + 退出登录）
│   │   └── safetyCenter/
│   │       └── index.vue          # 安全中心二级页面（修改登录密码 / 设置头像 / 修改昵称）
│   │
│   ├── components/               # 公共组件（目前为空）
│   └── theme/
│       └── variables.css         # Ionic 主题 CSS 变量（目前为空壳）
│
└── tests/
    ├── unit/
    │   └── example.spec.ts       # Tab1Page 单元测试（@vue/test-utils + vitest）
    └── e2e/
        ├── fixtures/
        │   └── example.json
        ├── specs/
        │   └── test.cy.ts        # 首页访问测试
        └── support/
            ├── commands.ts
            └── e2e.ts
```

---

## 4. 路由架构

### 4.1 路由表

```
/                →  redirect → /tabs/home
/tabs/           →  layout/main.vue (父布局)
  /tabs/         →  redirect → /tabs/home
  /tabs/home     →  home/index.vue    (懒加载)
  /tabs/goods    →  goods/index.vue   (懒加载)
  /tabs/my       →  my/index.vue      (懒加载)
/safetyCenter    →  safetyCenter/index.vue (懒加载)
```

### 4.2 路由实现要点

- 使用 `createRouter` from `@ionic/vue-router`（而非标准 vue-router），以支持 Ionic 的视图过渡动画。
- 使用 `createWebHistory` 模式（非 hash）。
- **`/tabs/`** 路由使用 `layout/main.vue` 作为组件，子路由通过 `<ion-router-outlet>` 渲染。
- 根路由 `/` 重定向到 `/tabs/home`。
- 所有子页面使用**动态 import** 懒加载。

### 4.3 路由使用规范

```ts
// 在 Vue 组件中导航
import { useRouter } from 'vue-router';
const router = useRouter();
router.push('/safetyCenter');  // 编程式导航
```

---

## 5. 组件架构

### 5.1 组件树

```
App.vue
└── <ion-app>
    └── <ion-router-outlet>
        ├── layout/main.vue          [路由 /tabs/]
        │   └── <ion-tabs>
│       ├── <ion-router-outlet>
│       │   ├── home/index.vue     [路由 /tabs/home]
│       │   ├── goods/index.vue    [路由 /tabs/goods]
│       │   └── my/index.vue       [路由 /tabs/my]
│       └── <ion-tab-bar slot="bottom">
│           ├── <ion-tab-button tab="home">
│           ├── <ion-tab-button tab="goods">
│           └── <ion-tab-button tab="my">
│
└── safetyCenter/index.vue         [路由 /safetyCenter]
```

### 5.2 组件编写模式

**所有 `.vue` 文件统一使用以下模式：**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>页面标题</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!-- 内容 -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>
```

- 始终使用 `<script setup lang="ts">`（Composition API + TypeScript）。
- Ionic 组件以 `Ion*` 前缀从 `@ionic/vue` 按需导入。
- 图标从 `ionicons/icons` 按需导入，如 `import { triangle } from 'ionicons/icons'`。

### 5.3 navBar.vue 详细说明

```vue
<!-- Props -->
showBack: Boolean (default: true)   # 是否显示返回按钮

<!-- Slots -->
default                             # 标题内容
right                               # 右侧区域

<!-- 行为 -->
- 自动检测平台（getPlatforms()），桌面端增加 status-bar-height padding
- back() 方法目前为空实现
- 使用 Less 编写 scoped 样式，背景色 #141825，文字颜色 @text-color-white
```

**注意**：`navBar.vue` 中引用了 Less 变量 `@text-color-white`，但项目中未找到对应的 Less 变量声明文件。这可能导致编译警告或错误，需要确认是否有全局 Less 变量注入配置。

---

## 6. 入口初始化流程 (`src/main.ts`)

```ts
// 1. 导入 Vue 核心
createApp(App)

// 2. 安装 IonicVue 插件（全局注册所有 Ionic 组件）
.use(IonicVue)

// 3. 安装 Router
.use(router)

// 4. 等待路由就绪后挂载到 #app
router.isReady().then(() => app.mount('#app'));
```

**CSS 加载顺序**：core.css → normalize.css → structure.css → typography.css → 可选工具类 → dark.system.css → variables.css。

**暗黑模式**：当前使用 `dark.system.css`（跟随系统设置）。项目中注释掉了 `dark.always.css` 和 `dark.class.css` 的导入。

---

## 7. 代码规范

### 7.1 ESLint 规则要点

```js
// .eslintrc.cjs 关键配置
extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended']
parserOptions: { ecmaVersion: 2020 }
rules: {
  'no-console': 生产环境 warn,
  'no-debugger': 生产环境 warn,
  'vue/no-deprecated-slot-attribute': off,
  '@typescript-eslint/no-explicit-any': off,     // 允许 any 类型
  'vue/multi-word-component-names': off,          // 允许单词组件名
}
```

### 7.2 命名约定

- **组件文件**：PascalCase（如 `Tab1Page.vue`、`App.vue`）
- **目录**：camelCase（如 `safetyCenter`）
- **路由路径**：kebab-case（如 `/tabs/tab1`、`/safetyCenter`）
- **TypeScript 接口/类型**：PascalCase
- **变量/函数**：camelCase

### 7.3 路径别名

```ts
// vite.config.ts & tsconfig.json
'@' → './src'
```

导入示例：`import layout from '@/layout/main.vue'`

---

## 8. 测试

### 8.1 单元测试 (Vitest)

```bash
npm run test:unit
```

- 测试框架：Vitest + jsdom 环境
- 组件挂载：`@vue/test-utils` 的 `mount()`
- 配置文件：`vite.config.ts` 中的 `test` 字段
- 示例：`tests/unit/example.spec.ts` 测试 Tab1Page 渲染

### 8.2 E2E 测试 (Cypress)

```bash
npm run test:e2e
```

- baseUrl: `http://localhost:5173`（需先启动 dev server）
- spec 目录：`tests/e2e/specs/`
- 配置文件：`cypress.config.ts`

---

## 9. 常用任务

### 开发

```bash
npm install              # 安装依赖
npm run dev              # 启动开发服务器 → http://localhost:5173
npm run build            # 生产构建（先 vue-tsc 类型检查，再 vite build）
npm run preview          # 预览生产构建
```

### 代码质量

```bash
npm run lint             # ESLint 检查所有文件
```

### 新增页面

1. 在 `src/views/` 下创建 `*.vue` 文件。
2. 在 `src/router/index.ts` 的 `routes` 数组中添加路由记录。
3. 如果是 Tab 子页面，添加到 `children` 数组中。
4. 如果是独立页面（非 Tab），添加到顶层 `routes` 数组。

### 新增 Tab

1. 在 `src/views/` 下创建新页面。
2. 在 `src/router/index.ts` 中添加子路由。
3. 在 `src/layout/main.vue` 的 `<ion-tab-bar>` 中添加 `<ion-tab-button>`。

---

## 10. 已知问题 & 待办

| 优先级 | 问题                                                         | 影响                       |
| ------ | ------------------------------------------------------------ | -------------------------- |
| **中** | `navBar.vue` 使用 Less 变量 `@text-color-white`，但无全局变量文件 | 编译可能报错或颜色不生效 |
| **中** | `navBar.vue` 的 `back()` 方法为空实现                          | 返回按钮无实际功能        |
| **低** | `home/index.vue` 和 `goods/index.vue` 的"去往二级页面"按钮无点击事件 | 按钮无响应                |
| **低** | 单元测试 `example.spec.ts` 通过 `mount` 渲染 Ionic 组件可能需要额外配置 | 测试可能因缺少 Ionic 支持而失败 |
| **低** | E2E 测试 `test.cy.ts` 断言需要匹配实际页面内容 | 需验证                |

---

## 11. 给 Agent 的建议

1. **修改路由前先读** `src/router/index.ts`，理解嵌套关系。
2. **添加新页面时**遵循现有的 `<ion-page>` 模板模式。
3. **引入新的 Ionic 组件时**，在 `<script setup>` 中从 `@ionic/vue` 导入对应的 `Ion*` 组件。
4. **样式**：页面级样式可使用 `<style scoped>`，全局主题变量写入 `src/theme/variables.css`。
5. **导航**：编程式导航使用 `useRouter().push()`；声明式导航使用 `router-link` 或 Ionic 的 `href` 属性。
6. **TypeScript 严格模式已开启**（`strict: true`），注意处理可能为 `null/undefined` 的值。
7. **提交代码前**运行 `npm run lint` 确保代码符合规范。
