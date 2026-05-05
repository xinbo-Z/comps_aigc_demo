import React, { type ReactElement, type ReactNode } from 'react'
import { Button as AntButton } from 'antd'
import styles from './Button.module.css'
import type { ButtonProps, ButtonSize, ButtonVariant } from './types'

/**
 * 合并多个类名部分，过滤掉 falsy 值
 */
function getClassName(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/**
 * 渲染装饰性图标
 * - 如果是有效的 React 元素，克隆并添加 aria-hidden 属性
 * - 否则包装在 span 中
 */
function renderDecorativeIcon(icon: ReactNode) {
  if (React.isValidElement(icon)) {
    return React.cloneElement(
      icon as ReactElement<Record<string, unknown>>,
      {
        'aria-hidden': true,
      } as Record<string, unknown>,
    )
  }

  return <span aria-hidden="true">{icon}</span>
}

/**
 * 将自定义 variant 映射为 Ant Design Button 的 props
 */
function mapVariant(variant: ButtonVariant) {
  switch (variant) {
    case 'primary':
      return { type: 'primary' as const }
    case 'secondary':
      return { type: 'default' as const }
    case 'danger':
      return { type: 'primary' as const, danger: true }
    case 'ghost':
      return { type: 'default' as const, ghost: true }
    case 'text':
      return { type: 'text' as const }
    default:
      return { type: 'primary' as const }
  }
}

/**
 * 将自定义 size 映射为 Ant Design Button 的 size
 */
function mapSize(size: ButtonSize) {
  switch (size) {
    case 'sm':
      return 'small'
    case 'lg':
      return 'large'
    case 'md':
    default:
      return 'middle'
  }
}

/**
 * Button 按钮组件
 *
 * 基于 Ant Design Button 封装，支持多种变体和尺寸
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * ```
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  type = 'button',
  className,
  ...restProps
}: ButtonProps) {
  const variantProps = mapVariant(variant)
  const antdSize = mapSize(size)
  const buttonIcon = !loading && icon ? renderDecorativeIcon(icon) : undefined

  return (
    <AntButton
      {...restProps}
      {...variantProps}
      size={antdSize}
      htmlType={type}
      loading={loading}
      disabled={disabled || loading}
      icon={buttonIcon}
      className={getClassName([
        styles.button,
        styles[variant],
        styles[size],
        className,
      ])}
    >
      {children}
    </AntButton>
  )
}
