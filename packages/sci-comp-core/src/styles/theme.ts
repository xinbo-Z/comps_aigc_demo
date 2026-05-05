/**
 * 主题系统核心逻辑
 *
 * 本文件实现了主题系统的核心功能：
 * 1. 颜色处理工具函数
 * 2. Token 计算与转换
 * 3. 输出到 Ant Design 和 CSS Variables
 *
 * 架构说明：
 * - 单一主题源，双输出通道：同一份配置同时驱动 Ant Design 和 CSS 组件
 * - 三层 Token 架构：Seed -> Semantic -> Component
 * - 类型安全：完整的 TypeScript 类型定义
 *
 * @module theme
 */

import type { ThemeConfig } from 'antd'
import {
  defaultThemeSeedTokens,
  type SciInstrumentThemeComponentTokens,
  type SciInstrumentThemeSeedTokens,
  type SciInstrumentThemeSemanticTokens,
  type SciInstrumentThemeTokens,
} from './tokens'

/** 主题 Token 的键类型 */
type ThemeTokenKey = keyof SciInstrumentThemeTokens

/** CSS 变量对象类型 */
type ThemeCssVariables = Record<string, string>

/** Ant Design 主题 Token 类型 */
type AntdThemeTokens = NonNullable<ThemeConfig['token']>

/** RGB 颜色对象类型 */
type RgbColor = { r: number; g: number; b: number }

/**
 * CSS 命名颜色映射表
 * 包含所有标准 CSS 颜色名称与对应十六进制值的映射
 */
const NAMED_COLORS: Record<string, string> = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
}

/**
 * 数值限制函数
 * 将数值限制在指定的最小值和最大值之间
 *
 * @param value - 需要限制的数值
 * @param min - 最小值，默认为 0
 * @param max - 最大值，默认为 255
 * @returns 限制后的数值
 */
function clamp(value: number, min = 0, max = 255) {
  return Math.min(max, Math.max(min, value))
}

/**
 * 标准化十六进制颜色
 * 支持两种格式：三位简写（如 #f00）和六位完整（如 #ff0000）
 *
 * @param value - 十六进制颜色值
 * @returns 标准化后的六位十六进制字符串（不带 #）
 */
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

/**
 * 十六进制颜色转 RGB
 * 将十六进制颜色转换为 RGB 对象
 *
 * @param value - 十六进制颜色值
 * @returns RGB 颜色对象
 */
function hexToRgb(value: string): RgbColor {
  const hex = normalizeHex(value)

  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  }
}

/**
 * 解析多种颜色格式为 RGB
 * 支持的格式：命名颜色、十六进制、RGB/RGBA
 *
 * @param color - 颜色字符串
 * @returns RGB 颜色对象
 */
function parseRgb(color: string): RgbColor {
  const trimmed = color.trim().toLowerCase()

  // First, check if it's a named color
  if (NAMED_COLORS[trimmed]) {
    return hexToRgb(NAMED_COLORS[trimmed])
  }

  // Check if it's a hex color
  if (trimmed.startsWith('#')) {
    return hexToRgb(trimmed)
  }

  // Check if it's an rgb/rgba color
  if (trimmed.startsWith('rgb')) {
    const rgbMatch = trimmed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (rgbMatch) {
      return {
        r: parseInt(rgbMatch[1], 10),
        g: parseInt(rgbMatch[2], 10),
        b: parseInt(rgbMatch[3], 10),
      }
    }
  }

  // Default to black if we can't parse it
  return { r: 0, g: 0, b: 0 }
}

/**
 * RGB 颜色转十六进制
 * 将 RGB 对象转换为十六进制颜色字符串
 *
 * @param r - 红色通道值
 * @param g - 绿色通道值
 * @param b - 蓝色通道值
 * @returns 十六进制颜色字符串
 */
function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((channel) => clamp(Math.round(channel)).toString(16).padStart(2, '0'))
    .join('')}`
}

/**
 * 颜色混合函数
 * 根据权重混合两个颜色
 *
 * @param base - 基础颜色
 * @param target - 目标颜色
 * @param weight - 混合权重，0 为完全基础色，1 为完全目标色
 * @returns 混合后的颜色
 */
function mixColors(base: string, target: string, weight: number): string {
  const from = parseRgb(base)
  const to = parseRgb(target)

  return rgbToHex(
    from.r + (to.r - from.r) * weight,
    from.g + (to.g - from.g) * weight,
    from.b + (to.b - from.b) * weight,
  )
}

/**
 * 颜色添加透明度
 * 将颜色转换为带透明度的 RGBA 格式
 *
 * @param color - 基础颜色
 * @param alpha - 透明度，0-1 之间
 * @returns RGBA 颜色字符串
 */
function withAlpha(color: string, alpha: number): string {
  const { r, g, b } = parseRgb(color)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * 从完整的 overrides 中提取 seed token
 * 只保留 seed token 的属性，过滤掉其他 token
 *
 * @param overrides - 完整的主题覆盖配置
 * @returns 提取后的 seed token 覆盖
 */
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

/**
 * 从 Seed Tokens 计算 Semantic Tokens
 * 根据种子 token 自动计算所有语义 token
 *
 * @param seedTokens - 种子 token
 * @returns 语义 token 对象
 */
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

/**
 * 从 Semantic Tokens 计算 Component Tokens
 * 根据语义 token 自动计算所有组件 token
 *
 * @param semanticTokens - 语义 token
 * @returns 组件 token 对象
 */
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

/**
 * 创建完整的主题 Token
 * 结合默认值和用户覆盖，生成完整的主题配置
 *
 * 计算流程：
 * 1. 合并默认 seed token 和用户覆盖的 seed token
 * 2. 计算 semantic token
 * 3. 计算 component token
 * 4. 应用用户的完整覆盖（最高优先级）
 *
 * @param overrides - 主题覆盖配置，可覆盖任意层级的 token
 * @returns 完整的主题 token 对象
 */
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

/**
 * 创建 Ant Design 主题 Token
 * 将主题 token 映射为 Ant Design 的 token 格式
 *
 * @param overrides - 主题覆盖配置
 * @returns Ant Design 格式的 token 对象
 */
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

/**
 * 创建主题 CSS 变量
 * 将主题 token 转换为 CSS 变量对象
 *
 * 支持两种变量名：
 * - 正式变量名：以 --sci- 开头（推荐）
 * - 兼容变量名：保留历史变量名以便迁移
 *
 * @param overrides - 主题覆盖配置
 * @returns CSS 变量对象，可直接应用到 style 属性
 */
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
