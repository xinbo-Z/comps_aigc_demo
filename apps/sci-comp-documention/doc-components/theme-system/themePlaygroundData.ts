import type { SciInstrumentThemeTokens } from '@sci-comp/core'

export interface ThemePreset {
  key: string
  label: string
  overrides: Partial<SciInstrumentThemeTokens>
}

export const themePresets: ThemePreset[] = [
  {
    key: 'default',
    label: '默认主题',
    overrides: {},
  },
  {
    key: 'brand',
    label: '品牌色',
    overrides: {
      colorPrimary: '#667eea',
      borderRadius: 10,
    },
  },
  {
    key: 'dense',
    label: '高密度',
    overrides: {
      controlHeightSM: 26,
      controlHeight: 32,
      controlHeightLG: 40,
    },
  },
  {
    key: 'rounded',
    label: '大圆角',
    overrides: {
      borderRadius: 16,
    },
  },
]

export const legacyVariableMappings = [
  ['--text-h', '--sci-color-text-primary'],
  ['--text', '--sci-color-text-secondary'],
  ['--bg', '--sci-color-surface-base'],
  ['--border', '--sci-color-border-base'],
  ['--accent', '--sci-color-action-primary'],
  ['--danger', '--sci-color-danger'],
] as const

export const usageGuidance = {
  recommended: [
    '优先复用同一份 themeOverrides 驱动 AntD token 与 CSS variables。',
    '新增组件时优先消费 --sci-* 语义变量。',
  ],
  caution: [
    '局部主题嵌套前先确认是否真的需要局部品牌差异。',
    '增加 component token 前先确认 semantic token 是否足够表达。',
  ],
  avoid: [
    '不要只改 ConfigProvider 而忽略 CSS variables。',
    '不要在新代码中继续新增历史变量消费点。',
  ],
}
