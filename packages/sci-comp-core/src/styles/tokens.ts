/**
 * 主题 Token 定义文件
 *
 * 本文件定义了主题系统的三层 Token 架构：
 * 1. Seed Tokens - 种子 Token，最基础的输入
 * 2. Semantic Tokens - 语义 Token，基于 Seed Tokens 自动计算
 * 3. Component Tokens - 组件 Token，针对特定组件的局部配置
 *
 * @module tokens
 */

/**
 * 种子 Token - 最基础的主题输入
 * 这些是用户可以直接配置的最基础的设计变量
 */
export interface SciInstrumentThemeSeedTokens {
  /** 主色调，用于按钮、链接等强调元素 */
  colorPrimary: string
  /** 危险色，用于删除按钮、错误提示等 */
  colorDanger: string
  /** 文本颜色，主要用于正文内容 */
  colorText: string
  /** 容器背景色，默认的背景颜色 */
  colorBgContainer: string
  /** 通用圆角，控制按钮、输入框等的圆角程度 */
  borderRadius: number
  /** 小号控制元素高度，如小按钮、小输入框 */
  controlHeightSM: number
  /** 默认控制元素高度，如标准按钮、标准输入框 */
  controlHeight: number
  /** 大号控制元素高度，如大按钮、大输入框 */
  controlHeightLG: number
}

/**
 * 语义 Token - 基于 Seed Tokens 自动计算
 * 这些 token 具有明确的语义，直接被组件使用
 */
export interface SciInstrumentThemeSemanticTokens {
  /** 主要文本颜色，用于标题、重要内容 */
  colorTextPrimary: string
  /** 次要文本颜色，用于描述信息、辅助内容 */
  colorTextSecondary: string
  /** 禁用状态文本颜色 */
  colorTextDisabled: string
  /** 反色文本，用于深色背景上 */
  colorTextInverse: string
  /** 基础表面色，用于背景、容器 */
  colorSurfaceBase: string
  /** 柔和表面色，用于次要背景、卡片等 */
  colorSurfaceMuted: string
  /** 提升表面色，用于浮层、弹出框等 */
  colorSurfaceElevated: string
  /** 基础边框颜色 */
  colorBorderBase: string
  /** 聚焦状态边框颜色 */
  colorBorderFocus: string
  /** 主要操作色，主按钮背景等 */
  colorActionPrimary: string
  /** 主要操作悬停色 */
  colorActionPrimaryHover: string
  /** 主要操作柔和色，用于背景提示 */
  colorActionPrimarySoft: string
  /** 主要操作文本色 */
  colorActionPrimaryText: string
  /** 危险操作柔和色，用于背景提示 */
  colorDangerSoft: string
  /** 危险操作文本色 */
  colorDangerText: string
  /** 控制元素圆角 */
  radiusControl: number
  /** 小号控制元素尺寸 */
  sizeControlSm: number
  /** 中号控制元素尺寸 */
  sizeControlMd: number
  /** 大号控制元素尺寸 */
  sizeControlLg: number
}

/**
 * 组件 Token - 针对特定组件的局部配置
 * 这些 token 直接对应到具体组件的样式
 */
export interface SciInstrumentThemeComponentTokens {
  /** 按钮圆角 */
  buttonRadius: number
  /** 小号按钮高度 */
  buttonHeightSm: number
  /** 中号按钮高度 */
  buttonHeightMd: number
  /** 大号按钮高度 */
  buttonHeightLg: number
  /** 输入框圆角 */
  inputRadius: number
  /** 输入框高度 */
  inputHeight: number
  /** 表单项圆角 */
  formListItemRadius: number
}

/**
 * 完整的主题 Token
 * 包含所有三层 Token：Seed、Semantic、Component
 */
export interface SciInstrumentThemeTokens
  extends
    SciInstrumentThemeSeedTokens,
    SciInstrumentThemeSemanticTokens,
    SciInstrumentThemeComponentTokens {}

/**
 * 默认的种子 Token
 * 提供了一套符合设计规范的默认值
 */
export const defaultThemeSeedTokens: SciInstrumentThemeSeedTokens = {
  colorPrimary: '#1677ff',
  colorDanger: '#ff4d4f',
  colorText: '#1f1f1f',
  colorBgContainer: '#ffffff',
  borderRadius: 8,
  controlHeightSM: 28,
  controlHeight: 36,
  controlHeightLG: 44,
}

/**
 * 默认主题 Token
 * 提供了完整的默认值（目前仅包含种子 Token）
 */
export const defaultThemeTokens: SciInstrumentThemeSeedTokens =
  defaultThemeSeedTokens
