## Why

当前 `sci-comp-core` 已经提供 `createThemeTokens()` 和少量基础 token，但 Ant Design 主题 token、CSS Modules 中使用的 CSS 变量、以及组件内部样式消费之间没有形成统一闭环。随着 Button、Input、Form、Modal 等组件继续扩展，现有命名割裂、硬编码尺寸与圆角分散、运行时颜色派生零散的问题会持续放大，使后续 dark mode、品牌换肤和组件级主题覆写变得难以维护。

## What Changes

- 为核心组件包引入以 semantic token 为中心的主题分层，明确 seed/base token、semantic token 与组件消费之间的关系。
- 为核心样式系统增加双输出桥接能力，让同一套主题输入能够同时映射到 Ant Design `ConfigProvider` token 和 core 内部 CSS custom properties。
- 为当前已经依赖 CSS 变量的通用组件建立渐进迁移路径，覆盖 Button、Input、Form/SchemaForm、Modal。
- 保留旧变量名兼容输出作为过渡层，同时引入规范化的新变量命名，避免一次性推倒现有组件样式。
- 收敛当前分散在 CSS Modules 中的硬编码圆角、控件高度和运行时颜色派生写法，统一由主题系统表达。

## Capabilities

### New Capabilities

- `component-theme-system`: 定义核心组件包的 semantic token、CSS 变量桥接与主题输出 contract。

### Modified Capabilities

- `component-library-foundation`: 组件库基础设施要求需要扩展到统一主题源、双输出主题桥接和可持续扩展的样式变量体系。
- `general-business-components`: Button、Form、Modal 等基础组件的样式消费要求需要调整为以 semantic token 为中心，而不是继续依赖历史变量名和硬编码样式值。
- `component-library-package`: 核心组件包的公开能力需要覆盖主题相关导出与样式变量 contract，保证消费方通过公共入口获得一致主题能力。

## Impact

- 主要影响 `packages/sci-comp-core/src/styles/` 下的主题与 token 代码组织。
- 主要影响 `packages/sci-comp-core/src/components/general/` 下 Button、Input、Form/SchemaForm、Modal 的样式消费方式。
- 影响测试工作区中的主题注入与回归验证方式，确保单一主题入口可同时影响 AntD wrapper 与 CSS Module wrapper。
- 为后续 dark mode、品牌换肤、密度模式和组件级 token 覆写提供基础能力，但本次 change 先聚焦主题 contract 与渐进迁移闭环。
