# HomePage 暗黑兼容（保持结构不变）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让 `apps/sci-comp-documention/docs/HomePage.tsx` 在不改变现有页面结构、内容顺序与交互方式的前提下，完成暗黑模式样式兼容，并保证亮色模式不明显退化。

**Architecture:** 本次改造严格限定在 `HomePage.tsx` 单文件内完成。实现方式是在文件顶部引入少量暗黑语义常量，统一收敛页面底色、卡片层次、文字层级、边框、品牌 glow 和阴影模型，然后仅重写 `styles` 对象中的颜色/描边/背景/阴影值，不调整 DOM 结构、section 顺序或已有 hover 逻辑。

**Tech Stack:** React 19、TypeScript 5.x、Rspress、Vitest、React Testing Library、Ant Design 6、`@sci-comp/core`

---

## File Structure

- **Modify:** `apps/sci-comp-documention/docs/HomePage.tsx`
  - 保持组件结构、数组数据和交互逻辑不变。
  - 在文件顶部增加暗黑语义常量。
  - 将 `styles` 中依赖亮色假设的背景、文字、边框、阴影、品牌透明度写法改为消费语义常量。

- **Create:** `apps/sci-comp-test/src/styles/homePage.test.tsx`
  - 提供最小渲染级回归测试。
  - 不做视觉快照，只验证首页主标题、关键链接和典型文案在主题 providers 下稳定渲染。

## Task 1: 建立首页暗黑兼容的最小回归测试

**Files:**

- Create: `apps/sci-comp-test/src/styles/homePage.test.tsx`
- Reuse: `apps/sci-comp-test/src/support/render.tsx`
- Render target: `apps/sci-comp-documention/docs/HomePage.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it } from 'vitest'
import { render, screen } from '../support/render'
import { HomePage } from '../../../sci-comp-documention/docs/HomePage'

describe('HomePage', () => {
  it('renders homepage hero and primary entry links inside theme providers', () => {
    render(<HomePage />)

    expect(
      screen.getByRole('heading', { name: '你的设计系统基础' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '立即开始' })).toHaveAttribute(
      'href',
      '/guide/getting-started',
    )
    expect(screen.getByRole('link', { name: '查看组件' })).toHaveAttribute(
      'href',
      '/components/button',
    )
    expect(screen.getByText('核心特性')).toBeInTheDocument()
    expect(screen.getByText('组件预览')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it passes as a baseline guard**

Run:

```bash
pnpm --filter sci-comp-test test -- homePage.test.tsx
```

Expected: PASS，证明当前首页在测试基座下可稳定渲染；这条测试作为后续样式重写时的最小回归护栏，而不是结构变更驱动的红灯测试。

- [ ] **Step 3: Keep the test file unchanged during later implementation unless the assertion is objectively wrong**

Implementation note:

```tsx
// Do not broaden this into visual snapshot coverage.
// Keep assertions focused on stable structure-level rendering.
```

- [ ] **Step 4: Re-run the same test before moving to style implementation**

Run:

```bash
pnpm --filter sci-comp-test test -- homePage.test.tsx
```

Expected: PASS，再次确认测试基线稳定。

- [ ] **Step 5: Commit**

```bash
git add apps/sci-comp-test/src/styles/homePage.test.tsx
git commit -m "test: add homepage render regression guard"
```

## Task 2: 在 HomePage.tsx 内建立暗黑语义常量并替换文本/表层来源

**Files:**

- Modify: `apps/sci-comp-documention/docs/HomePage.tsx`
- Test: `apps/sci-comp-test/src/styles/homePage.test.tsx`

- [ ] **Step 1: Replace the top-level color helper block with semantic surface and text tokens**

Find this block near the file top:

```tsx
const tokens = createThemeTokens()
const mutedTextColor = `${tokens.colorText}B8`
const tertiaryTextColor = `${tokens.colorText}66`
const surfaceTintColor = `${tokens.colorPrimary}06`

const surfaces = {
  card: 'var(--rp-c-bg)',
  cardMuted: 'var(--rp-c-bg-soft)',
  cardSubtle: 'var(--rp-c-bg-mute)',
  border: 'var(--rp-c-divider-light)',
  borderStrong: 'var(--rp-c-divider)',
  text: 'var(--rp-c-text-1)',
  textSecondary: 'var(--rp-c-text-2)',
  textTertiary: 'var(--rp-c-text-3)',
  brand: 'var(--rp-c-brand)',
  brandTint: 'var(--rp-c-brand-tint)',
  codeText: 'var(--rp-c-text-code)',
  codeBackground: 'var(--rp-c-text-code-bg)',
  shadow: 'var(--rp-c-shadow-3)',
} as const
```

Replace it with:

```tsx
const tokens = createThemeTokens()

const surfaces = {
  page: 'var(--rp-c-bg)',
  surface: 'var(--rp-c-bg-soft)',
  surfaceMuted: 'var(--rp-c-bg-mute)',
  surfaceElevated: 'color-mix(in srgb, var(--rp-c-bg-soft) 78%, black 22%)',
  overlay: 'color-mix(in srgb, var(--rp-c-bg) 86%, transparent)',
  border: 'var(--rp-c-divider-light)',
  borderStrong: 'var(--rp-c-divider)',
  borderBrand:
    'color-mix(in srgb, var(--rp-c-brand) 34%, var(--rp-c-divider-light) 66%)',
  text: 'var(--rp-c-text-1)',
  textSecondary: 'var(--rp-c-text-2)',
  textTertiary: 'var(--rp-c-text-3)',
  brand: 'var(--rp-c-brand)',
  brandTint: 'var(--rp-c-brand-tint)',
  brandSoft: 'color-mix(in srgb, var(--rp-c-brand) 14%, transparent)',
  brandGlow: 'color-mix(in srgb, var(--rp-c-brand) 20%, transparent)',
  brandShadow: 'color-mix(in srgb, var(--rp-c-brand) 24%, transparent)',
  codeText: 'var(--rp-c-text-code)',
  codeBackground: 'var(--rp-c-text-code-bg)',
  shadowSoft: '0 10px 28px rgba(0, 0, 0, 0.16)',
  shadowElevated: '0 18px 44px rgba(0, 0, 0, 0.24)',
} as const
```

- [ ] **Step 2: Update page-level and text-level style values to consume semantic text/surface tokens**

Apply these exact replacements inside `styles`:

```tsx
page: {
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '20px clamp(16px, 3vw, 32px) 88px',
  color: surfaces.text,
  boxSizing: 'border-box' as const,
},
```

```tsx
topLink: {
  color: surfaces.text,
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 600,
  whiteSpace: 'nowrap' as const,
  padding: '8px 0',
  opacity: 0.86,
  letterSpacing: '-0.01em',
  transition: 'all 0.2s ease',
  position: 'relative' as const,
},
```

```tsx
counter: {
  color: surfaces.textSecondary,
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.02em',
},
```

```tsx
heroDescription: {
  margin: '24px 0 0',
  maxWidth: '760px',
  fontSize: 'clamp(16px, 2.2vw, 20px)',
  lineHeight: 1.8,
  color: surfaces.textSecondary,
  textWrap: 'pretty' as const,
  animation: 'slideUp 0.8s ease-out',
},
```

```tsx
heroMetricLabel: {
  display: 'block',
  color: surfaces.textTertiary,
  fontSize: '13px',
  lineHeight: 1.4,
  fontWeight: 700,
},
```

```tsx
sectionTitle: {
  fontSize: 'clamp(32px, 5vw, 42px)',
  fontWeight: 800,
  color: surfaces.text,
  margin: '0 0 12px',
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
},
```

```tsx
sectionDescription: {
  fontSize: 'clamp(15px, 2vw, 18px)',
  color: surfaces.textSecondary,
  margin: '0 auto',
  maxWidth: '600px',
  lineHeight: 1.7,
},
```

```tsx
featureDescription: {
  fontSize: '14px',
  color: surfaces.textSecondary,
  lineHeight: 1.7,
  margin: 0,
},
```

```tsx
componentDescription: {
  fontSize: '14px',
  color: surfaces.textSecondary,
  lineHeight: 1.7,
  margin: '0 0 20px',
},
```

```tsx
footerLink: {
  color: surfaces.textSecondary,
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 500,
  transition: 'color 0.2s ease',
},
```

```tsx
footerCopyright: {
  color: surfaces.textTertiary,
  fontSize: '13px',
  margin: 0,
},
```

- [ ] **Step 3: Run the homepage test to verify text/source refactor preserved rendering**

Run:

```bash
pnpm --filter sci-comp-test test -- homePage.test.tsx
```

Expected: PASS，说明文本/表层语义替换没有破坏页面渲染。

- [ ] **Step 4: Commit**

```bash
git add apps/sci-comp-documention/docs/HomePage.tsx
git commit -m "refactor: add semantic dark surfaces for homepage"
```

## Task 3: 重写顶部条、Hero 与卡片壳层的暗黑模式背景/边框/阴影

**Files:**

- Modify: `apps/sci-comp-documention/docs/HomePage.tsx`
- Test: `apps/sci-comp-test/src/styles/homePage.test.tsx`

- [ ] **Step 1: Update page glow and top strip shell styles to dark-mode-friendly surfaces**

Replace these style blocks:

```tsx
pageBackground: {
  position: 'absolute' as const,
  inset: '8px auto auto 50%',
  width: 'min(980px, 92vw)',
  height: '560px',
  transform: 'translateX(-50%)',
  borderRadius: '999px',
  background: `radial-gradient(circle, ${tokens.colorPrimary}18 0%, ${surfaceTintColor} 36%, ${tokens.colorBgContainer}00 74%)`,
  pointerEvents: 'none' as const,
  filter: 'blur(24px)',
  opacity: 1,
  zIndex: -2,
  animation: 'pulse 8s ease-in-out infinite',
},
```

with:

```tsx
pageBackground: {
  position: 'absolute' as const,
  inset: '8px auto auto 50%',
  width: 'min(980px, 92vw)',
  height: '560px',
  transform: 'translateX(-50%)',
  borderRadius: '999px',
  background: `radial-gradient(circle, ${surfaces.brandGlow} 0%, transparent 70%)`,
  pointerEvents: 'none' as const,
  filter: 'blur(28px)',
  opacity: 0.95,
  zIndex: -2,
  animation: 'pulse 8s ease-in-out infinite',
},
```

Replace:

```tsx
pageGlow: {
  position: 'absolute' as const,
  inset: '92px auto auto calc(50% + 180px)',
  width: 'min(320px, 42vw)',
  height: '320px',
  transform: 'translateX(-50%)',
  borderRadius: '999px',
  background: `radial-gradient(circle, ${tokens.colorText}18 0%, ${tokens.colorBgContainer}00 72%)`,
  pointerEvents: 'none' as const,
  filter: 'blur(40px)',
  zIndex: -1,
  animation: 'float 6s ease-in-out infinite',
},
```

with:

```tsx
pageGlow: {
  position: 'absolute' as const,
  inset: '92px auto auto calc(50% + 180px)',
  width: 'min(320px, 42vw)',
  height: '320px',
  transform: 'translateX(-50%)',
  borderRadius: '999px',
  background: `radial-gradient(circle, ${surfaces.brandSoft} 0%, transparent 74%)`,
  pointerEvents: 'none' as const,
  filter: 'blur(44px)',
  zIndex: -1,
  animation: 'float 6s ease-in-out infinite',
},
```

Replace:

```tsx
topStrip: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '20px',
  minHeight: '72px',
  padding: '12px 16px',
  flexWrap: 'wrap' as const,
  borderRadius: '24px',
  border: `1px solid ${tokens.colorPrimary}1F`,
  background: `${tokens.colorBgContainer}E6`,
  boxShadow: `0 20px 52px ${tokens.colorPrimary}12`,
  backdropFilter: 'blur(18px)',
  position: 'sticky' as const,
  top: '12px',
  zIndex: 3,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
},
```

with:

```tsx
topStrip: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '20px',
  minHeight: '72px',
  padding: '12px 16px',
  flexWrap: 'wrap' as const,
  borderRadius: '24px',
  border: `1px solid ${surfaces.borderBrand}`,
  background: surfaces.overlay,
  boxShadow: surfaces.shadowElevated,
  backdropFilter: 'blur(18px)',
  position: 'sticky' as const,
  top: '12px',
  zIndex: 3,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
},
```

Replace `topStripHover` with:

```tsx
topStripHover: {
  border: `1px solid ${surfaces.borderStrong}`,
  boxShadow: `0 22px 56px ${surfaces.brandShadow}`,
  transform: 'translateY(-2px)',
},
```

- [ ] **Step 2: Update badge, input shell, icon button, hero metric, feature card and component card shells**

Apply these exact replacements:

```tsx
badge: {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 18px',
  borderRadius: '999px',
  background: `linear-gradient(135deg, ${surfaces.brandSoft} 0%, ${surfaces.overlay} 100%)`,
  border: `1px solid ${surfaces.borderBrand}`,
  color: surfaces.text,
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.02em',
  maxWidth: '100%',
  boxShadow: `0 14px 34px ${surfaces.brandShadow}`,
  backdropFilter: 'blur(18px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: 'slideUp 0.6s ease-out',
},
```

```tsx
fakeSearch: {
  width: 'min(320px, 100%)',
  minWidth: '220px',
  padding: '12px 18px',
  borderRadius: '16px',
  border: `1px solid ${surfaces.border}`,
  background: surfaces.surfaceElevated,
  color: surfaces.textTertiary,
  fontSize: '14px',
  boxSizing: 'border-box' as const,
  boxShadow: surfaces.shadowSoft,
  transition: 'all 0.3s ease',
},
```

```tsx
fakeSearchFocus: {
  border: `1px solid ${surfaces.borderBrand}`,
  boxShadow: `0 14px 32px ${surfaces.brandShadow}`,
},
```

```tsx
iconButton: {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '42px',
  height: '42px',
  borderRadius: '14px',
  border: `1px solid ${surfaces.border}`,
  background: surfaces.surfaceElevated,
  fontSize: '16px',
  flexShrink: 0,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
},
```

```tsx
iconButtonHover: {
  background: surfaces.surface,
  border: `1px solid ${surfaces.borderBrand}`,
  transform: 'translateY(-2px)',
  boxShadow: `0 8px 20px ${surfaces.brandShadow}`,
},
```

```tsx
heroMetric: {
  borderRadius: '24px',
  border: `1px solid ${surfaces.border}`,
  background: `linear-gradient(135deg, ${surfaces.surfaceElevated} 0%, ${surfaces.surface} 100%)`,
  padding: '20px',
  boxShadow: surfaces.shadowSoft,
  backdropFilter: 'blur(18px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default',
},
```

```tsx
heroMetricHover: {
  transform: 'translateY(-4px) scale(1.02)',
  boxShadow: `0 20px 42px ${surfaces.brandShadow}`,
  border: `1px solid ${surfaces.borderBrand}`,
},
```

```tsx
featureCard: {
  background: surfaces.surfaceElevated,
  borderRadius: '28px',
  padding: '32px',
  boxShadow: surfaces.shadowSoft,
  border: `1px solid ${surfaces.border}`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative' as const,
  overflow: 'hidden',
},
```

```tsx
featureCardHover: {
  transform: 'translateY(-8px) scale(1.02)',
  boxShadow: `0 24px 56px ${surfaces.brandShadow}`,
  border: `1px solid ${surfaces.borderBrand}`,
},
```

```tsx
componentsSection: {
  padding: '72px 0',
  background: `linear-gradient(180deg, ${surfaces.brandSoft} 0%, ${surfaces.page} 100%)`,
  borderRadius: '48px',
  margin: '32px -32px',
},
```

```tsx
componentCard: {
  background: surfaces.surfaceElevated,
  borderRadius: '28px',
  padding: '28px',
  boxShadow: surfaces.shadowSoft,
  border: `1px solid ${surfaces.border}`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative' as const,
  overflow: 'hidden',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'block',
},
```

```tsx
componentCardHover: {
  transform: 'translateY(-6px) scale(1.02)',
  boxShadow: `0 20px 48px ${surfaces.brandShadow}`,
  border: `1px solid ${surfaces.borderBrand}`,
},
```

```tsx
componentArrow: {
  position: 'absolute' as const,
  right: '28px',
  bottom: '28px',
  fontSize: '22px',
  color: surfaces.textSecondary,
  opacity: 0.72,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
},
```

- [ ] **Step 3: Update footer and residual shell colors to complete the dark pass**

Apply these replacements:

```tsx
footer: {
  marginTop: '64px',
  padding: '48px 0 24px',
  borderTop: `1px solid ${surfaces.border}`,
  textAlign: 'center' as const,
},
```

```tsx
brandVersion: {
  fontSize: '13px',
  color: surfaces.textSecondary,
  background: surfaces.brandSoft,
  padding: '6px 12px',
  borderRadius: '999px',
  fontWeight: 600,
},
```

```tsx
footerLinkHover: {
  color: surfaces.brand,
},
```

Also update any remaining `tokens.colorText`, `mutedTextColor`, `tertiaryTextColor`, `tokens.colorBgContainer`, or `tokens.colorPrimary + alpha` usages inside shell/background/border/text style blocks so they consume the new semantic constants instead. Do not change array data, JSX structure, or event handlers.

- [ ] **Step 4: Run the focused test and fix any regressions**

Run:

```bash
pnpm --filter sci-comp-test test -- homePage.test.tsx
```

Expected: PASS。

- [ ] **Step 5: Commit**

```bash
git add apps/sci-comp-documention/docs/HomePage.tsx
git commit -m "fix: align homepage styles with dark mode surfaces"
```

## Task 4: 完成最终验证并记录人工验收重点

**Files:**

- Verify: `apps/sci-comp-documention/docs/HomePage.tsx`
- Verify: `apps/sci-comp-test/src/styles/homePage.test.tsx`

- [ ] **Step 1: Run the homepage regression test**

Run:

```bash
pnpm --filter sci-comp-test test -- homePage.test.tsx
```

Expected: PASS。

- [ ] **Step 2: Run documentation typecheck**

Run:

```bash
pnpm --filter sci-comp-documention typecheck
```

Expected: PASS with no TypeScript errors。

- [ ] **Step 3: Run documentation build**

Run:

```bash
pnpm --filter sci-comp-documention build
```

Expected: PASS，Rspress 文档站可正常构建。

- [ ] **Step 4: Perform manual visual acceptance in both light and dark mode**

Check these exact items on the homepage:

```text
Light mode:
- Hero 标题渐变仍清晰，不因暗黑兼容变脏
- 顶部条、卡片、footer 没有明显退化

Dark mode:
- Hero 标题清晰，不发虚、不刺眼
- Hero 描述文、section 描述文、卡片说明文层级明确
- HeroMetric / FeatureCard / ComponentCard 边界清楚
- TopStrip / fakeSearch / iconButton 不发白也不糊成一团
- pageBackground / pageGlow 有氛围但不过度抢内容
- Footer 有自然收口，不会淡到消失
```

If manual browser verification is not possible in-session, explicitly report that limitation instead of claiming it was done.

- [ ] **Step 5: Commit**

```bash
git add apps/sci-comp-documention/docs/HomePage.tsx apps/sci-comp-test/src/styles/homePage.test.tsx
git commit -m "docs: polish homepage dark mode compatibility"
```

## Spec Coverage Check

- **Only modify `HomePage.tsx`** → Covered by Tasks 2-4.
- **Allow a few semantic constants in-file** → Covered by Task 2.
- **Keep structure unchanged** → Explicitly constrained in Tasks 2 and 3.
- **Do not change other docs pages** → Scope is limited in file structure and verification tasks.
- **Do not modify `packages/sci-comp-core` runtime theme APIs** → Explicit non-goal; no task touches core.
- **Prioritize readability while preserving brand feel** → Covered by Task 3 shell/text/glow rewrite and Task 4 manual acceptance.

No spec gaps found.
