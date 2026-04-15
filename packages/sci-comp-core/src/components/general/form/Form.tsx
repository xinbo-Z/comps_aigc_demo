import { Form as AntForm } from 'antd'
import type { FormProps } from './types'

function getClassName(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function Form<Values extends object = Record<string, unknown>>({
  children,
  layout = 'vertical',
  colon = false,
  requiredMark = false,
  ...restProps
}: FormProps<Values>) {
  return (
    <AntForm<Values>
      {...restProps}
      layout={layout}
      colon={colon}
      requiredMark={requiredMark}
      className={getClassName([restProps.className])}
    >
      {children}
    </AntForm>
  )
}
