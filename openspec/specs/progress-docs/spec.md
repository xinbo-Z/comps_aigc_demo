## Purpose

定义文档站中 Progress 组件的发现性与使用指导要求。

## Requirements

### Requirement: 文档首页 SHALL 包含 Progress 组件入口

文档系统 SHALL 在首页组件列表中暴露 Progress 组件入口，使用户可以与其他核心 wrapper 组件一起发现它。

#### Scenario: Progress 出现在首页组件卡片中

- **WHEN** 用户打开文档站首页
- **THEN** 首页 SHALL 渲染一个指向 Progress 文档页的组件卡片入口

#### Scenario: 首页入口沿用现有组件卡片浏览路径

- **WHEN** 用户浏览首页组件区块
- **THEN** Progress 入口 SHALL 继续沿用现有组件卡片的浏览与跳转模式

### Requirement: Progress 文档页 SHALL 提供完整使用指引

文档系统 SHALL 提供独立的 Progress 文档页，并用中文说明组件用途、适用场景与现有 Progress demos 对应的代表性使用示例。

#### Scenario: Progress 页面说明组件用途

- **WHEN** 用户打开 Progress 文档页
- **THEN** 页面 SHALL 使用中文描述 Progress 组件的用途以及它支持的进度反馈场景

#### Scenario: Progress 页面包含代表性示例

- **WHEN** 用户阅读 Progress 文档页
- **THEN** 页面 SHALL 提供覆盖现有文档 demos 已支持的线性、环形或仪表盘等常见进度展示模式的使用示例
