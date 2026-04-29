## Purpose

定义核心组件包主题系统的 semantic token、主题桥接与 CSS variable contract 要求。

## Requirements

### Requirement: Semantic token 主题层 SHALL 可用

核心组件包必须提供一套以 semantic token 为中心的主题层，用于表达文本、表面、边框、动作色、危险态、圆角和控件尺寸等核心样式语义，而不是继续让组件直接依赖历史变量名或零散硬编码值。

#### Scenario: 主题层覆盖核心语义

- **WHEN** 组件库构建主题对象
- **THEN** 主题系统 MUST 提供至少 text、surface、border、action、danger、radius、control size 等语义层，供 core 组件默认消费

### Requirement: 单一主题输入 SHALL 同时输出 AntD token 与 CSS variables

核心组件包必须将同一套主题输入同时映射到 Ant Design `ConfigProvider` token 和 core 内部 CSS custom properties，以保证 AntD wrapper 与 CSS Module wrapper 在同一主题入口下保持一致。

#### Scenario: 单一主题入口驱动双输出

- **WHEN** 消费方为核心组件包提供主题 override
- **THEN** 主题 override MUST 能同时影响依赖 Ant Design token 的组件和依赖 CSS custom properties 的组件，而不需要两套独立配置

### Requirement: CSS variable contract SHALL 提供规范化命名与兼容层

主题系统必须为 core 内部样式提供规范化的 CSS variable contract，并在迁移期继续兼容现有历史变量名，以支持渐进式迁移而不是一次性推倒样式实现。

#### Scenario: 迁移期兼容旧变量名

- **WHEN** 现有 Button、Input、Form 或 Modal 样式仍引用历史变量名
- **THEN** 主题系统 MUST 继续为这些旧变量名提供兼容输出，同时提供规范化的新变量命名
