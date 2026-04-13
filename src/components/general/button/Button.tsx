import React, { type CSSProperties, type ReactElement, type ReactNode } from 'react'
import styles from './Button.module.css'
import type { ButtonProps } from './types'

function getClassName(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
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
  className,
  ...restProps
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      {...restProps}
      type={type}
      className={getClassName([styles.button, styles[variant], styles[size], className])}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      style={style as CSSProperties | undefined}
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
