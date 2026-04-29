## MODIFIED Requirements

### Requirement: 面向消费方的稳定公开导出 SHALL 可用

组件库 package 必须通过显式 package exports 暴露稳定入口，用于导出通用组件、相关类型以及后续新增组件；对于主题系统，monorepo 内部消费者和外部消费方也必须能够通过公共入口获得主题相关导出与稳定 contract，而不是深层引用内部样式实现或手动拼接变量映射。

#### Scenario: 文档站消费组件

- **WHEN** 文档站导入 Button、Input、Table 或 Form
- **THEN** 它必须通过组件库 package 的公开入口完成导入，而不是复制组件代码或继续从旧的根级源码目录直接导入

#### Scenario: 测试工作区消费组件

- **WHEN** 测试工作区执行组件测试
- **THEN** 它必须通过工作区 package 边界或批准的源码别名配置解析组件库

#### Scenario: 消费方通过公共入口获取主题能力

- **WHEN** 消费方需要使用核心组件包的主题能力或主题定制入口
- **THEN** 它必须能够通过组件库 package 的公共导出获取相关能力，而不是依赖内部 token 文件路径或宿主环境私有变量约定
