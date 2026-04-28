import { Button, createThemeTokens } from '@sci-comp/core'

const tokens = createThemeTokens()

const trustSignals = [
  'Ant Design v6 Wrapper',
  'React 19 + TypeScript',
  'Monorepo Documentation',
  'SchemaForm High-Level Capability',
]

const heroMetrics = [
  {
    value: '8+',
    label: '已接入组件',
    description: '覆盖按钮、表单、表格、进度与弹层等基础语义',
  },
  {
    value: '3',
    label: '主浏览路径',
    description: '快速开始、基础组件、高阶能力入口首屏直达',
  },
  {
    value: '1',
    label: '统一文档骨架',
    description: '案例、API、源码说明与能力边界保持一致表达',
  },
]

const architectureHighlights = [
  {
    title: '基于 Ant Design v6 官方组件封装',
    description:
      '不是只借用视觉风格，而是直接基于官方组件做 wrapper，保证交互模型、生态资产与常用 props 的稳定复用。',
    tag: 'Wrapper Foundation',
  },
  {
    title: '类型系统与业务中台场景并重',
    description:
      '围绕 React 19 与 TypeScript 5/6 组织公共 API，优先服务复杂表单、列表监控和配置化页面中的长期演进需求。',
    tag: 'Type-Safe',
  },
  {
    title: '文档、测试、源码三侧协同',
    description:
      '通过 monorepo 统一维护文档站、测试工程与组件源码，降低示例、实现与验证之间的漂移成本。',
    tag: 'Monorepo Workflow',
  },
  {
    title: '基础 wrapper 与高阶能力分层',
    description:
      'Button、Input、Table、Form 等基础能力与 SchemaForm 的配置驱动能力清晰拆层，避免普通 wrapper 承载过多业务 DSL。',
    tag: 'Layered Capability',
  },
]

const pathways = [
  {
    title: '开始使用',
    href: '/guide/getting-started',
    description:
      '先理解工作区结构、文档站启动方式与组件引入路径，再决定后续从哪个组件开始深入。',
    bullets: ['启动文档站', '理解 workspace 结构', '确认 package 引入方式'],
    accent: 'Recommended',
  },
  {
    title: '基础组件',
    href: '/components/button',
    description:
      '从 Button、Input、Table 与 Form 开始，建立基础 wrapper 的语义边界、props 透传和常见场景认知。',
    bullets: ['Button / Input', 'Table / Form', '基础封装边界'],
    accent: 'Core Entry',
  },
  {
    title: '高阶能力',
    href: '/components/schema-form',
    description:
      '直接进入 SchemaForm，查看配置驱动字段渲染、动态规则、列表编排与 schemaOnly 等高阶能力。',
    bullets: ['visibleWhen / itemPropsWhen', '列表编排', 'SchemaOnly'],
    accent: 'Advanced',
  },
]

const featuredComponents = [
  {
    title: 'Button',
    href: '/components/button',
    description:
      '高频基础入口，适合先理解语义映射、样式收敛与增强型组件页结构。',
    stats: ['高频交互', '语义清晰'],
  },
  {
    title: 'Form',
    href: '/components/form',
    description: '基础组合式表单入口，聚焦布局、校验、默认值与提交流程。',
    stats: ['布局编排', '校验流程'],
  },
  {
    title: 'SchemaForm',
    href: '/components/schema-form',
    description:
      '最能体现差异化的高阶能力入口，覆盖 schema 驱动字段渲染与动态编排。',
    stats: ['配置驱动', '动态规则'],
  },
  {
    title: 'Table',
    href: '/components/table',
    description:
      '面向数据监控与列表场景的核心组件，已覆盖分页、空态、滚动与虚拟滚动主路径。',
    stats: ['数据展示', '监控列表'],
  },
]

const moreComponents = [
  {
    title: 'Input',
    href: '/components/input',
    description: '补齐标签、辅助说明、错误态与只读态等增强表达。',
  },
  {
    title: 'Modal',
    href: '/components/modal',
    description: '保留 antd 弹窗模型，并明确 fullscreen 的布局语义与使用边界。',
  },
  {
    title: 'Tabs',
    href: '/components/tabs',
    description: '覆盖 lazy、可编辑标签页与基础状态场景。',
  },
  {
    title: 'Progress',
    href: '/components/progress',
    description: '统一线性、环形与仪表盘进度反馈，便于横向对比不同反馈方式。',
  },
]

const quickLinks = [
  {
    title: '快速开始',
    href: '/guide/getting-started',
    description: '查看文档站启动方式、工作区结构与组件引入说明。',
  },
  {
    title: '查看基础组件',
    href: '/components/button',
    description: '从 Button 与 Form 开始建立基础 wrapper 的整体认知。',
  },
  {
    title: '查看 SchemaForm',
    href: '/components/schema-form',
    description: '直接进入高阶能力页，了解配置驱动表单与基础 Form 的分层关系。',
  },
]

const heroComponentPills = [
  'Button',
  'Input',
  'Table',
  'Form',
  'SchemaForm',
  'Progress',
]
const schemaBullets = [
  '动态规则控制',
  '列表 schema 编排',
  'schemaOnly 渲染',
  '基础 Form / 高阶能力分层',
]

const styles = {
  page: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '12px 0 96px',
    color: tokens.colorText,
  },
  section: {
    marginTop: '28px',
  },
  surfaceSection: {
    marginTop: '28px',
    padding: '28px',
    borderRadius: '32px',
    background: tokens.colorBgContainer,
    border: `1px solid ${tokens.colorPrimary}16`,
    boxShadow: `0 24px 64px ${tokens.colorPrimary}10`,
  },
  darkSection: {
    marginTop: '28px',
    padding: '30px',
    borderRadius: '32px',
    background: `linear-gradient(180deg, ${tokens.colorText} 0%, ${tokens.colorText}F2 100%)`,
    border: `1px solid ${tokens.colorPrimary}22`,
    boxShadow: `0 28px 72px ${tokens.colorText}22`,
    color: tokens.colorBgContainer,
  },
  hero: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.08fr) minmax(360px, 0.92fr)',
    gap: '28px',
    alignItems: 'stretch',
    padding: '40px',
    borderRadius: '36px',
    background: `linear-gradient(135deg, ${tokens.colorText} 0%, ${tokens.colorText}F4 34%, ${tokens.colorPrimary}CA 100%)`,
    border: `1px solid ${tokens.colorPrimary}2A`,
    boxShadow: `0 34px 90px ${tokens.colorText}24`,
  },
  heroOrbPrimary: {
    position: 'absolute' as const,
    top: '-120px',
    right: '-80px',
    width: '380px',
    height: '380px',
    borderRadius: '999px',
    background: `radial-gradient(circle, ${tokens.colorPrimary}70 0%, ${tokens.colorPrimary}18 42%, transparent 74%)`,
    pointerEvents: 'none' as const,
  },
  heroOrbSecondary: {
    position: 'absolute' as const,
    bottom: '-140px',
    left: '-100px',
    width: '340px',
    height: '340px',
    borderRadius: '999px',
    background: `radial-gradient(circle, ${tokens.colorPrimary}26 0%, transparent 72%)`,
    pointerEvents: 'none' as const,
  },
  heroGrid: {
    position: 'relative' as const,
    zIndex: 1,
    display: 'grid',
    gap: '22px',
  },
  heroEyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    width: 'fit-content',
    padding: '9px 16px',
    borderRadius: '999px',
    background: `${tokens.colorBgContainer}14`,
    color: tokens.colorBgContainer,
    border: `1px solid ${tokens.colorBgContainer}20`,
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    backdropFilter: 'blur(16px)',
  },
  heroTitle: {
    margin: 0,
    fontSize: '64px',
    lineHeight: 0.98,
    fontWeight: 800,
    letterSpacing: '-0.05em',
    color: tokens.colorBgContainer,
  },
  heroSubtitle: {
    margin: 0,
    fontSize: '22px',
    lineHeight: 1.65,
    color: `${tokens.colorBgContainer}E0`,
    maxWidth: '700px',
  },
  heroDesc: {
    margin: 0,
    fontSize: '15px',
    lineHeight: 1.9,
    color: `${tokens.colorBgContainer}B8`,
    maxWidth: '720px',
  },
  heroActions: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '12px',
  },
  heroMetrics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '14px',
  },
  heroMetricCard: {
    padding: '18px 18px 16px',
    borderRadius: '24px',
    background: `${tokens.colorBgContainer}12`,
    border: `1px solid ${tokens.colorBgContainer}18`,
    backdropFilter: 'blur(18px)',
    boxShadow: `0 18px 42px ${tokens.colorText}18`,
  },
  heroMetricValue: {
    margin: '0 0 8px',
    fontSize: '28px',
    lineHeight: 1,
    fontWeight: 800,
    letterSpacing: '-0.04em',
    color: tokens.colorBgContainer,
  },
  heroMetricLabel: {
    margin: '0 0 6px',
    fontSize: '14px',
    fontWeight: 700,
    color: `${tokens.colorBgContainer}EE`,
  },
  heroMetricDesc: {
    margin: 0,
    fontSize: '12px',
    lineHeight: 1.7,
    color: `${tokens.colorBgContainer}B6`,
  },
  trustGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '12px',
  },
  trustCard: {
    padding: '14px 16px',
    borderRadius: '18px',
    background: `${tokens.colorBgContainer}10`,
    border: `1px solid ${tokens.colorBgContainer}16`,
    color: tokens.colorBgContainer,
    fontSize: '13px',
    lineHeight: 1.65,
    fontWeight: 700,
    backdropFilter: 'blur(18px)',
  },
  heroShowcase: {
    position: 'relative' as const,
    zIndex: 1,
    display: 'grid',
    gap: '16px',
    alignContent: 'center',
  },
  showcaseFloatingBadge: {
    justifySelf: 'end',
    width: 'fit-content',
    padding: '8px 14px',
    borderRadius: '999px',
    background: `${tokens.colorBgContainer}E8`,
    color: tokens.colorPrimary,
    border: `1px solid ${tokens.colorPrimary}26`,
    fontSize: '12px',
    fontWeight: 700,
    boxShadow: `0 16px 36px ${tokens.colorText}14`,
  },
  showcaseFrame: {
    display: 'grid',
    gap: '16px',
    padding: '18px',
    borderRadius: '30px',
    background: `${tokens.colorBgContainer}10`,
    border: `1px solid ${tokens.colorBgContainer}16`,
    backdropFilter: 'blur(18px)',
    boxShadow: `0 22px 60px ${tokens.colorText}1A`,
  },
  showcaseTopRow: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '16px',
  },
  showcaseBottomRow: {
    display: 'grid',
    gridTemplateColumns: '0.92fr 1.08fr',
    gap: '16px',
  },
  showcaseCard: {
    padding: '18px',
    borderRadius: '24px',
    background: `${tokens.colorBgContainer}F4`,
    border: `1px solid ${tokens.colorPrimary}18`,
    boxShadow: `0 18px 44px ${tokens.colorText}12`,
  },
  showcaseDarkCard: {
    padding: '18px',
    borderRadius: '24px',
    background: `linear-gradient(180deg, ${tokens.colorText}FA 0%, ${tokens.colorText}F0 100%)`,
    border: `1px solid ${tokens.colorPrimary}22`,
    boxShadow: `0 18px 44px ${tokens.colorText}16`,
  },
  showcaseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    alignItems: 'flex-start',
    marginBottom: '14px',
  },
  showcaseLabel: {
    margin: 0,
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: tokens.colorPrimary,
  },
  showcaseTitle: {
    margin: '6px 0 0',
    fontSize: '20px',
    lineHeight: 1.35,
    fontWeight: 800,
    letterSpacing: '-0.03em',
  },
  showcaseMeta: {
    fontSize: '12px',
    lineHeight: 1.7,
    color: 'rgba(31, 31, 31, 0.62)',
    textAlign: 'right' as const,
  },
  showcaseMetaInverted: {
    fontSize: '12px',
    lineHeight: 1.7,
    color: `${tokens.colorBgContainer}A8`,
    textAlign: 'right' as const,
  },
  buttonRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '10px',
  },
  fakeButtonPrimary: {
    padding: '10px 16px',
    borderRadius: '999px',
    background: tokens.colorPrimary,
    color: tokens.colorBgContainer,
    fontSize: '13px',
    fontWeight: 700,
    boxShadow: `0 12px 26px ${tokens.colorPrimary}38`,
  },
  fakeButtonSecondary: {
    padding: '10px 16px',
    borderRadius: '999px',
    background: `${tokens.colorPrimary}10`,
    color: tokens.colorPrimary,
    fontSize: '13px',
    fontWeight: 700,
    border: `1px solid ${tokens.colorPrimary}20`,
  },
  fakeMutedText: {
    fontSize: '12px',
    lineHeight: 1.7,
    color: 'rgba(31, 31, 31, 0.62)',
  },
  fakeMutedTextInverted: {
    fontSize: '12px',
    lineHeight: 1.7,
    color: `${tokens.colorBgContainer}B2`,
  },
  fakeProgressTrack: {
    height: '10px',
    borderRadius: '999px',
    background: `${tokens.colorBgContainer}18`,
    overflow: 'hidden' as const,
    marginBottom: '10px',
  },
  fakeProgressBar: {
    width: '78%',
    height: '100%',
    borderRadius: '999px',
    background: `linear-gradient(90deg, ${tokens.colorPrimary} 0%, ${tokens.colorPrimary}B8 100%)`,
  },
  fakeTable: {
    display: 'grid',
    gap: '8px',
  },
  fakeTableRow: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr 0.8fr',
    gap: '10px',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: `1px solid ${tokens.colorBgContainer}12`,
    fontSize: '12px',
    color: tokens.colorBgContainer,
  },
  fakeStatus: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '58px',
    padding: '4px 10px',
    borderRadius: '999px',
    background: `${tokens.colorPrimary}18`,
    color: tokens.colorBgContainer,
    fontWeight: 700,
  },
  fakeSchemaForm: {
    display: 'grid',
    gap: '12px',
  },
  fakeField: {
    display: 'grid',
    gap: '7px',
  },
  fakeFieldLabel: {
    fontSize: '12px',
    fontWeight: 700,
    color: 'rgba(31, 31, 31, 0.84)',
  },
  fakeInput: {
    padding: '11px 12px',
    borderRadius: '14px',
    border: `1px solid ${tokens.colorPrimary}14`,
    background: `${tokens.colorPrimary}08`,
    fontSize: '13px',
    color: 'rgba(31, 31, 31, 0.70)',
  },
  showcasePillRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  showcasePill: {
    padding: '7px 12px',
    borderRadius: '999px',
    background: `${tokens.colorBgContainer}10`,
    color: tokens.colorBgContainer,
    fontSize: '12px',
    fontWeight: 700,
    border: `1px solid ${tokens.colorBgContainer}18`,
  },
  statStrip: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
  },
  statStripCard: {
    padding: '20px 18px',
    borderRadius: '24px',
    background: `${tokens.colorPrimary}08`,
    border: `1px solid ${tokens.colorPrimary}16`,
    boxShadow: `0 18px 42px ${tokens.colorPrimary}10`,
  },
  statStripValue: {
    margin: '0 0 8px',
    fontSize: '30px',
    lineHeight: 1,
    fontWeight: 800,
    letterSpacing: '-0.04em',
    color: tokens.colorPrimary,
  },
  statStripTitle: {
    margin: '0 0 6px',
    fontSize: '15px',
    fontWeight: 700,
  },
  statStripDesc: {
    margin: 0,
    fontSize: '13px',
    lineHeight: 1.75,
    color: 'rgba(31, 31, 31, 0.68)',
  },
  sectionHeading: {
    margin: '0 0 12px',
    fontSize: '34px',
    lineHeight: 1.14,
    letterSpacing: '-0.04em',
  },
  sectionHeadingInverted: {
    margin: '0 0 12px',
    fontSize: '34px',
    lineHeight: 1.14,
    letterSpacing: '-0.04em',
    color: tokens.colorBgContainer,
  },
  sectionLead: {
    margin: '0 0 22px',
    fontSize: '15px',
    lineHeight: 1.85,
    color: 'rgba(31, 31, 31, 0.72)',
    maxWidth: '860px',
  },
  sectionLeadInverted: {
    margin: '0 0 22px',
    fontSize: '15px',
    lineHeight: 1.85,
    color: `${tokens.colorBgContainer}B6`,
    maxWidth: '860px',
  },
  panelLabel: {
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: tokens.colorPrimary,
    margin: '0 0 10px',
  },
  panelLabelInverted: {
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: `${tokens.colorBgContainer}B8`,
    margin: '0 0 10px',
  },
  pathwayGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '18px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '18px',
  },
  capabilityCard: {
    display: 'block',
    padding: '24px 22px',
    borderRadius: '26px',
    textDecoration: 'none',
    color: tokens.colorBgContainer,
    background: `${tokens.colorBgContainer}0A`,
    border: `1px solid ${tokens.colorBgContainer}12`,
    boxShadow: `0 20px 48px ${tokens.colorText}18`,
  },
  capabilityTag: {
    display: 'inline-flex',
    alignItems: 'center',
    width: 'fit-content',
    marginBottom: '12px',
    padding: '7px 12px',
    borderRadius: '999px',
    background: `${tokens.colorPrimary}18`,
    color: tokens.colorBgContainer,
    fontSize: '12px',
    fontWeight: 700,
    border: `1px solid ${tokens.colorPrimary}24`,
  },
  pathwayCard: {
    display: 'block',
    padding: '26px 24px',
    borderRadius: '26px',
    textDecoration: 'none',
    color: tokens.colorText,
    background: `linear-gradient(180deg, ${tokens.colorBgContainer} 0%, ${tokens.colorPrimary}0A 100%)`,
    border: `1px solid ${tokens.colorPrimary}16`,
    boxShadow: `0 20px 48px ${tokens.colorPrimary}10`,
  },
  pathwayAccent: {
    display: 'inline-flex',
    alignItems: 'center',
    width: 'fit-content',
    marginBottom: '12px',
    padding: '7px 12px',
    borderRadius: '999px',
    background: `${tokens.colorPrimary}10`,
    color: tokens.colorPrimary,
    fontSize: '12px',
    fontWeight: 700,
    border: `1px solid ${tokens.colorPrimary}1C`,
  },
  featureCard: {
    display: 'block',
    padding: '26px 24px',
    borderRadius: '28px',
    textDecoration: 'none',
    color: tokens.colorText,
    background: tokens.colorBgContainer,
    border: `1px solid ${tokens.colorPrimary}14`,
    boxShadow: `0 22px 56px ${tokens.colorPrimary}10`,
  },
  featureCardGlow: {
    display: 'block',
    padding: '26px 24px',
    borderRadius: '28px',
    textDecoration: 'none',
    color: tokens.colorText,
    background: `linear-gradient(180deg, ${tokens.colorBgContainer} 0%, ${tokens.colorPrimary}0E 100%)`,
    border: `1px solid ${tokens.colorPrimary}22`,
    boxShadow: `0 26px 64px ${tokens.colorPrimary}14`,
  },
  cardTitle: {
    margin: '0 0 10px',
    fontSize: '19px',
    lineHeight: 1.35,
    fontWeight: 800,
    letterSpacing: '-0.03em',
  },
  cardTitleInverted: {
    margin: '0 0 10px',
    fontSize: '19px',
    lineHeight: 1.35,
    fontWeight: 800,
    letterSpacing: '-0.03em',
    color: tokens.colorBgContainer,
  },
  cardDesc: {
    margin: '0 0 16px',
    fontSize: '14px',
    lineHeight: 1.82,
    color: 'rgba(31, 31, 31, 0.72)',
  },
  cardDescInverted: {
    margin: '0 0 16px',
    fontSize: '14px',
    lineHeight: 1.82,
    color: `${tokens.colorBgContainer}B4`,
  },
  cardMeta: {
    fontSize: '13px',
    fontWeight: 700,
    color: tokens.colorPrimary,
  },
  cardMetaInverted: {
    fontSize: '13px',
    fontWeight: 700,
    color: tokens.colorBgContainer,
  },
  statChipRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  statChip: {
    padding: '7px 12px',
    borderRadius: '999px',
    background: `${tokens.colorPrimary}10`,
    color: tokens.colorPrimary,
    fontSize: '12px',
    fontWeight: 700,
    border: `1px solid ${tokens.colorPrimary}18`,
  },
  bulletList: {
    margin: '0 0 18px',
    paddingLeft: '18px',
    color: 'rgba(31, 31, 31, 0.72)',
    fontSize: '13px',
    lineHeight: 1.75,
  },
  splitSection: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.08fr) minmax(300px, 0.92fr)',
    gap: '20px',
    alignItems: 'stretch',
  },
  featurePanel: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
    padding: '30px',
    borderRadius: '32px',
    background: `linear-gradient(135deg, ${tokens.colorPrimary}16 0%, ${tokens.colorBgContainer} 44%, ${tokens.colorPrimary}0C 100%)`,
    border: `1px solid ${tokens.colorPrimary}22`,
    boxShadow: `0 26px 62px ${tokens.colorPrimary}14`,
  },
  featurePanelGlow: {
    position: 'absolute' as const,
    right: '-80px',
    top: '-80px',
    width: '220px',
    height: '220px',
    borderRadius: '999px',
    background: `radial-gradient(circle, ${tokens.colorPrimary}26 0%, transparent 72%)`,
    pointerEvents: 'none' as const,
  },
  featurePanelContent: {
    position: 'relative' as const,
    zIndex: 1,
  },
  featureTitle: {
    margin: '0 0 12px',
    fontSize: '32px',
    lineHeight: 1.18,
    letterSpacing: '-0.04em',
    fontWeight: 800,
  },
  featureDesc: {
    margin: '0 0 18px',
    fontSize: '15px',
    lineHeight: 1.9,
    color: 'rgba(31, 31, 31, 0.72)',
  },
  featureBulletGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '12px',
    marginBottom: '22px',
  },
  featureBullet: {
    padding: '15px 16px',
    borderRadius: '18px',
    background: `${tokens.colorBgContainer}B8`,
    border: `1px solid ${tokens.colorPrimary}14`,
    fontSize: '13px',
    lineHeight: 1.7,
    fontWeight: 700,
    boxShadow: `0 14px 34px ${tokens.colorPrimary}08`,
  },
  featureSideCard: {
    padding: '26px',
    borderRadius: '30px',
    background: `linear-gradient(180deg, ${tokens.colorText} 0%, ${tokens.colorText}F2 100%)`,
    border: `1px solid ${tokens.colorPrimary}20`,
    boxShadow: `0 22px 58px ${tokens.colorText}1A`,
  },
  quickStart: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 0.95fr)',
    gap: '20px',
    padding: '30px',
    borderRadius: '32px',
    background: `linear-gradient(135deg, ${tokens.colorText} 0%, ${tokens.colorText}F0 52%, ${tokens.colorPrimary}A8 100%)`,
    border: `1px solid ${tokens.colorPrimary}24`,
    boxShadow: `0 28px 72px ${tokens.colorText}20`,
  },
  quickStartContent: {
    display: 'grid',
    gap: '16px',
  },
  codeBlock: {
    margin: 0,
    padding: '22px 24px',
    borderRadius: '22px',
    background: `${tokens.colorBgContainer}0C`,
    color: tokens.colorBgContainer,
    overflowX: 'auto' as const,
    fontSize: '13px',
    lineHeight: 1.9,
    border: `1px solid ${tokens.colorBgContainer}12`,
    boxShadow: `0 18px 42px ${tokens.colorText}14`,
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
  inverted?: boolean
}

function SectionTitle({
  eyebrow,
  title,
  description,
  inverted = false,
}: SectionTitleProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={inverted ? styles.panelLabelInverted : styles.panelLabel}>
        {eyebrow}
      </p>
      <h2
        style={inverted ? styles.sectionHeadingInverted : styles.sectionHeading}
      >
        {title}
      </h2>
      <p style={inverted ? styles.sectionLeadInverted : styles.sectionLead}>
        {description}
      </p>
    </div>
  )
}

interface CapabilityCardProps {
  title: string
  description: string
  tag: string
}

function CapabilityCard({ title, description, tag }: CapabilityCardProps) {
  return (
    <div style={styles.capabilityCard}>
      <span style={styles.capabilityTag}>{tag}</span>
      <h3 style={styles.cardTitleInverted}>{title}</h3>
      <p style={styles.cardDescInverted}>{description}</p>
    </div>
  )
}

interface PathwayCardProps {
  title: string
  href: string
  description: string
  bullets: string[]
  accent: string
}

function PathwayCard({
  title,
  href,
  description,
  bullets,
  accent,
}: PathwayCardProps) {
  return (
    <a href={href} style={styles.pathwayCard}>
      <span style={styles.pathwayAccent}>{accent}</span>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDesc}>{description}</p>
      <ul style={styles.bulletList}>
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <span style={styles.cardMeta}>进入路径 →</span>
    </a>
  )
}

interface FeatureCardProps {
  title: string
  href: string
  description: string
  stats?: string[]
  glow?: boolean
}

function FeatureCard({
  title,
  href,
  description,
  stats = [],
  glow = false,
}: FeatureCardProps) {
  return (
    <a href={href} style={glow ? styles.featureCardGlow : styles.featureCard}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDesc}>{description}</p>
      {stats.length > 0 ? (
        <div style={styles.statChipRow}>
          {stats.map((item) => (
            <span key={item} style={styles.statChip}>
              {item}
            </span>
          ))}
        </div>
      ) : null}
      <div style={{ marginTop: '16px' }}>
        <span style={styles.cardMeta}>查看文档 →</span>
      </div>
    </a>
  )
}

function HeroShowcase() {
  return (
    <div style={styles.heroShowcase}>
      <div style={styles.showcaseFloatingBadge}>Design System Entry</div>

      <div style={styles.showcaseFrame}>
        <div style={styles.showcaseDarkCard}>
          <div style={styles.showcaseHeader}>
            <div>
              <p style={styles.showcaseLabel}>Component Stage</p>
              <h2
                style={{
                  ...styles.showcaseTitle,
                  color: tokens.colorBgContainer,
                }}
              >
                首页先建立组件体系感
              </h2>
            </div>
            <div style={styles.showcaseMetaInverted}>
              基础交互、数据展示、状态反馈
              <br />
              与高阶表单能力同屏呈现
            </div>
          </div>
          <div style={styles.showcasePillRow}>
            {heroComponentPills.map((item) => (
              <span key={item} style={styles.showcasePill}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div style={styles.showcaseTopRow}>
          <div style={styles.showcaseCard}>
            <div style={styles.showcaseHeader}>
              <div>
                <p style={styles.showcaseLabel}>Interaction</p>
                <h3 style={styles.showcaseTitle}>基础交互入口</h3>
              </div>
              <div style={styles.showcaseMeta}>高频按钮与主路径 CTA</div>
            </div>
            <div style={styles.buttonRow}>
              <span style={styles.fakeButtonPrimary}>Primary Action</span>
              <span style={styles.fakeButtonSecondary}>Browse Docs</span>
            </div>
            <p style={{ ...styles.fakeMutedText, margin: '14px 0 0' }}>
              基础 wrapper 保持 antd 心智模型，适合团队快速建立通用交互规范。
            </p>
          </div>

          <div style={styles.showcaseCard}>
            <div style={styles.showcaseHeader}>
              <div>
                <p style={styles.showcaseLabel}>Status</p>
                <h3 style={styles.showcaseTitle}>进度与反馈</h3>
              </div>
              <div style={styles.showcaseMeta}>Progress / Result Signal</div>
            </div>
            <div style={styles.fakeProgressTrack}>
              <div style={styles.fakeProgressBar} />
            </div>
            <p style={{ ...styles.fakeMutedText, margin: 0 }}>
              Progress 78% · 统一线性、环形与仪表盘进度反馈。
            </p>
          </div>
        </div>

        <div style={styles.showcaseBottomRow}>
          <div style={styles.showcaseDarkCard}>
            <div style={styles.showcaseHeader}>
              <div>
                <p style={styles.showcaseLabel}>Data Display</p>
                <h3
                  style={{
                    ...styles.showcaseTitle,
                    color: tokens.colorBgContainer,
                  }}
                >
                  监控与列表场景
                </h3>
              </div>
              <div style={styles.showcaseMetaInverted}>
                Table / Queue / Monitor
              </div>
            </div>
            <div style={styles.fakeTable}>
              <div style={styles.fakeTableRow}>
                <strong>模块</strong>
                <strong>状态</strong>
                <strong>延迟</strong>
              </div>
              <div style={styles.fakeTableRow}>
                <span>采样任务</span>
                <span style={styles.fakeStatus}>运行中</span>
                <span>26ms</span>
              </div>
              <div style={styles.fakeTableRow}>
                <span>告警队列</span>
                <span style={styles.fakeStatus}>正常</span>
                <span>18ms</span>
              </div>
            </div>
          </div>

          <div style={styles.showcaseCard}>
            <div style={styles.showcaseHeader}>
              <div>
                <p style={styles.showcaseLabel}>Schema Form</p>
                <h3 style={styles.showcaseTitle}>配置驱动表单</h3>
              </div>
              <div style={styles.showcaseMeta}>
                字段渲染 / 动态规则 / 列表编排
              </div>
            </div>
            <div style={styles.fakeSchemaForm}>
              <div style={styles.fakeField}>
                <span style={styles.fakeFieldLabel}>部署方式</span>
                <div style={styles.fakeInput}>定时发布 ▼</div>
              </div>
              <div style={styles.fakeField}>
                <span style={styles.fakeFieldLabel}>发布时间说明</span>
                <div style={styles.fakeInput}>仅在定时发布时显示</div>
              </div>
              <div style={styles.fakeField}>
                <span style={styles.fakeFieldLabel}>审批策略</span>
                <div style={styles.fakeInput}>灰度分批 + 自动回滚</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HomePage() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroOrbPrimary} />
        <div style={styles.heroOrbSecondary} />

        <div style={styles.heroGrid}>
          <span style={styles.heroEyebrow}>
            Enterprise React Component System
          </span>

          <div>
            <h1 style={styles.heroTitle}>SCI Comp</h1>
            <p style={styles.heroSubtitle}>
              把基础
              wrapper、数据展示与高阶配置驱动能力组织成更成熟的业务组件体系。
            </p>
          </div>

          <p style={styles.heroDesc}>
            基于 Ant Design v6
            官方组件进行封装，统一基础交互、复杂表单、列表监控与文档表达方式。首页不再只是一个目录入口，而是先用更强的视觉层次和组件拼贴，把这套体系的定位、主路径和差异化能力一次讲清楚。
          </p>

          <div style={styles.heroActions}>
            <Button href="/guide/getting-started" variant="primary" size="lg">
              快速开始
            </Button>
            <Button href="/components/button" variant="secondary" size="lg">
              浏览组件
            </Button>
            <Button
              href="/components/schema-form"
              variant="secondary"
              size="lg"
            >
              查看 SchemaForm
            </Button>
          </div>

          <div style={styles.heroMetrics}>
            {heroMetrics.map((item) => (
              <div key={item.label} style={styles.heroMetricCard}>
                <p style={styles.heroMetricValue}>{item.value}</p>
                <p style={styles.heroMetricLabel}>{item.label}</p>
                <p style={styles.heroMetricDesc}>{item.description}</p>
              </div>
            ))}
          </div>

          <div style={styles.trustGrid}>
            {trustSignals.map((item) => (
              <div key={item} style={styles.trustCard}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <HeroShowcase />
      </section>

      <section style={styles.surfaceSection}>
        <SectionTitle
          eyebrow="Why SCI Comp"
          title="首页先建立体系感，而不是只展示目录"
          description="这里不承担完整教程职责，而是帮助你先看清这套组件库的定位、能力分层与推荐浏览路径，再进入对应组件页阅读细节。"
        />

        <div style={styles.statStrip}>
          <div style={styles.statStripCard}>
            <p style={styles.statStripValue}>8</p>
            <h3 style={styles.statStripTitle}>当前核心组件覆盖</h3>
            <p style={styles.statStripDesc}>
              涵盖 Button、Input、Table、Form、SchemaForm、Modal、Tabs 与
              Progress。
            </p>
          </div>
          <div style={styles.statStripCard}>
            <p style={styles.statStripValue}>3</p>
            <h3 style={styles.statStripTitle}>主浏览路径首屏直达</h3>
            <p style={styles.statStripDesc}>
              快速开始、基础组件、高阶能力入口无需滚动完整列表即可进入。
            </p>
          </div>
          <div style={styles.statStripCard}>
            <p style={styles.statStripValue}>2</p>
            <h3 style={styles.statStripTitle}>能力层级并存</h3>
            <p style={styles.statStripDesc}>
              基础 wrapper 与 SchemaForm
              等高阶配置驱动能力分层表达，避免职责混写。
            </p>
          </div>
          <div style={styles.statStripCard}>
            <p style={styles.statStripValue}>1</p>
            <h3 style={styles.statStripTitle}>统一增强型文档骨架</h3>
            <p style={styles.statStripDesc}>
              组件定义、案例、API 与源码说明采用一致组织方式，降低阅读切换成本。
            </p>
          </div>
        </div>
      </section>

      <section style={styles.surfaceSection}>
        <SectionTitle
          eyebrow="Pathways"
          title="首页给出清晰主路径，而不是让你自己猜入口"
          description="无论你是第一次进入仓库、想先看基础组件，还是直接评估高阶配置驱动能力，都可以从下面三条路径进入。"
        />

        <div style={styles.pathwayGrid}>
          {pathways.map((item) => (
            <PathwayCard
              key={item.title}
              title={item.title}
              href={item.href}
              description={item.description}
              bullets={item.bullets}
              accent={item.accent}
            />
          ))}
        </div>
      </section>

      <section style={styles.darkSection}>
        <SectionTitle
          eyebrow="Capabilities"
          title="不只是组件集合，更是可长期演进的业务组件体系"
          description="这套组件库的重点不只是封装组件，而是用稳定的类型、统一的文档骨架与清晰的能力分层，支持业务中台场景下的长期复用。"
          inverted
        />

        <div style={styles.cardGrid}>
          {architectureHighlights.map((item) => (
            <CapabilityCard
              key={item.title}
              title={item.title}
              description={item.description}
              tag={item.tag}
            />
          ))}
        </div>
      </section>

      <section style={styles.surfaceSection}>
        <SectionTitle
          eyebrow="Featured Components"
          title="优先从最能代表这套体系的组件开始"
          description="首页先展示少量代表性组件，帮助你快速理解基础 wrapper、高频场景与高阶能力之间的关系；其他组件依然保留完整入口。"
        />

        <div style={styles.cardGrid}>
          {featuredComponents.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              href={item.href}
              description={item.description}
              stats={item.stats}
              glow={item.title === 'SchemaForm'}
            />
          ))}
        </div>
      </section>

      <section style={styles.surfaceSection}>
        <SectionTitle
          eyebrow="Advanced Highlight"
          title="SchemaForm 是首页里最值得被单独抬升的高阶能力"
          description="它不是因为最近补齐了文档才出现在这里，而是因为它最能体现这套组件库区别于普通 antd wrapper 集合的地方：配置驱动字段渲染、动态规则与列表编排。"
        />

        <div style={styles.splitSection}>
          <div style={styles.featurePanel}>
            <div style={styles.featurePanelGlow} />

            <div style={styles.featurePanelContent}>
              <h3 style={styles.featureTitle}>
                基础 Form 负责静态表单，高阶配置驱动能力交给 SchemaForm
              </h3>
              <p style={styles.featureDesc}>
                你可以在基础 Form 页面理解布局、校验、默认值与提交流程，再进入
                SchemaForm 页面查看 `visibleWhen`、`itemPropsWhen`、列表
                schema、`schemaOnly` 等更高阶的业务编排能力。
              </p>

              <div style={styles.featureBulletGrid}>
                {schemaBullets.map((item) => (
                  <div key={item} style={styles.featureBullet}>
                    {item}
                  </div>
                ))}
              </div>

              <Button
                href="/components/schema-form"
                variant="primary"
                size="lg"
              >
                查看 SchemaForm 文档
              </Button>
            </div>
          </div>

          <div style={styles.featureSideCard}>
            <p style={styles.panelLabelInverted}>More Components</p>
            <h3 style={styles.cardTitleInverted}>
              其余组件继续保留完整可达入口
            </h3>
            <p style={styles.cardDescInverted}>
              除了核心入口与高阶能力亮点，Input、Modal、Tabs 与 Progress
              等组件依然可以从首页直接进入。
            </p>

            <div style={styles.sideLinks}>
              {moreComponents.map((item) => (
                <FeatureCard
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={styles.quickStart}>
        <div style={styles.quickStartContent}>
          <SectionTitle
            eyebrow="Quick Start"
            title="最短路径：启动文档，再按推荐顺序进入阅读"
            description="如果你是第一次进入这个仓库，建议先启动文档站，再从 Button / Form 建立基础心智，最后进入 SchemaForm 理解这套组件体系的高阶能力。"
            inverted
          />

          <pre style={styles.codeBlock}>{`pnpm docs:dev
pnpm --filter sci-comp-documention typecheck
pnpm --filter sci-comp-documention build`}</pre>
        </div>

        <div style={styles.sideLinks}>
          {quickLinks.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              href={item.href}
              description={item.description}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
