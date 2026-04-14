import type { ReactNode } from 'react'
import { createThemeTokens } from '@sci-comp/core'

const tokens = createThemeTokens()

const styles = {
  wrapper: {
    margin: '20px 0',
    padding: '20px',
    borderRadius: '20px',
    border: `1px solid ${tokens.colorPrimary}22`,
    background: `linear-gradient(180deg, ${tokens.colorPrimary}08 0%, ${tokens.colorBgContainer} 100%)`,
    boxShadow: `0 12px 32px ${tokens.colorPrimary}12`,
  },
  header: {
    marginBottom: '14px',
  },
  title: {
    margin: '0 0 6px',
    fontSize: '16px',
    fontWeight: 700,
    color: tokens.colorText,
  },
  description: {
    margin: 0,
    fontSize: '14px',
    lineHeight: 1.7,
    color: `${tokens.colorText}B8`,
  },
  body: {
    padding: '18px',
    borderRadius: '16px',
    background: tokens.colorBgContainer,
    border: `1px dashed ${tokens.colorPrimary}26`,
  },
} as const

interface PreviewBlockProps {
  title?: string
  description?: string
  children: ReactNode
}

export default function PreviewBlock({ title, description, children }: PreviewBlockProps) {
  return (
    <div style={styles.wrapper}>
      {title || description ? (
        <div style={styles.header}>
          {title ? <h3 style={styles.title}>{title}</h3> : null}
          {description ? <p style={styles.description}>{description}</p> : null}
        </div>
      ) : null}
      <div style={styles.body}>{children}</div>
    </div>
  )
}
