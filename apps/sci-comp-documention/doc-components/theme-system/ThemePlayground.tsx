import { ConfigProvider } from 'antd'
import { useMemo, useState, type CSSProperties } from 'react'
import {
  createAntdThemeTokens,
  createThemeCssVariables,
  createThemeTokens,
  type SciInstrumentThemeTokens,
} from '@sci-comp/core'
import PreviewBlock from '../PreviewBlock'
import { ThemeControlPanel } from './ThemeControlPanel'
import { ThemeInspector } from './ThemeInspector'
import { ThemePreviewBaseline } from './ThemePreviewBaseline'
import { ThemePreviewWorkbench } from './ThemePreviewWorkbench'
import { themePresets } from './themePlaygroundData'

const layoutStyle = {
  display: 'grid',
  gap: 24,
} as const

const panelGridStyle = {
  display: 'grid',
  gap: 24,
} as const

const headingStyle: CSSProperties = {
  marginBottom: 8,
  color: 'var(--rp-c-text-1)',
}

const descriptionStyle: CSSProperties = {
  margin: 0,
  color: 'var(--rp-c-text-2)',
  lineHeight: 1.7,
}

interface ThemePlaygroundProps {
  initialOverrides?: Partial<SciInstrumentThemeTokens>
}

export function ThemePlayground({
  initialOverrides = {},
}: ThemePlaygroundProps) {
  const [overrides, setOverrides] =
    useState<Partial<SciInstrumentThemeTokens>>(initialOverrides)

  const themeTokens = useMemo(() => createThemeTokens(overrides), [overrides])
  const antdTokens = useMemo(
    () => createAntdThemeTokens(overrides),
    [overrides],
  )
  const cssVariables = useMemo(
    () => createThemeCssVariables(overrides),
    [overrides],
  )

  const handleChange = (patch: Partial<SciInstrumentThemeTokens>) => {
    setOverrides((current) => ({ ...current, ...patch }))
  }

  const handleReset = () => {
    setOverrides({})
  }

  const handlePresetSelect = (key: string) => {
    const preset = themePresets.find((item) => item.key === key)

    if (!preset) {
      return
    }

    setOverrides(preset.overrides)
  }

  return (
    <section style={layoutStyle}>
      <div>
        <h2 style={headingStyle}>主题演示工作台</h2>
        <p style={descriptionStyle}>
          同一份 themeOverrides 会同时驱动 Ant Design token 与 CSS variables。
        </p>
      </div>
      <div style={panelGridStyle}>
        <ThemeControlPanel
          overrides={overrides}
          onChange={handleChange}
          onReset={handleReset}
          onPresetSelect={handlePresetSelect}
        />
        <ConfigProvider theme={{ token: antdTokens }}>
          <div style={cssVariables as CSSProperties}>
            <PreviewBlock
              title="双通道同步预览"
              description="这里同时展示业务化预览与基础组件基准对照，便于确认同一份 overrides 是否同步生效。"
            >
              <div style={panelGridStyle}>
                <ThemePreviewWorkbench />
                <ThemePreviewBaseline />
              </div>
            </PreviewBlock>
          </div>
        </ConfigProvider>
        <ThemeInspector
          overrides={overrides}
          themeTokens={themeTokens}
          antdTokens={antdTokens}
          cssVariables={cssVariables}
        />
      </div>
    </section>
  )
}
