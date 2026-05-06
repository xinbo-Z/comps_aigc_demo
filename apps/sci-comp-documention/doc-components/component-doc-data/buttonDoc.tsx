import type { ComponentDocPageData } from '../ComponentDoc'
import {
  ButtonDangerPreview,
  ButtonLoadingPreview,
  ButtonSizePreview,
  ButtonToolbarPreview,
  ButtonVariantPreview,
} from '../component-doc-previews/buttonPreviews'

export const buttonDocPage: ComponentDocPageData = {
  title: 'Button',
  description:
    '`Button` 是基于 Ant Design Button 的通用封装组件，用于统一主次操作、风险动作与状态反馈的表达方式。',
  definition: [
    '基于 antd Button 做轻量 wrapper，保留原生按钮的主要交互能力。',
    '通过 `variant` 与 `size` 提供更贴近业务语义的使用方式，减少在页面里反复映射 antd `type`。',
    '适合承载页面主操作、次操作、轻量操作与风险动作，不引入偏离 antd 心智模型的大量新增行为。',
  ],
  scenarios: [
    '页面主流程提交、创建、发布等需要突出优先级的动作。',
    '列表工具栏、表单页脚、弹窗确认区等需要同时组织主次按钮的场景。',
    '删除、下线、重置等风险动作，需要通过 danger 语义明确提示后果。',
    '处理中、锁定中、权限不足等需要展示 loading 或 disabled 状态的场景。',
  ],
  examples: [
    {
      id: 'button-variants',
      title: '基础变体',
      summary:
        '用一组常见按钮变体验证主按钮、次按钮、幽灵按钮与文本按钮的基本层级关系。',
      relatedProps: ['variant', 'children'],
      preview: <ButtonVariantPreview />,
      code: `import { Button } from '@sci-comp/core'

export function ButtonVariantPreview() {
  return (
    <>
      <Button variant="primary">立即创建</Button>
      <Button variant="secondary">保存草稿</Button>
      <Button variant="ghost">更多操作</Button>
      <Button variant="text">稍后处理</Button>
    </>
  )
}`,
      sourceDetails: {
        purpose: '帮助读者快速建立 `variant` 与业务动作优先级之间的映射关系。',
        highlights: [
          '`primary` 适合页面主操作。',
          '`secondary` 适合与主操作并列的次要动作。',
          '`ghost` 与 `text` 适合弱化存在感的轻操作。',
        ],
        boundaries: [
          '当页面只允许一个主操作时，优先只保留一个 `primary`。',
          '如果操作本质是导航链接，不应仅为了视觉统一而滥用按钮。',
        ],
      },
      editorReservation: {
        initialCode: 'ButtonVariantPreview',
        supportedControls: ['variant'],
      },
    },
    {
      id: 'button-danger',
      title: '风险操作',
      summary:
        '展示风险动作与取消动作并排出现时的层级关系，避免危险操作和主流程混淆。',
      relatedProps: ['variant', 'disabled'],
      preview: <ButtonDangerPreview />,
      code: `import { Button } from '@sci-comp/core'

export function ButtonDangerPreview() {
  return (
    <>
      <Button variant="danger">删除资源</Button>
      <Button variant="danger" disabled>
        已禁用删除
      </Button>
      <Button variant="secondary">取消</Button>
    </>
  )
}`,
      sourceDetails: {
        purpose: '帮助在文档中明确 `danger` 语义只用于真正具有破坏性的操作。',
        highlights: [
          '通过 `variant="danger"` 直接表达风险动作。',
          '禁用态仍保留危险语义，便于说明权限或前置条件未满足。',
        ],
        boundaries: [
          '不要把普通的“清空筛选”或“返回”动作标成 `danger`。',
          '风险动作仍应结合业务确认机制，而不是只依赖颜色警示。',
        ],
      },
      editorReservation: {
        initialCode: 'ButtonDangerPreview',
        supportedControls: ['variant', 'disabled'],
      },
    },
    {
      id: 'button-size',
      title: '尺寸层级',
      summary:
        '对比 sm / md / lg 三档尺寸，帮助在紧凑工具条和主流程页脚中快速选型。',
      relatedProps: ['size', 'variant'],
      preview: <ButtonSizePreview />,
      code: `import { Button } from '@sci-comp/core'

export function ButtonSizePreview() {
  return (
    <>
      <Button variant="primary" size="sm">
        小按钮
      </Button>
      <Button variant="primary" size="md">
        默认按钮
      </Button>
      <Button variant="primary" size="lg">
        大按钮
      </Button>
    </>
  )
}`,
      sourceDetails: {
        purpose: '说明按钮尺寸主要服务于信息密度，而不是用于表达主次优先级。',
        highlights: [
          '`sm` 更适合列表工具条和局部操作。',
          '`md` 是最稳妥的默认尺寸。',
          '`lg` 适合着陆页或主流程收口区。',
        ],
        boundaries: [
          '不要用尺寸代替视觉层级，优先级仍应通过 `variant` 表达。',
          '同一操作组内尽量保持统一尺寸，避免视觉跳动。',
        ],
      },
      editorReservation: {
        initialCode: 'ButtonSizePreview',
        supportedControls: ['size'],
      },
    },
    {
      id: 'button-states',
      title: '加载与禁用状态',
      summary: '展示按钮在提交中和不可操作时的反馈方式，避免用户重复触发动作。',
      relatedProps: ['loading', 'disabled'],
      preview: <ButtonLoadingPreview />,
      code: `import { Button } from '@sci-comp/core'

export function ButtonLoadingPreview() {
  return (
    <>
      <Button variant="primary" loading>
        提交中
      </Button>
      <Button variant="secondary" disabled>
        已锁定
      </Button>
      <Button variant="ghost">返回列表</Button>
    </>
  )
}`,
      sourceDetails: {
        purpose:
          '说明 `loading` 与 `disabled` 的职责不同：一个表达处理中，一个表达当前不可操作。',
        highlights: [
          '`loading` 会同步禁用按钮，避免重复提交。',
          '`disabled` 更适合权限不足或前置条件未满足。',
        ],
        boundaries: [
          '若操作已经开始执行，优先使用 `loading` 而不是只设成 `disabled`。',
          '状态反馈需要和页面其他提示保持一致，避免只剩按钮自己变化。',
        ],
      },
      editorReservation: {
        initialCode: 'ButtonLoadingPreview',
        supportedControls: ['loading', 'disabled'],
      },
    },
    {
      id: 'button-toolbar',
      title: '工具栏组合场景',
      summary:
        '在同一个工具栏中组合主操作、辅助操作与风险操作，验证文档骨架是否能承载更接近官网的场景化示例。',
      relatedProps: ['variant', 'size'],
      preview: <ButtonToolbarPreview />,
      code: `import { Button } from '@sci-comp/core'

export function ButtonToolbarPreview() {
  return (
    <>
      <Button variant="primary">发布版本</Button>
      <Button variant="secondary">保存草稿</Button>
      <Button variant="ghost">导出记录</Button>
      <Button variant="danger">删除版本</Button>
    </>
  )
}`,
      sourceDetails: {
        purpose: '帮助读者理解在真实业务组合里，按钮层级如何稳定地排布。',
        highlights: [
          '主操作与次操作应稳定地并列出现。',
          '辅助操作可以弱化，但不应抢占主流程视觉焦点。',
          '风险操作需要与主流程操作拉开语义距离。',
        ],
        boundaries: [
          '若页面动作超过 4 个，应考虑拆分操作区而不是继续堆按钮。',
          '风险操作不应默认和主操作紧挨在一起。',
        ],
      },
      editorReservation: {
        initialCode: 'ButtonToolbarPreview',
        supportedControls: ['variant', 'size'],
      },
    },
  ],
  api: [
    {
      name: 'variant',
      description:
        '按钮语义层级映射，统一主按钮、次按钮、风险按钮与弱化操作的表达。',
      type: "'primary' | 'secondary' | 'danger' | 'ghost' | 'text'",
      defaultValue: "'primary'",
      notes: '内部会映射到 antd Button 的 type / danger / ghost 组合。',
    },
    {
      name: 'size',
      description: '按钮尺寸语义映射，用于在不同信息密度场景下保持尺寸一致。',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      notes: '分别映射到 antd 的 small / middle / large。',
    },
    {
      name: 'loading',
      description: '展示按钮进行中状态，并在加载期间避免重复触发。',
      type: 'boolean',
      defaultValue: 'false',
      notes: '高频提交场景建议优先使用。',
    },
    {
      name: 'disabled',
      description: '禁用按钮交互，适合权限不足或前置条件未满足的场景。',
      type: 'boolean',
      defaultValue: 'false',
      notes: '来自 antd 透传，但在业务中使用频率很高，建议纳入主表。',
    },
    {
      name: 'type',
      description:
        '按钮原生 `htmlType`，用于 submit / reset / button 等表单行为控制。',
      type: "'button' | 'submit' | 'reset'",
      defaultValue: "'button'",
      notes: '组件层命名为 `type`，内部映射到 antd Button 的 `htmlType`。',
    },
    {
      name: 'onClick',
      description: '点击事件处理函数。',
      type: '(event) => void',
      defaultValue: '-',
      notes: '保留 antd 原生交互方式。',
    },
    {
      name: 'icon',
      description: '按钮前置图标，适合强调动作含义或提升扫描效率。',
      type: 'ReactNode',
      defaultValue: '-',
      notes: '内部会补充装饰性图标的 aria-hidden 处理。',
    },
  ],
  selectionTips: [
    '提交、创建、发布这类主流程动作优先使用 `primary`，同一区域通常只保留一个主按钮。',
    '跳转到详情页、文档页或外部站点的动作优先使用 Link，而不是仅为了视觉统一继续堆 Button。',
    '当同一区域存在多个次级操作且需要收纳时，优先考虑 Dropdown Button 或外层操作菜单，而不是把所有动作平铺成同级按钮。',
    'danger 只用于真正具有破坏性或不可逆后果的操作，普通返回、关闭或清空不应滥用该语义。',
  ],
  wrapperNotes: [
    'Button 仍然基于 antd Button 实现，不是脱离 antd 的自定义按钮体系。',
    '第一版 API 表只覆盖业务里高频使用的属性，不等同于 antd Button 的全量参数镜像。',
    'Button wrapper 主要负责主次层级、危险语义和基础状态表达；导航跳转、批量动作收纳和危险确认流程仍应由 Link、Dropdown 或业务层容器承担。',
  ],
}
