# 通用组件 antd Wrapper 规范设计

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this spec task-by-task.

**Goal:** 明确通用基础组件必须基于 Ant Design v6 官方组件进行封装开发，而不是仅参考其视觉风格。

**Architecture:** 通用组件层统一采用 antd 作为底层交互与状态实现基础，组件库在此之上做 API 收敛、业务语义增强与主题适配。Button、Input、Table、Form 已纳入该约束，后续 Modal、Tabs 也必须沿用同一模式。

**Tech Stack:** React 19, TypeScript 5.x, Ant Design 6.x, Vitest, React Testing Library, Rspress

---

## 当前落地位置

- 组件源码位于 `packages/sci-comp-core/src/`
- 组件测试位于 `apps/sci-comp-test/src/`
- 组件文档位于 `apps/sci-comp-documention/docs/`
## 约束

- 通用基础组件必须基于 Ant Design v6 官方组件封装开发。
- 不允许仅参考 Ant Design v6 的设计风格而使用原生 HTML 或完全自定义实现替代。
- 对外 API 可保留业务语义与扩展能力，但底层主要结构、交互与状态应复用 antd。
- Button / Input / Table / Form 必须符合该约束。
- Modal / Tabs 后续实现时必须遵循同一约束。
