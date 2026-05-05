import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const guidePath = resolve(
  __dirname,
  '../../../sci-comp-documention/docs/guide/table-column-resize.mdx',
)

describe('table column resize guide', () => {
  it('includes the controlled persistence guide content', () => {
    expect(existsSync(guidePath)).toBe(true)

    const content = readFileSync(guidePath, 'utf8')

    expect(content).toContain('# Table 列宽拖拽与持久化')
    expect(content).toContain('onColumnsChange={setColumns}')
    expect(content).toContain('localStorage')
  })
})
