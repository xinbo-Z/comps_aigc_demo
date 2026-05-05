import { Button, createThemeTokens } from '@sci-comp/core'
import { useState } from 'react'

const tokens = createThemeTokens()

const surfaces = {
  page: 'var(--rp-c-bg)',
  surface: 'var(--rp-c-bg-soft)',
  surfaceMuted: 'var(--rp-c-bg-mute)',
  surfaceElevated:
    'color-mix(in srgb, var(--rp-c-bg) 88%, var(--rp-c-bg-soft) 12%)',
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

const heroMetrics = [
  { label: '组件入口', value: '8+', icon: '📦' },
  { label: '主路径', value: '3', icon: '🎯' },
  { label: '工作台', value: '1', icon: '🚀' },
]

const features = [
  {
    title: '精美设计',
    description:
      '基于 Ant Design v6 精心封装，提供优雅的视觉体验和一致的设计语言',
    icon: '🎨',
  },
  {
    title: '高性能',
    description: '优化的渲染性能，流畅的交互体验，确保应用运行如丝般顺滑',
    icon: '⚡',
  },
  {
    title: '响应式设计',
    description: '完美适配桌面端和移动端设备，为用户提供一致的体验',
    icon: '📱',
  },
  {
    title: '易于定制',
    description: '灵活的配置选项，满足各种业务需求，轻松打造专属组件库',
    icon: '🔧',
  },
]

const components = [
  {
    name: 'Button',
    description: '按钮组件，支持多种样式和状态',
    color: tokens.colorPrimary,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    name: 'Input',
    description: '输入框组件，支持多种输入类型',
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, #f472b6 0%, #fb7185 100%)',
  },
  {
    name: 'Table',
    description: '表格组件，支持排序、筛选和分页',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
  },
  {
    name: 'Form',
    description: '表单组件，支持表单验证和布局',
    color: '#4ade80',
    gradient: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
  },
  {
    name: 'Modal',
    description: '模态框组件，支持多种弹出方式',
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
  },
  {
    name: 'Tabs',
    description: '标签页组件，支持多种切换方式',
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
  },
]

const styles = {
  page: {
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '20px clamp(16px, 3vw, 32px) 88px',
    color: surfaces.text,
    boxSizing: 'border-box' as const,
  },
  heroShell: {
    position: 'relative' as const,
    isolation: 'isolate' as const,
  },
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
  topStripHover: {
    border: `1px solid ${surfaces.borderStrong}`,
    boxShadow: `0 22px 56px ${surfaces.brandShadow}`,
    transform: 'translateY(-2px)',
  },
  topStripLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    flexWrap: 'wrap' as const,
    minWidth: 0,
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '14px',
    border: `1px solid ${surfaces.borderBrand}`,
    background: `linear-gradient(135deg, ${surfaces.brandSoft} 0%, ${surfaces.brandGlow} 100%)`,
    fontSize: '18px',
    fontWeight: 800,
    flexShrink: 0,
    boxShadow: `inset 0 1px 0 ${surfaces.surface}, 0 8px 18px ${surfaces.brandShadow}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  logoHover: {
    transform: 'scale(1.05) rotate(5deg)',
    boxShadow: `inset 0 1px 0 ${surfaces.surface}, 0 12px 28px ${surfaces.brandShadow}`,
  },
  topLinkRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    flexWrap: 'wrap' as const,
  },
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
  topLinkHover: {
    color: surfaces.brand,
    opacity: 1,
  },
  topMeta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '999px',
    border: `1px solid ${surfaces.borderBrand}`,
    background: surfaces.brandSoft,
    color: surfaces.brand,
    fontSize: '13px',
    fontWeight: 700,
    whiteSpace: 'nowrap' as const,
    transition: 'all 0.2s ease',
  },
  topMetaHover: {
    background: surfaces.overlay,
    transform: 'scale(1.02)',
  },
  topStripRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap' as const,
    justifyContent: 'flex-end' as const,
  },
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
  fakeSearchFocus: {
    border: `1px solid ${surfaces.borderBrand}`,
    boxShadow: `0 14px 32px ${surfaces.brandShadow}`,
  },
  counter: {
    color: surfaces.textSecondary,
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.02em',
  },
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
  iconButtonHover: {
    background: surfaces.surface,
    border: `1px solid ${surfaces.borderBrand}`,
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 20px ${surfaces.brandShadow}`,
  },
  createButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderRadius: '16px',
    background: `linear-gradient(135deg, ${surfaces.brand} 0%, ${surfaces.brandTint} 100%)`,
    color: surfaces.page,
    fontSize: '15px',
    fontWeight: 700,
    border: 'none',
    flexShrink: 0,
    boxShadow: `0 14px 28px ${surfaces.brandShadow}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  createButtonHover: {
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: `0 20px 40px ${surfaces.brandShadow}`,
  },
  heroSection: {
    display: 'grid',
    justifyItems: 'center' as const,
    textAlign: 'center' as const,
    padding: '76px 0 50px',
    position: 'relative' as const,
    gap: '0',
  },
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
  badgeHover: {
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: `0 20px 48px ${tokens.colorPrimary}22`,
  },
  heroTitle: {
    margin: '24px 0 0',
    maxWidth: '920px',
    fontSize: 'clamp(54px, 9vw, 90px)',
    lineHeight: 0.96,
    letterSpacing: '-0.082em',
    fontWeight: 800,
    color: surfaces.text,
    textWrap: 'balance' as const,
    background: `linear-gradient(135deg, ${surfaces.text} 0%, ${surfaces.brand} 50%, ${surfaces.text} 100%)`,
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'gradientShift 6s ease infinite',
  },
  heroDescription: {
    margin: '24px 0 0',
    maxWidth: '760px',
    fontSize: 'clamp(16px, 2.2vw, 20px)',
    lineHeight: 1.8,
    color: surfaces.textSecondary,
    textWrap: 'pretty' as const,
    animation: 'slideUp 0.8s ease-out',
  },
  heroActions: {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    marginTop: '34px',
    animation: 'slideUp 1s ease-out',
  },
  heroMetrics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(148px, 1fr))',
    gap: '14px',
    width: 'min(680px, 100%)',
    marginTop: '38px',
    animation: 'slideUp 1.2s ease-out',
  },
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
  heroMetricHover: {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: `0 20px 42px ${surfaces.brandShadow}`,
    border: `1px solid ${surfaces.borderBrand}`,
  },
  heroMetricLabel: {
    display: 'block',
    color: surfaces.textTertiary,
    fontSize: '13px',
    lineHeight: 1.4,
    fontWeight: 700,
  },
  heroMetricValue: {
    display: 'block',
    marginTop: '8px',
    color: surfaces.text,
    fontSize: '26px',
    lineHeight: 1.1,
    fontWeight: 800,
  },
  featuresSection: {
    padding: '72px 0',
  },
  sectionContainer: {
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 clamp(16px, 3vw, 32px)',
  },
  sectionHeader: {
    textAlign: 'center' as const,
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: 'clamp(32px, 5vw, 42px)',
    fontWeight: 800,
    color: surfaces.text,
    margin: '0 0 12px',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  sectionDescription: {
    fontSize: 'clamp(15px, 2vw, 18px)',
    color: surfaces.textSecondary,
    margin: '0 auto',
    maxWidth: '600px',
    lineHeight: 1.7,
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
  },
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
  featureCardHover: {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 24px 56px ${surfaces.brandShadow}`,
    border: `1px solid ${surfaces.borderBrand}`,
  },
  featureIcon: {
    fontSize: '48px',
    marginBottom: '20px',
    display: 'inline-block',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  featureIconHover: {
    transform: 'scale(1.1) rotate(5deg)',
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: surfaces.text,
    margin: '0 0 12px',
    lineHeight: 1.3,
  },
  featureDescription: {
    fontSize: '14px',
    color: surfaces.textSecondary,
    lineHeight: 1.7,
    margin: 0,
  },
  componentsSection: {
    padding: '72px 0',
    background: `linear-gradient(180deg, ${surfaces.brandSoft} 0%, ${surfaces.page} 100%)`,
    borderRadius: '48px',
    margin: '32px -32px',
  },
  componentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
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
  componentCardHover: {
    transform: 'translateY(-6px) scale(1.02)',
    boxShadow: `0 20px 48px ${surfaces.brandShadow}`,
    border: `1px solid ${surfaces.borderBrand}`,
  },
  componentCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  componentIcon: {
    width: '52px',
    height: '52px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '22px',
    fontWeight: 800,
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    flexShrink: 0,
  },
  componentIconHover: {
    transform: 'scale(1.1) rotate(5deg)',
  },
  componentName: {
    fontSize: '20px',
    fontWeight: 700,
    color: surfaces.text,
    margin: 0,
    lineHeight: 1.2,
  },
  componentDescription: {
    fontSize: '14px',
    color: surfaces.textSecondary,
    lineHeight: 1.7,
    margin: '0 0 20px',
  },
  componentArrow: {
    position: 'absolute' as const,
    right: '28px',
    bottom: '28px',
    fontSize: '22px',
    color: surfaces.textSecondary,
    opacity: 0.72,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  componentArrowHover: {
    color: surfaces.brand,
    opacity: 1,
    transform: 'translateX(6px)',
  },
  workbenchWrap: {
    marginTop: '32px',
    borderRadius: '40px',
    border: `1px solid ${surfaces.borderBrand}`,
    background: surfaces.surface,
    boxShadow: `0 36px 92px ${surfaces.brandShadow}`,
    overflow: 'hidden' as const,
    position: 'relative' as const,
    animation: 'slideUp 1.4s ease-out',
  },
  workbenchSurface: {
    padding: 'clamp(18px, 2.2vw, 28px)',
    background: `linear-gradient(180deg, ${surfaces.surfaceElevated} 0%, ${surfaces.brandSoft} 54%, transparent 100%)`,
  },
  workbenchTabs: {
    marginBottom: '22px',
    padding: '0 4px 12px',
    borderBottom: `1px solid ${surfaces.border}`,
  },
  workbenchGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '18px',
    alignItems: 'stretch',
  },
  card: {
    borderRadius: '28px',
    border: `1px solid ${surfaces.borderBrand}`,
    background: surfaces.surfaceElevated,
    padding: '24px',
    boxShadow: `0 18px 36px ${surfaces.brandShadow}`,
    minWidth: 0,
    backdropFilter: 'blur(18px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  cardHover: {
    transform: 'translateY(-4px)',
    boxShadow: `0 24px 48px ${surfaces.brandShadow}`,
    border: `1px solid ${surfaces.borderBrand}`,
  },
  cardTitle: {
    margin: 0,
    fontSize: '18px',
    lineHeight: 1.35,
    fontWeight: 700,
    color: surfaces.text,
  },
  cardHeader: {
    display: 'grid',
    gap: '6px',
  },
  cardEyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    width: 'fit-content',
    padding: '6px 12px',
    borderRadius: '999px',
    border: `1px solid ${surfaces.borderBrand}`,
    background: surfaces.brandSoft,
    color: surfaces.brand,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
  cardDescription: {
    margin: '8px 0 0',
    fontSize: '14px',
    lineHeight: 1.75,
    color: surfaces.textSecondary,
  },
  paymentCard: {
    display: 'grid',
    gap: '18px',
    alignContent: 'start' as const,
  },
  formStack: {
    display: 'grid',
    gap: '18px',
    width: '100%',
    maxWidth: '100%',
  },
  label: {
    margin: 0,
    fontSize: '15px',
    lineHeight: 1.4,
    fontWeight: 700,
    color: surfaces.text,
  },
  hint: {
    margin: '4px 0 0',
    fontSize: '13px',
    lineHeight: 1.7,
    color: surfaces.textSecondary,
  },
  inputRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '14px',
  },
  emptyCard: {
    minHeight: '288px',
    display: 'grid',
    alignContent: 'center',
    justifyItems: 'center' as const,
    textAlign: 'center' as const,
    gap: '16px',
    borderStyle: 'dashed',
    background: surfaces.surface,
  },
  avatarRow: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
  },
  avatar: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '999px',
    border: `2px solid ${surfaces.surface}`,
    background: `linear-gradient(135deg, ${surfaces.brandSoft} 0%, ${surfaces.brandGlow} 100%)`,
    color: surfaces.text,
    fontSize: '15px',
    fontWeight: 700,
    marginLeft: '-10px',
    transition: 'transform 0.3s ease',
  },
  avatarHover: {
    transform: 'scale(1.1)',
  },
  emptyIcon: {
    width: '92px',
    height: '92px',
    borderRadius: '999px',
    border: `2px dashed ${surfaces.borderBrand}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: surfaces.textSecondary,
    fontSize: '32px',
    background: surfaces.brandSoft,
  },
  sideStack: {
    display: 'grid',
    gap: '14px',
    alignContent: 'start' as const,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    marginBottom: '14px',
    flexWrap: 'wrap' as const,
  },
  smallButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 16px',
    borderRadius: '14px',
    background: `linear-gradient(135deg, ${surfaces.text} 0%, ${surfaces.text}E6 100%)`,
    color: surfaces.page,
    fontSize: '14px',
    fontWeight: 700,
    border: 'none',
    flexShrink: 0,
    transition: 'all 0.3s ease',
  },
  smallButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 20px ${surfaces.brandShadow}`,
  },
  arrowRow: {
    display: 'grid',
    gap: '12px',
  },
  verifiedRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    flexWrap: 'wrap' as const,
  },
  selectLike: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    minWidth: '190px',
    padding: '12px 16px',
    borderRadius: '16px',
    border: `1px solid ${surfaces.borderBrand}`,
    background: surfaces.surface,
    color: surfaces.text,
    fontSize: '15px',
    fontWeight: 500,
    flex: '1 1 190px',
    boxSizing: 'border-box' as const,
    transition: 'all 0.3s ease',
  },
  selectLikeHover: {
    border: `1px solid ${surfaces.borderBrand}`,
    background: surfaces.brandSoft,
  },
  composeCard: {
    minHeight: '228px',
    display: 'grid',
    gap: '16px',
  },
  composeTag: {
    display: 'inline-flex',
    alignItems: 'center',
    width: 'fit-content',
    maxWidth: '100%',
    padding: '10px 14px',
    borderRadius: '16px',
    border: `1px solid ${tokens.colorPrimary}1F`,
    background: tokens.colorBgContainer,
    color: tokens.colorPrimary,
    fontSize: '15px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
  },
  composeTagHover: {
    background: `${tokens.colorPrimary}08`,
    border: `1px solid ${tokens.colorPrimary}30`,
  },
  composeText: {
    fontSize: '16px',
    lineHeight: 1.85,
    color: surfaces.textSecondary,
  },
  composeFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    flexWrap: 'wrap' as const,
    marginTop: 'auto',
    color: surfaces.textSecondary,
    fontSize: '14px',
  },
  bottomGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '18px',
    marginTop: '18px',
  },
  chipRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap' as const,
    alignContent: 'flex-start' as const,
  },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    borderRadius: '999px',
    border: `1px solid ${surfaces.borderBrand}`,
    background: surfaces.brandSoft,
    color: surfaces.text,
    fontSize: '14px',
    fontWeight: 500,
    whiteSpace: 'nowrap' as const,
    transition: 'all 0.3s ease',
  },
  chipHover: {
    background: surfaces.overlay,
    border: `1px solid ${surfaces.borderBrand}`,
    transform: 'translateY(-2px)',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 16px',
    borderRadius: '18px',
    border: `1px solid ${surfaces.borderBrand}`,
    background: surfaces.surface,
    fontSize: '15px',
    fontWeight: 600,
    flexWrap: 'wrap' as const,
    transition: 'all 0.3s ease',
  },
  checkboxRowHover: {
    background: surfaces.brandSoft,
    border: `1px solid ${surfaces.borderBrand}`,
  },
  checkboxMark: {
    width: '20px',
    height: '20px',
    borderRadius: '8px',
    background: `linear-gradient(135deg, ${tokens.colorPrimary} 0%, ${tokens.colorPrimary}E6 100%)`,
    color: tokens.colorBgContainer,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 800,
    flexShrink: 0,
    boxShadow: `0 4px 12px ${tokens.colorPrimary}25`,
  },
  statCard: {
    display: 'grid',
    gap: '12px',
    alignContent: 'start' as const,
  },
  progressMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    color: surfaces.textSecondary,
    fontSize: '14px',
    flexWrap: 'wrap' as const,
  },
  secondaryText: {
    color: surfaces.textSecondary,
    fontSize: '14px',
    lineHeight: 1.8,
  },
  footer: {
    marginTop: '64px',
    padding: '48px 0 24px',
    borderTop: `1px solid ${surfaces.border}`,
    textAlign: 'center' as const,
  },
  footerBrand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  brandName: {
    fontSize: '20px',
    fontWeight: 800,
    color: surfaces.text,
  },
  brandVersion: {
    fontSize: '13px',
    color: surfaces.textSecondary,
    background: surfaces.brandSoft,
    padding: '6px 12px',
    borderRadius: '999px',
    fontWeight: 600,
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    marginBottom: '24px',
    flexWrap: 'wrap' as const,
  },
  footerLink: {
    color: surfaces.textSecondary,
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'color 0.2s ease',
  },
  footerLinkHover: {
    color: surfaces.brand,
  },
  footerCopyright: {
    color: surfaces.textTertiary,
    fontSize: '13px',
    margin: 0,
  },
  // 响应式断点
  '@media (max-width: 768px)': {
    heroContent: {
      gridTemplateColumns: '1fr',
      gap: '40px',
      textAlign: 'center' as const,
    },
    heroTitle: {
      fontSize: '40px',
    },
    featuresGrid: {
      gridTemplateColumns: '1fr',
    },
    componentsGrid: {
      gridTemplateColumns: '1fr',
    },
    workbenchGrid: {
      gridTemplateColumns: '1fr',
    },
    bottomGrid: {
      gridTemplateColumns: '1fr',
    },
    topStrip: {
      justifyContent: 'center',
    },
    topStripRight: {
      justifyContent: 'center',
      width: '100%',
    },
  },
  '@media (max-width: 480px)': {
    heroSection: {
      padding: '56px 0 40px',
    },
    heroTitle: {
      fontSize: '32px',
    },
    featuresSection: {
      padding: '48px 0',
    },
    componentsSection: {
      padding: '48px 0',
      margin: '20px -16px',
      borderRadius: '32px',
    },
    heroMetrics: {
      gridTemplateColumns: '1fr',
    },
    workbenchWrap: {
      borderRadius: '28px',
    },
    featureCard: {
      padding: '24px',
      borderRadius: '20px',
    },
    componentCard: {
      padding: '24px',
      borderRadius: '20px',
    },
  },
} as const

// 关键帧动画
const keyframes = `
  @keyframes pulse {
    0%, 100% {
      transform: translateX(-50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translateX(-50%) scale(1.05);
      opacity: 0.8;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-12px);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`

function HeroSection() {
  return (
    <section style={styles.heroSection}>
      <div style={styles.pageBackground} />
      <div style={styles.pageGlow} />
      <h1 style={styles.heroTitle}>你的设计系统基础</h1>
      <p style={styles.heroDescription}>
        一套设计精良的组件，你可以按需定制、扩展并构建自己的产品。从这里开始，把它变成你自己的样子。开源，开放代码。
      </p>
      <div style={styles.heroActions}>
        <Button href="/guide/getting-started" variant="primary" size="lg">
          立即开始
        </Button>
        <Button href="/components/button" variant="ghost" size="lg">
          查看组件
        </Button>
      </div>
      <div style={styles.heroMetrics}>
        {heroMetrics.map((item) => (
          <MetricCard key={item.label} item={item} />
        ))}
      </div>
    </section>
  )
}

function MetricCard({
  item,
}: {
  item: { icon: string; label: string; value: string }
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{
        ...styles.heroMetric,
        ...(isHovered ? styles.heroMetricHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
      <span style={styles.heroMetricLabel}>{item.label}</span>
      <span style={styles.heroMetricValue}>{item.value}</span>
    </div>
  )
}

function FeaturesSection() {
  return (
    <section style={styles.featuresSection}>
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>核心特性</h2>
          <p style={styles.sectionDescription}>
            专为企业级应用设计的组件库，提供全方位的开发支持
          </p>
        </div>
        <div style={styles.featuresGrid}>
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  feature,
}: {
  feature: { icon: string; title: string; description: string }
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{
        ...styles.featureCard,
        ...(isHovered ? styles.featureCardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          ...styles.featureIcon,
          ...(isHovered ? styles.featureIconHover : {}),
        }}
      >
        {feature.icon}
      </div>
      <h3 style={styles.featureTitle}>{feature.title}</h3>
      <p style={styles.featureDescription}>{feature.description}</p>
    </div>
  )
}

function ComponentsSection() {
  return (
    <section style={styles.componentsSection}>
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>组件预览</h2>
          <p style={styles.sectionDescription}>
            丰富的组件库，覆盖各种业务场景
          </p>
        </div>
        <div style={styles.componentsGrid}>
          {components.map((component) => (
            <ComponentCard key={component.name} component={component} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ComponentCard({
  component,
}: {
  component: {
    name: string
    gradient: string
    color: string
    description: string
  }
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={`/components/${component.name.toLowerCase()}`}
      style={{
        ...styles.componentCard,
        ...(isHovered ? styles.componentCardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.componentCardHeader}>
        <div
          style={{
            ...styles.componentIcon,
            ...(isHovered ? styles.componentIconHover : {}),
            background: component.gradient,
            boxShadow: isHovered
              ? `0 12px 32px ${component.color}40`
              : `0 8px 24px ${component.color}25`,
          }}
        >
          {component.name.charAt(0)}
        </div>
        <h3 style={styles.componentName}>{component.name}</h3>
      </div>
      <p style={styles.componentDescription}>{component.description}</p>
      <div
        style={{
          ...styles.componentArrow,
          ...(isHovered ? styles.componentArrowHover : {}),
        }}
      >
        →
      </div>
    </a>
  )
}

function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  return (
    <footer style={styles.footer}>
      <div style={styles.sectionContainer}>
        <div style={styles.footerBrand}>
          <span style={styles.brandName}>SCI Comp</span>
          <span style={styles.brandVersion}>v1.0.0</span>
        </div>
        <div style={styles.footerLinks}>
          {[
            { name: '文档', href: '/guide/getting-started' },
            { name: '组件', href: '/components/button' },
            { name: 'GitHub', href: '#' },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                ...styles.footerLink,
                ...(hoveredLink === link.name ? styles.footerLinkHover : {}),
              }}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.name}
            </a>
          ))}
        </div>
        <div style={styles.footerCopyright}>
          <p>© 2024 SCI Comp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export function HomePage() {
  return (
    <div style={styles.page}>
      <style>{keyframes}</style>
      <div style={styles.heroShell}>
        <HeroSection />
      </div>
      <FeaturesSection />
      <ComponentsSection />
      <Footer />
    </div>
  )
}

export default HomePage
