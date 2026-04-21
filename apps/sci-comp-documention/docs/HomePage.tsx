import { Button, createThemeTokens } from '@sci-comp/core'

const tokens = createThemeTokens()

const capabilities = [
  {
    title: '基于 Ant Design v6 封装',
    description:
      '通用组件不只参考视觉风格，而是直接基于 antd 官方组件做 wrapper，交互与生态能力可复用。',
  },
  {
    title: '类型完整，适配 React 19',
    description:
      '所有组件围绕 TypeScript 类型约束设计，面向 React 19 + TypeScript 5/6 的工程环境。',
  },
  {
    title: '文档、测试、组件库协同',
    description:
      '通过 monorepo 统一维护组件源码、说明文档与测试用例，减少示例与实现脱节。',
  },
  {
    title: '统一 Token 与工程规范',
    description:
      '主题 Token、lint、typecheck、测试与构建流程在工作区内统一执行，便于长期演进。',
  },
]

const components = [
  {
    title: 'Button',
    href: '/components/button',
    description: '按钮语义封装，统一 variant、size 与交互状态。',
  },
  {
    title: 'Input',
    href: '/components/input',
    description: '表单输入封装，兼顾标签、提示信息与无障碍关联。',
  },
  {
    title: 'Table',
    href: '/components/table',
    description: '面向列表场景的表格封装，支持空态、分页与选择能力。',
  },
  {
    title: 'Form',
    href: '/components/form',
    description: '支持 schema 与组合式使用方式的表单封装。',
  },
  {
    title: 'Modal',
    href: '/components/modal',
    description: '保留 antd 弹窗能力，并补充 fullscreen 语义扩展。',
  },
  {
    title: 'Tabs',
    href: '/components/tabs',
    description: '保留原生 tabs 能力，并通过 lazy 控制内容渲染策略。',
  },
  {
    title: 'Progress',
    href: '/components/progress',
    description: '统一线性、环形与仪表盘进度反馈，适合展示完成率与阶段状态。',
  },
]

const quickLinks = [
  {
    title: '快速开始',
    href: '/guide/getting-started',
    description: '查看文档站启动方式、工作区结构与组件引入说明。',
  },
  {
    title: '组件总览',
    href: '/components/button',
    description: '从 Button 入口开始浏览当前可用的通用组件集合。',
  },
]

const styles = {
  page: {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0px 0 72px',
    color: tokens.colorText,
  },
  section: {
    marginTop: '28px',
  },
  hero: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    alignItems: 'stretch',
    padding: '36px',
    borderRadius: '28px',
    border: `1px solid ${tokens.colorPrimary}22`,
    background: `linear-gradient(135deg, ${tokens.colorPrimary}10 0%, ${tokens.colorBgContainer} 55%, ${tokens.colorPrimary}08 100%)`,
    boxShadow: `0 24px 80px ${tokens.colorPrimary}18`,
  },
  heroTitle: {
    margin: '0 0 16px',
    fontSize: '48px',
    lineHeight: 1.1,
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  heroSubtitle: {
    margin: '0 0 14px',
    fontSize: '20px',
    lineHeight: 1.7,
    color: 'rgba(31, 31, 31, 0.86)',
  },
  heroDesc: {
    margin: '0 0 24px',
    fontSize: '15px',
    lineHeight: 1.8,
    color: 'rgba(31, 31, 31, 0.72)',
  },
  heroActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '20px',
  },
  badgeRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: 600,
    color: tokens.colorPrimary,
    background: `${tokens.colorPrimary}14`,
    border: `1px solid ${tokens.colorPrimary}22`,
  },
  heroPanel: {
    borderRadius: '24px',
    padding: '24px',
    background: tokens.colorBgContainer,
    border: `1px solid ${tokens.colorPrimary}18`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '16px',
  },
  panelLabel: {
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: tokens.colorPrimary,
    margin: 0,
  },
  panelTitle: {
    margin: 0,
    fontSize: '24px',
    lineHeight: 1.35,
  },
  panelDesc: {
    margin: 0,
    fontSize: '14px',
    lineHeight: 1.8,
    color: 'rgba(31, 31, 31, 0.72)',
  },
  pillGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  pill: {
    padding: '8px 12px',
    borderRadius: '999px',
    background: 'rgba(31, 31, 31, 0.04)',
    fontSize: '13px',
    fontWeight: 600,
  },
  sectionHeading: {
    margin: '0 0 10px',
    fontSize: '30px',
    lineHeight: 1.3,
  },
  sectionLead: {
    margin: '0 0 20px',
    fontSize: '15px',
    lineHeight: 1.8,
    color: 'rgba(31, 31, 31, 0.72)',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  },
  card: {
    display: 'block',
    padding: '22px 20px',
    borderRadius: '20px',
    textDecoration: 'none',
    color: tokens.colorText,
    background: tokens.colorBgContainer,
    border: '1px solid rgba(31, 31, 31, 0.08)',
    boxShadow: '0 12px 36px rgba(15, 23, 42, 0.06)',
  },
  cardTitle: {
    margin: '0 0 8px',
    fontSize: '18px',
    fontWeight: 700,
  },
  cardDesc: {
    margin: '0 0 16px',
    fontSize: '14px',
    lineHeight: 1.75,
    color: 'rgba(31, 31, 31, 0.72)',
  },
  cardMeta: {
    fontSize: '13px',
    fontWeight: 700,
    color: tokens.colorPrimary,
  },
  quickStart: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(280px, 0.8fr)',
    gap: '20px',
    padding: '28px',
    borderRadius: '24px',
    background: 'rgba(31, 31, 31, 0.02)',
    border: '1px solid rgba(31, 31, 31, 0.08)',
  },
  codeBlock: {
    margin: 0,
    padding: '18px 20px',
    borderRadius: '18px',
    background: '#0f172a',
    color: '#e2e8f0',
    overflowX: 'auto',
    fontSize: '13px',
    lineHeight: 1.8,
  },
  sideLinks: {
    display: 'grid',
    gap: '12px',
  },
} as const

interface SectionTitleProps {
  eyebrow: string
  title: string
  description: string
}

function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <p style={styles.panelLabel}>{eyebrow}</p>
      <h2 style={styles.sectionHeading}>{title}</h2>
      <p style={styles.sectionLead}>{description}</p>
    </div>
  )
}

interface CardProps {
  title: string
  description: string
}

function InfoCard({ title, description }: CardProps) {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDesc}>{description}</p>
    </div>
  )
}

interface LinkCardProps extends CardProps {
  href: string
}

function LinkCard({ title, href, description }: LinkCardProps) {
  return (
    <a href={href} style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDesc}>{description}</p>
      <span style={styles.cardMeta}>查看文档 →</span>
    </a>
  )
}

export function HomePage() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div>
          <div style={styles.badgeRow}>
            <span style={styles.badge}>Ant Design v6 Wrapper</span>
            <span style={styles.badge}>React 19 + TypeScript</span>
            <span style={styles.badge}>Monorepo Documentation</span>
          </div>

          <h1 style={styles.heroTitle}>SCI Comp 通用组件库文档站</h1>
          <p style={styles.heroSubtitle}>
            面向业务中台与复杂表单场景，基于 Ant Design v6
            官方组件进行封装，统一组件语义、类型能力与文档说明。
          </p>
          <p style={styles.heroDesc}>
            这里集中展示组件能力、使用方式与约束边界。首页负责帮助你快速理解项目定位，具体示例与
            API 则在各组件文档页中展开。
          </p>

          <div style={styles.heroActions}>
            <Button href="/guide/getting-started" variant="primary" size="lg">
              快速开始
            </Button>
            <Button href="/components/button" variant="secondary" size="lg">
              查看组件
            </Button>
          </div>

          <div style={styles.badgeRow}>
            <span style={styles.badge}>文档 / 组件 / 测试 三工作区协同</span>
            <span style={styles.badge}>统一 Token 与工程化规范</span>
          </div>
        </div>

        <div style={styles.heroPanel}>
          <div>
            <p style={styles.panelLabel}>Current Scope</p>
            <h2 style={styles.panelTitle}>已具备基础通用组件能力</h2>
            <p style={styles.panelDesc}>
              当前文档覆盖
              Button、Input、Table、Form、Modal、Tabs，所有实现都遵循“基于 antd
              官方组件封装”的约束，而不是仅复刻视觉样式。
            </p>
          </div>

          <div style={styles.pillGrid}>
            {components.map((item) => (
              <a
                key={item.title}
                href={item.href}
                style={{
                  ...styles.pill,
                  textDecoration: 'none',
                  color: tokens.colorText,
                }}
              >
                {item.title}
              </a>
            ))}
          </div>

          <p style={styles.panelDesc}>
            建议从“快速开始”理解工程结构，再按组件入口逐个查看封装方式、交互语义与示例代码。
          </p>
        </div>
      </section>

      <section style={styles.section}>
        <SectionTitle
          eyebrow="Why SCI Comp"
          title="首页先回答三件事：它是什么、能做什么、从哪里开始看"
          description="首页不承担完整教程职责，而是帮助你迅速判断这个组件库的定位、能力边界与最合适的浏览路径。"
        />

        <div style={styles.cardGrid}>
          {capabilities.map((item) => (
            <InfoCard
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <SectionTitle
          eyebrow="Components"
          title="从已有组件开始进入文档"
          description="当前首页只展示核心入口，不做复杂 playground。你可以从任一组件卡片进入详细文档查看使用示例与能力说明。"
        />

        <div style={styles.cardGrid}>
          {components.map((item) => (
            <LinkCard
              key={item.title}
              title={item.title}
              href={item.href}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <SectionTitle
          eyebrow="Quick Start"
          title="最短路径：启动文档、查看组件、理解约束"
          description="如果你是第一次进入这个仓库，先启动文档站，再从 Button 或 Form 入口理解封装模式，会更容易建立整体认知。"
        />

        <div style={styles.quickStart}>
          <pre style={styles.codeBlock}>{`pnpm docs:dev
pnpm test
pnpm build`}</pre>

          <div style={styles.sideLinks}>
            {quickLinks.map((item) => (
              <LinkCard
                key={item.title}
                title={item.title}
                href={item.href}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
