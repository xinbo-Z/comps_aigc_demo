# Table 列宽拖拽调整设计文档

> 目标文件：`packages/sci-comp-core/src/components/general/table/Table.tsx`

## 背景

当前 `Table.tsx` 只是对 Ant Design `Table` 做了一层很薄的包装，主要负责把 `virtualScroll` 映射到 `scroll` 和 `virtual`。这使得它保持了很低的侵入性，但也意味着表格列宽完全由调用方手工管理，缺少可拖拽调整列宽的交互能力。

本次增强的目标是：在不破坏现有表格能力的前提下，为表格补充“列宽可拖拽调整”的交互，并且以**受控、可持久化**的方式暴露给外部使用者。也就是说，组件内部只负责拖拽交互与列宽计算，最终列宽状态仍由外部保存并回写。

## 目标

1. 为 `Table.tsx` 增加列宽拖拽调整能力。
2. 默认让所有可识别列都支持拖拽。
3. 拖拽只改变当前列自身宽度，不联动相邻列。
4. 列宽结果通过回调返回**整份更新后的 columns**，便于外部持久化。
5. 不破坏现有分页、排序、筛选、选择列、`scroll`、`virtualScroll` 等能力。

## 非目标

1. 不做整表编辑模式切换。
2. 不做相邻列联动缩放。
3. 不改 Ant Design Table 的底层实现。
4. 不引入与当前表格无关的新模式或新 DSL。
5. 不要求自动持久化到本地存储或后端；这些由外部调用方决定。

## 约束

- 表格列宽能力必须保持可受控。
- 组件内部不应成为列宽的唯一真相源。
- 列宽写回必须依赖稳定列标识，避免更新错列。
- 对于无法稳定识别的列，默认不启用拖拽。
- 现有 `virtualScroll` 语义必须保持不变。

## 推荐方案

推荐采用“**表头拖拽手柄 + 受控 columns 回写**”方案：

- 在每个可识别列的表头右侧注入一个窄拖拽手柄。
- 用户拖拽时，仅计算当前列的新宽度。
- 拖拽结束后，生成一份新的 `columns` 数组，并通过回调返回给外部。
- 外部将这份 `columns` 存入 state、localStorage 或服务端，再重新传回 Table。

这个方案的优点是：

- 接入方式清晰，适合业务持久化。
- 与现有薄包装结构兼容度最高。
- 不需要修改列之间的布局算法，风险较低。

## API 设计

建议在 `TableProps` 中新增以下能力：

```ts
columnResize?: boolean | { minWidth?: number }
onColumnsChange?: (columns: TableColumnsType<RecordType>) => void
```

### `columnResize`

- `false` 或未传：不开启列宽拖拽。
- `true`：开启默认列宽拖拽。
- 对象形式：允许配置最小列宽，例如 `minWidth`。

### `onColumnsChange`

- 拖拽结束后触发。
- 回传整份更新后的 `columns`。
- 外部可直接用于持久化与回写。

## 数据流

1. 外部传入 `columns`。
2. Table 渲染时识别可拖拽列。
3. 对每个可拖拽表头注入 resize handle。
4. 用户拖动时，仅更新当前列的预览宽度。
5. 松开鼠标后，生成新的 `columns`。
6. 调用 `onColumnsChange(nextColumns)`。
7. 外部保存并回传新的 `columns`。

简化图示：

```text
columns (input)
   ↓
Table header + resize handle
   ↓ drag
next columns (output via callback)
   ↓
external persistence/state
   ↓
columns (re-input)
```

## 列识别规则

为了避免宽度写回错列，拖拽能力只对可稳定识别的列开启：

1. 优先使用 `key`
2. 其次使用单一 `dataIndex`
3. 无稳定标识的列默认不启用拖拽

以下列默认不启用拖拽：

- 组合 `dataIndex`
- 没有 `key` 且 `dataIndex` 不稳定的列
- 纯展示占位列

## 宽度规则

- 每列独立调整。
- 不联动相邻列。
- 拖拽结果只修改当前列的 `width`。
- 未显式设置宽度的列，使用最小默认宽度兜底，避免塌陷。
- `minWidth` 默认建议为 `80`。

## 交互细节

- 拖拽手柄放在表头单元格右侧。
- 手柄保持很窄，避免干扰排序、筛选、点击表头等操作。
- 拖动时可显示视觉反馈，但不改变其他列宽。
- 鼠标释放后一次性回传更新后的 `columns`。

## 状态设计

Table 内部只保留拖拽过程中的临时状态：

- 当前拖拽列标识
- 起始鼠标位置
- 起始列宽
- 当前预览宽度

最终列宽不作为 Table 的内部真相源，仍以外部回传的 `columns` 为准。

## 兼容性

### 保留能力

- 分页
- 排序
- 筛选
- rowSelection
- `scroll`
- `virtualScroll`

### 处理原则

- `scroll.x` 存在时，优先保持横向滚动能力。
- `virtualScroll` 继续沿用现有逻辑。
- fixed 列先按普通列处理；若与 antd 表头布局冲突，再单独收口。

## 风险与控制

### 风险 1：表头拖拽与排序/筛选冲突

控制：拖拽手柄只占用表头右侧极窄区域，尽量减少与现有表头操作冲突。

### 风险 2：列标识不稳定导致回写错列

控制：只对 `key` 或稳定单字段 `dataIndex` 的列启用拖拽。

### 风险 3：fixed / virtualScroll 组合行为复杂

控制：先保持最小侵入实现，测试覆盖普通表格、带横向滚动表格、带虚拟滚动表格。

## 验证标准

### 自动化验证

- 拖拽后能回传完整更新后的 `columns`。
- 外部回写后，表格能按新宽度重新渲染。
- 不可识别列不显示拖拽入口。
- 不影响现有表格基础功能。

### 兼容性验证

- 普通表格可拖拽。
- 带 `scroll` 的表格可拖拽。
- 带 `virtualScroll` 的表格可拖拽。
- 排序、筛选、选择列不被破坏。

## 已实现事实

- 已新增 `columnResize?: boolean | TableColumnResizeConfig`
- 已新增 `onColumnsChange?: (columns) => void`
- 已新增 `TableColumnResizeConfig.minWidth`
- 已支持 `key` 与单字段 `dataIndex` 识别
- grouped columns 不渲染拖拽手柄
- 非法 `minWidth` 会回退到默认下限
- 拖拽监听器按单次拖拽会话稳定注册

## 未纳入范围

- fixed 列专项保证
- 自动持久化
- 恢复默认列宽
- 多列联动拖拽
- 列级禁用拖拽 API

## 后续扩展入口

- localStorage / 服务端持久化完整示例
- fixed columns 兼容专题说明
- 恢复默认宽度示例
- 列级拖拽开关的 API 评估

## 最终结论

这次增强最适合采用“**表头拖拽手柄 + 受控 columns 回写**”的方式实现。它能满足“所有列默认可拖拽、只改当前列、可受控/可持久化”的目标，同时保持 `Table.tsx` 作为薄包装的现有定位，不把列宽管理扩散成新的复杂表格系统。
