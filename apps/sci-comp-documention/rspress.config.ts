import { defineConfig } from 'rspress/config'

export default defineConfig({
  root: 'docs',
  title: 'SCI Comp Documentation',
  description: '基于 Ant Design v6 封装的通用组件库文档站',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/button' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [{ text: '快速开始', link: '/guide/getting-started' }],
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
          ],
        },
      ],
    },
  },
})
