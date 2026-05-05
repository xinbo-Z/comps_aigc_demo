import { Table as AntTable } from 'antd'
import {
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

type ColumnIdentifier = string | number

type ResizeState = {
  columnId: ColumnIdentifier
  startX: number
  startWidth: number
  nextWidth: number
}

type HeaderCellResizeProps = {
  children: ReactNode
  onResizeStart?: (event: ReactMouseEvent<HTMLSpanElement>) => void
}

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

function isLeafColumn<RecordType extends object>(
  column: TableColumnType<RecordType> | TableColumnGroupType<RecordType>,
): column is TableColumnType<RecordType> {
  return !('children' in column) || !Array.isArray(column.children)
}

function ResizableHeaderCell({
  children,
  onResizeStart,
  style,
  ...restProps
}: ThHTMLAttributes<HTMLTableCellElement> & HeaderCellResizeProps) {
  return (
    <th {...restProps} style={style}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100%',
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
              right: -4,
              bottom: 0,
              width: 8,
              cursor: 'col-resize',
              userSelect: 'none',
              touchAction: 'none',
              zIndex: 1,
            }}
          />
        ) : null}
      </div>
    </th>
  )
}

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
    typeof columnResize === 'object' ? (columnResize.minWidth ?? 80) : 80
  const isResizeEnabled = Boolean(columnResize)

  useEffect(() => {
    resizeStateRef.current = resizeState
  }, [resizeState])

  useEffect(() => {
    columnsRef.current = columns
  }, [columns])

  useEffect(() => {
    onColumnsChangeRef.current = onColumnsChange
  }, [onColumnsChange])

  useEffect(() => {
    if (!resizeState) {
      return undefined
    }

    const handleMouseMove = (event: MouseEvent) => {
      const activeState = resizeStateRef.current

      if (!activeState) {
        return
      }

      const deltaX = event.clientX - activeState.startX
      const nextWidth = Math.max(minWidth, activeState.startWidth + deltaX)

      setResizeState((currentState) =>
        currentState
          ? {
              ...currentState,
              nextWidth,
            }
          : currentState,
      )
    }

    const handleMouseUp = () => {
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
      setResizeState(null)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [minWidth, resizeState])

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

              setResizeState({
                columnId,
                startX: event.clientX,
                startWidth: Math.max(minWidth, initialWidth),
                nextWidth: Math.max(minWidth, initialWidth),
              })
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
