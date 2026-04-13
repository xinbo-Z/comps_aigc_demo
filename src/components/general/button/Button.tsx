import React, { type CSSProperties, type ReactElement, type ReactNode } from 'react'
import { defaultThemeTokens } from '../../../styles/tokens'
import styles from './Button.module.css'
import type { ButtonProps } from './types'

function getClassName(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

type ButtonStyle = CSSProperties & {
  '--button-danger-bg'?: string
  '--button-danger-border'?: string
  '--button-danger-text'?: string
}

function renderDecorativeIcon(icon: ReactNode) {
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon as ReactElement<Record<string, unknown>>, {
      'aria-hidden': true,
      focusable: false,
    })
  }

  return <span aria-hidden="true">{icon}</span>
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  type = 'button',
  style,
  ...restProps
}: ButtonProps) {
  const isDisabled = disabled || loading

  const dangerStyle: ButtonStyle | undefined =
    variant === 'danger'
      ? {
          '--button-danger-bg': defaultThemeTokens.colorDanger,
          '--button-danger-border': defaultThemeTokens.colorDanger,
          '--button-danger-text': defaultThemeTokens.colorBgContainer,
        }
      : undefined

  const mergedStyle: ButtonStyle = {
    ...dangerStyle,
    ...(style as ButtonStyle | undefined),
  }

  return (
    <button
      {...restProps}
      type={type}
      className={getClassName([styles.button, styles[variant], styles[size]])}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      style={mergedStyle}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className={styles.loadingIndicator}
          data-testid="button-loading-indicator"
        />
      ) : null}
      {!loading && icon ? renderDecorativeIcon(icon) : null}
      <span className={styles.content}>{children}</span>
    </button>
  )
}
