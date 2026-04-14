# @sci-comp/core

`@sci-comp/core` 是该 Monorepo 中的核心组件库包，负责提供通用组件、类型定义、主题能力和构建产物。

该包是文档站与测试工程共同依赖的核心工作区，所有基础组件都应在这里实现并统一导出。

## 包定位

该包负责：

- 承载通用组件源码
- 对外提供统一类型定义
- 输出构建产物 `dist`
- 提供主题 token 与样式相关能力
- 作为文档站和测试工程的依赖源

## 当前能力范围

当前对外导出的核心能力包括：

- Button
- Input
- Table
- Form
- Modal
- Tabs
- styles / theme / token 相关导出

统一导出入口位于：

- [src/index.ts](src/index.ts)

## 构建产物说明

当前包的构建结果输出到：

```text
dist/
```

`package.json` 已配置以下导出：

- `main` -> `./dist/index.cjs`
- `module` -> `./dist/index.js`
- `types` -> `./dist/index.d.ts`

这意味着该包同时提供：

- CJS 产物
- ESM 产物
- TypeScript 声明文件

## 常用命令

在当前工作区目录执行：

```bash
pnpm build
pnpm dev
pnpm lint
pnpm typecheck
```

### 命令说明

- `pnpm build`
  - 先生成 d.ts，再执行 Vite bundle 构建
- `pnpm dev`
  - 并行启动类型 watch 与 bundle watch
  - 适合本地联调时持续输出最新 `dist`
- `pnpm lint`
  - 校验 `src` 下源码
- `pnpm typecheck`
  - 执行 TypeScript 类型检查

## 源码结构

```text
packages/sci-comp-core/
├── src/
│   ├── components/
│   │   └── general/     # 通用组件实现
│   ├── styles/          # 主题、token、样式相关能力
│   ├── global.d.ts      # 全局声明
│   └── index.ts         # 对外统一导出入口
├── dist/                # 构建产物
├── package.json
├── tsconfig.json
└── vite.config.ts
```

当前组件实现主要位于：

- `src/components/general/button`
- `src/components/general/input`
- `src/components/general/table`
- `src/components/general/form`
- `src/components/general/modal`
- `src/components/general/tabs`

## 封装原则

该包中的通用组件必须遵循以下约束：

- 必须基于 **Ant Design v6 官方组件** 进行封装开发
- 不允许仅参考 antd 的视觉风格而完全自定义替代实现
- 必须提供完整的 TypeScript 类型定义
- 样式与主题能力应遵循统一 token 约束
- 组件导出方式应保持一致，方便文档与测试工程复用

## 与其他工作区的关系

### 与文档站的关系

- `apps/sci-comp-documention` 直接消费该包
- 文档中的组件示例应以这里的真实导出为准
- 修改组件 API 或行为后，应同步更新文档说明

### 与测试工程的关系

- `apps/sci-comp-test` 用于验证该包的组件行为
- 测试工程通过 workspace 依赖和 alias 联动本包源码
- 新增组件或调整核心行为时，应同步补齐测试

## 开发建议

- 修改组件前优先确认是否已有相邻组件实现模式可复用
- 变更导出时同步检查 [src/index.ts](src/index.ts)
- 调整构建或导出方式时同步检查 [package.json](package.json) 与 [vite.config.ts](vite.config.ts)
- 与文档或测试相关的变更应同步检查对应工作区

## 相关文档

- [../../README.md](../../README.md)
- [../../apps/sci-comp-documention/README.md](../../apps/sci-comp-documention/README.md)
- [../../apps/sci-comp-test/README.md](../../apps/sci-comp-test/README.md)
