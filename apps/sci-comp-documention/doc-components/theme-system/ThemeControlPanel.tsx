import type { CSSProperties } from 'react'
import { Button, Input, type SciInstrumentThemeTokens } from '@sci-comp/core'
import { themePresets } from './themePlaygroundData'

const sectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: 20,
  borderRadius: 20,
  border: '1px solid var(--rp-c-divider-light)',
  background: 'var(--rp-c-bg)',
  boxShadow: 'var(--rp-c-shadow-3)',
}

const titleStyle: CSSProperties = {
  margin: 0,
  color: 'var(--rp-c-text-1)',
}

const presetRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
}

interface ThemeControlPanelProps {
  overrides: Partial<SciInstrumentThemeTokens>
  onChange: (patch: Partial<SciInstrumentThemeTokens>) => void
  onReset: () => void
  onPresetSelect: (key: string) => void
}

export function ThemeControlPanel({
  overrides,
  onChange,
  onReset,
  onPresetSelect,
}: ThemeControlPanelProps) {
  return (
    <section style={sectionStyle}>
      <h3 style={titleStyle}>主题输入</h3>
      <Input
        label="主色"
        value={overrides.colorPrimary ?? ''}
        onChange={(event) => onChange({ colorPrimary: event.target.value })}
      />
      <Input
        label="危险色"
        value={overrides.colorDanger ?? ''}
        onChange={(event) => onChange({ colorDanger: event.target.value })}
      />
      <Input
        label="文本色"
        value={overrides.colorText ?? ''}
        onChange={(event) => onChange({ colorText: event.target.value })}
      />
      <Input
        label="容器背景色"
        value={overrides.colorBgContainer ?? ''}
        onChange={(event) => onChange({ colorBgContainer: event.target.value })}
      />
      <Input
        label="圆角"
        value={String(overrides.borderRadius ?? '')}
        onChange={(event) =>
          onChange({ borderRadius: Number(event.target.value) })
        }
      />
      <Input
        label="小尺寸高度"
        value={String(overrides.controlHeightSM ?? '')}
        onChange={(event) =>
          onChange({ controlHeightSM: Number(event.target.value) })
        }
      />
      <Input
        label="默认高度"
        value={String(overrides.controlHeight ?? '')}
        onChange={(event) =>
          onChange({ controlHeight: Number(event.target.value) })
        }
      />
      <Input
        label="大尺寸高度"
        value={String(overrides.controlHeightLG ?? '')}
        onChange={(event) =>
          onChange({ controlHeightLG: Number(event.target.value) })
        }
      />
      <div style={presetRowStyle}>
        {themePresets.map((preset) => (
          <Button
            key={preset.key}
            variant="secondary"
            onClick={() => onPresetSelect(preset.key)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
      <Button variant="ghost" onClick={onReset}>
        重置
      </Button>
    </section>
  )
}
