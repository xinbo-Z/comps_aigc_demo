## ADDED Requirements

### Requirement: Button 文档页 SHALL 提供决策型使用指引

文档系统 SHALL 为 Button 提供独立的增强型组件文档页，并在统一骨架中补齐主次操作层级、风险动作边界与相邻交互方式取舍说明，使页面能够支持高频按钮选型决策。

#### Scenario: Button 页面说明主次操作层级

- **WHEN** 用户浏览 Button 文档页
- **THEN** 页面 SHALL 明确 `primary`、`secondary`、`ghost`、`text` 等常见变体在操作优先级上的典型使用方式

#### Scenario: Button 页面说明风险动作边界

- **WHEN** 用户评估是否使用危险操作按钮
- **THEN** 页面 SHALL 说明 danger 类操作的适用前提与边界，而不是仅展示视觉变体

### Requirement: Button 文档页 SHALL 说明 Button 与相邻交互方式的分流边界

文档系统 SHALL 在 Button 文档页中说明 Button、Link、Dropdown Button 或同等级交互入口之间的职责边界，以避免把所有点击行为都收敛为按钮。

#### Scenario: 页面提供轻量选型分流

- **WHEN** 用户需要判断当前动作更适合 Button 还是其他交互入口
- **THEN** 页面 SHALL 提供最小必要的分流说明，帮助区分提交动作、跳转动作与多操作聚合入口

#### Scenario: 页面保持高频优先而不扩展为交互模式大全

- **WHEN** 团队维护 Button 文档页
- **THEN** 页面 SHALL 以高频操作分层与职责边界为主，而不是扩展成所有 CTA 交互的完整设计规范页
