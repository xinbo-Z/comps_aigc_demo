import React, { type ReactElement, type ReactNode } from 'react'
import { Button as AntButton } from 'antd'
import styles from './Button.module.css'
import type { ButtonProps, ButtonSize, ButtonVariant } from './types'

function getClassName(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function renderDecorativeIcon(icon: ReactNode) {
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon as ReactElement<Record<string, unknown>>, {
      'aria-hidden': true,
    })
  }

  return <span aria-hidden="true">{icon}</span>
}

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
      className={getClassName([styles.button, styles[variant], styles[size], className])}
    >
      {children}
    </AntButton>
  )
}
