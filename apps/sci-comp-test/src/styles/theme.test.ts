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
})
