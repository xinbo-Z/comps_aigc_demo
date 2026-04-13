import type {
  TableColumnGroupType as AntTableColumnGroupType,
  TableColumnType as AntTableColumnType,
  TableColumnsType as AntTableColumnsType,
  TablePaginationConfig as AntTablePaginationConfig,
  TableProps as AntTableProps,
} from 'antd'

export interface TableVirtualScrollConfig {
  x?: string | number | true
  y: number | string
}

export type TableColumnType<RecordType extends object = Record<string, unknown>> =
  AntTableColumnType<RecordType>

export type TableColumnGroupType<RecordType extends object = Record<string, unknown>> =
  AntTableColumnGroupType<RecordType>

export type TableColumnsType<RecordType extends object = Record<string, unknown>> =
  AntTableColumnsType<RecordType>

export type TablePaginationConfig = AntTablePaginationConfig

export type TableSelection<RecordType extends object = Record<string, unknown>> =
  NonNullable<AntTableProps<RecordType>['rowSelection']>

export interface TableProps<RecordType extends object = Record<string, unknown>>
  extends Omit<
    AntTableProps<RecordType>,
    'columns' | 'dataSource' | 'pagination' | 'rowSelection' | 'virtual' | 'scroll'
  > {
  columns: TableColumnsType<RecordType>
  dataSource: readonly RecordType[]
  pagination?: false | TablePaginationConfig
  rowSelection?: TableSelection<RecordType>
  virtualScroll?: TableVirtualScrollConfig
  scroll?: AntTableProps<RecordType>['scroll']
}
