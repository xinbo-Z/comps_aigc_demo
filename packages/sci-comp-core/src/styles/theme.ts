import { defaultThemeTokens, type SciInstrumentThemeTokens } from './tokens'

export function createThemeTokens(
  overrides: Partial<SciInstrumentThemeTokens> = {},
): SciInstrumentThemeTokens {
  return { ...defaultThemeTokens, ...overrides }
}
