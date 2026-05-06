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

  it('keeps antd tokens and css variables aligned for the same override source', () => {
    const overrides = {
      colorPrimary: '#667eea',
      borderRadius: 10,
      controlHeight: 40,
    }

    const antdTokens = createAntdThemeTokens(overrides)
    const cssVariables = createThemeCssVariables(overrides)

    expect(antdTokens.colorPrimary).toBe('#667eea')
    expect(antdTokens.borderRadius).toBe(10)
    expect(antdTokens.controlHeight).toBe(40)
    expect(cssVariables['--sci-color-action-primary']).toBe('#667eea')
    expect(cssVariables['--sci-radius-control']).toBe('10px')
    expect(cssVariables['--sci-size-control-md']).toBe('40px')
  })

  it('keeps documentation surface tokens consumable through the shared test provider entry', () => {
    const variables = createThemeCssVariables({ colorPrimary: '#1d4ed8' })

    expect(variables['--sci-color-surface-base']).toBeDefined()
    expect(variables['--sci-color-surface-muted']).toBeDefined()
    expect(variables['--sci-color-text-primary']).toBeDefined()
    expect(variables['--sci-color-text-secondary']).toBeDefined()
    expect(variables['--border']).toBeDefined()
  })
})
