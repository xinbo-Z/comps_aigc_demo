# Table 列宽拖拽调整 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 `packages/sci-comp-core/src/components/general/table/Table.tsx` 增加可受控、可持久化的列宽拖拽能力，默认所有可识别列都可拖拽，拖拽后回传整份更新后的 `columns`。

**Architecture:** 保持 `Table.tsx` 作为 Ant Design Table 的薄包装，只在表头渲染层增加列宽拖拽手柄和临时拖拽状态。列宽的最终真相由外部持有：组件只负责识别可拖拽列、计算新宽度、生成更新后的完整 `columns` 并通过回调回传，同时保持 `scroll`、`virtualScroll`、排序、筛选和 rowSelection 行为不变。

**Tech Stack:** React 19、TypeScript 5.x、Ant Design 6、Vitest、React Testing Library、`@sci-comp/core`

---

## File Structure

- **Modify:** `packages/sci-comp-core/src/components/general/table/types.ts`
  - 增加列宽拖拽相关 props 类型。
  - 仅补充 Table 的公共 API，不改变现有 TableColumnsType / TableSelection / virtualScroll 语义。

- **Modify:** `packages/sci-comp-core/src/components/general/table/Table.tsx`
  - 识别可拖拽列。
  - 注入表头 resize handle。
  - 管理拖拽过程中的临时状态。
  - 生成并回传整份更新后的 `columns`。

- **Modify:** `apps/sci-comp-test/src/components/general/table/Table.test.tsx`
  - 增加列宽拖拽行为测试。
  - 覆盖受控回写、不可识别列、与 existing scroll/virtualScroll/排序/筛选 共存。

## Task 1: 扩展 Table 公共类型，定义可受控列宽 API

**Files:**

- Modify: `packages/sci-comp-core/src/components/general/table/types.ts`

- [ ] **Step 1: 写出失败测试前先确认 API 目标**

在类型层面确认新增 API 形状，目标是让调用方能够开启列宽拖拽并接收完整 `columns` 回调：

```ts
export interface TableColumnResizeConfig {
  minWidth?: number
}

export interface TableProps<
  RecordType extends object = Record<string, unknown>,
> extends Omit<
  AntTableProps<RecordType>,
  | 'columns'
  | 'dataSource'
  | 'pagination'
  | 'rowSelection'
  | 'virtual'
  | 'scroll'
> {
  columns: TableColumnsType<RecordType>
  dataSource: readonly RecordType[]
  pagination?: false | TablePaginationConfig
  rowSelection?: TableSelection<RecordType>
  virtualScroll?: TableVirtualScrollConfig
  scroll?: AntTableProps<RecordType>['scroll']
  columnResize?: boolean | TableColumnResizeConfig
  onColumnsChange?: (columns: TableColumnsType<RecordType>) => void
}
```

- [ ] **Step 2: 运行 typecheck，确认当前类型尚未支持新 API**

Run:

```bash
pnpm --filter sci-comp-core typecheck
```

Expected: 先保持当前行为，后续实现后再回到这里验证新增 API 通过。

- [ ] **Step 3: 写入最小类型实现**

在 `types.ts` 中补充 `TableColumnResizeConfig`，并扩展 `TableProps`：

```ts
export interface TableColumnResizeConfig {
  minWidth?: number
}

export interface TableProps<
  RecordType extends object = Record<string, unknown>,
> extends Omit<
  AntTableProps<RecordType>,
  | 'columns'
  | 'dataSource'
  | 'pagination'
  | 'rowSelection'
  | 'virtual'
  | 'scroll'
> {
  columns: TableColumnsType<RecordType>
  dataSource: readonly RecordType[]
  pagination?: false | TablePaginationConfig
  rowSelection?: TableSelection<RecordType>
  virtualScroll?: TableVirtualScrollConfig
  scroll?: AntTableProps<RecordType>['scroll']
  columnResize?: boolean | TableColumnResizeConfig
  onColumnsChange?: (columns: TableColumnsType<RecordType>) => void
}
```

- [ ] **Step 4: 重新运行 typecheck，确认 API 可编译**

Run:

```bash
pnpm --filter sci-comp-core typecheck
```

Expected: PASS。

- [ ] **Step 5: Commit**

```bash
git add packages/sci-comp-core/src/components/general/table/types.ts
git commit -m "feat: add table column resize types"
```

## Task 2: 在 Table.tsx 中实现受控列宽拖拽与完整 columns 回传

**Files:**

- Modify: `packages/sci-comp-core/src/components/general/table/Table.tsx`

- [ ] **Step 1: 写失败测试前先明确实现边界**

Table 只做以下事情：

- 默认所有可识别列可拖拽
- 只改当前列宽
- 拖拽结束后回传整份更新后的 `columns`
- 不联动相邻列
- 不改分页、排序、筛选、rowSelection、scroll、virtualScroll

建议的核心实现骨架：

```tsx
export function Table<RecordType extends object = Record<string, unknown>>({
  virtualScroll,
  scroll,
  columnResize,
  onColumnsChange,
  columns,
  ...restProps
}: TableProps<RecordType>) {
  const mergedScroll = virtualScroll
    ? {
        ...scroll,
        x: virtualScroll.x ?? scroll?.x,
        y: virtualScroll.y,
      }
    : scroll

  return (
    <AntTable<RecordType>
      {...restProps}
      columns={columns}
      scroll={mergedScroll}
      virtual={Boolean(virtualScroll)}
    />
  )
}
```

这一步先不写拖拽逻辑，只确保现有 wrapper 入口不被改坏。

- [ ] **Step 2: 运行 Table 现有测试，确认基线稳定**

Run:

```bash
pnpm --filter sci-comp-test test -- Table.test.tsx
```

Expected: PASS，证明现有 Table 行为没有被回归。

- [ ] **Step 3: 实现列宽识别、拖拽状态、handle 注入和回调回写**

在 `Table.tsx` 中加入以下能力：

- 识别列是否可拖拽：优先 `key`，其次单一 `dataIndex`
- 对可拖拽列的 header 注入 resize handle
- 维护拖拽临时状态（起始鼠标位置、起始宽度、当前预览宽度、当前列标识）
- 拖拽松开时生成新的 `columns` 数组，仅替换当前列的 `width`
- 调用 `onColumnsChange(nextColumns)`

实现时保持外部 columns 为最终真相源：

```tsx
const nextColumns = columns.map((column) =>
  isTargetColumn(column) ? { ...column, width: nextWidth } : column,
)

onColumnsChange?.(nextColumns)
```

- [ ] **Step 4: 运行 Table 单测和相关 typecheck，修正实现问题**

Run:

```bash
pnpm --filter sci-comp-test test -- Table.test.tsx
pnpm --filter sci-comp-core typecheck
```

Expected: PASS。

- [ ] **Step 5: Commit**

```bash
git add packages/sci-comp-core/src/components/general/table/Table.tsx
git commit -m "feat: add table column resize interaction"
```

## Task 3: 补充 Table 列宽拖拽回归测试

**Files:**

- Modify: `apps/sci-comp-test/src/components/general/table/Table.test.tsx`

- [ ] **Step 1: 写一个会失败的列宽拖拽测试**

新增一个最小受控用例，验证拖拽后能回传整份更新后的 `columns`：

```tsx
import { render, screen, waitFor, within } from '../../../support/render'
import userEvent from '@testing-library/user-event'
import { Table, type TableColumnsType } from '@sci-comp/core'

it('returns updated columns when a header resize handle is dragged', async () => {
  const user = userEvent.setup()
  const onColumnsChange = vi.fn()
  const columns: TableColumnsType<TestRow> = [
    { key: 'name', title: 'Name', dataIndex: 'name', width: 160 },
    { key: 'status', title: 'Status', dataIndex: 'status', width: 120 },
  ]

  render(
    <Table<TestRow>
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      columnResize
      onColumnsChange={onColumnsChange}
    />,
  )

  // drag resize handle on Name header
  // assert onColumnsChange called with new columns array
})
```

- [ ] **Step 2: 运行该测试，确认初始状态下会失败或尚未满足预期**

Run:

```bash
pnpm --filter sci-comp-test test -- Table.test.tsx
```

Expected: 新增测试先失败，说明拖拽能力还未被验证覆盖。

- [ ] **Step 3: 补充通过用例，覆盖可识别列、不可识别列与受控回写**

再补 2 个断言场景：

```tsx
it('does not enable resize for columns without stable identifiers', () => {
  // columns without key and unstable dataIndex should not render handle
})

it('keeps sorting filtering and virtualScroll working with column resize enabled', async () => {
  // reuse current sort/filter/virtualScroll assertions with columnResize enabled
})
```

- [ ] **Step 4: 重新运行 Table 全量测试**

Run:

```bash
pnpm --filter sci-comp-test test -- Table.test.tsx
```

Expected: PASS。

- [ ] **Step 5: Commit**

```bash
git add apps/sci-comp-test/src/components/general/table/Table.test.tsx
git commit -m "test: cover table column resize behavior"
```

## Task 4: 最终收口与跨包验证

**Files:**

- Verify: `packages/sci-comp-core/src/components/general/table/Table.tsx`
- Verify: `packages/sci-comp-core/src/components/general/table/types.ts`
- Verify: `apps/sci-comp-test/src/components/general/table/Table.test.tsx`

- [ ] **Step 1: 运行 table 相关测试套件**

Run:

```bash
pnpm --filter sci-comp-test test -- Table.test.tsx
```

Expected: PASS。

- [ ] **Step 2: 运行 core 包 typecheck**

Run:

```bash
pnpm --filter sci-comp-core typecheck
```

Expected: PASS。

- [ ] **Step 3: 运行 core 包 build（如果实现引入了运行时/导出变化）**

Run:

```bash
pnpm --filter sci-comp-core build
```

Expected: PASS，确认列宽拖拽能力没有破坏包输出。

- [ ] **Step 4: 人工验收关键路径**

在至少一个普通表格、一个带排序/筛选表格、一个带 `virtualScroll` 的表格中确认：

```text
- 所有可识别列都出现拖拽入口
- 拖动只改变当前列宽
- 松开后回调返回完整 columns
- 外部回写后宽度生效
- 排序、筛选、rowSelection、scroll、virtualScroll 仍可用
```

- [ ] **Step 5: 最终 commit**

```bash
git add packages/sci-comp-core/src/components/general/table/Table.tsx packages/sci-comp-core/src/components/general/table/types.ts apps/sci-comp-test/src/components/general/table/Table.test.tsx
git commit -m "feat: support resizable table columns"
```

## Spec Coverage Check

- **可受控/可持久化** → Task 1 + Task 2 中的 `onColumnsChange(nextColumns)`。
- **默认所有可识别列可拖拽** → Task 2 的列识别规则与 handle 注入。
- **回调返回整份更新后的 columns** → Task 2 的回写逻辑与 Task 3 的测试。
- **只改变当前列宽** → Task 2 的单列更新逻辑与 Task 3 的断言。
- **保持 scroll / virtualScroll / 排序 / 筛选 / rowSelection 兼容** → Task 2 的实现约束与 Task 4 的验证。
- **仅围绕 Table 组件及必要测试/类型文件** → File Structure 已限制在 Table.tsx、types.ts、Table.test.tsx。

No spec gaps found.
