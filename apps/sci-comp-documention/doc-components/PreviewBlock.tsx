import type { CSSProperties, ReactNode } from 'react'

const surfaces = {
  card: 'var(--rp-c-bg)',
  cardMuted: 'var(--rp-c-bg-soft)',
  cardSubtle: 'var(--rp-c-bg-mute)',
  border: 'var(--rp-c-divider-light)',
  borderStrong: 'var(--rp-c-divider)',
  text: 'var(--rp-c-text-1)',
  textSecondary: 'var(--rp-c-text-2)',
  brandTint:
    'color-mix(in srgb, var(--rp-c-brand-tint) 48%, var(--rp-c-bg) 52%)',
  shadow: 'var(--rp-c-shadow-3)',
} as const

const styles = {
  wrapper: {
    margin: '20px 0',
    padding: '20px',
    borderRadius: '20px',
    border: `1px solid ${surfaces.border}`,
    background: `linear-gradient(180deg, ${surfaces.brandTint} 0%, ${surfaces.card} 100%)`,
    boxShadow: surfaces.shadow,
  },
  header: {
    marginBottom: '14px',
  },
  title: {
    margin: '0 0 6px',
    fontSize: '16px',
    fontWeight: 700,
    color: surfaces.text,
  },
  description: {
    margin: 0,
    fontSize: '14px',
    lineHeight: 1.7,
    color: surfaces.textSecondary,
  },
  body: {
    padding: '18px',
    borderRadius: '16px',
    background: surfaces.cardMuted,
    border: `1px solid ${surfaces.borderStrong}`,
    color: surfaces.text,
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
  },
  content: {
    padding: '16px',
    borderRadius: '14px',
    background: surfaces.cardSubtle,
    border: `1px solid ${surfaces.border}`,
  },
} as const satisfies Record<string, CSSProperties>

interface PreviewBlockProps {
  title?: string
  description?: string
  children: ReactNode
}

export default function PreviewBlock({
  title,
  description,
  children,
}: PreviewBlockProps) {
  return (
    <div style={styles.wrapper}>
      {title || description ? (
        <div style={styles.header}>
          {title ? <h3 style={styles.title}>{title}</h3> : null}
          {description ? <p style={styles.description}>{description}</p> : null}
        </div>
      ) : null}
      <div style={styles.body}>
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  )
}
