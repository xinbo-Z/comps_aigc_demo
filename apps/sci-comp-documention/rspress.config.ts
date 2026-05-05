import { defineConfig } from 'rspress/config'

export default defineConfig({
  root: 'docs',
  title: 'SCI 组件库文档',
  description: '基于 Ant Design v6 封装的通用组件库文档站',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '主题系统', link: '/guide/theme-system' },
      { text: '组件', link: '/components/button' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '主题系统', link: '/guide/theme-system' },
            { text: '组件导航', link: '/guide/components' },
          ],
        },
      ],
      '/components/': [
        {
          text: '通用组件',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Input', link: '/components/input' },
            { text: 'Table', link: '/components/table' },
            { text: 'Form', link: '/components/form' },
            { text: 'SchemaForm', link: '/components/schema-form' },
            { text: 'Modal', link: '/components/modal' },
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Progress', link: '/components/progress' },
          ],
        },
      ],
    },
  },
})
