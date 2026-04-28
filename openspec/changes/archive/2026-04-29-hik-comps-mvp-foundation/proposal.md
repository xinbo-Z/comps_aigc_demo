## Why

项目需要一个面向科学仪器应用的可复用前端组件库，该组件库既要便于业务前端开发者上手，也要与 Ant Design 6 生态保持一致。当前需要先定义一个聚焦的 MVP，用来建立稳定的工程基础、减少重复的 UI 开发工作，并在组件库进一步扩展到更专业的控制和分析能力之前，先统一常见的仪器展示场景。

## What Changes

- 为基于 React 19、TypeScript 5.x、Ant Design 6.x 和 Vite 的科学仪器导向组件库建立初始 `hik-comps` MVP 范围。
- 定义组件库的工程基础，包括构建产物、类型声明、主题定制、按需导入、CSS Modules 样式、Vitest + React Testing Library 测试，以及 Storybook 8 文档。
- 引入第一批通用基础组件：`Button`、`Form`、`Table` 和 `Modal`。
- 引入第一批科学仪器展示组件：`WaveformChart`、`RealtimeDataTable` 和 `ParamConfigForm`。
- 将 MVP 限定为以展示为主的使用场景，排除高级仪器控制工作流、重型分析能力和算法驱动的交互。

## Capabilities

### New Capabilities

- `component-library-foundation`: 定义 `hik-comps` 组件库 MVP 的打包、导出、类型、主题、测试和文档要求。
- `general-business-components`: 定义以 Ant Design 6 风格构建的面向业务场景基础 UI 组件的 MVP 要求。
- `instrument-display-components`: 定义以展示为主的科学仪器组件 MVP 要求，涵盖波形图、实时表格和参数配置场景。

### Modified Capabilities

- 无。

## Impact

- 影响新的 `hik-comps` 组件库工作区及其源码结构、构建配置、测试配置、Storybook 配置和公共组件导出。
- 定义 7 个 MVP 组件的初始公共 API 与验收预期。
- 为后续 `SpectrumChart`、`PeakPicker` 和 `InstrumentPanel` 等组件建立基础技术约束。
- 为 MVP 中所有公共组件引入文档和测试义务。
