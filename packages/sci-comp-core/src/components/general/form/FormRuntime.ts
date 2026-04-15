import { Form as AntForm } from 'antd'
import type { FormComponentType } from './types'
import { Form as FormComponent } from './Form'

export const Form: FormComponentType = Object.assign(FormComponent, {
  ErrorList: AntForm.ErrorList,
  Item: AntForm.Item,
  List: AntForm.List,
  Provider: AntForm.Provider,
  useForm: AntForm.useForm,
  useFormInstance: AntForm.useFormInstance,
  useWatch: AntForm.useWatch,
})
