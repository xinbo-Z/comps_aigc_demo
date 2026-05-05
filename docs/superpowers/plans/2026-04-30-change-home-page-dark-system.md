# HomePage Dark Mode Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为文档站首页实现品牌展示型重设计，并让其在 Rspress 亮色/暗色模式下都保持高对比、高完成度和明确入口导向。

**Architecture:** 以首页专用组织方式重构当前超长 `HomePage.tsx`：将静态数据、视觉语义和 section 组件拆成少量首页专用文件，再由 `HomePage.tsx` 负责页面装配。基础可读层统一消费 `--rp-c-*` 语义变量，品牌展示感通过局部 glow / gradient / accent 层叠加实现，不修改 `@sci-comp/core` 运行时主题能力。

**Tech Stack:** React 19、TypeScript 5.x、Rspress、Vitest、React Testing Library、pnpm workspace、`@sci-comp/core`

---

## File Structure

- Modify: `apps/sci-comp-documention/docs/HomePage.tsx`
  - 首页装配入口；重构后只负责引入数据、section 和页面级结构。
- Create: `apps/sci-comp-documention/docs/homepage/homepageData.ts`
  - 存放 hero 指标、快速入口、能力卡片、组件入口、底部 CTA 等静态数据。
- Create: `apps/sci-comp-documention/docs/homepage/homepageStyles.ts`
  - 首页专用视觉语义、surface、glow、layout、card 样式常量。
- Create: `apps/sci-comp-documention/docs/homepage/HomePageSections.tsx`
  - 存放 `HeroSection`、`QuickLinksSection`、`FeaturesSection`、`ComponentsSection`、`FooterCtaSection` 等首页专用视图组件。
- Create: `apps/sci-comp-test/src/styles/homePage.test.tsx`
  - 最小必要回归测试，验证首页在主题测试环境中渲染关键结构与入口。

---

### Task 1: 建立首页专用结构并补上最小失败测试

**Files:**

- Create: `apps/sci-comp-documention/docs/homepage/homepageData.ts`
- Create: `apps/sci-comp-documention/docs/homepage/homepageStyles.ts`
- Create: `apps/sci-comp-documention/docs/homepage/HomePageSections.tsx`
- Modify: `apps/sci-comp-documention/docs/HomePage.tsx`
- Test: `apps/sci-comp-test/src/styles/homePage.test.tsx`

- [ ] **Step 1: 写一个失败测试，锁定首页必须保留的入口和核心结构**

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
    expect(screen.getByText('主题系统')).toBeInTheDocument()
    expect(screen.getByText('组件预览')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 运行测试，确认它先失败**

Run: `pnpm --filter sci-comp-test test -- homePage.test.tsx`
Expected: FAIL，提示 `Cannot find module '../../../sci-comp-documention/docs/HomePage'` 或断言失败（当前页面还没有稳定的“主题系统”快速入口结构）。

- [ ] **Step 3: 新建首页静态数据文件，把内容数据从页面主体剥离**

```ts
export interface HeroMetric {
  label: string
  value: string
  icon: string
}

export interface QuickLinkItem {
  title: string
  description: string
  href: string
  badge: string
}

export interface FeatureItem {
  title: string
  description: string
  icon: string
}

export interface ComponentEntry {
  name: string
  description: string
  href: string
  accent: string
}

export const heroMetrics: HeroMetric[] = [
  { label: '组件入口', value: '8+', icon: '📦' },
  { label: '主题路径', value: '3', icon: '🎯' },
  { label: '展示工作台', value: '1', icon: '🚀' },
]

export const quickLinks: QuickLinkItem[] = [
  {
    title: '开始使用',
    description: '快速完成安装、引入和首个页面集成。',
    href: '/guide/getting-started',
    badge: 'Guide',
  },
  {
    title: '主题系统',
    description: '查看 token、CSS variables 与双通道主题工作台。',
    href: '/guide/theme-system',
    badge: 'Theme',
  },
  {
    title: '组件总览',
    description: '从基础交互到数据展示，快速进入组件文档。',
    href: '/components/button',
    badge: 'Components',
  },
  {
    title: '设计原则',
    description: '理解这套组件库的表达方式、边界与推荐路径。',
    href: '/guide/components',
    badge: 'Docs',
  },
]
```

- [ ] **Step 4: 新建首页样式语义文件，先定义只服务首页的 surface 和 glow 常量**

```ts
import type { CSSProperties } from 'react'

export const homepageSurfaces = {
  page: 'var(--rp-c-bg)',
  surface: 'var(--rp-c-bg-soft)',
  surfaceMuted: 'var(--rp-c-bg-mute)',
  border: 'var(--rp-c-divider-light)',
  borderStrong: 'var(--rp-c-divider)',
  text: 'var(--rp-c-text-1)',
  textSecondary: 'var(--rp-c-text-2)',
  textTertiary: 'var(--rp-c-text-3)',
  brand: 'var(--rp-c-brand)',
  brandTint: 'var(--rp-c-brand-tint)',
  shadow: 'var(--rp-c-shadow-3)',
} as const

export const homepageStyles = {
  page: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '24px clamp(16px, 3vw, 32px) 96px',
    color: homepageSurfaces.text,
    boxSizing: 'border-box',
  },
  heroFrame: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '40px',
    border: `1px solid ${homepageSurfaces.border}`,
    background: `linear-gradient(180deg, ${homepageSurfaces.page} 0%, ${homepageSurfaces.surface} 100%)`,
    boxShadow: homepageSurfaces.shadow,
  },
} as const satisfies Record<string, CSSProperties>
```

- [ ] **Step 5: 新建首页 section 组件文件，先把页面拆成可装配单元**

```tsx
import { Button } from '@sci-comp/core'
import {
  heroMetrics,
  quickLinks,
  type ComponentEntry,
  type FeatureItem,
} from './homepageData'
import { homepageStyles } from './homepageStyles'

export function HeroSection() {
  return (
    <section style={homepageStyles.heroFrame}>
      <h1>你的设计系统基础</h1>
      <p>
        一套兼顾品牌展示感与业务落地效率的组件体系，支持快速接入、主题扩展与文档引导。
      </p>
      <div>
        <Button href="/guide/getting-started" variant="primary" size="lg">
          立即开始
        </Button>
        <Button href="/components/button" variant="ghost" size="lg">
          查看组件
        </Button>
      </div>
      <div>
        {heroMetrics.map((item) => (
          <div key={item.label}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

export function QuickLinksSection() {
  return (
    <section>
      {quickLinks.map((item) => (
        <a key={item.title} href={item.href}>
          <span>{item.badge}</span>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </a>
      ))}
    </section>
  )
}
```

- [ ] **Step 6: 缩减 `HomePage.tsx`，改成纯装配入口**

```tsx
import { HeroSection, QuickLinksSection } from './homepage/HomePageSections'
import { homepageStyles } from './homepage/homepageStyles'

export function HomePage() {
  return (
    <div style={homepageStyles.page}>
      <HeroSection />
      <QuickLinksSection />
    </div>
  )
}

export default HomePage
```

- [ ] **Step 7: 重新运行首页测试，确认通过并完成结构重构基线**

Run: `pnpm --filter sci-comp-test test -- homePage.test.tsx`
Expected: PASS

- [ ] **Step 8: 提交这一小步结构重构**

```bash
git add apps/sci-comp-documention/docs/HomePage.tsx apps/sci-comp-documention/docs/homepage/homepageData.ts apps/sci-comp-documention/docs/homepage/homepageStyles.ts apps/sci-comp-documention/docs/homepage/HomePageSections.tsx apps/sci-comp-test/src/styles/homePage.test.tsx
git commit -m "refactor: split homepage into focused sections"
```

---

### Task 2: 完成海报式首屏与快速入口卡片的暗黑友好重设计

**Files:**

- Modify: `apps/sci-comp-documention/docs/homepage/homepageData.ts`
- Modify: `apps/sci-comp-documention/docs/homepage/homepageStyles.ts`
- Modify: `apps/sci-comp-documention/docs/homepage/HomePageSections.tsx`
- Test: `apps/sci-comp-test/src/styles/homePage.test.tsx`

- [ ] **Step 1: 先扩展失败测试，锁定首屏和快速入口必须同时存在**

```tsx
it('renders poster hero with quick-link cards for key documentation paths', () => {
  render(<HomePage />)

  expect(screen.getByText('开始使用')).toBeInTheDocument()
  expect(screen.getByText('主题系统')).toBeInTheDocument()
  expect(screen.getByText('组件总览')).toBeInTheDocument()
  expect(screen.getByText('设计原则')).toBeInTheDocument()
})
```

- [ ] **Step 2: 运行测试，确认在重设计前至少有部分断言失败或结构不足**

Run: `pnpm --filter sci-comp-test test -- homePage.test.tsx`
Expected: FAIL，若 Step 1 后尚未实现四张快速入口卡，则至少一个断言失败。

- [ ] **Step 3: 在数据文件中补齐海报区和快速入口所需静态内容**

```ts
export const heroHighlights = [
  'Ant Design v6 wrapper 基线',
  '双通道主题系统',
  '高完成度组件文档入口',
]

export const quickLinks: QuickLinkItem[] = [
  {
    title: '开始使用',
    description: '从安装、引入到第一个页面集成，快速走通主路径。',
    href: '/guide/getting-started',
    badge: 'Start',
  },
  {
    title: '主题系统',
    description: '理解 token、CSS variables、AntD token 的映射与用法。',
    href: '/guide/theme-system',
    badge: 'Theme',
  },
  {
    title: '组件总览',
    description: '从 Button、Input、Table、Form 等组件入口开始浏览。',
    href: '/components/button',
    badge: 'Browse',
  },
  {
    title: '设计原则',
    description: '理解这套组件库的封装边界、推荐用法与维护方向。',
    href: '/guide/components',
    badge: 'Guide',
  },
]
```

- [ ] **Step 4: 在样式文件中实现海报式首屏的四层视觉结构**

```ts
heroFrame: {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '40px',
  border: `1px solid ${homepageSurfaces.border}`,
  background:
    `linear-gradient(180deg, ${homepageSurfaces.page} 0%, ${homepageSurfaces.surface} 100%)`,
  boxShadow: homepageSurfaces.shadow,
  padding: 'clamp(32px, 5vw, 56px)',
},
heroGlowPrimary: {
  position: 'absolute',
  inset: '-80px auto auto -40px',
  width: '420px',
  height: '420px',
  borderRadius: '999px',
  background: 'radial-gradient(circle, var(--rp-c-brand-tint) 0%, transparent 72%)',
  filter: 'blur(16px)',
  pointerEvents: 'none',
},
heroGlowSecondary: {
  position: 'absolute',
  inset: 'auto -40px -120px auto',
  width: '360px',
  height: '360px',
  borderRadius: '999px',
  background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 74%)',
  filter: 'blur(18px)',
  pointerEvents: 'none',
},
quickLinksGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '18px',
  marginTop: '28px',
},
quickLinkCard: {
  borderRadius: '24px',
  border: `1px solid ${homepageSurfaces.border}`,
  background: `linear-gradient(180deg, ${homepageSurfaces.surface} 0%, ${homepageSurfaces.surfaceMuted} 100%)`,
  padding: '20px',
  textDecoration: 'none',
  color: homepageSurfaces.text,
  boxShadow: homepageSurfaces.shadow,
},
```

- [ ] **Step 5: 在 section 组件中落地海报式首屏和入口卡片**

```tsx
export function HeroSection() {
  return (
    <section style={homepageStyles.heroFrame}>
      <div style={homepageStyles.heroGlowPrimary} />
      <div style={homepageStyles.heroGlowSecondary} />
      <div style={homepageStyles.heroContent}>
        <span style={homepageStyles.heroBadge}>SCI Comp Design System</span>
        <h1 style={homepageStyles.heroTitle}>你的设计系统基础</h1>
        <p style={homepageStyles.heroDescription}>
          为组件文档、主题能力和业务封装提供统一起点，让你从第一屏就能看到成熟度、完成度与扩展空间。
        </p>
        <div style={homepageStyles.heroActions}>
          <Button href="/guide/getting-started" variant="primary" size="lg">
            立即开始
          </Button>
          <Button href="/components/button" variant="ghost" size="lg">
            查看组件
          </Button>
        </div>
      </div>
    </section>
  )
}

export function QuickLinksSection() {
  return (
    <section style={homepageStyles.quickLinksGrid}>
      {quickLinks.map((item) => (
        <a
          key={item.title}
          href={item.href}
          style={homepageStyles.quickLinkCard}
        >
          <span>{item.badge}</span>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </a>
      ))}
    </section>
  )
}
```

- [ ] **Step 6: 重新运行首页测试，确认主路径和入口卡片都通过**

Run: `pnpm --filter sci-comp-test test -- homePage.test.tsx`
Expected: PASS

- [ ] **Step 7: 提交首屏与入口卡片重设计**

```bash
git add apps/sci-comp-documention/docs/homepage/homepageData.ts apps/sci-comp-documention/docs/homepage/homepageStyles.ts apps/sci-comp-documention/docs/homepage/HomePageSections.tsx apps/sci-comp-test/src/styles/homePage.test.tsx
git commit -m "feat: redesign homepage hero and quick links"
```

---

### Task 3: 重构特性区、组件入口区和底部收口区，统一首页视觉语言

**Files:**

- Modify: `apps/sci-comp-documention/docs/homepage/homepageData.ts`
- Modify: `apps/sci-comp-documention/docs/homepage/homepageStyles.ts`
- Modify: `apps/sci-comp-documention/docs/homepage/HomePageSections.tsx`
- Modify: `apps/sci-comp-documention/docs/HomePage.tsx`
- Test: `apps/sci-comp-test/src/styles/homePage.test.tsx`

- [ ] **Step 1: 扩展失败测试，锁定特性区、组件区和底部 CTA**

```tsx
it('renders feature, component, and footer call-to-action sections', () => {
  render(<HomePage />)

  expect(screen.getByText('核心特性')).toBeInTheDocument()
  expect(screen.getByText('组件预览')).toBeInTheDocument()
  expect(screen.getByText('准备开始构建你的产品界面了吗？')).toBeInTheDocument()
})
```

- [ ] **Step 2: 运行测试，确认在实现前先失败**

Run: `pnpm --filter sci-comp-test test -- homePage.test.tsx`
Expected: FAIL，当前若还没有底部 CTA 文案或新的 section 标题，断言会失败。

- [ ] **Step 3: 在数据文件中补齐特性区、组件入口区和 footer CTA 内容**

```ts
export const features: FeatureItem[] = [
  {
    title: '一致的封装基线',
    description:
      '以 Ant Design v6 wrapper 为基础，保证心智模型清晰且可持续维护。',
    icon: '🧭',
  },
  {
    title: '主题双通道联动',
    description: '同一份主题输入同时驱动 AntD token 与 CSS variables。',
    icon: '🌗',
  },
  {
    title: '高完成度文档体验',
    description: '从解释型示例到组件入口，减少理解和试用成本。',
    icon: '✨',
  },
]

export const componentEntries: ComponentEntry[] = [
  {
    name: 'Button',
    description: '基础交互入口与主次语义表达。',
    href: '/components/button',
    accent: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
  },
  {
    name: 'Input',
    description: '输入控件、状态和校验提示的统一封装。',
    href: '/components/input',
    accent: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
  },
  {
    name: 'Table',
    description: '数据展示、状态反馈和结构化信息的主力入口。',
    href: '/components/table',
    accent: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
  },
]

export const footerCallToAction = {
  title: '准备开始构建你的产品界面了吗？',
  description: '从开始使用进入主路径，或者先浏览组件总览与主题系统。',
  primaryHref: '/guide/getting-started',
  secondaryHref: '/guide/theme-system',
}
```

- [ ] **Step 4: 在样式文件里补齐 section 节奏、卡片质感与底部收口区样式**

```ts
sectionBlock: {
  marginTop: '56px',
},
sectionHeader: {
  display: 'grid',
  gap: '10px',
  textAlign: 'center',
  marginBottom: '28px',
},
featureGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '20px',
},
showcaseGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '20px',
},
footerCta: {
  marginTop: '64px',
  borderRadius: '32px',
  border: `1px solid ${homepageSurfaces.border}`,
  background:
    `linear-gradient(180deg, ${homepageSurfaces.surfaceMuted} 0%, ${homepageSurfaces.surface} 100%)`,
  padding: '36px',
  boxShadow: homepageSurfaces.shadow,
  textAlign: 'center',
},
```

- [ ] **Step 5: 在 section 组件中实现统一化的特性卡、组件入口卡与 footer CTA**

```tsx
export function FeaturesSection() {
  return (
    <section style={homepageStyles.sectionBlock}>
      <div style={homepageStyles.sectionHeader}>
        <h2>核心特性</h2>
        <p>兼顾品牌表达、封装边界与业务落地效率的组件体系。</p>
      </div>
      <div style={homepageStyles.featureGrid}>
        {features.map((feature) => (
          <article key={feature.title} style={homepageStyles.featureCard}>
            <span>{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ComponentsSection() {
  return (
    <section style={homepageStyles.sectionBlock}>
      <div style={homepageStyles.sectionHeader}>
        <h2>组件预览</h2>
        <p>从基础交互到数据展示，直接进入组件文档主路径。</p>
      </div>
      <div style={homepageStyles.showcaseGrid}>
        {componentEntries.map((item) => (
          <a
            key={item.name}
            href={item.href}
            style={homepageStyles.componentCard}
          >
            <div
              style={{
                ...homepageStyles.componentAccent,
                background: item.accent,
              }}
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

export function FooterCtaSection() {
  return (
    <section style={homepageStyles.footerCta}>
      <h2>准备开始构建你的产品界面了吗？</h2>
      <p>从开始使用进入主路径，或者继续查看主题系统能力。</p>
      <div>
        <Button href="/guide/getting-started" variant="primary">
          开始使用
        </Button>
        <Button href="/guide/theme-system" variant="ghost">
          查看主题系统
        </Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: 在 `HomePage.tsx` 中装配完整首页**

```tsx
import {
  ComponentsSection,
  FeaturesSection,
  FooterCtaSection,
  HeroSection,
  QuickLinksSection,
} from './homepage/HomePageSections'
import { homepageStyles } from './homepage/homepageStyles'

export function HomePage() {
  return (
    <div style={homepageStyles.page}>
      <HeroSection />
      <QuickLinksSection />
      <FeaturesSection />
      <ComponentsSection />
      <FooterCtaSection />
    </div>
  )
}
```

- [ ] **Step 7: 重新运行首页测试，确认完整首页结构通过**

Run: `pnpm --filter sci-comp-test test -- homePage.test.tsx`
Expected: PASS

- [ ] **Step 8: 提交首页核心区块重设计**

```bash
git add apps/sci-comp-documention/docs/HomePage.tsx apps/sci-comp-documention/docs/homepage/homepageData.ts apps/sci-comp-documention/docs/homepage/homepageStyles.ts apps/sci-comp-documention/docs/homepage/HomePageSections.tsx apps/sci-comp-test/src/styles/homePage.test.tsx
git commit -m "feat: unify homepage visual sections"
```

---

### Task 4: 完成最终验证并进行人工验收收口

**Files:**

- Verify: `apps/sci-comp-documention/docs/HomePage.tsx`
- Verify: `apps/sci-comp-documention/docs/homepage/homepageData.ts`
- Verify: `apps/sci-comp-documention/docs/homepage/homepageStyles.ts`
- Verify: `apps/sci-comp-documention/docs/homepage/HomePageSections.tsx`
- Verify: `apps/sci-comp-test/src/styles/homePage.test.tsx`

- [ ] **Step 1: 运行首页相关自动化测试集合**

Run: `pnpm --filter sci-comp-test test -- homePage.test.tsx componentDoc.test.tsx themePlayground.test.tsx`
Expected: PASS

- [ ] **Step 2: 运行文档站 typecheck**

Run: `pnpm --filter sci-comp-documention typecheck`
Expected: PASS

- [ ] **Step 3: 运行文档站构建**

Run: `pnpm --filter sci-comp-documention build`
Expected: PASS

- [ ] **Step 4: 启动文档站进行人工验收**

Run: `pnpm --filter sci-comp-documention dev -- --host 127.0.0.1 --port 3006`
Expected: 本地 dev server 启动成功，可在浏览器访问首页。

- [ ] **Step 5: 在浏览器中逐项检查亮色 / 暗色模式下的首页关键区域**

Checklist:

- [ ] 首屏海报区在亮色 / 暗色下都保持高对比标题与清晰 CTA
- [ ] glow / gradient 不发灰、不脏、不遮挡正文
- [ ] 快速入口卡片在暗色下边界清晰，点击路径正确
- [ ] 核心特性区和组件预览区有足够节奏差异
- [ ] 底部 CTA 区在暗色下仍清晰可读
- [ ] 首页整体仍然明确导向“开始使用 / 组件浏览 / 主题系统”

- [ ] **Step 6: 提交最终验证通过后的收口提交**

```bash
git add apps/sci-comp-documention/docs/HomePage.tsx apps/sci-comp-documention/docs/homepage/homepageData.ts apps/sci-comp-documention/docs/homepage/homepageStyles.ts apps/sci-comp-documention/docs/homepage/HomePageSections.tsx apps/sci-comp-test/src/styles/homePage.test.tsx
git commit -m "fix: align homepage redesign with dark mode"
```

---

## Self-Review

- **Spec coverage:**
  - 海报式首屏：Task 2
  - 快速入口卡片：Task 2
  - 特性区 / 组件入口区 / 收口区：Task 3
  - 代码组织收敛：首页专用文件拆分：Task 1
  - 自动验证与人工验收：Task 4
  - 未发现缺失需求。

- **Placeholder scan:**
  - 已避免 TBD / TODO / “类似任务 N”。
  - 每个任务都包含明确文件、命令与代码骨架。

- **Type consistency:**
  - `HeroMetric`、`QuickLinkItem`、`FeatureItem`、`ComponentEntry` 在任务间保持一致。
  - `HeroSection` / `QuickLinksSection` / `FeaturesSection` / `ComponentsSection` / `FooterCtaSection` 命名一致。

Plan complete and saved to `docs/superpowers/plans/2026-04-30-change-home-page-dark-system.md`. Two execution options:

1. Subagent-Driven (recommended) - I dispatch a fresh subagent per task, review between tasks, fast iteration

2. Inline Execution - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
