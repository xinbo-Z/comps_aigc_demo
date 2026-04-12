import { describe, expect, it } from 'vitest'
import { createThemeTokens } from './theme'

describe('createThemeTokens', () => {
  it('merges overrides onto defaults', () => {
    const tokens = createThemeTokens({ colorPrimary: '#123456' })

    expect(tokens.colorPrimary).toBe('#123456')
    expect(tokens.borderRadius).toBe(8)
  })
})
