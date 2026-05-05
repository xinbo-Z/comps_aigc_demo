import { Form as AntForm } from 'antd'
import type { FormProps } from './types'

/**
 * 合并多个类名部分，过滤掉 falsy 值
 */
function getClassName(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/**
 * Form 表单组件
 *
 * 基于 Ant Design Form 封装的基础表单容器组件
 *
 * @example
 * ```tsx
 * <Form layout="vertical" onFinish={handleSubmit}>
 *   <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
 *     <Input />
 *   </Form.Item>
 *   <Button htmlType="submit">提交</Button>
 * </Form>
 * ```
 */
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
