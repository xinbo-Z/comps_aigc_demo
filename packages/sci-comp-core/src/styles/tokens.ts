export interface SciInstrumentThemeSeedTokens {
  colorPrimary: string
  colorDanger: string
  colorText: string
  colorBgContainer: string
  borderRadius: number
  controlHeightSM: number
  controlHeight: number
  controlHeightLG: number
}

export interface SciInstrumentThemeSemanticTokens {
  colorTextPrimary: string
  colorTextSecondary: string
  colorTextDisabled: string
  colorTextInverse: string
  colorSurfaceBase: string
  colorSurfaceMuted: string
  colorSurfaceElevated: string
  colorBorderBase: string
  colorBorderFocus: string
  colorActionPrimary: string
  colorActionPrimaryHover: string
  colorActionPrimarySoft: string
  colorActionPrimaryText: string
  colorDangerSoft: string
  colorDangerText: string
  radiusControl: number
  sizeControlSm: number
  sizeControlMd: number
  sizeControlLg: number
}

export interface SciInstrumentThemeComponentTokens {
  buttonRadius: number
  buttonHeightSm: number
  buttonHeightMd: number
  buttonHeightLg: number
  inputRadius: number
  inputHeight: number
  formListItemRadius: number
}

export interface SciInstrumentThemeTokens
  extends
    SciInstrumentThemeSeedTokens,
    SciInstrumentThemeSemanticTokens,
    SciInstrumentThemeComponentTokens {}

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

export const defaultThemeTokens: SciInstrumentThemeSeedTokens =
  defaultThemeSeedTokens
