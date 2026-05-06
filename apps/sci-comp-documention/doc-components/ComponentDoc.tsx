import { useMemo, useState, type CSSProperties } from 'react'
import { Button } from '@sci-comp/core'
import type { ReactNode } from 'react'

const surfaces = {
  page: 'var(--rp-c-bg-soft)',
  card: 'var(--rp-c-bg)',
  cardMuted: 'var(--rp-c-bg-soft)',
  cardSubtle: 'var(--rp-c-bg-mute)',
  border: 'var(--rp-c-divider-light)',
  borderStrong: 'var(--rp-c-divider)',
  text: 'var(--rp-c-text-1)',
  textSecondary: 'var(--rp-c-text-2)',
  brand: 'var(--rp-c-brand)',
  brandTint:
    'color-mix(in srgb, var(--rp-c-brand-tint) 48%, var(--rp-c-bg) 52%)',
  codeText: 'var(--rp-c-text-code)',
  codeBackground: 'var(--rp-c-bg-alt)',
  shadow: 'var(--rp-c-shadow-3)',
} as const

const componentDocSectionIds = {
  definition: 'definition',
  scenarios: 'scenarios',
  examples: 'examples',
  api: 'api',
  selectionTips: 'selection-tips',
  wrapperNotes: 'wrapper-notes',
} as const

export interface ExampleSourceDetails {
  purpose: string
  highlights: string[]
  boundaries: string[]
}

export interface ExampleEditorReservation {
  initialCode: string
  supportedControls: string[]
}

export interface ComponentDocExample {
  id: string
  title: string
  summary: string
  relatedProps: string[]
  preview: ReactNode
  code: string
  sourceDetails: ExampleSourceDetails
  editorReservation?: ExampleEditorReservation
}

export interface ComponentDocApiItem {
  name: string
  description: string
  type: string
  defaultValue: string
  notes?: string
}

export interface ComponentDocPageData {
  title: string
  description: string
  definition: string[]
  scenarios: string[]
  examples: ComponentDocExample[]
  api: ComponentDocApiItem[]
  wrapperNotes: string[]
  selectionTips?: string[]
}

const styles = {
  page: {
    display: 'grid',
    gap: '28px',
    marginTop: '24px',
    padding: '24px',
    borderRadius: '28px',
    background: surfaces.page,
  },
  section: {
    display: 'grid',
    gap: '14px',
    scrollMarginTop: '24px',
  },
  card: {
    padding: '24px',
    borderRadius: '24px',
    border: `1px solid ${surfaces.border}`,
    background: surfaces.card,
    boxShadow: surfaces.shadow,
  },
  proseList: {
    margin: 0,
    paddingLeft: '20px',
    display: 'grid',
    gap: '10px',
    color: surfaces.text,
    lineHeight: 1.8,
    fontSize: '14px',
  },
  examples: {
    display: 'grid',
    gap: '20px',
  },
  exampleCard: {
    display: 'grid',
    gap: '18px',
    padding: '24px',
    borderRadius: '24px',
    border: `1px solid ${surfaces.border}`,
    background: `linear-gradient(180deg, ${surfaces.brandTint} 0%, ${surfaces.card} 100%)`,
    boxShadow: surfaces.shadow,
  },
  exampleHeader: {
    display: 'grid',
    gap: '10px',
  },
  exampleSummary: {
    margin: 0,
    fontSize: '14px',
    lineHeight: 1.8,
    color: surfaces.textSecondary,
  },
  propTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  propTag: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 700,
    color: surfaces.brand,
    background: surfaces.brandTint,
    border: `1px solid ${surfaces.border}`,
  },
  previewPanel: {
    padding: '20px',
    borderRadius: '18px',
    background: surfaces.cardSubtle,
    border: `1px solid ${surfaces.borderStrong}`,
    color: surfaces.text,
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '14px',
  },
  detailCard: {
    padding: '16px',
    borderRadius: '18px',
    background: surfaces.cardMuted,
    border: `1px solid ${surfaces.borderStrong}`,
  },
  detailTitle: {
    margin: '0 0 8px',
    fontSize: '13px',
    fontWeight: 700,
    color: surfaces.brand,
    letterSpacing: '0.02em',
  },
  detailList: {
    margin: 0,
    paddingLeft: '18px',
    display: 'grid',
    gap: '8px',
    color: surfaces.text,
    lineHeight: 1.75,
    fontSize: '13px',
  },
  exampleActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  codeBlock: {
    margin: 0,
    padding: '18px 20px',
    borderRadius: '18px',
    background: surfaces.codeBackground,
    color: surfaces.codeText,
    border: `1px solid ${surfaces.border}`,
    overflowX: 'auto',
    fontSize: '13px',
    lineHeight: 1.8,
  },
  tableWrap: {
    overflowX: 'auto',
    borderRadius: '20px',
    border: `1px solid ${surfaces.border}`,
    background: surfaces.card,
    boxShadow: surfaces.shadow,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    minWidth: '720px',
  },
  tableHead: {
    background: surfaces.cardMuted,
  },
  tableHeaderCell: {
    padding: '14px 16px',
    textAlign: 'left' as const,
    fontSize: '13px',
    fontWeight: 700,
    color: surfaces.text,
    borderBottom: `1px solid ${surfaces.border}`,
  },
  tableCell: {
    padding: '14px 16px',
    verticalAlign: 'top' as const,
    fontSize: '14px',
    lineHeight: 1.7,
    color: surfaces.text,
    borderBottom: `1px solid ${surfaces.border}`,
  },
  tableName: {
    fontWeight: 700,
    color: surfaces.brand,
  },
  notesList: {
    margin: 0,
    paddingLeft: '20px',
    display: 'grid',
    gap: '10px',
    color: surfaces.text,
    lineHeight: 1.8,
    fontSize: '14px',
  },
} as const satisfies Record<string, CSSProperties>

function SectionBody({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} style={styles.section}>
      {children}
    </section>
  )
}

function SourceDetailList({ items }: { items: string[] }) {
  return (
    <ul style={styles.detailList}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function ExampleCard({ example }: { example: ComponentDocExample }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyLabel = useMemo(
    () => (copied ? '已复制代码' : '复制代码'),
    [copied],
  )

  const handleCopy = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return
    }

    await navigator.clipboard.writeText(example.code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <article id={example.id} style={styles.exampleCard}>
      <div style={styles.exampleHeader}>
        <p style={styles.exampleSummary}>{example.summary}</p>
        <div style={styles.propTags}>
          {example.relatedProps.map((prop) => (
            <span key={prop} style={styles.propTag}>
              {prop}
            </span>
          ))}
        </div>
      </div>

      <div style={styles.previewPanel}>{example.preview}</div>

      <div style={styles.detailGrid}>
        <div style={styles.detailCard}>
          <p style={styles.detailTitle}>用途</p>
          <SourceDetailList items={[example.sourceDetails.purpose]} />
        </div>
        <div style={styles.detailCard}>
          <p style={styles.detailTitle}>实现要点</p>
          <SourceDetailList items={example.sourceDetails.highlights} />
        </div>
        <div style={styles.detailCard}>
          <p style={styles.detailTitle}>适用边界</p>
          <SourceDetailList items={example.sourceDetails.boundaries} />
        </div>
      </div>

      <div style={styles.exampleActions}>
        <Button
          variant="secondary"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? '收起代码' : '展开代码'}
        </Button>
        <Button variant="ghost" onClick={() => void handleCopy()}>
          {copyLabel}
        </Button>
      </div>

      {expanded ? (
        <pre style={styles.codeBlock}>
          <code>{example.code}</code>
        </pre>
      ) : null}
    </article>
  )
}

export function ComponentDocDefinition({
  page,
}: {
  page: ComponentDocPageData
}) {
  return (
    <SectionBody id={componentDocSectionIds.definition}>
      <div style={styles.card}>
        <ul style={styles.proseList}>
          {page.definition.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </SectionBody>
  )
}

export function ComponentDocScenarios({
  page,
}: {
  page: ComponentDocPageData
}) {
  return (
    <SectionBody id={componentDocSectionIds.scenarios}>
      <div style={styles.card}>
        <ul style={styles.proseList}>
          {page.scenarios.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </SectionBody>
  )
}

export function ComponentDocExampleBlock({
  example,
}: {
  example: ComponentDocExample
}) {
  return <ExampleCard example={example} />
}

export function ComponentDocExamples({ page }: { page: ComponentDocPageData }) {
  return (
    <SectionBody id={componentDocSectionIds.examples}>
      <div style={styles.examples}>
        {page.examples.map((example) => (
          <ExampleCard key={example.id} example={example} />
        ))}
      </div>
    </SectionBody>
  )
}

export function ComponentDocApi({ page }: { page: ComponentDocPageData }) {
  return (
    <SectionBody id={componentDocSectionIds.api}>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.tableHeaderCell}>属性</th>
              <th style={styles.tableHeaderCell}>说明</th>
              <th style={styles.tableHeaderCell}>类型</th>
              <th style={styles.tableHeaderCell}>默认值</th>
              <th style={styles.tableHeaderCell}>备注</th>
            </tr>
          </thead>
          <tbody>
            {page.api.map((item) => (
              <tr key={item.name}>
                <td style={styles.tableCell}>
                  <span style={styles.tableName}>{item.name}</span>
                </td>
                <td style={styles.tableCell}>{item.description}</td>
                <td style={styles.tableCell}>{item.type}</td>
                <td style={styles.tableCell}>{item.defaultValue}</td>
                <td style={styles.tableCell}>{item.notes ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionBody>
  )
}

export function ComponentDocSelectionTips({
  page,
}: {
  page: ComponentDocPageData
}) {
  if (!page.selectionTips?.length) {
    return null
  }

  return (
    <SectionBody id={componentDocSectionIds.selectionTips}>
      <div style={styles.card}>
        <ul style={styles.notesList}>
          {page.selectionTips.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </SectionBody>
  )
}

export function ComponentDocWrapperNotes({
  page,
}: {
  page: ComponentDocPageData
}) {
  return (
    <SectionBody id={componentDocSectionIds.wrapperNotes}>
      <div style={styles.card}>
        <ul style={styles.notesList}>
          {page.wrapperNotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </SectionBody>
  )
}

export function ComponentDocPage({ page }: { page: ComponentDocPageData }) {
  return (
    <div style={styles.page}>
      <ComponentDocDefinition page={page} />
      <ComponentDocScenarios page={page} />
      <ComponentDocExamples page={page} />
      <ComponentDocApi page={page} />
      <ComponentDocSelectionTips page={page} />
      <ComponentDocWrapperNotes page={page} />
    </div>
  )
}
