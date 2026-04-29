import { describe, expect, it } from 'vitest'
import {
  createAntdThemeTokens,
  createThemeCssVariables,
  createThemeTokens,
} from '@sci-comp/core'

describe('createThemeTokens', () => {
  it('derives semantic and component tokens from seed overrides', () => {
    const tokens = createThemeTokens({
      colorPrimary: '#123456',
      borderRadius: 12,
      controlHeight: 40,
    })

    expect(tokens.colorPrimary).toBe('#123456')
    expect(tokens.colorActionPrimary).toBe('#123456')
    expect(tokens.radiusControl).toBe(12)
    expect(tokens.buttonRadius).toBe(12)
    expect(tokens.inputHeight).toBe(40)
  })

  it('creates antd theme tokens from the unified theme source', () => {
    const tokens = createAntdThemeTokens({ colorPrimary: '#123456' })

    expect(tokens.colorPrimary).toBe('#123456')
    expect(tokens.colorBorder).toBeDefined()
    expect(tokens.controlHeight).toBe(36)
  })

  it('creates css variables including normalized and legacy aliases', () => {
    const variables = createThemeCssVariables({
      colorPrimary: '#123456',
      borderRadius: 10,
    })

    expect(variables['--sci-color-action-primary']).toBe('#123456')
    expect(variables['--sci-radius-control']).toBe('10px')
    expect(variables['--accent']).toBe('#123456')
    expect(variables['--text-h']).toBe(variables['--sci-color-text-primary'])
  })
})
