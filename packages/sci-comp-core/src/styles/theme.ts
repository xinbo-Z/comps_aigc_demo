import type { ThemeConfig } from 'antd'
import {
  defaultThemeSeedTokens,
  type SciInstrumentThemeComponentTokens,
  type SciInstrumentThemeSeedTokens,
  type SciInstrumentThemeSemanticTokens,
  type SciInstrumentThemeTokens,
} from './tokens'

type ThemeTokenKey = keyof SciInstrumentThemeTokens

type ThemeCssVariables = Record<string, string>

type AntdThemeTokens = NonNullable<ThemeConfig['token']>

function clamp(value: number, min = 0, max = 255) {
  return Math.min(max, Math.max(min, value))
}

function normalizeHex(value: string) {
  const hex = value.trim().replace('#', '')

  if (hex.length === 3) {
    return hex
      .split('')
      .map((segment) => segment + segment)
      .join('')
  }

  return hex.slice(0, 6)
}

function hexToRgb(value: string) {
  const hex = normalizeHex(value)

  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((channel) => clamp(Math.round(channel)).toString(16).padStart(2, '0'))
    .join('')}`
}

function mixColors(base: string, target: string, weight: number) {
  const from = hexToRgb(base)
  const to = hexToRgb(target)

  return rgbToHex(
    from.r + (to.r - from.r) * weight,
    from.g + (to.g - from.g) * weight,
    from.b + (to.b - from.b) * weight,
  )
}

function withAlpha(color: string, alpha: number) {
  const { r, g, b } = hexToRgb(color)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function pickSeedOverrides(
  overrides: Partial<SciInstrumentThemeTokens>,
): Partial<SciInstrumentThemeSeedTokens> {
  const {
    colorPrimary,
    colorDanger,
    colorText,
    colorBgContainer,
    borderRadius,
    controlHeightSM,
    controlHeight,
    controlHeightLG,
  } = overrides

  return {
    ...(colorPrimary !== undefined ? { colorPrimary } : {}),
    ...(colorDanger !== undefined ? { colorDanger } : {}),
    ...(colorText !== undefined ? { colorText } : {}),
    ...(colorBgContainer !== undefined ? { colorBgContainer } : {}),
    ...(borderRadius !== undefined ? { borderRadius } : {}),
    ...(controlHeightSM !== undefined ? { controlHeightSM } : {}),
    ...(controlHeight !== undefined ? { controlHeight } : {}),
    ...(controlHeightLG !== undefined ? { controlHeightLG } : {}),
  }
}

function createSemanticTokens(
  seedTokens: SciInstrumentThemeSeedTokens,
): SciInstrumentThemeSemanticTokens {
  return {
    colorTextPrimary: seedTokens.colorText,
    colorTextSecondary: mixColors(
      seedTokens.colorText,
      seedTokens.colorBgContainer,
      0.32,
    ),
    colorTextDisabled: mixColors(
      seedTokens.colorText,
      seedTokens.colorBgContainer,
      0.52,
    ),
    colorTextInverse: '#ffffff',
    colorSurfaceBase: seedTokens.colorBgContainer,
    colorSurfaceMuted: mixColors(
      seedTokens.colorBgContainer,
      seedTokens.colorText,
      0.04,
    ),
    colorSurfaceElevated: mixColors(
      seedTokens.colorBgContainer,
      '#ffffff',
      0.12,
    ),
    colorBorderBase: mixColors(
      seedTokens.colorText,
      seedTokens.colorBgContainer,
      0.78,
    ),
    colorBorderFocus: mixColors(seedTokens.colorPrimary, '#ffffff', 0.16),
    colorActionPrimary: seedTokens.colorPrimary,
    colorActionPrimaryHover: mixColors(
      seedTokens.colorPrimary,
      '#000000',
      0.08,
    ),
    colorActionPrimarySoft: withAlpha(seedTokens.colorPrimary, 0.14),
    colorActionPrimaryText: '#ffffff',
    colorDangerSoft: withAlpha(seedTokens.colorDanger, 0.14),
    colorDangerText: seedTokens.colorDanger,
    radiusControl: seedTokens.borderRadius,
    sizeControlSm: seedTokens.controlHeightSM,
    sizeControlMd: seedTokens.controlHeight,
    sizeControlLg: seedTokens.controlHeightLG,
  }
}

function createComponentTokens(
  semanticTokens: SciInstrumentThemeSemanticTokens,
): SciInstrumentThemeComponentTokens {
  return {
    buttonRadius: semanticTokens.radiusControl,
    buttonHeightSm: semanticTokens.sizeControlSm,
    buttonHeightMd: semanticTokens.sizeControlMd,
    buttonHeightLg: semanticTokens.sizeControlLg,
    inputRadius: semanticTokens.radiusControl,
    inputHeight: semanticTokens.sizeControlMd,
    formListItemRadius: semanticTokens.radiusControl,
  }
}

export function createThemeTokens(
  overrides: Partial<SciInstrumentThemeTokens> = {},
): SciInstrumentThemeTokens {
  const seedTokens: SciInstrumentThemeSeedTokens = {
    ...defaultThemeSeedTokens,
    ...pickSeedOverrides(overrides),
  }

  const semanticTokens = createSemanticTokens(seedTokens)
  const componentTokens = createComponentTokens(semanticTokens)

  return {
    ...seedTokens,
    ...semanticTokens,
    ...componentTokens,
    ...overrides,
  }
}

export function createAntdThemeTokens(
  overrides: Partial<SciInstrumentThemeTokens> = {},
): AntdThemeTokens {
  const tokens = createThemeTokens(overrides)

  return {
    colorPrimary: tokens.colorActionPrimary,
    colorError: tokens.colorDanger,
    colorText: tokens.colorTextPrimary,
    colorTextSecondary: tokens.colorTextSecondary,
    colorTextDisabled: tokens.colorTextDisabled,
    colorBgContainer: tokens.colorSurfaceBase,
    colorBorder: tokens.colorBorderBase,
    colorBorderSecondary: tokens.colorBorderBase,
    colorFillSecondary: tokens.colorSurfaceMuted,
    colorFillTertiary: tokens.colorActionPrimarySoft,
    controlOutline: tokens.colorActionPrimarySoft,
    controlItemBgHover: tokens.colorSurfaceMuted,
    controlItemBgActive: tokens.colorActionPrimarySoft,
    borderRadius: tokens.radiusControl,
    controlHeightSM: tokens.sizeControlSm,
    controlHeight: tokens.sizeControlMd,
    controlHeightLG: tokens.sizeControlLg,
  }
}

export function createThemeCssVariables(
  overrides: Partial<SciInstrumentThemeTokens> = {},
): ThemeCssVariables {
  const tokens = createThemeTokens(overrides)

  const variableMap: Record<string, ThemeTokenKey> = {
    '--sci-color-text-primary': 'colorTextPrimary',
    '--sci-color-text-secondary': 'colorTextSecondary',
    '--sci-color-text-disabled': 'colorTextDisabled',
    '--sci-color-text-inverse': 'colorTextInverse',
    '--sci-color-surface-base': 'colorSurfaceBase',
    '--sci-color-surface-muted': 'colorSurfaceMuted',
    '--sci-color-surface-elevated': 'colorSurfaceElevated',
    '--sci-color-border-base': 'colorBorderBase',
    '--sci-color-border-focus': 'colorBorderFocus',
    '--sci-color-action-primary': 'colorActionPrimary',
    '--sci-color-action-primary-hover': 'colorActionPrimaryHover',
    '--sci-color-action-primary-soft': 'colorActionPrimarySoft',
    '--sci-color-action-primary-text': 'colorActionPrimaryText',
    '--sci-color-danger': 'colorDanger',
    '--sci-color-danger-soft': 'colorDangerSoft',
    '--sci-color-danger-text': 'colorDangerText',
    '--sci-radius-control': 'radiusControl',
    '--sci-size-control-sm': 'sizeControlSm',
    '--sci-size-control-md': 'sizeControlMd',
    '--sci-size-control-lg': 'sizeControlLg',
    '--sci-button-radius': 'buttonRadius',
    '--sci-button-height-sm': 'buttonHeightSm',
    '--sci-button-height-md': 'buttonHeightMd',
    '--sci-button-height-lg': 'buttonHeightLg',
    '--sci-input-radius': 'inputRadius',
    '--sci-input-height': 'inputHeight',
    '--sci-form-list-item-radius': 'formListItemRadius',
    '--text-h': 'colorTextPrimary',
    '--text': 'colorTextSecondary',
    '--bg': 'colorSurfaceBase',
    '--code-bg': 'colorSurfaceMuted',
    '--border': 'colorBorderBase',
    '--accent': 'colorActionPrimary',
    '--accent-hover': 'colorActionPrimaryHover',
    '--accent-border': 'colorBorderFocus',
    '--accent-bg': 'colorActionPrimarySoft',
    '--danger': 'colorDanger',
  }

  return Object.entries(variableMap).reduce<ThemeCssVariables>(
    (result, [name, key]) => {
      const value = tokens[key]
      result[name] = typeof value === 'number' ? `${value}px` : value
      return result
    },
    {},
  )
}
