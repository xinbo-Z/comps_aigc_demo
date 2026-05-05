# Table 列宽拖拽文档补全设计文档

## 背景

`Table` 组件的列宽拖拽能力已经在 core 包中落地，并有自动化测试覆盖公共 API 与关键交互，但当前文档层仍停留在基础表格、分页、空态、横向滚动和虚拟滚动示例，尚未把这一新增能力讲清楚。结果是：

- 使用者在组件页无法直接发现 `columnResize` / `onColumnsChange`
- 业务接入者不知道列宽为什么要以受控方式回写、应该如何保存
- 后续维护者虽然能在既有 spec/plan 中找到设计前文档，但缺少与“已实现状态”对齐的记录

这次补全的目标不是扩展 Table 新能力，也不是顺带引入 fixed 列、恢复默认宽度或自动持久化，而是把**已经存在的列宽拖拽能力**在文档体系里完整收口，让组件使用者、业务接入者和后续维护者都能快速获得各自需要的信息。

## 目标

1. 在 Table 组件页补齐列宽拖拽的可见示例、API 和约束说明。
2. 在 guide 体系补一段面向业务接入的“受控持久化”说明。
3. 校准现有设计/计划文档，使其能够反映当前已实现边界。
4. 保持现有文档框架不变，优先复用 `ComponentDocPage`、preview 和 guide 结构。

## 非目标

1. 不新增 Table 运行时能力。
2. 不实现 localStorage / 服务端持久化的内建能力。
3. 不把 fixed 列、恢复默认宽度、多列联动拖拽纳入本轮。
4. 不重构整个 Table 文档页结构为大型专题页。
5. 不新建一套平行的设计文档体系，继续复用已有 spec/plan。

## 目标读者分层

### 1. 组件使用者

他们关心的是：Table 支不支持列宽拖拽、怎么开、有哪些限制。

### 2. 业务接入者

他们关心的是：拖拽结束后怎样保存 `columns`，以及该把持久化放在 state、localStorage 还是服务端。

### 3. 后续维护者

他们关心的是：为什么 API 做成受控模式、当前实现边界在哪里、哪些方向尚未纳入范围。

本次文档方案需要分别为这三类读者提供恰当的入口，而不是试图用单一页面解决所有问题。

## 推荐方案

采用“**组件页 + 使用指南 + 设计记录**”三层文档收口方案。

### 第一层：组件页（面向上手）

在现有 Table 组件文档页中补充列宽拖拽能力展示，重点回答“怎么用”：

- 新增一个主示例：展示 `columnResize` 与受控 `columns` 回写
- 新增一个紧贴示例的约束说明块：说明稳定列标识、grouped columns、单列调整等规则
- 在 API 数据中补 `columnResize`、`onColumnsChange`、`TableColumnResizeConfig.minWidth`

组件页不承担完整业务持久化方案说明，只承担“发现能力 + 快速上手”。

### 第二层：使用指南（面向落地）

在 `guide` 体系新增或扩展一节轻量说明，重点回答“怎么接到业务里”：

- 说明 `columnResize` 开启方式
- 说明 `onColumnsChange` 会回传整份 `columns`
- 给出最小受控示例：`useState(columns)` + `onColumnsChange={setColumns}`
- 解释持久化落点：React state、localStorage、服务端偏好存储
- 补充边界说明：稳定标识、grouped columns、只改单列、与 `scroll` / `virtualScroll` 的协同建议

指南页强调数据流和落地方式，但不深入实现细节。

### 第三层：设计记录（面向维护）

沿用已有文档：

- `docs/superpowers/specs/2026-05-05-table-column-resize-design.md`
- `docs/superpowers/plans/2026-05-05-table-column-resize-implementation-plan.md`

做“实现后校准”，而不是新增平行文档：

- 补已落地 API
- 补已验证边界（grouped columns、dataIndex fallback、非法 `minWidth` 归一化、拖拽监听器稳定注册）
- 补未纳入范围
- 补后续扩展入口

## 文件落点建议

### 组件页层

优先复用：

- `apps/sci-comp-documention/docs/components/table.mdx`
- `apps/sci-comp-documention/doc-components/component-doc-previews/tablePreviews.tsx`
- `apps/sci-comp-documention/doc-components/componentDocData` 中 Table 对应的数据定义文件

建议新增：

- 一个“列宽拖拽” preview
- 一段约束说明文案
- 一组 API 描述更新

保持 `table.mdx` 继续只挂载 `ComponentDocPage`，不直接在页面层拼装专题内容。

### 使用指南层

建议放在：

- `apps/sci-comp-documention/docs/guide/` 下的 Table 相关 guide
- 如果现有没有合适承载文件，则新增一篇轻量 guide，而不是把这部分塞回组件页

标题可以采用以下之一：

- `Table：列宽拖拽的受控用法`
- `Table 列宽拖拽与持久化`

### 设计记录层

直接更新现有：

- `docs/superpowers/specs/2026-05-05-table-column-resize-design.md`
- 必要时同步 `docs/superpowers/plans/2026-05-05-table-column-resize-implementation-plan.md`

## 组件页详细设计

### 示例设计

主示例应满足以下条件：

- 一眼可看出列宽可拖拽
- 能体现受控回写而不是仅演示视觉变化
- 不引入业务无关复杂度

推荐最小结构：

- 两到三列稳定标识列（`key` 或单字段 `dataIndex`）
- 初始列宽显式可见
- 拖拽后示例内部用 state 回写 `columns`

### 说明块设计

示例旁边应明确写出：

- 优先使用 `key` 识别列
- 其次支持单字段 `dataIndex`
- grouped columns 不渲染拖拽手柄
- 拖拽只修改当前列宽
- `minWidth` 用于保护最小列宽，不是完整布局系统

这段说明应放在示例附近，而不是只放在 API 表，避免用户只看示例误解能力边界。

### API 文案设计

面向使用者的描述建议是：

- `columnResize`：开启列宽拖拽；可传 `true` 或 `{ minWidth }`
- `onColumnsChange`：拖拽结束后返回整份更新后的 `columns`，便于外部持久化和回写
- `minWidth`：列宽下限，非法值回退为默认最小宽度

文案要强调“整份 columns 回写”和“受控持久化”，这是这次能力的核心。

## 使用指南详细设计

指南页内容建议按以下顺序组织：

### 1. 能力概述

用短文说明：

- Table 内部只负责拖拽交互与宽度计算
- 宽度结果通过 `onColumnsChange` 向外回传
- 最终列宽由外部保存并重新传回

### 2. 最小受控示例

示例只展示最小数据流：

- `useState(columns)`
- `columnResize`
- `onColumnsChange={setColumns}`

不混入额外业务逻辑。

### 3. 持久化落点说明

清晰列出三类场景：

- 页面内临时状态：React state
- 单端恢复：localStorage
- 多端一致：服务端用户偏好

重点说明：组件已经把完整的 `nextColumns` 提供给业务，业务只需保存并回传，不需要再从事件里自行拼装列宽差异。

### 4. 约束与边界

补充更完整的使用提醒：

- 需要稳定列标识
- grouped columns 不参与拖拽
- 拖拽不联动相邻列
- 宽表仍建议搭配 `scroll.x`
- `virtualScroll` 可共存，但它解决的是纵向虚拟滚动，不替代横向布局策略

## 设计记录收口策略

### 已实现事实

设计记录中应补明确认：

- 已新增 `columnResize?: boolean | TableColumnResizeConfig`
- 已新增 `onColumnsChange?: (columns) => void`
- 已新增 `TableColumnResizeConfig.minWidth`
- 已支持 `key` 与单字段 `dataIndex` 识别
- 已有 grouped columns 不渲染拖拽手柄的测试
- 已有非法 `minWidth` 归一化和拖拽监听器稳定注册的回归测试

### 未纳入范围

记录中应明确仍未纳入：

- fixed 列专项保证
- 自动持久化
- 恢复默认列宽
- 多列联动拖拽
- 列级禁用拖拽 API

### 后续扩展入口

只列方向，不承诺本轮实现：

- localStorage / 服务端持久化完整示例
- fixed columns 兼容专题说明
- 恢复默认宽度示例
- 列级拖拽开关的 API 评估

## 风险与控制

### 风险 1：组件页过重

控制：组件页只保留一个主示例和紧贴说明块，把持久化细节放到 guide。

### 风险 2：指南与组件页内容重复

控制：组件页讲“怎么用”，guide 讲“怎么接到业务”；同一段文案不重复复制。

### 风险 3：设计记录与当前实现脱节

控制：不新建平行设计文档，只更新现有 spec/plan 的已实现边界。

## 验证标准

### 文档内容验证

- Table 组件页能直接发现列宽拖拽能力
- API 表中能查到 `columnResize`、`onColumnsChange`、`minWidth`
- guide 中有最小受控持久化示例
- 设计记录能解释当前边界与后续扩展方向

### 结构验证

- 不破坏现有 `ComponentDocPage` 组织方式
- 不把业务持久化说明硬塞进组件页
- 不引入新的平行文档体系

## 最终结论

这次最合适的方式不是仅在 Table 页增加一个 demo，也不是把所有说明都堆进组件页，而是采用“**组件页 + 使用指南 + 设计记录**”三层方案：

- 组件页负责发现能力和快速上手
- 指南页负责业务接入和受控持久化
- 设计记录负责解释设计意图、已实现边界和未来扩展入口

这样既能把现有能力讲清楚，又不会把单一页面做得过重，同时与仓库现有的组件文档、guide 和 superpowers spec/plan 结构保持一致。
