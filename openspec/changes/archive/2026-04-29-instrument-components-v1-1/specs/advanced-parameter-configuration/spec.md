## ADDED Requirements

### Requirement: 高级参数表单 SHALL 扩展基础表单行为

`ParamConfigForm` 应在保持参数定义和值均为强类型的前提下，扩展组件库 `Form` 的能力，以支持专业级参数配置行为。

#### Scenario: 页面使用高级参数配置

- **WHEN** 消费页面在专业配置工作流中渲染 `ParamConfigForm`
- **THEN** 该组件必须在基础表单模型之上提供面向表单的参数编辑行为

### Requirement: 高级参数表单 SHALL 支持分组展示

`ParamConfigForm` 应通过可折叠面板或等效的分组结构支持参数分组展示。

#### Scenario: 参数被组织成分组

- **WHEN** 消费页面提供分组参数定义
- **THEN** `ParamConfigForm` 必须在可折叠或等效结构化的分组区域中渲染这些参数

### Requirement: 高级参数表单 SHALL 支持参数联动与约束

`ParamConfigForm` 应支持参数联动和校验约束，包括某个参数的允许值依赖另一个参数的情况。

#### Scenario: 参数约束依赖另一个值

- **WHEN** 某个参数的有效范围或允许值依赖另一个参数，例如最小值和最大值边界
- **THEN** 表单必须在编辑和校验期间强制执行并清晰展示该约束

### Requirement: 高级参数表单 SHALL 支持结构化导入与导出

`ParamConfigForm` 应支持 JSON 和 YAML 格式的配置导入与导出。

#### Scenario: 用户导出参数配置

- **WHEN** 用户导出当前参数配置
- **THEN** 组件必须根据所选格式提供 JSON 或 YAML 的结构化输出

#### Scenario: 用户导入参数配置

- **WHEN** 用户导入受支持的 JSON 或 YAML 配置载荷
- **THEN** 当载荷有效时，组件必须将导入配置应用到参数表单状态中

### Requirement: 高级参数表单 SHALL 支持可复用模板

`ParamConfigForm` 应支持参数模板，用于初始化或替换当前配置状态。

#### Scenario: 用户应用参数模板

- **WHEN** 用户选择一个可用的参数模板
- **THEN** 表单必须更新其参数状态，以反映模板定义的配置
