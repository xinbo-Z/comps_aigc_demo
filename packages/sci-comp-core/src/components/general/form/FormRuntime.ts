import { Form as AntForm } from 'antd'
import type { FormComponentType } from './types'
import { Form as FormComponent } from './Form'

/**
 * Form 组件（带静态方法和子组件）
 *
 * 这是一个组合组件，包含了 Form 主组件以及 Ant Design Form 的静态方法和子组件
 *
 * 静态属性：
 * - ErrorList: 错误列表组件
 * - Item: 表单项组件
 * - List: 表单列表组件
 * - Provider: 表单上下文提供者
 * - useForm: 表单 hook
 * - useFormInstance: 表单实例 hook
 * - useWatch: 表单字段监听 hook
 *
 * @example
 * ```tsx
 * const [form] = Form.useForm()
 *
 * <Form form={form}>
 *   <Form.Item name="username">
 *     <Input />
 *   </Form.Item>
 * </Form>
 * ```
 */
export const Form: FormComponentType = Object.assign(FormComponent, {
  ErrorList: AntForm.ErrorList,
  Item: AntForm.Item,
  List: AntForm.List,
  Provider: AntForm.Provider,
  useForm: AntForm.useForm,
  useFormInstance: AntForm.useFormInstance,
  useWatch: AntForm.useWatch,
})
