import React, { type ReactNode } from 'react'
import {
  Button as AntButton,
  Form as AntForm,
  Input as AntInput,
  InputNumber,
  Select,
} from 'antd'
import type { FormItemProps } from 'antd'
import type { NamePath } from 'antd/es/form/interface'
import styles from './Form.module.css'
import type {
  SchemaFormProps,
  FormSchemaConditionContext,
  FormSchemaDefinition,
  FormSchemaDynamicItemProps,
  FormSchemaField,
  FormSchemaFieldComponent,
  FormSchemaInputField,
  FormSchemaListField,
  FormSchemaNumberField,
  FormSchemaSelectField,
  FormSchemaTextareaField,
} from './types'

/**
 * 判断 schema 是否为 FormSchemaDefinition 格式
 */
function isSchemaDefinition(
  schema: NonNullable<SchemaFormProps['schema']>,
): schema is FormSchemaDefinition {
  return !Array.isArray(schema) && 'fields' in schema
}

/**
 * 标准化 schema 为数组格式
 */
function normalizeSchema(
  schema: SchemaFormProps['schema'],
): readonly FormSchemaField[] {
  if (!schema) {
    return []
  }

  return isSchemaDefinition(schema) ? schema.fields : schema
}

/**
 * 获取字段的组件类型
 */
function getFieldComponent(field: FormSchemaField): FormSchemaFieldComponent {
  return field.component ?? field.type ?? 'input'
}

/**
 * 判断字段是否为列表类型
 */
function isListField(field: FormSchemaField): field is FormSchemaListField {
  return getFieldComponent(field) === 'list'
}

/**
 * 获取字段的唯一键
 */
function getFieldKey(field: FormSchemaField) {
  return (
    field.key ??
    String(Array.isArray(field.name) ? field.name.join('.') : field.name)
  )
}

/**
 * 获取列表字段的子字段
 */
function getListItemFields(field: FormSchemaListField) {
  return field.fields ?? field.itemSchema ?? []
}

/**
 * 构建列表项的初始值
 */
function buildListItemInitialValues(
  field: FormSchemaListField,
): Record<string | number, unknown> {
  return getListItemFields(field).reduce<Record<string | number, unknown>>(
    (defaults, itemField) => {
      const itemName = itemField.name

      if (itemField.initialValue === undefined) {
        return defaults
      }

      if (Array.isArray(itemName)) {
        let cursor: Record<string | number, unknown> = defaults

        itemName.forEach((segment, index) => {
          if (index === itemName.length - 1) {
            cursor[segment] = itemField.initialValue
            return
          }

          const currentValue = cursor[segment]
          const nextValue =
            currentValue && typeof currentValue === 'object'
              ? (currentValue as Record<string | number, unknown>)
              : {}

          cursor[segment] = nextValue
          cursor = nextValue
        })

        return defaults
      }

      defaults[itemName] = itemField.initialValue
      return defaults
    },
    {},
  )
}

/**
 * 从 store 中获取指定路径的值
 */
function getValueFromStore(
  values: Record<string, unknown>,
  path: NamePath | string,
) {
  const segments = Array.isArray(path) ? path : [path]

  return segments.reduce<unknown>((result, segment) => {
    if (result && typeof result === 'object' && segment in result) {
      return (result as Record<string | number, unknown>)[segment]
    }

    return undefined
  }, values)
}

/**
 * 构建条件上下文
 */
function buildConditionContext(
  values: Record<string, unknown>,
): FormSchemaConditionContext {
  return {
    values,
    getValue: (name) => getValueFromStore(values, name),
  }
}

/**
 * 获取动态表单项属性
 */
function getDynamicItemProps(
  field: FormSchemaField,
  values: Record<string, unknown>,
): FormSchemaDynamicItemProps {
  if (!field.itemPropsWhen) {
    return {}
  }

  return field.itemPropsWhen(buildConditionContext(values))
}

/**
 * 判断字段是否可见
 */
function isFieldVisible(
  field: FormSchemaField,
  values: Record<string, unknown>,
) {
  const dynamicItemProps = getDynamicItemProps(field, values)

  if (field.hidden || dynamicItemProps.hidden) {
    return false
  }

  if (!field.visibleWhen) {
    return true
  }

  return field.visibleWhen(buildConditionContext(values))
}

/**
 * 构建验证规则
 */
function buildRules(
  field: FormSchemaField,
  dynamicItemProps?: FormSchemaDynamicItemProps,
) {
  const rules = [...(field.rules ?? []), ...(dynamicItemProps?.rules ?? [])]
  const isRequired = dynamicItemProps?.required ?? field.required

  if (isRequired) {
    const hasRequiredRule = rules.some(
      (rule) => 'required' in rule && rule.required,
    )

    if (!hasRequiredRule) {
      rules.unshift({
        required: true,
        message: `${String(field.label ?? getFieldKey(field))} is required`,
      })
    }
  }

  return rules
}

/**
 * 渲染表单控件
 */
function renderControl(field: Exclude<FormSchemaField, FormSchemaListField>) {
  const component = getFieldComponent(field)

  switch (component) {
    case 'textarea': {
      const textareaField = field as FormSchemaTextareaField
      return <AntInput.TextArea {...textareaField.textareaProps} />
    }
    case 'select': {
      const selectField = field as FormSchemaSelectField
      return (
        <Select
          {...selectField.selectProps}
          options={selectField.options.map((option) => ({ ...option }))}
        />
      )
    }
    case 'number': {
      const numberField = field as FormSchemaNumberField
      return (
        <InputNumber {...numberField.numberProps} style={{ width: '100%' }} />
      )
    }
    case 'input':
    default: {
      const inputField = field as FormSchemaInputField
      return <AntInput {...inputField.inputProps} />
    }
  }
}

/**
 * 渲染单个表单字段
 */
function renderField(
  field: FormSchemaField,
  values: Record<string, unknown>,
  parentName?: NamePath,
): ReactNode {
  if (!isFieldVisible(field, values)) {
    return null
  }

  if (isListField(field)) {
    const listField = field
    const listName = parentName
      ? [parentName, listField.name].flat()
      : listField.name
    const listValues = getValueFromStore(values, listName)
    const addDisabled =
      typeof listField.maxItems === 'number' &&
      Array.isArray(listValues) &&
      (listValues.length ?? 0) >= listField.maxItems
    const defaultItem = buildListItemInitialValues(listField)

    return (
      <AntForm.Item
        key={getFieldKey(listField)}
        label={listField.label}
        tooltip={listField.tooltip}
        extra={listField.extra}
      >
        <AntForm.List
          name={listName}
          initialValue={listField.initialValue as [] | undefined}
        >
          {(fields, operations) => (
            <div className={styles.schemaSection}>
              {fields.map((nestedField, index) => {
                const itemValues = (
                  Array.isArray(listValues) ? (listValues[index] ?? {}) : {}
                ) as Record<string, unknown>
                const canRemove = (listField.minItems ?? 0) < fields.length

                return (
                  <div key={nestedField.key} className={styles.listItem}>
                    <div className={styles.listItemHeader}>
                      <span className={styles.listItemTitle}>
                        {listField.renderItemHeader?.(index) ??
                          listField.itemLabel ??
                          `${String(listField.label ?? 'Item')} ${index + 1}`}
                      </span>
                      <AntButton
                        type="link"
                        danger
                        onClick={() => operations.remove(nestedField.name)}
                        disabled={!canRemove}
                      >
                        {listField.removeButtonText ?? 'Remove'}
                      </AntButton>
                    </div>
                    <div className={styles.listItemFields}>
                      {getListItemFields(listField).map((itemField) =>
                        renderField(itemField, itemValues, [nestedField.name]),
                      )}
                    </div>
                  </div>
                )
              })}
              <div className={styles.listActions}>
                <AntButton
                  type="dashed"
                  onClick={() => operations.add(defaultItem)}
                  disabled={Boolean(addDisabled)}
                >
                  {listField.addButtonText ?? 'Add item'}
                </AntButton>
              </div>
            </div>
          )}
        </AntForm.List>
      </AntForm.Item>
    )
  }

  const itemName = parentName ? [parentName, field.name].flat() : field.name
  const dynamicItemProps = getDynamicItemProps(field, values)
  const itemProps: FormItemProps = {
    label: field.label,
    name: itemName,
    tooltip: dynamicItemProps.tooltip ?? field.tooltip,
    extra: dynamicItemProps.extra ?? field.extra,
    help: dynamicItemProps.help ?? field.help,
    preserve: dynamicItemProps.preserve ?? field.preserve,
    hidden: dynamicItemProps.hidden ?? field.hidden,
    required: dynamicItemProps.required ?? field.required,
    hasFeedback: dynamicItemProps.hasFeedback,
    messageVariables: dynamicItemProps.messageVariables,
    validateStatus: dynamicItemProps.validateStatus,
    dependencies: isListField(field)
      ? undefined
      : (dynamicItemProps.dependencies ?? field.dependencies),
    initialValue: field.initialValue,
    rules: buildRules(field, dynamicItemProps),
    ...field.passthroughProps,
  }

  return (
    <AntForm.Item key={getFieldKey(field)} {...itemProps}>
      {renderControl(field)}
    </AntForm.Item>
  )
}

/**
 * Schema 字段渲染组件
 * 负责渲染基于 schema 定义的表单字段
 */
function SchemaFields({ schema }: { schema: readonly FormSchemaField[] }) {
  const values = AntForm.useWatch([], { preserve: true }) as
    | Record<string, unknown>
    | undefined

  return (
    <React.Fragment>
      {schema.map((field) => renderField(field, values ?? {}))}
    </React.Fragment>
  )
}

/**
 * SchemaForm 基于 Schema 的表单组件
 *
 * 支持通过 schema 配置来渲染表单字段，同时也支持自定义渲染
 *
 * @example
 * ```tsx
 * <SchemaForm
 *   schema={[
 *     { name: 'username', type: 'input', label: '用户名', required: true },
 *     { name: 'email', type: 'input', label: '邮箱' },
 *   ]}
 *   onFinish={(values) => console.log(values)}
 * />
 * ```
 */
export function SchemaForm<Values extends object = Record<string, unknown>>({
  children,
  schema,
  schemaOnly = false,
  layout = 'vertical',
  colon = false,
  requiredMark = false,
  ...restProps
}: SchemaFormProps<Values>) {
  const schemaFields = normalizeSchema(schema)

  return (
    <AntForm<Values>
      {...restProps}
      layout={layout}
      colon={colon}
      requiredMark={requiredMark}
    >
      {schemaFields.length ? <SchemaFields schema={schemaFields} /> : null}
      {!schemaOnly ? children : null}
    </AntForm>
  )
}
