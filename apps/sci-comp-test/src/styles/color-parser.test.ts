import { describe, expect, it } from 'vitest'
import { createThemeTokens, createThemeCssVariables } from '@sci-comp/core'

describe('Color format support', () => {
  it('supports named colors like "red"', () => {
    const tokens = createThemeTokens({
      colorPrimary: 'red',
    })

    expect(tokens.colorPrimary).toBe('red')
    expect(tokens.colorActionPrimarySoft).toBe('rgba(255, 0, 0, 0.14)')
  })

  it('supports hex formats', () => {
    const tokens = createThemeTokens({
      colorPrimary: '#ff0000',
    })

    expect(tokens.colorPrimary).toBe('#ff0000')
    expect(tokens.colorActionPrimarySoft).toBe('rgba(255, 0, 0, 0.14)')
  })

  it('supports short hex formats', () => {
    const tokens = createThemeTokens({
      colorPrimary: '#f00',
    })

    expect(tokens.colorPrimary).toBe('#f00')
  })

  it('supports rgb formats', () => {
    const tokens = createThemeTokens({
      colorPrimary: 'rgb(0, 255, 0)',
    })

    expect(tokens.colorPrimary).toBe('rgb(0, 255, 0)')
    expect(tokens.colorActionPrimarySoft).toBe('rgba(0, 255, 0, 0.14)')
  })

  it('mixes colors properly with different color formats', () => {
    const tokens = createThemeTokens({
      colorPrimary: 'blue',
      colorBgContainer: 'white',
    })

    expect(tokens.colorBorderFocus).toBeDefined()
    expect(tokens.colorActionPrimaryHover).toBeDefined()
  })

  it('creates css variables with named colors', () => {
    const variables = createThemeCssVariables({
      colorPrimary: 'red',
      colorDanger: 'yellow',
    })

    expect(variables['--sci-color-action-primary']).toBe('red')
    expect(variables['--sci-color-danger']).toBe('yellow')
    expect(variables['--sci-color-danger-soft']).toBeDefined()
  })
})
