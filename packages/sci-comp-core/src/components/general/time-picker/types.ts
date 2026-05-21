import type {
  TimePickerProps as AntTimePickerProps,
  TimeRangePickerProps as AntTimeRangePickerProps,
} from 'antd/es/time-picker'

export interface TimePickerProps extends AntTimePickerProps {
  mock?: string
}

export interface TimeRangePickerProps extends AntTimeRangePickerProps {
  mock?: string
}
