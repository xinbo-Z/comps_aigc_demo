import type { ComponentDocPageData } from '../ComponentDoc'
import {
  TableBasicPreview,
  TableColumnResizePreview,
  TableEmptyPreview,
  TablePaginationPreview,
  TableScrollPreview,
  TableVirtualPreview,
} from '../component-doc-previews/tablePreviews'

export const tableDocPage: ComponentDocPageData = {
  title: 'Table',
  description:
    '`Table` 是基于 Ant Design Table 的通用封装组件，用于列表展示、分页、滚动、虚拟滚动和受控列宽拖拽等高频场景，并通过 `virtualScroll` 提供轻量语义映射。',
  definition: [
    '基于 antd Table 做直接封装，保留 columns、dataSource、pagination 与 scroll 等主路径能力。',
    '`virtualScroll` 是对 antd 原生虚拟滚动接入方式的轻量语义映射，帮助收敛高频大列表场景。',
    '`columnResize` 与 `onColumnsChange` 提供受控列宽拖拽能力，便于业务持久化后回写整份 columns。',
  ],
  scenarios: [
    '后台列表页中的基础数据展示场景。',
    '需要分页浏览中等规模数据集的场景。',
    '宽表格或列较多时需要横向滚动保持可读性的场景。',
    '数据量较大时需要通过虚拟滚动控制渲染成本的场景。',
    '业务需要允许用户拖拽列宽并保存个人偏好的场景。',
  ],
  examples: [
    {
      id: 'table-basic',
      title: '基础表格',
      summary:
        '展示最小数据集下的基础列表搭建方式，帮助快速建立 columns 与 dataSource 的主路径用法。',
      relatedProps: ['columns', 'dataSource', 'pagination'],
      preview: <TableBasicPreview />,
      code: `import { Table, type TableColumnsType } from '@sci-comp/core'

interface TableRow {
  key: string
  name: string
  owner: string
  status: string
}

const columns: TableColumnsType<TableRow> = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '负责人', dataIndex: 'owner', key: 'owner' },
  { title: '状态', dataIndex: 'status', key: 'status' },
]

const dataSource: TableRow[] = [
  { key: '1', name: 'Alpha', owner: '张三', status: '运行中' },
  { key: '2', name: 'Beta', owner: '李四', status: '待验证' },
]

export function TableBasicPreview() {
  return (
    <Table
      rowKey="key"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  )
}`,
      sourceDetails: {
        purpose: '帮助读者以最低心智成本完成基础表格搭建。',
        highlights: [
          '`columns` 与 `dataSource` 是 Table 的主路径入口。',
          '`pagination={false}` 适合小型静态列表或页面内局部表格。',
        ],
        boundaries: [
          '排序、筛选和展开行等复杂能力不在第一版主案例重点内。',
          '列编排过重时应先回到业务的最小列表需求，而不是一次展示全部能力。',
        ],
      },
      editorReservation: {
        initialCode: 'TableBasicPreview',
        supportedControls: ['columns', 'dataSource', 'pagination'],
      },
    },
    {
      id: 'table-pagination',
      title: '分页列表',
      summary:
        '展示基础分页配置，帮助说明 Table 在中等数据量场景下的常见浏览方式。',
      relatedProps: ['pagination', 'dataSource'],
      preview: <TablePaginationPreview />,
      code: `import { Table } from '@sci-comp/core'

const dataSource = Array.from({ length: 8 }, (_, index) => ({
  key: String(index + 1),
  name: '组件 ' + (index + 1),
  owner: index % 2 === 0 ? '张三' : '李四',
  status: index % 3 === 0 ? '已发布' : '开发中',
}))

export function TablePaginationPreview() {
  return (
    <Table
      rowKey="key"
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 4, showSizeChanger: false }}
    />
  )
}`,
      sourceDetails: {
        purpose:
          '帮助说明分页依然沿用 antd 原生配置方式，适合最常见的后台列表浏览。',
        highlights: [
          '`pagination` 继续直接使用 antd 的分页配置对象。',
          '适合列表量级中等、无需一次性全部展开的数据集。',
        ],
        boundaries: [
          '更复杂的服务端分页联动仍应由业务层控制查询参数与状态同步。',
          '分页不是所有列表的默认解法，小型数据集可直接关闭。',
        ],
      },
      editorReservation: {
        initialCode: 'TablePaginationPreview',
        supportedControls: ['pagination', 'dataSource'],
      },
    },
    {
      id: 'table-empty',
      title: '空态列表',
      summary:
        '展示无数据时的列表反馈，帮助统一“当前没有可展示结果”的表达方式。',
      relatedProps: ['dataSource', 'locale'],
      preview: <TableEmptyPreview />,
      code: `import { Table } from '@sci-comp/core'

export function TableEmptyPreview() {
  return (
    <Table
      rowKey="key"
      columns={columns}
      dataSource={[]}
      pagination={false}
      locale={{
        emptyText: '当前筛选条件下还没有可展示的列表内容。',
      }}
    />
  )
}`,
      sourceDetails: {
        purpose: '帮助读者在列表结果为空时保持一致的反馈写法。',
        highlights: [
          '空态仍然沿用 antd Table 的 `locale.emptyText` 入口。',
          '可结合项目内 Empty 组件统一视觉与文案表达。',
        ],
        boundaries: [
          '空态文案应与筛选、搜索或权限状态保持一致。',
          '如果页面没有列表语义，不应为了复用空态而强行上表格。',
        ],
      },
      editorReservation: {
        initialCode: 'TableEmptyPreview',
        supportedControls: ['dataSource', 'locale'],
      },
    },
    {
      id: 'table-scroll',
      title: '滚动表格',
      summary:
        '展示列较多时的横向滚动配置，帮助保持宽表格在文档与业务页中的可读性。',
      relatedProps: ['scroll', 'columns'],
      preview: <TableScrollPreview />,
      code: `import { Table } from '@sci-comp/core'

export function TableScrollPreview() {
  return (
    <Table
      rowKey="key"
      columns={longColumns}
      dataSource={pagedData}
      pagination={false}
      scroll={{ x: 720 }}
    />
  )
}`,
      sourceDetails: {
        purpose: '帮助读者在列较多的表格中优先采用滚动，而不是压缩到不可读。',
        highlights: [
          '`scroll.x` 适合维持宽表格的横向浏览能力。',
          '滚动表格依然保持与 antd 原生一致的配置方式。',
        ],
        boundaries: [
          '如果列数持续膨胀，应先回到信息架构层面减列，而不是无限增加滚动。',
          '滚动只解决显示空间问题，不解决字段定义本身是否合理。',
        ],
      },
      editorReservation: {
        initialCode: 'TableScrollPreview',
        supportedControls: ['scroll', 'columns'],
      },
    },
    {
      id: 'table-virtual',
      title: '虚拟滚动',
      summary:
        '展示 `virtualScroll` 的语义化写法，帮助说明大列表场景如何接入 antd 原生虚拟滚动。',
      relatedProps: ['virtualScroll', 'scroll'],
      preview: <TableVirtualPreview />,
      code: `import { Table } from '@sci-comp/core'

export function TableVirtualPreview() {
  return (
    <Table
      rowKey="key"
      columns={columns}
      dataSource={virtualData}
      pagination={false}
      virtualScroll={{ y: 280 }}
    />
  )
}`,
      sourceDetails: {
        purpose: '说明 `virtualScroll` 是高频大列表场景的语义映射入口。',
        highlights: [
          '`virtualScroll.y` 用于指定虚拟滚动所需的垂直高度。',
          '内部仍然复用 antd 原生 virtual 与 scroll 能力。',
        ],
        boundaries: [
          '虚拟滚动不等于性能问题的通用解法。',
          '更复杂的列冻结、服务端懒加载或无限滚动策略应由业务层单独设计。',
        ],
      },
      editorReservation: {
        initialCode: 'TableVirtualPreview',
        supportedControls: ['virtualScroll', 'scroll'],
      },
    },
    {
      id: 'table-column-resize',
      title: '列宽拖拽',
      summary:
        '展示 `columnResize` 与 `onColumnsChange` 的最小受控写法，帮助说明列宽结果应由外部回写与持久化。',
      relatedProps: ['columnResize', 'onColumnsChange', 'scroll'],
      preview: <TableColumnResizePreview />,
      code: `import { useState } from 'react'
import { Table, type TableColumnsType } from '@sci-comp/core'

interface TableRow {
  key: string
  name: string
  owner: string
  status: string
}

const initialColumns: TableColumnsType<TableRow> = [
  { title: '名称', dataIndex: 'name', key: 'name', width: 180 },
  { title: '负责人', dataIndex: 'owner', key: 'owner', width: 140 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 120 },
]

export function TableColumnResizePreview() {
  const [columns, setColumns] = useState(initialColumns)

  return (
    <Table
      rowKey="key"
      columns={columns}
      dataSource={pagedData}
      pagination={false}
      columnResize={{ minWidth: 96 }}
      onColumnsChange={setColumns}
      scroll={{ x: 520 }}
    />
  )
}`,
      sourceDetails: {
        purpose:
          '帮助读者理解列宽拖拽采用受控回写模式，而不是组件内部自动持久化。',
        highlights: [
          '`columnResize` 用于开启列宽拖拽，并可通过 `minWidth` 指定列宽下限。',
          '`onColumnsChange` 会返回整份更新后的 columns，便于外部持久化并回写。',
        ],
        boundaries: [
          '优先使用 `key`，其次支持单字段 `dataIndex` 作为列标识。',
          'grouped columns 不渲染拖拽手柄，拖拽只修改当前列宽。',
        ],
      },
      editorReservation: {
        initialCode: 'TableColumnResizePreview',
        supportedControls: ['columnResize', 'onColumnsChange', 'scroll'],
      },
    },
  ],
  api: [
    {
      name: 'columns',
      description: '表格列定义，是组织标题、字段映射与渲染方式的核心入口。',
      type: 'TableColumnsType<RecordType>',
      defaultValue: '-',
      notes: '沿用 antd Table 原生列定义能力。',
    },
    {
      name: 'dataSource',
      description: '表格数据源。',
      type: 'readonly RecordType[]',
      defaultValue: '[]',
      notes: '与 `columns` 共同构成基础列表主路径。',
    },
    {
      name: 'pagination',
      description: '控制分页配置，支持关闭或传入 antd 分页对象。',
      type: 'false | TablePaginationConfig',
      defaultValue: '-',
      notes: '最常见的中等数据量列表浏览入口。',
    },
    {
      name: 'scroll',
      description: '控制表格滚动行为。',
      type: 'AntTableProps<RecordType>["scroll"]',
      defaultValue: '-',
      notes: '宽表格场景高频使用。',
    },
    {
      name: 'virtualScroll',
      description: '通过语义化配置接入虚拟滚动。',
      type: '{ x?: string | number | true; y: number | string }',
      defaultValue: '-',
      notes: '会映射到 antd 的 virtual 与 scroll 配置。',
    },
    {
      name: 'columnResize',
      description: '开启列宽拖拽，可通过 minWidth 指定列宽下限。',
      type: 'boolean | TableColumnResizeConfig',
      defaultValue: '-',
      notes: '建议与稳定列标识和 `scroll.x` 配合使用。',
    },
    {
      name: 'onColumnsChange',
      description: '拖拽结束后返回整份更新后的 columns，便于外部持久化并回写。',
      type: '(columns: TableColumnsType<RecordType>) => void',
      defaultValue: '-',
      notes: '适合与 React state、localStorage 或服务端用户偏好联动。',
    },
    {
      name: 'rowSelection',
      description: '控制列表选择行为。',
      type: 'TableSelection<RecordType>',
      defaultValue: '-',
      notes: '常见于批量操作场景，但第一版主案例不展开其复杂交互。',
    },
  ],
  selectionTips: [
    '优先用 Table 完成基础列表搭建、分页浏览与宽表格展示。',
    '数据量较大时，可优先考虑 `virtualScroll` 作为轻量语义入口，但它只解决渲染成本，不替代查询、缓存或懒加载策略。',
    '如果业务需要允许用户调节列宽，应采用 `columns` + `onColumnsChange` 的受控回写模式，并在外层负责持久化与恢复。',
    '当列表同时启用 `scroll`、`rowSelection`、`columnResize` 等能力时，应先确认页面的主目标仍是通用数据浏览，而不是已经演化成高阶业务工作台。',
  ],
  wrapperNotes: [
    'Table 仍然基于 antd Table 实现，不引入独立列表 DSL。',
    'API 主表只覆盖帮助理解高频列表搭建路径的关键字段，不等同于 antd Table 的全量参数面。',
    '排序、筛选、展开行等未进入主案例的能力继续遵循 antd 原生能力或透传规则。',
    '复杂查询编排、强业务状态联动、跨区块批处理和重交互工作台能力应由外层业务容器或独立高级组件承担，而不是继续堆进基础 Table 文档主路径。',
  ],
}
