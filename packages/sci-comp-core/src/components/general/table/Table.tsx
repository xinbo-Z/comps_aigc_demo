import { Table as AntTable } from 'antd'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type ThHTMLAttributes,
} from 'react'
import type {
  TableColumnGroupType,
  TableColumnType,
  TableColumnsType,
  TableProps,
} from './types'

/** 列标识符类型 */
type ColumnIdentifier = string | number

/** 调整列宽时的状态 */
type ResizeState = {
  columnId: ColumnIdentifier
  startX: number
  startWidth: number
  nextWidth: number
}

/** 可调整列宽的表头单元格属性 */
type HeaderCellResizeProps = {
  children: ReactNode
  onResizeStart?: (event: ReactMouseEvent<HTMLSpanElement>) => void
}

/**
 * 标准化最小宽度
 * 确保最小宽度是一个有效的正数，否则返回默认值 80
 */
function normalizeMinWidth(minWidth?: number) {
  return Number.isFinite(minWidth) && minWidth! > 0 ? minWidth! : 80
}

/**
 * 获取列的唯一标识符
 * 优先使用 key，其次使用 dataIndex
 */
function getColumnIdentifier<RecordType extends object>(
  column: TableColumnType<RecordType> | TableColumnGroupType<RecordType>,
): ColumnIdentifier | null {
  if (
    'key' in column &&
    (typeof column.key === 'string' || typeof column.key === 'number')
  ) {
    return column.key
  }

  if (!('dataIndex' in column)) {
    return null
  }

  const { dataIndex } = column

  if (typeof dataIndex === 'string' || typeof dataIndex === 'number') {
    return dataIndex
  }

  if (Array.isArray(dataIndex) && dataIndex.length === 1) {
    const [firstSegment] = dataIndex

    return typeof firstSegment === 'string' || typeof firstSegment === 'number'
      ? firstSegment
      : null
  }

  return null
}

/**
 * 判断是否为叶子节点列（非分组列）
 */
function isLeafColumn<RecordType extends object>(
  column: TableColumnType<RecordType> | TableColumnGroupType<RecordType>,
): column is TableColumnType<RecordType> {
  return !('children' in column) || !Array.isArray(column.children)
}

/**
 * 可调整列宽的表头单元格组件
 * 在表头单元格右侧添加一个可拖拽的手柄
 */
function ResizableHeaderCell({
  children,
  onResizeStart,
  style,
  ...restProps
}: ThHTMLAttributes<HTMLTableCellElement> & HeaderCellResizeProps) {
  return (
    <th
      {...restProps}
      style={{
        ...style,
        position: style?.position ?? 'relative',
      }}
    >
      {children}
      {onResizeStart ? (
        <span
          aria-hidden="true"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
          onMouseDown={onResizeStart}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: 8,
            cursor: 'col-resize',
            userSelect: 'none',
            touchAction: 'none',
            transform: 'translateX(50%)',
            zIndex: 1,
          }}
        />
      ) : null}
    </th>
  )
}

/**
 * Table 表格组件
 *
 * 基于 Ant Design Table 封装，支持：
 * - 虚拟滚动
 * - 列宽可调整
 * - 自定义列变化回调
 *
 * @example
 * ```tsx
 * <Table
 *   columns={columns}
 *   dataSource={data}
 *   columnResize={{ minWidth: 100 }}
 *   onColumnsChange={(cols) => setColumns(cols)}
 * />
 * ```
 */
export function Table<RecordType extends object = Record<string, unknown>>({
  virtualScroll,
  scroll,
  columnResize,
  onColumnsChange,
  columns,
  ...restProps
}: TableProps<RecordType>) {
  const [resizeState, setResizeState] = useState<ResizeState | null>(null)
  const resizeStateRef = useRef<ResizeState | null>(null)
  const columnsRef = useRef(columns)
  const onColumnsChangeRef = useRef(onColumnsChange)
  const minWidth =
    typeof columnResize === 'object'
      ? normalizeMinWidth(columnResize.minWidth)
      : 80
  const isResizeEnabled = Boolean(columnResize)

  // 同步 resizeState 到 ref
  useEffect(() => {
    resizeStateRef.current = resizeState
  }, [resizeState])

  // 同步 columns 到 ref
  useEffect(() => {
    columnsRef.current = columns
  }, [columns])

  // 同步 onColumnsChange 到 ref
  useEffect(() => {
    onColumnsChangeRef.current = onColumnsChange
  }, [onColumnsChange])

  /**
   * 处理鼠标移动事件（拖拽调整列宽）
   */
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const activeState = resizeStateRef.current

      if (!activeState) {
        return
      }

      const nextWidth = Math.max(
        minWidth,
        activeState.startWidth + (event.clientX - activeState.startX),
      )

      const nextState = {
        ...activeState,
        nextWidth,
      }

      resizeStateRef.current = nextState
      setResizeState(nextState)
    },
    [minWidth],
  )

  /**
   * 处理鼠标释放事件（结束拖拽）
   */
  const handleMouseUp = useCallback(() => {
    const activeState = resizeStateRef.current

    if (!activeState) {
      return
    }

    const nextColumns = columnsRef.current.map((column) => {
      if (!isLeafColumn(column)) {
        return column
      }

      return getColumnIdentifier(column) === activeState.columnId
        ? {
            ...column,
            width: activeState.nextWidth,
          }
        : column
    })

    onColumnsChangeRef.current?.(nextColumns)
    resizeStateRef.current = null
    setResizeState(null)
  }, [])

  // 监听全局鼠标事件
  useEffect(() => {
    if (!resizeStateRef.current) {
      return undefined
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp, resizeState?.columnId])

  /**
   * 处理列配置，添加调整宽度相关属性
   */
  const displayColumns = useMemo<TableColumnsType<RecordType>>(() => {
    return columns.map((column) => {
      if (!isLeafColumn(column)) {
        return column
      }

      const columnId = getColumnIdentifier(column)
      const currentWidth =
        resizeState && columnId === resizeState.columnId
          ? resizeState.nextWidth
          : null
      const canResize = isResizeEnabled && columnId !== null

      if (!canResize) {
        return column
      }

      return {
        ...column,
        width: currentWidth ?? column.width,
        onHeaderCell: (record) => {
          const existingHeaderCellProps = column.onHeaderCell?.(record) ?? {}

          return {
            ...existingHeaderCellProps,
            onResizeStart: (event: ReactMouseEvent<HTMLSpanElement>) => {
              event.preventDefault()
              event.stopPropagation()

              const headerCell = event.currentTarget.closest('th')
              const measuredWidth =
                headerCell?.getBoundingClientRect().width ?? 0
              const initialWidth =
                typeof column.width === 'number' &&
                Number.isFinite(column.width)
                  ? column.width
                  : measuredWidth

              const nextResizeState = {
                columnId,
                startX: event.clientX,
                startWidth: Math.max(minWidth, initialWidth),
                nextWidth: Math.max(minWidth, initialWidth),
              }

              resizeStateRef.current = nextResizeState
              setResizeState(nextResizeState)
            },
          }
        },
      }
    })
  }, [columns, isResizeEnabled, minWidth, resizeState])

  // Preserve caller-provided horizontal scroll defaults while letting virtualScroll
  // opt the table into Ant Design virtualization with a required vertical height.
  const mergedScroll = virtualScroll
    ? {
        ...scroll,
        x: virtualScroll.x ?? scroll?.x,
        y: virtualScroll.y,
      }
    : scroll

  const components = isResizeEnabled
    ? {
        ...restProps.components,
        header: {
          ...restProps.components?.header,
          cell: ResizableHeaderCell,
        },
      }
    : restProps.components

  return (
    <AntTable<RecordType>
      {...restProps}
      columns={displayColumns}
      components={components}
      scroll={mergedScroll}
      virtual={Boolean(virtualScroll)}
    />
  )
}
