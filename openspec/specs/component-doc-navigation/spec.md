# component-doc-navigation Specification

## Purpose

TBD - created by archiving change improve-docs-core. Update Purpose after archive.

## Requirements

### Requirement: 组件文档页 SHALL 通过 Rspress 原生 On This Page 提供正式章节目录

组件文档系统 SHALL 通过组件页 MDX 中的标准标题结构接入 Rspress 原生右侧 On This Page，使读者能够在长页内快速定位组件定义、适用场景、案例演示、常用属性 API、选型建议与封装说明等信息层。

#### Scenario: 页面通过 MDX 标题生成一级目录

- **WHEN** 用户打开任一增强型组件文档页
- **THEN** 页面 SHALL 通过与正文共享顺序的 `##` 标题生成 Rspress 原生一级目录，并可跳转到对应章节位置

#### Scenario: 目录仅展示当前页存在的章节

- **WHEN** 某个组件页未启用可选章节（如 `selectionTips`）
- **THEN** 该页面 SHALL 仅输出当前实际存在的章节标题，而不是渲染空目录项

### Requirement: 组件文档页 SHALL 为案例演示提供稳定子锚点

组件文档系统 SHALL 为“案例演示”区中的每个结构化案例提供稳定的子锚点，并允许 Rspress 原生目录使用这些案例标题进行二级定位。

#### Scenario: 案例目录指向稳定锚点

- **WHEN** 页面渲染结构化案例列表
- **THEN** 每个案例 SHALL 具备稳定的锚点标识，且 `###` 案例标题 SHALL 能定位到对应案例卡片

#### Scenario: 稳定锚点在页面重渲染后保持可用

- **WHEN** 页面因主题切换、代码展开或其他本地交互发生重渲染
- **THEN** 已生成的章节锚点与案例子锚点 SHALL 继续可定位，而不是因重新计算而漂移
