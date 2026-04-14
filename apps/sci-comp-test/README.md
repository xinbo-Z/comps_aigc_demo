# sci-comp-test

`sci-comp-test` 是 `@sci-comp/core` 的测试工作区，负责验证通用组件的渲染、交互、主题集成和基础行为。

该工作区不承载组件实现本身，而是围绕核心包建立稳定的测试入口，确保组件封装在持续迭代中保持可验证性。

## 项目职责

该工作区主要负责：

- 运行 `@sci-comp/core` 的组件测试
- 验证组件在 jsdom 环境下的基本交互行为
- 提供统一的测试渲染能力与主题上下文
- 为新增或调整组件提供回归验证基础

## 技术栈

- Vitest
- React Testing Library
- jsdom
- TypeScript
- `@sci-comp/core` workspace 依赖

## 常用命令

推荐从仓库根目录执行：

```bash
pnpm test
pnpm test:watch
```

如果已进入当前工作区，也可以执行：

```bash
pnpm test
pnpm test:watch
pnpm typecheck
pnpm lint
```

## 目录结构

```text
apps/sci-comp-test/
├── src/
│   ├── components/      # 组件测试用例
│   ├── styles/          # 样式/主题相关测试
│   └── support/         # 测试辅助函数与 setup
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

其中常见测试分布包括：

- `src/components/general/*/*.test.tsx`
- `src/styles/theme.test.ts`
- `src/support/render.tsx`

## 测试基础设施

### 1. 统一测试入口

测试配置位于：

- [vitest.config.ts](vitest.config.ts)

当前配置特性包括：

- 使用 `jsdom` 作为测试环境
- 使用 `./src/support/setup.ts` 作为 setup 文件
- 开启 `globals: true`
- 将 `@sci-comp/core` alias 到核心包源码入口，便于本地源码联调

### 2. 统一 render 能力

测试渲染封装位于：

- [src/support/render.tsx](src/support/render.tsx)

该文件通过 `ConfigProvider` 注入主题 token，并封装统一的 `render` 方法，因此组件测试默认具备：

- antd 主题上下文
- 与核心包一致的 token 能力
- 更一致的测试运行环境

## 与核心包的关系

该工作区通过 workspace 依赖使用：

- `@sci-comp/core`

同时在 [vitest.config.ts](vitest.config.ts) 中，将 `@sci-comp/core` 映射到：

- `../../packages/sci-comp-core/src/index.ts`

这意味着测试工程更接近源码联调模式，适合在组件调整后快速验证最新实现。

## 维护要求

- 新增组件时，应同步补充对应测试
- 调整组件 API、交互行为或主题逻辑时，应补充或更新回归测试
- 如果测试需要统一上下文，优先复用 `src/support/` 中已有能力
- 避免在单个测试文件中重复搭建渲染环境

## 推荐开发路径

如果你正在开发组件，推荐使用以下顺序：

1. 在 `packages/sci-comp-core` 中修改组件实现
2. 通过 `pnpm test:watch` 观察测试反馈
3. 必要时补充新的测试用例
4. 确认测试通过后再同步更新文档站说明

## 相关文档

- [../../README.md](../../README.md)
- [../../packages/sci-comp-core/README.md](../../packages/sci-comp-core/README.md)
- [../sci-comp-documention/README.md](../sci-comp-documention/README.md)
