import type { CSSProperties } from 'react'
import type { ThemeConfig } from 'antd'
import type { SciInstrumentThemeTokens } from '@sci-comp/core'
import { createThemeTokens } from '@sci-comp/core'
import { legacyVariableMappings, usageGuidance } from './themePlaygroundData'

const tokens = createThemeTokens()

const sectionStyle: CSSProperties = {
  display: 'grid',
  gap: 16,
}

const cardStyle: CSSProperties = {
  padding: 20,
  borderRadius: 20,
  border: `1px solid ${tokens.colorBorderBase}`,
  background: tokens.colorSurfaceBase,
}

const codeStyle: CSSProperties = {
  margin: 0,
  padding: 16,
  borderRadius: 16,
  background: tokens.colorSurfaceMuted,
  overflowX: 'auto',
  fontSize: 12,
  lineHeight: 1.6,
}

interface ThemeInspectorProps {
  overrides: Partial<SciInstrumentThemeTokens>
  themeTokens: SciInstrumentThemeTokens
  antdTokens: NonNullable<ThemeConfig['token']>
  cssVariables: Record<string, string>
}

export function ThemeInspector({
  overrides,
  themeTokens,
  antdTokens,
  cssVariables,
}: ThemeInspectorProps) {
  return (
    <section style={sectionStyle}>
      <h3 style={{ margin: 0 }}>主题输出检查</h3>
      <div style={cardStyle}>
        <h4 style={{ marginTop: 0 }}>overrides</h4>
        <pre style={codeStyle}>{JSON.stringify(overrides, null, 2)}</pre>
      </div>
      <div style={cardStyle}>
        <h4 style={{ marginTop: 0 }}>AntD token 摘要</h4>
        <pre style={codeStyle}>{JSON.stringify(antdTokens, null, 2)}</pre>
      </div>
      <div style={cardStyle}>
        <h4 style={{ marginTop: 0 }}>CSS Variables 输出</h4>
        <pre style={codeStyle}>{JSON.stringify(cssVariables, null, 2)}</pre>
      </div>
      <div style={cardStyle}>
        <h4 style={{ marginTop: 0 }}>兼容变量映射</h4>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {legacyVariableMappings.map(([legacyName, currentName]) => (
            <li key={legacyName}>
              {legacyName} → {currentName}
            </li>
          ))}
        </ul>
      </div>
      <div style={cardStyle}>
        <h4 style={{ marginTop: 0 }}>推荐做法</h4>
        <ul style={{ marginTop: 0, paddingLeft: 20 }}>
          {usageGuidance.recommended.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4>注意事项</h4>
        <ul style={{ paddingLeft: 20 }}>
          {usageGuidance.caution.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4>避免事项</h4>
        <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
          {usageGuidance.avoid.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div style={cardStyle}>
        <h4 style={{ marginTop: 0 }}>统一主题结果</h4>
        <pre style={codeStyle}>{JSON.stringify(themeTokens, null, 2)}</pre>
      </div>
    </section>
  )
}
