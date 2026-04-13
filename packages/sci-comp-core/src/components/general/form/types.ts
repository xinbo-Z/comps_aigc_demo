import type {
  FormItemProps,
  FormListFieldData,
  FormListOperation,
  FormProps as AntFormProps,
  FormRule,
  InputNumberProps,
  InputProps as AntInputProps,
} from 'antd'
import type { NamePath } from 'antd/es/form/interface'
import type { ReactNode, TextareaHTMLAttributes } from 'react'

export type FormSchemaFieldComponent = 'input' | 'textarea' | 'select' | 'number' | 'list'
export type FormSchemaFieldType = FormSchemaFieldComponent

export interface FormSchemaOption {
  label: ReactNode
  value: string | number
  disabled?: boolean
}

export interface FormSchemaConditionContext {
  values: Record<string, unknown>
  getValue: (name: NamePath | string) => unknown
}

export type FormSchemaDynamicItemProps = Partial<
  Pick<
    FormItemProps,
    | 'dependencies'
    | 'extra'
    | 'hasFeedback'
    | 'help'
    | 'hidden'
    | 'messageVariables'
    | 'preserve'
    | 'required'
    | 'rules'
    | 'tooltip'
    | 'validateStatus'
  >
>

export interface FormSchemaBaseField {
  key?: string
  name: NamePath
  type?: FormSchemaFieldType
  component?: FormSchemaFieldComponent
  label?: ReactNode
  tooltip?: FormItemProps['tooltip']
  extra?: ReactNode
  help?: ReactNode
  required?: boolean
  rules?: FormRule[]
  initialValue?: unknown
  hidden?: boolean
  preserve?: boolean
  dependencies?: NamePath[]
  visibleWhen?: (context: FormSchemaConditionContext) => boolean
  itemPropsWhen?: (context: FormSchemaConditionContext) => FormSchemaDynamicItemProps
  passthroughProps?: Omit<FormItemProps, 'children' | 'label' | 'name' | 'required' | 'rules' | 'tooltip' | 'extra' | 'help' | 'hidden' | 'dependencies' | 'initialValue'>
}

export interface FormSchemaInputField extends FormSchemaBaseField {
  type?: 'input'
  component?: 'input'
  inputProps?: Omit<AntInputProps, 'children'>
}

export interface FormSchemaTextareaField extends FormSchemaBaseField {
  type?: 'textarea'
  component?: 'textarea'
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>
}

export interface FormSchemaSelectField extends FormSchemaBaseField {
  type?: 'select'
  component?: 'select'
  options: readonly FormSchemaOption[]
  selectProps?: {
    placeholder?: string
    allowClear?: boolean
    disabled?: boolean
    mode?: 'multiple' | 'tags'
    showSearch?: boolean
  }
}

export interface FormSchemaNumberField extends FormSchemaBaseField {
  type?: 'number'
  component?: 'number'
  numberProps?: Pick<
    InputNumberProps,
    'min' | 'max' | 'step' | 'precision' | 'placeholder' | 'disabled'
  >
}

export interface FormSchemaListRenderContext {
  fields: FormListFieldData[]
  operations: FormListOperation
}

export interface FormSchemaListField extends Omit<FormSchemaBaseField, 'dependencies'> {
  type?: 'list'
  component?: 'list'
  itemLabel?: ReactNode
  addButtonText?: ReactNode
  removeButtonText?: ReactNode
  minItems?: number
  maxItems?: number
  itemSchema?: readonly Exclude<FormSchemaField, FormSchemaListField>[]
  fields?: readonly Exclude<FormSchemaField, FormSchemaListField>[]
  renderItemHeader?: (index: number) => ReactNode
}

export type FormSchemaField =
  | FormSchemaInputField
  | FormSchemaTextareaField
  | FormSchemaSelectField
  | FormSchemaNumberField
  | FormSchemaListField

export interface FormSchemaDefinition {
  fields: readonly FormSchemaField[]
}

export interface FormProps<Values extends object = Record<string, unknown>>
  extends Omit<AntFormProps<Values>, 'children'> {
  children?: ReactNode
  schema?: readonly FormSchemaField[] | FormSchemaDefinition
  schemaOnly?: boolean
}
