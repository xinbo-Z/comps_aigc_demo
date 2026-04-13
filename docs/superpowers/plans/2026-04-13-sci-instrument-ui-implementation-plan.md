# sci-instrument-ui Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready scientific instrument React component library with phased infrastructure, foundational components, instrument-specific components, documentation, tests, and release automation.

**Architecture:** Start by converting the current Vite app into a library-first monorepo-style package structure inside `hik-comps`, with shared theme tokens, typed exports, test/storybook tooling, and stable package entrypoints. Build general components first on top of shared primitives, then layer instrument components on top of the general `Form` and `Table` capabilities and the v1.1 advanced visualization/control contracts.

**Tech Stack:** React 19, TypeScript 5.x/6.x project config, Vite library mode, Ant Design 6.x, CSS Modules, Vitest, React Testing Library, Storybook 8, Canvas-based chart rendering, GitHub Actions

---

> **状态说明：** 该计划基于仓库迁移前的单包结构编写，涉及 `src/`、`.storybook/`、根级 `vite.config.ts` / `vitest.config.ts` / `tsconfig.app.json` / `package-lock.json` 等路径。当前仓库已切换为 `pnpm workspace + turborepo` monorepo，这些路径多数已不存在。若继续推进相关能力，请先将任务映射到 `packages/sci-comp-core/`、`apps/sci-comp-test/` 与 `apps/sci-comp-documention/` 后再实施。

## File Structure

**Create / reorganize these areas before feature work:**

- `src/index.ts` — top-level public exports
- `src/components/general/` — foundational components
- `src/components/instrument/` — instrument-specific components
- `src/components/shared/` — reusable internal primitives used by multiple components
- `src/styles/tokens.ts` — theme token definitions
- `src/styles/theme.ts` — token merge and theme helpers
- `src/types/` — public and internal shared type definitions
- `src/utils/` — export helpers, schema helpers, streaming utilities, formatting helpers
- `src/test/` — shared test render helpers and mocks
- `.storybook/` — Storybook config
- `vitest.config.ts` and `src/test/setup.ts` — test config and environment setup
- `build/` — optional packaging helpers if Vite config becomes too large
- `.github/workflows/ci.yml` and `.github/workflows/release.yml` — CI/CD

**Expected component folders:**

- `src/components/general/button/`
- `src/components/general/input/`
- `src/components/general/table/`
- `src/components/general/form/`
- `src/components/general/modal/`
- `src/components/general/tabs/`
- `src/components/instrument/waveform-chart/`
- `src/components/instrument/spectrum-chart/`
- `src/components/instrument/instrument-panel/`
- `src/components/instrument/param-config-form/`
- `src/components/instrument/realtime-data-table/`

Each component folder should contain:
- `ComponentName.tsx`
- `ComponentName.module.css`
- `types.ts`
- `index.ts`
- `ComponentName.test.tsx`
- `ComponentName.stories.tsx`

## Phase 1: 项目基础设施搭建

### Task 1: Convert the starter app into a library package

**Files:**
- Modify: `hik-comps/package.json`
- Modify: `hik-comps/vite.config.ts`
- Modify: `hik-comps/tsconfig.json`
- Modify: `hik-comps/tsconfig.app.json`
- Create: `hik-comps/src/index.ts`
- Create: `hik-comps/src/components/.gitkeep`
- Create: `hik-comps/src/styles/.gitkeep`

- [ ] **Step 1: Replace app-oriented scripts with library-oriented scripts**

```json
{
  "name": "sci-instrument-ui",
  "version": "0.1.0",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "tsc -p tsconfig.app.json && vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "lint": "eslint ."
  }
}
```

- [ ] **Step 2: Run package validation after editing scripts**

Run: `npm pkg get scripts name version --prefix /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps`
Expected: JSON output with `sci-instrument-ui` and library/test/storybook scripts

- [ ] **Step 3: Convert Vite config to library mode**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'SciInstrumentUI',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'antd']
    }
  }
})
```

- [ ] **Step 4: Run a build to verify the library entry is recognized**

Run: `npm run build --prefix /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps`
Expected: build reaches `src/index.ts`; may still fail later due to missing exports until subsequent steps

- [ ] **Step 5: Create the initial public entry**

```ts
export {}
```

Write that into `src/index.ts` so the library build has a valid entry while infrastructure is being assembled.

- [ ] **Step 6: Commit**

```bash
git add hik-comps/package.json hik-comps/vite.config.ts hik-comps/tsconfig.json hik-comps/tsconfig.app.json hik-comps/src/index.ts
git commit -m "feat: convert hik-comps to library package"
```

### Task 2: Add core dependencies and shared directories

**Files:**
- Modify: `hik-comps/package.json`
- Create: `hik-comps/src/components/shared/index.ts`
- Create: `hik-comps/src/types/index.ts`
- Create: `hik-comps/src/utils/index.ts`
- Create: `hik-comps/src/test/setup.ts`

- [ ] **Step 1: Add UI, testing, Storybook, and YAML dependencies**

```json
{
  "dependencies": {
    "antd": "^6.0.0",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "yaml": "^2.8.1"
  },
  "devDependencies": {
    "@storybook/react-vite": "^8.6.0",
    "@storybook/addon-essentials": "^8.6.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "jsdom": "^26.1.0",
    "vitest": "^3.2.4"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install --prefix /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps`
Expected: lockfile updated with Ant Design, Storybook, Vitest, Testing Library, YAML

- [ ] **Step 3: Create shared module placeholders**

```ts
// src/components/shared/index.ts
export {}

// src/types/index.ts
export {}

// src/utils/index.ts
export {}
```

- [ ] **Step 4: Create test setup file**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Commit**

```bash
git add hik-comps/package.json hik-comps/package-lock.json hik-comps/src/components/shared/index.ts hik-comps/src/types/index.ts hik-comps/src/utils/index.ts hik-comps/src/test/setup.ts
git commit -m "feat: add component library dependencies and shared modules"
```

### Task 3: Establish theme tokens and theme helpers

**Files:**
- Create: `hik-comps/src/styles/tokens.ts`
- Create: `hik-comps/src/styles/theme.ts`
- Create: `hik-comps/src/styles/index.ts`
- Test: `hik-comps/src/styles/theme.test.ts`

- [ ] **Step 1: Write the failing theme merge test**

```ts
import { describe, expect, it } from 'vitest'
import { createThemeTokens } from './theme'

describe('createThemeTokens', () => {
  it('merges overrides onto defaults', () => {
    const tokens = createThemeTokens({ colorPrimary: '#123456' })
    expect(tokens.colorPrimary).toBe('#123456')
    expect(tokens.borderRadius).toBe(8)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps/src/styles/theme.test.ts`
Expected: FAIL because `theme.ts` does not exist yet

- [ ] **Step 3: Implement default tokens and merge helper**

```ts
// src/styles/tokens.ts
export interface SciInstrumentThemeTokens {
  colorPrimary: string
  colorDanger: string
  colorText: string
  colorBgContainer: string
  borderRadius: number
  controlHeightSM: number
  controlHeight: number
  controlHeightLG: number
}

export const defaultThemeTokens: SciInstrumentThemeTokens = {
  colorPrimary: '#1677ff',
  colorDanger: '#ff4d4f',
  colorText: '#1f1f1f',
  colorBgContainer: '#ffffff',
  borderRadius: 8,
  controlHeightSM: 28,
  controlHeight: 36,
  controlHeightLG: 44,
}
```

```ts
// src/styles/theme.ts
import { defaultThemeTokens, type SciInstrumentThemeTokens } from './tokens'

export function createThemeTokens(
  overrides: Partial<SciInstrumentThemeTokens> = {},
): SciInstrumentThemeTokens {
  return { ...defaultThemeTokens, ...overrides }
}
```

```ts
// src/styles/index.ts
export * from './tokens'
export * from './theme'
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps/src/styles/theme.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add hik-comps/src/styles/tokens.ts hik-comps/src/styles/theme.ts hik-comps/src/styles/index.ts hik-comps/src/styles/theme.test.ts
git commit -m "feat: add shared theme tokens"
```

### Task 4: Configure Vitest and shared test utilities

**Files:**
- Create: `hik-comps/vitest.config.ts`
- Create: `hik-comps/src/test/render.tsx`
- Modify: `hik-comps/tsconfig.app.json`
- Test: `hik-comps/src/test/render.test.tsx`

- [ ] **Step 1: Write the failing render helper test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TestProviders } from './render'

describe('TestProviders', () => {
  it('renders children', () => {
    render(
      <TestProviders>
        <span>hello</span>
      </TestProviders>,
    )

    expect(screen.getByText('hello')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps/src/test/render.test.tsx`
Expected: FAIL because `render.tsx` and config are missing

- [ ] **Step 3: Implement Vitest config and shared providers**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
})
```

```tsx
// src/test/render.tsx
import { ConfigProvider } from 'antd'
import type { PropsWithChildren } from 'react'
import { createThemeTokens } from '../styles/theme'

export function TestProviders({ children }: PropsWithChildren) {
  const tokens = createThemeTokens()

  return (
    <ConfigProvider theme={{ token: tokens }}>
      {children}
    </ConfigProvider>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps/src/test/render.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add hik-comps/vitest.config.ts hik-comps/src/test/render.tsx hik-comps/src/test/render.test.tsx hik-comps/tsconfig.app.json
git commit -m "feat: configure vitest for component testing"
```

### Task 5: Configure Storybook 8

**Files:**
- Create: `hik-comps/.storybook/main.ts`
- Create: `hik-comps/.storybook/preview.ts`
- Create: `hik-comps/src/stories/Introduction.mdx`

- [ ] **Step 1: Add Storybook config files**

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)', '../src/**/*.mdx'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}

export default config
```

```ts
// .storybook/preview.ts
import type { Preview } from '@storybook/react'
import { ConfigProvider } from 'antd'
import { createThemeTokens } from '../src/styles/theme'

const preview: Preview = {
  decorators: [
    (Story) => (
      <ConfigProvider theme={{ token: createThemeTokens() }}>
        <Story />
      </ConfigProvider>
    ),
  ],
}

export default preview
```

- [ ] **Step 2: Add an introduction doc page**

```mdx
import { Meta } from '@storybook/blocks'

<Meta title="Guide/Introduction" />

# sci-instrument-ui

Scientific instrument component library built with React, TypeScript, and Ant Design.
```

- [ ] **Step 3: Run Storybook smoke check**

Run: `npm run build-storybook --prefix /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps`
Expected: build completes successfully or fails only on missing component stories that will be added later

- [ ] **Step 4: Commit**

```bash
git add hik-comps/.storybook/main.ts hik-comps/.storybook/preview.ts hik-comps/src/stories/Introduction.mdx
git commit -m "feat: configure storybook for component library"
```

## Phase 2: 通用基础组件开发

### Task 6: Build Button

**Files:**
- Create: `hik-comps/src/components/general/button/Button.tsx`
- Create: `hik-comps/src/components/general/button/Button.module.css`
- Create: `hik-comps/src/components/general/button/types.ts`
- Create: `hik-comps/src/components/general/button/index.ts`
- Create: `hik-comps/src/components/general/button/Button.test.tsx`
- Create: `hik-comps/src/components/general/button/Button.stories.tsx`
- Modify: `hik-comps/src/index.ts`

- [ ] **Step 1: Write the failing Button test**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders loading state and icon', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Button loading icon={<span data-testid="icon">I</span>} onClick={onClick}>
        Save
      </Button>,
    )

    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run hik-comps/src/components/general/button/Button.test.tsx`
Expected: FAIL because Button files do not exist

- [ ] **Step 3: Implement Button with typed variants and sizes**

```ts
// types.ts
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'text'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
}
```

```tsx
// Button.tsx
import clsx from 'clsx'
import styles from './Button.module.css'
import type { ButtonProps } from './types'

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(styles.button, styles[variant], styles[size], className)}
      disabled={disabled || loading}
    >
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {loading ? <span className={styles.loading}>Loading...</span> : null}
      <span>{children}</span>
    </button>
  )
}
```

- [ ] **Step 4: Add CSS module states and exports**

```ts
// index.ts
export { Button } from './Button'
export type { ButtonProps, ButtonSize, ButtonVariant } from './types'
```

Use CSS classes named `.button`, `.primary`, `.secondary`, `.danger`, `.ghost`, `.text`, `.sm`, `.md`, `.lg`, `.icon`, `.loading`.

- [ ] **Step 5: Run Button test**

Run: `npx vitest run hik-comps/src/components/general/button/Button.test.tsx`
Expected: PASS

- [ ] **Step 6: Add Storybook story and root export**

```ts
// src/index.ts
export * from './components/general/button'
```

Create stories for primary, secondary, danger, loading, and icon usage.

- [ ] **Step 7: Commit**

```bash
git add hik-comps/src/components/general/button hik-comps/src/index.ts
git commit -m "feat: add foundational button component"
```

### Task 7: Build Input

**Files:**
- Create: `hik-comps/src/components/general/input/*`
- Modify: `hik-comps/src/index.ts`

- [ ] **Step 1: Write the failing Input test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders label and helper text', () => {
    render(<Input label="Voltage" helperText="Unit: V" />)
    expect(screen.getByLabelText('Voltage')).toBeInTheDocument()
    expect(screen.getByText('Unit: V')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run hik-comps/src/components/general/input/Input.test.tsx`
Expected: FAIL because Input files do not exist

- [ ] **Step 3: Implement Input with typed label, helper, and status props**

```ts
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  invalid?: boolean
}
```

Implement `Input.tsx` with a wrapping `<label>`, helper text, and an invalid state class.

- [ ] **Step 4: Add story/export and run test**

Run: `npx vitest run hik-comps/src/components/general/input/Input.test.tsx`
Expected: PASS

Then export from `src/index.ts` and add stories for default, invalid, and disabled states.

- [ ] **Step 5: Commit**

```bash
git add hik-comps/src/components/general/input hik-comps/src/index.ts
git commit -m "feat: add foundational input component"
```

### Task 8: Build Table

**Files:**
- Create: `hik-comps/src/components/general/table/*`
- Modify: `hik-comps/src/index.ts`

- [ ] **Step 1: Write the failing Table test for empty and custom cell rendering**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Table } from './Table'

describe('Table', () => {
  it('renders empty state and custom cells', () => {
    const { rerender } = render(<Table columns={[]} dataSource={[]} rowKey="id" />)
    expect(screen.getByText(/no data/i)).toBeInTheDocument()

    rerender(
      <Table
        rowKey="id"
        columns={[{ key: 'name', title: 'Name', dataIndex: 'name', render: (value) => <strong>{value}</strong> }]}
        dataSource={[{ id: '1', name: 'Alpha' }]}
      />,
    )

    expect(screen.getByText('Alpha').tagName).toBe('STRONG')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run hik-comps/src/components/general/table/Table.test.tsx`
Expected: FAIL because Table files do not exist

- [ ] **Step 3: Implement Table API**

Define typed columns with support for:
- custom render
- row selection
- sorting
- filtering
- pagination
- fixed columns
- virtual scrolling config placeholder

Wrap Ant Design `Table` rather than rebuilding table logic from scratch.

- [ ] **Step 4: Add stories for default, selectable, sortable, paginated, and virtual-scroll examples**

Create stories showing each supported behavior separately.

- [ ] **Step 5: Run Table test**

Run: `npx vitest run hik-comps/src/components/general/table/Table.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add hik-comps/src/components/general/table hik-comps/src/index.ts
git commit -m "feat: add foundational table component"
```

### Task 9: Build Form

**Files:**
- Create: `hik-comps/src/components/general/form/*`
- Modify: `hik-comps/src/index.ts`

- [ ] **Step 1: Write the failing Form test for schema-driven dynamic fields**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Form } from './Form'

describe('Form', () => {
  it('renders fields from schema', () => {
    render(
      <Form
        schema={{
          fields: [
            { name: 'temperature', label: 'Temperature', component: 'input' },
          ],
        }}
      />,
    )

    expect(screen.getByLabelText('Temperature')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run hik-comps/src/components/general/form/Form.test.tsx`
Expected: FAIL because Form files do not exist

- [ ] **Step 3: Implement foundational Form**

Build on Ant Design `Form` with:
- typed field schema
- sync/async validators
- field visibility and linkage callbacks
- dynamic field list support

- [ ] **Step 4: Add stories for manual form, JSON schema form, and dependent validation**

Include one story where `max` depends on `min`.

- [ ] **Step 5: Run Form tests**

Run: `npx vitest run hik-comps/src/components/general/form/Form.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add hik-comps/src/components/general/form hik-comps/src/index.ts
git commit -m "feat: add foundational form component"
```

### Task 10: Build Modal

**Files:**
- Create: `hik-comps/src/components/general/modal/*`
- Modify: `hik-comps/src/index.ts`

- [ ] **Step 1: Write the failing Modal test for fullscreen mode**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Modal } from './Modal'

describe('Modal', () => {
  it('renders fullscreen mode when enabled', () => {
    render(<Modal open title="Config" fullscreen>content</Modal>)
    expect(screen.getByRole('dialog')).toHaveAttribute('data-fullscreen', 'true')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run hik-comps/src/components/general/modal/Modal.test.tsx`
Expected: FAIL because Modal files do not exist

- [ ] **Step 3: Implement Modal wrapper**

Support:
- title/content/action layout
- fullscreen mode
- drag handle support
- nested modal z-index strategy

Use data attributes in tests rather than brittle style assertions.

- [ ] **Step 4: Add stories and run tests**

Run: `npx vitest run hik-comps/src/components/general/modal/Modal.test.tsx`
Expected: PASS

Include stories for standard, fullscreen, draggable, and nested modal examples.

- [ ] **Step 5: Commit**

```bash
git add hik-comps/src/components/general/modal hik-comps/src/index.ts
git commit -m "feat: add foundational modal component"
```

### Task 11: Build Tabs

**Files:**
- Create: `hik-comps/src/components/general/tabs/*`
- Modify: `hik-comps/src/index.ts`

- [ ] **Step 1: Write the failing Tabs test for lazy content**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Tabs } from './Tabs'

describe('Tabs', () => {
  it('lazily renders inactive content', async () => {
    const user = userEvent.setup()

    render(
      <Tabs
        items={[
          { key: 'a', label: 'A', children: <div>Panel A</div> },
          { key: 'b', label: 'B', children: <div>Panel B</div> },
        ]}
        lazy
      />,
    )

    expect(screen.getByText('Panel A')).toBeInTheDocument()
    expect(screen.queryByText('Panel B')).not.toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'B' }))
    expect(screen.getByText('Panel B')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run hik-comps/src/components/general/tabs/Tabs.test.tsx`
Expected: FAIL because Tabs files do not exist

- [ ] **Step 3: Implement Tabs wrapper**

Support:
- editable tabs
- lazy content rendering
- drag-sort hooks via ordered items and `onOrderChange`

- [ ] **Step 4: Add stories and run tests**

Run: `npx vitest run hik-comps/src/components/general/tabs/Tabs.test.tsx`
Expected: PASS

Include stories for default, editable, lazy, and sortable examples.

- [ ] **Step 5: Commit**

```bash
git add hik-comps/src/components/general/tabs hik-comps/src/index.ts
git commit -m "feat: add foundational tabs component"
```

## Phase 3: 科学仪器专用组件开发

### Task 12: Build shared chart primitives

**Files:**
- Create: `hik-comps/src/components/shared/chart-canvas/ChartCanvas.tsx`
- Create: `hik-comps/src/components/shared/chart-canvas/useViewport.ts`
- Create: `hik-comps/src/components/shared/chart-canvas/types.ts`
- Test: `hik-comps/src/components/shared/chart-canvas/useViewport.test.ts`

- [ ] **Step 1: Write the failing viewport math test**

```ts
import { describe, expect, it } from 'vitest'
import { clampViewport } from './useViewport'

describe('clampViewport', () => {
  it('keeps viewport within range', () => {
    expect(clampViewport({ start: -10, end: 120 }, 0, 100)).toEqual({ start: 0, end: 100 })
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run hik-comps/src/components/shared/chart-canvas/useViewport.test.ts`
Expected: FAIL because files do not exist

- [ ] **Step 3: Implement viewport helper and base canvas container**

Implement `clampViewport`, typed viewport state, and `ChartCanvas` wrapper with `<canvas>` plus overlay layer for crosshair/annotations.

- [ ] **Step 4: Run the test**

Run: `npx vitest run hik-comps/src/components/shared/chart-canvas/useViewport.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add hik-comps/src/components/shared/chart-canvas
git commit -m "feat: add shared chart canvas primitives"
```

### Task 13: Build WaveformChart

**Files:**
- Create: `hik-comps/src/components/instrument/waveform-chart/*`
- Modify: `hik-comps/src/index.ts`

- [ ] **Step 1: Write the failing WaveformChart test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { WaveformChart } from './WaveformChart'

describe('WaveformChart', () => {
  it('renders empty state and multiple channels', () => {
    const { rerender } = render(<WaveformChart channels={[]} />)
    expect(screen.getByText(/no waveform data/i)).toBeInTheDocument()

    rerender(
      <WaveformChart
        channels={[
          { id: 'ch1', label: 'A', points: [0, 1, 2] },
          { id: 'ch2', label: 'B', points: [2, 1, 0] },
        ]}
      />,
    )

    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run hik-comps/src/components/instrument/waveform-chart/WaveformChart.test.tsx`
Expected: FAIL because files do not exist

- [ ] **Step 3: Implement WaveformChart baseline and advanced props**

Support:
- Canvas rendering
- multi-channel overlays
- viewport state for zoom/pan
- crosshair overlay
- `onExport(type)` callback for `png | svg | csv`
- external incremental data updates through props

- [ ] **Step 4: Add stories and tests for empty, live stream, and export states**

Run: `npx vitest run hik-comps/src/components/instrument/waveform-chart/WaveformChart.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add hik-comps/src/components/instrument/waveform-chart hik-comps/src/index.ts
git commit -m "feat: add waveform chart component"
```

### Task 14: Build SpectrumChart

**Files:**
- Create: `hik-comps/src/components/instrument/spectrum-chart/*`
- Modify: `hik-comps/src/index.ts`

- [ ] **Step 1: Write the failing SpectrumChart test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SpectrumChart } from './SpectrumChart'

describe('SpectrumChart', () => {
  it('renders selected spectrum type and overlays', () => {
    render(
      <SpectrumChart
        type="infrared"
        spectra={[{ id: 'base', label: 'Base', points: [1, 2, 3] }]}
      />,
    )

    expect(screen.getByText(/infrared/i)).toBeInTheDocument()
    expect(screen.getByText('Base')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run hik-comps/src/components/instrument/spectrum-chart/SpectrumChart.test.tsx`
Expected: FAIL because files do not exist

- [ ] **Step 3: Implement SpectrumChart**

Support:
- type union `infrared | ultraviolet | mass`
- overlay comparison
- peak annotations
- peak picking and integration callbacks
- baseline correction state

- [ ] **Step 4: Add stories/tests**

Run: `npx vitest run hik-comps/src/components/instrument/spectrum-chart/SpectrumChart.test.tsx`
Expected: PASS

Create stories for infrared, mass, overlay, and peak-analysis examples.

- [ ] **Step 5: Commit**

```bash
git add hik-comps/src/components/instrument/spectrum-chart hik-comps/src/index.ts
git commit -m "feat: add spectrum chart component"
```

### Task 15: Build InstrumentPanel

**Files:**
- Create: `hik-comps/src/components/instrument/instrument-panel/*`
- Modify: `hik-comps/src/index.ts`

- [ ] **Step 1: Write the failing InstrumentPanel test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { InstrumentPanel } from './InstrumentPanel'

describe('InstrumentPanel', () => {
  it('renders status indicators and controls', () => {
    render(
      <InstrumentPanel
        items={[
          { id: 'status', type: 'indicator', label: 'Pump', status: 'ok' },
          { id: 'speed', type: 'slider', label: 'Speed', value: 40 },
        ]}
      />,
    )

    expect(screen.getByText('Pump')).toBeInTheDocument()
    expect(screen.getByText('Speed')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run hik-comps/src/components/instrument/instrument-panel/InstrumentPanel.test.tsx`
Expected: FAIL because files do not exist

- [ ] **Step 3: Implement InstrumentPanel and control primitives**

Support:
- draggable layout ordering by prop
- indicator item
- slider item
- knob item
- threshold editor callback

- [ ] **Step 4: Add stories/tests**

Run: `npx vitest run hik-comps/src/components/instrument/instrument-panel/InstrumentPanel.test.tsx`
Expected: PASS

Include stories for status dashboard, mixed control panel, and alarm threshold config.

- [ ] **Step 5: Commit**

```bash
git add hik-comps/src/components/instrument/instrument-panel hik-comps/src/index.ts
git commit -m "feat: add instrument panel component"
```

### Task 16: Build ParamConfigForm

**Files:**
- Create: `hik-comps/src/components/instrument/param-config-form/*`
- Modify: `hik-comps/src/index.ts`

- [ ] **Step 1: Write the failing ParamConfigForm test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ParamConfigForm } from './ParamConfigForm'

describe('ParamConfigForm', () => {
  it('renders grouped parameters and templates', () => {
    render(
      <ParamConfigForm
        groups={[{ key: 'acq', title: 'Acquisition' }]}
        fields={[{ name: 'gain', label: 'Gain', group: 'acq', component: 'input' }]}
        templates={[{ key: 'default', label: 'Default', values: { gain: 1 } }]}
      />,
    )

    expect(screen.getByText('Acquisition')).toBeInTheDocument()
    expect(screen.getByText('Default')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run hik-comps/src/components/instrument/param-config-form/ParamConfigForm.test.tsx`
Expected: FAIL because files do not exist

- [ ] **Step 3: Implement ParamConfigForm on top of Form**

Support:
- collapsible parameter groups
- dependent constraints (`min`/`max` style)
- read-only mode
- template apply callback
- JSON/YAML import/export helpers from `src/utils`

- [ ] **Step 4: Add stories/tests**

Run: `npx vitest run hik-comps/src/components/instrument/param-config-form/ParamConfigForm.test.tsx`
Expected: PASS

Include stories for grouped config, dependent limits, read-only, and template import/export.

- [ ] **Step 5: Commit**

```bash
git add hik-comps/src/components/instrument/param-config-form hik-comps/src/index.ts
git commit -m "feat: add parameter configuration form"
```

### Task 17: Build RealtimeDataTable

**Files:**
- Create: `hik-comps/src/components/instrument/realtime-data-table/*`
- Modify: `hik-comps/src/index.ts`

- [ ] **Step 1: Write the failing RealtimeDataTable test**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { RealtimeDataTable } from './RealtimeDataTable'

describe('RealtimeDataTable', () => {
  it('supports pause and threshold highlighting', async () => {
    const user = userEvent.setup()

    render(
      <RealtimeDataTable
        rowKey="id"
        columns={[{ key: 'value', title: 'Value', dataIndex: 'value' }]}
        dataSource={[{ id: '1', value: 120 }]}
        thresholds={{ value: 100 }}
      />,
    )

    expect(screen.getByText('120')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /pause/i }))
    expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run hik-comps/src/components/instrument/realtime-data-table/RealtimeDataTable.test.tsx`
Expected: FAIL because files do not exist

- [ ] **Step 3: Implement RealtimeDataTable on top of Table**

Support:
- append-only incoming rows by prop updates
- pause/resume visible updates
- threshold highlighting rules
- configurable buffer size

- [ ] **Step 4: Add stories/tests**

Run: `npx vitest run hik-comps/src/components/instrument/realtime-data-table/RealtimeDataTable.test.tsx`
Expected: PASS

Include stories for normal flow, threshold highlighting, paused stream, and small buffer trimming.

- [ ] **Step 5: Commit**

```bash
git add hik-comps/src/components/instrument/realtime-data-table hik-comps/src/index.ts
git commit -m "feat: add realtime data table component"
```

## Phase 4: 组件文档与测试补全

### Task 18: Fill documentation gaps and add shared docs pages

**Files:**
- Modify: all `*.stories.tsx` files created above
- Create: `hik-comps/src/stories/theme/ThemeTokens.stories.tsx`
- Create: `hik-comps/README.md`

- [ ] **Step 1: Audit story coverage against plan/spec**

Verify each component has stories for:
- default
- disabled/loading/empty when applicable
- advanced features named in OpenSpec

- [ ] **Step 2: Add theme token documentation story**

Create `ThemeTokens.stories.tsx` that renders color, radius, and control-height token previews.

- [ ] **Step 3: Rewrite README for library consumers**

Include:
- install command
- basic import example
- theme override example
- Storybook usage
- component groups list

- [ ] **Step 4: Run Storybook build**

Run: `npm run build-storybook --prefix /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add hik-comps/src/stories hik-comps/README.md hik-comps/src/components/**/*.stories.tsx
git commit -m "docs: complete component library stories and readme"
```

### Task 19: Add missing integration and utility tests

**Files:**
- Create: `hik-comps/src/utils/export.test.ts`
- Create: `hik-comps/src/utils/schema.test.ts`
- Create: `hik-comps/src/components/instrument/__tests__/integration.test.tsx`

- [ ] **Step 1: Write export utility test**

```ts
import { describe, expect, it } from 'vitest'
import { toCsvRows } from '../export'

describe('toCsvRows', () => {
  it('serializes row objects into csv lines', () => {
    expect(toCsvRows([{ time: 1, value: 2 }])).toContain('time,value')
  })
})
```

- [ ] **Step 2: Write integration test combining Form/Table instrument extensions**

Test that `ParamConfigForm` emits updated values which can be rendered in `RealtimeDataTable` without type mismatch.

- [ ] **Step 3: Implement missing utilities and run full tests**

Run: `npm test --prefix /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add hik-comps/src/utils hik-comps/src/components/instrument/__tests__
git commit -m "test: add integration and utility coverage"
```

## Phase 5: 打包发布与 CI/CD

### Task 20: Finalize exports and packaging

**Files:**
- Modify: `hik-comps/package.json`
- Modify: `hik-comps/src/index.ts`
- Create: `hik-comps/src/components/general/index.ts`
- Create: `hik-comps/src/components/instrument/index.ts`

- [ ] **Step 1: Add grouped exports**

```ts
// src/components/general/index.ts
export * from './button'
export * from './input'
export * from './table'
export * from './form'
export * from './modal'
export * from './tabs'

// src/components/instrument/index.ts
export * from './waveform-chart'
export * from './spectrum-chart'
export * from './instrument-panel'
export * from './param-config-form'
export * from './realtime-data-table'

// src/index.ts
export * from './components/general'
export * from './components/instrument'
export * from './styles'
export * from './types'
```

- [ ] **Step 2: Add package subpath exports**

Update `package.json` exports with:
- `./general`
- `./instrument`
- `./styles`

- [ ] **Step 3: Run build and inspect dist**

Run: `npm run build --prefix /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps && ls /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps/dist`
Expected: built entry files and type declarations present

- [ ] **Step 4: Commit**

```bash
git add hik-comps/package.json hik-comps/src/index.ts hik-comps/src/components/general/index.ts hik-comps/src/components/instrument/index.ts
git commit -m "feat: finalize package exports"
```

### Task 21: Add CI workflow

**Files:**
- Create: `hik-comps/.github/workflows/ci.yml`

- [ ] **Step 1: Create CI workflow**

```yml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: hik-comps
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: hik-comps/package-lock.json
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
      - run: npm run build-storybook
```

- [ ] **Step 2: Validate workflow syntax locally**

Run: `python - <<'PY'
import yaml, pathlib
path = pathlib.Path('/Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps/.github/workflows/ci.yml')
print(yaml.safe_load(path.read_text())['name'])
PY`
Expected: `CI`

- [ ] **Step 3: Commit**

```bash
git add hik-comps/.github/workflows/ci.yml
git commit -m "ci: add verification workflow"
```

### Task 22: Add release workflow and final verification

**Files:**
- Create: `hik-comps/.github/workflows/release.yml`
- Modify: `hik-comps/package.json`

- [ ] **Step 1: Create release workflow**

```yml
name: Release

on:
  workflow_dispatch:

jobs:
  release:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: hik-comps
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: hik-comps/package-lock.json
      - run: npm ci
      - run: npm run build
      - run: npm pack
```
```

- [ ] **Step 2: Add a package verification script**

Add to `package.json`:

```json
{
  "scripts": {
    "pack:check": "npm pack --dry-run"
  }
}
```

- [ ] **Step 3: Run final verification**

Run: `npm run lint --prefix /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps && npm test --prefix /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps && npm run build --prefix /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps && npm run build-storybook --prefix /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps && npm run pack:check --prefix /Users/zhangxinbo/ai_verify_pro/comps_aigc_demo/hik-comps`
Expected: all commands PASS

- [ ] **Step 4: Commit**

```bash
git add hik-comps/.github/workflows/release.yml hik-comps/package.json
git commit -m "ci: add release workflow and pack verification"
```

## Spec Coverage Check

- MVP foundation setup is covered by Tasks 1-5 and 20-22.
- Foundational components from OpenSpec plus requested `Input` and `Tabs` order are covered by Tasks 6-11.
- MVP instrument components are covered by Tasks 12-17.
- v1.1 advanced instrument capabilities are covered by Tasks 12-17, with waveform/spectrum split, control panel, advanced parameter config, and streaming data table.
- Documentation and testing obligations are covered by Tasks 18-19.
- Packaging and CI/CD are covered by Tasks 20-22.

## Notes for Execution

- Implement components in the exact order above; later instrument tasks assume foundational `Form`, `Table`, `Modal`, and theme/test infrastructure already exist.
- Prefer wrapping Ant Design for general components instead of reimplementing base UI logic.
- Keep transport ownership outside components: pass streamed data and callbacks through typed props.
- Keep chart rendering Canvas-first for waveform and overlay/crosshair workflows.
