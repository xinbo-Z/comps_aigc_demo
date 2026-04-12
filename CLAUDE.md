# 项目: hik-comps

## 技术栈

- React 19 + TypeScript 5.x
- Ant Design 6.x（参考基准）
- Vite（构建工具）
- Vitest + React Testing Library（测试）
- Storybook 8（组件文档）

## 项目结构

src/
├── components/ # 组件源码
│ ├── general/ # 通用基础组件
│ │ ├── button/
│ │ ├── table/
│ │ └── form/
│ └── instrument/ # 科学仪器专用组件
│ ├── waveform-chart/
│ ├── instrument-panel/
│ └── param-config/
├── hooks/ # 通用 Hooks
├── utils/ # 工具函数
├── styles/ # 全局样式 & 主题
├── types/ # 全局类型定义
└── **tests**/ # 测试文件

## 编码规范

- 组件使用函数式组件 + Hooks
- 所有组件必须有完整的 TypeScript 类型定义
- Props 接口以组件名 + "Props" 命名（如 ButtonProps）
- 组件文件使用 PascalCase 命名
- 样式使用 CSS Modules 或 Ant Design 的 CSS-in-JS
- 每个组件必须有对应的单元测试和 Storybook 文档
- 遵循 Ant Design v6 的 API 设计风格和交互模式

## 禁止事项

- 禁止使用 class 组件
- 禁止使用 any 类型
- 禁止直接修改 DOM（使用 React ref 除外）
- 禁止在组件中硬编码颜色值，必须使用主题 Token
