## 1. 主题分层与桥接基础

- [x] 1.1 梳理并重构 `packages/sci-comp-core/src/styles/` 下的 token 结构，明确 seed/base token 与 semantic token 的分层职责
- [x] 1.2 实现从主题输入派生 semantic token 的构建逻辑，覆盖 text、surface、border、action、danger、radius、control size 等核心语义
- [x] 1.3 实现从统一主题源分别输出 Ant Design token 与 CSS custom properties 的桥接能力

## 2. CSS variable contract 与兼容层

- [x] 2.1 定义规范化的新 CSS variable 命名，并为 semantic token 建立稳定映射
- [x] 2.2 为现有历史变量名（如 `--text-h`、`--bg`、`--border`、`--accent`、`--danger`）提供兼容输出层
- [x] 2.3 调整主题相关公共导出，确保消费方可以通过包入口获取统一主题能力而不是依赖内部路径

## 3. 核心组件渐进迁移

- [x] 3.1 迁移 Button 的样式消费到统一 semantic token 体系，并去除对历史变量语义的直接依赖
- [x] 3.2 迁移 Input 的样式消费到统一 semantic token 体系，并收敛 focus、disabled、error 等状态色来源
- [x] 3.3 迁移 Form/SchemaForm 与 Modal 的样式消费到统一 semantic token 体系，验证 CSS Modules 外壳与 AntD wrapper 在同一主题入口下保持一致

## 4. 硬编码与验证收口

- [x] 4.1 收敛 Button、Input、Form、Modal 中硬编码的圆角、控件高度和运行时颜色派生写法
- [x] 4.2 补充主题相关测试，验证单一主题 override 可同时影响 AntD token 链路与 CSS variable 链路
- [x] 4.3 更新必要的文档或示例验证方式，确保后续扩展 dark mode、品牌换肤与组件级 token 覆写有稳定基础
