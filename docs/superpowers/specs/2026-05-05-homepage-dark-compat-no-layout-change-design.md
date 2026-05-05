# HomePage 暗黑兼容（保持结构不变）设计文档

> 目标文件：`apps/sci-comp-documention/docs/HomePage.tsx`

## 背景

当前首页已经具备完整的内容结构、交互关系和较强的品牌展示感，但它的样式实现仍然包含较多亮色模式假设：例如直接基于 `createThemeTokens()` 生成的颜色值进行透明度拼接、大量使用 `tokens.colorBgContainer + alpha` 生成浮层背景、以及将 `tokens.colorPrimary + alpha` 同时用于边框、背景、阴影和 glow。亮色模式下这类写法通常可接受，但在 Rspress 暗黑模式下容易导致文字发灰、卡片边界模糊、顶部条与输入壳层悬浮感不足、背景光效发脏，最终让首页在暗黑模式下出现可读性和视觉质感同时下降的问题。

本次需求明确要求：只为首页做暗黑模式样式兼容，不改变当前页面整体结构。因此这次设计不讨论首页重构、不调整 section 组织、不抽离独立样式文件，也不扩展到整个文档站的主题系统改造，而是聚焦于在单文件内收敛样式语义，让现有结构在亮/暗模式下都稳定可读并保留品牌氛围。

## 目标

1. 仅修改 `apps/sci-comp-documention/docs/HomePage.tsx`，完成首页暗黑模式样式兼容。
2. 保持当前首页的内容结构、section 顺序、交互方式、数据组织和动画关系不变。
3. 在暗黑模式下优先解决可读性问题，包括文字层级、卡片边界、顶部条壳层和底部收口区的清晰度。
4. 在保证可读性的前提下，保留首页现有品牌氛围，包括渐变标题、光效、轻玻璃感和 hover 反馈。
5. 保证亮色模式不因本次兼容而明显退化。

## 非目标

1. 不拆分 `HomePage.tsx` 结构，不新增 section 组件，不改页面 DOM 层级。
2. 不迁移到新的样式文件或首页专用样式模块。
3. 不修改 `@sci-comp/core` 的主题运行时能力。
4. 不调整其他文档页的样式或公共 dark mode 语义。
5. 不重做首页视觉语言，只做在现有视觉框架内的暗黑兼容优化。

## 约束

- 页面结构必须保持不变。
- 改动范围应尽可能限定在样式值来源与 `styles` 对象内部。
- 允许在 `HomePage.tsx` 文件顶部增加少量暗黑语义常量，但不引入新的复杂抽象。
- 兼容暗黑模式时应优先使用现有 Rspress 语义变量，如 `--rp-c-*`，避免继续依赖大量“亮色 token + 透明度后缀”的写法。

## 推荐方案

推荐采用“**单文件语义收敛型**”方案：

- 保留当前 `tokens`、`styles`、`useState`、hover 合并样式的组织方式。
- 在文件顶部新增一小组暗黑友好的语义常量，统一描述 surface、text、border、brand、shadow/overlay 这几个维度。
- 将现有样式从直接消费 `tokens.colorBgContainer`、`tokens.colorText + alpha`、`tokens.colorPrimary + alpha` 改为优先消费这些语义常量。
- 不重写结构，不迁移逻辑，只收敛样式语言。

与“最小打补丁”方案相比，这种方式更容易在不改结构的前提下形成一致的暗黑语义；与“强品牌重做”方案相比，它又不会超出当前任务的范围边界。

## 语义层设计

在 `HomePage.tsx` 中新增少量语义常量，建议按以下类别组织：

### 1. Surface 语义

用于统一页面底、卡片底、弱背景和悬浮壳层：

- `page`
- `surface`
- `surfaceMuted`
- `surfaceElevated`

目的：替换当前直接依赖 `tokens.colorBgContainer` 及其透明变体的写法，让页面、卡片和浮层在暗黑模式下具备清晰层次。

### 2. Text 语义

用于统一主文字、次文字和弱文字：

- `text`
- `textSecondary`
- `textTertiary`

目的：替换 `mutedTextColor`、`tertiaryTextColor` 这类通过 `tokens.colorText` 拼透明度得到的颜色，避免暗黑模式下文字发灰或不稳定。

### 3. Border 语义

用于统一卡片、控件和强调状态的边界：

- `border`
- `borderStrong`
- `borderBrand`

目的：解决暗黑模式下边界过淡的问题，使卡片、顶部条、输入壳层和按钮周边都有稳定的边界识别。

### 4. Brand 语义

用于统一品牌强调背景、弱高亮和氛围光效：

- `brand`
- `brandSoft`
- `brandGlow`
- `brandShadow`

目的：保留首页现有品牌展示感，但把品牌色从“到处拼透明度”收敛为几种明确用途，避免暗黑模式下发脏或喧宾夺主。

### 5. Shadow / Overlay 语义

用于统一玻璃感背景和不同层级的阴影表达：

- `overlay`
- `shadowSoft`
- `shadowElevated`

目的：暗黑模式下不再沿用亮色页面的大软阴影逻辑，而是改成更短、更稳、更贴边的阴影模型。

## 按区域的视觉改造策略

### 1. 页面底色与背景光效

涉及：`pageBackground`、`pageGlow`

问题：当前光效更接近亮色氛围层，在暗黑模式下容易显得发灰、发雾或干扰前景内容。

改法：

- 页面底色改用暗黑语义底面。
- `pageBackground` 改成更克制的品牌径向染色，而不是大面积浅色雾面。
- `pageGlow` 保留，但降低亮度和侵略性，让它成为背景氛围而非前景视觉主体。

### 2. 顶部条（topStrip）

涉及：`topStrip`、`topMeta`、`fakeSearch`、`iconButton`、`topLink`

问题：当前顶部条依赖浅色容器和较轻描边，暗黑模式下容易糊成一片，或者像贴在深色背景上的浅色条块。

改法：

- 顶部条背景改为暗色 overlay。
- 边框强化为低对比但稳定可见的暗黑描边。
- 阴影缩短并聚焦，体现悬浮关系而非大面积扩散。
- 链接、搜索框、图标按钮和 meta pill 统一改为消费暗黑 surface/text/border 语义。

### 3. Hero 首屏

涉及：`badge`、`heroTitle`、`heroDescription`、`heroActions`、`heroMetric`

问题：首屏兼具品牌展示和主要信息承载，暗黑模式下既要避免文字发虚，也要避免 glow 抢内容。

改法：

- `heroTitle` 保留渐变文字，但降低高亮跨度，保证轮廓清楚。
- `heroDescription` 和辅助说明改为明确的次级文字语义，不再依赖亮色文本透明度。
- `heroMetric` 卡片改为暗色悬浮卡，通过背景层、边框和轻量 shadow 表达层次。
- `badge` 和按钮附近的背景染色会更克制，以避免在暗底上出现过亮噪点。

### 4. Features 区

涉及：`featureCard`、`featureTitle`、`featureDescription`

问题：当前卡片在亮色下靠浅底和轻阴影成立，暗黑下容易失去边界。

改法：

- 卡片统一改为暗色 surface 卡。
- hover 以边界增强、轻量抬升和聚焦阴影为主，不再靠“变亮一整张卡”实现反馈。
- 标题和说明文的文字层级显式拉开。

### 5. Components 区

涉及：`componentsSection`、`componentCard`、`componentArrow`、`componentIcon` 周边容器层

问题：这一块同时存在外层 section 渐变、内层卡片、彩色 icon，暗黑下最容易层级打架。

改法：

- `componentsSection` 外层背景改成更轻的暗黑品牌染色。
- `componentCard` 与 section 背景之间建立清晰 surface 层差。
- `componentArrow` 提升在暗黑下的可见性。
- 彩色 `componentIcon` 保留识别度，但卡片壳层要更克制，避免整体太花。

### 6. Footer 区

涉及：`footer`、`footerLink`、`brandVersion`、copyright`

问题：页尾在暗黑模式下最容易过淡，导致整体像“没收尾”。

改法：

- 上边界略增强存在感。
- footer 链接、版本标记和版权信息重建主次层次。
- 保持低调收口，不让页尾比正文区更抢眼。

## 具体样式替换原则

### A. 替换文本透明度拼接

当前模式：

- `mutedTextColor = \`${tokens.colorText}B8\``
- `tertiaryTextColor = \`${tokens.colorText}66\``

问题：在暗黑模式下表现不稳定，容易发灰。

结论：改为稳定的 `textSecondary` / `textTertiary` 语义来源。

### B. 替换浅色容器透明叠加

当前模式：

- `tokens.colorBgContainer + E6/F0/F6`
- 配合 `backdropFilter: blur(...)`

问题：暗黑模式下容易像灰雾蒙层。

结论：只在确实需要悬浮感的位置保留 overlay + blur；普通卡片改为明确的暗色 surface 分层。

### C. 收敛品牌色透明度用途

当前模式：

- `${tokens.colorPrimary}05`
- `${tokens.colorPrimary}08`
- `${tokens.colorPrimary}12`
- `${tokens.colorPrimary}18`

问题：用途分散，没有统一语义。

结论：将它们重组为品牌弱背景、品牌描边、品牌 glow、品牌 shadow 等少量明确用途。

### D. 重做阴影模型

当前模式：较多大而软的亮色阴影。

问题：暗黑模式下要么不明显，要么发脏。

结论：

- 普通卡片使用更短更贴边的阴影。
- 悬浮元素使用更聚焦的 shadow。
- hover 先提升边界和层次，再补充阴影。

## 保留项

以下内容保持不变：

- 页面整体 DOM 结构
- section 顺序
- 数据数组与内容文案
- `useState` hover 交互方式
- 现有 keyframes 动画机制
- `heroTitle` 渐变标题思路
- `componentIcon` 彩色识别策略

## 风险与控制

### 风险 1：暗黑修好了，但亮色退化

控制：所有样式改动都以“双模式兼容”为前提，不做只对暗黑生效却破坏亮色的粗暴替换。

### 风险 2：品牌效果太强，牺牲可读性

控制：优先处理文字与边界，再收敛 glow、gradient、shadow 的强度。

### 风险 3：改动仍停留在补丁层，后续难维护

控制：即使不拆文件，也要在文件顶部建立少量语义常量，避免继续到处直接拼透明度。

## 验收标准

### 范围验收

- 仅修改 `apps/sci-comp-documention/docs/HomePage.tsx`
- 不改结构，不改逻辑，不改其他页面

### 构建验收

- `pnpm --filter sci-comp-documention typecheck`
- `pnpm --filter sci-comp-documention build`

### 人工视觉验收

分别在亮色和暗黑模式下检查：

1. `heroTitle` 是否清晰，不发虚、不刺眼。
2. `heroDescription`、section 描述、卡片说明文的主次层级是否明确。
3. `heroMetric`、`featureCard`、`componentCard` 是否边界清楚。
4. `topStrip`、`fakeSearch`、`iconButton` 等壳层是否既不发白也不糊成一团。
5. 背景 glow / gradient 是否有氛围但不过度干扰内容。
6. footer 是否完成自然收口，而不是过淡消失。

## 最终结论

本次最合适的做法不是重做首页，也不是继续做零散补丁，而是在 `HomePage.tsx` 内建立一小组暗黑语义常量，统一替换当前依赖亮色假设的背景、文字、边框、阴影与品牌装饰写法。这样既能保持页面结构完全不变，也能让首页在暗黑模式下达到“可读、稳定、有质感”的目标。
