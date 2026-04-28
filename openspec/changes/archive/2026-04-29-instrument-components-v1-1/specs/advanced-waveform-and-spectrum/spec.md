## ADDED Requirements

### Requirement: 波形图 SHALL 支持高密度渲染

`WaveformChart` 应支持基于 Canvas 的高密度波形可视化渲染路径，以满足超大数据集的专业仪器场景。

#### Scenario: 渲染百万点波形数据集

- **WHEN** `WaveformChart` 接收到最多可达百万级数据点的波形数据集
- **THEN** 组件必须通过面向 Canvas 的渲染路径进行绘制，而不是依赖 DOM 规模的点渲染

### Requirement: 波形图 SHALL 支持实时流集成

`WaveformChart` 应通过面向流的强类型输入契约支持实时波形更新，并兼容 WebSocket 驱动的应用，但不要求组件自身管理连接生命周期。

#### Scenario: 来自外部流的实时波形更新到达

- **WHEN** 消费应用提供来自 WebSocket 驱动数据流的增量波形更新
- **THEN** `WaveformChart` 必须更新已渲染的波形，而不要求组件自己建立或管理 WebSocket 连接

### Requirement: 波形图 SHALL 支持导航与检查交互

`WaveformChart` 应支持缩放、平移和基于十字准星的检查，以满足专业波形分析工作流。

#### Scenario: 用户检查波形细节

- **WHEN** 用户在已渲染波形上执行缩放、平移或启用十字准星检查
- **THEN** 组件必须更新视口或检查状态，以支持对波形进行细致查看

### Requirement: 波形图 SHALL 支持多通道叠加与导出

`WaveformChart` 应支持多通道叠加展示，并允许以 PNG、SVG 和 CSV 格式导出波形输出。

#### Scenario: 同时显示多个通道

- **WHEN** 消费页面为对比场景提供多个波形通道
- **THEN** `WaveformChart` 必须以具有区分度的叠加可视化方式渲染这些通道

#### Scenario: 用户导出波形输出

- **WHEN** 用户触发波形导出
- **THEN** 组件必须根据所选导出模式提供 PNG、SVG 或 CSV 输出

### Requirement: 谱图组件 SHALL 支持多种谱图工作流

`SpectrumChart` 应支持红外、紫外、质谱以及类似结构的谱图数据类型的专业谱图可视化。

#### Scenario: 谱图类型按领域切换

- **WHEN** 消费页面将 `SpectrumChart` 配置为受支持的某种谱图类型
- **THEN** 组件必须在一致的交互模型中渲染所提供的谱图数据

### Requirement: 谱图组件 SHALL 支持面向峰值的分析交互

`SpectrumChart` 应支持峰值标注、峰积分和峰值识别，作为用户可见的谱图分析交互。

#### Scenario: 用户标记或分析峰值

- **WHEN** 用户执行受支持的峰值标注、积分或识别交互
- **THEN** 组件必须在图表交互模型中呈现由此产生的峰值相关状态

### Requirement: 谱图组件 SHALL 支持叠加与基线校正

`SpectrumChart` 应支持多谱图叠加对比，以及适用于专业分析视图的基线校正工作流。

#### Scenario: 对比多个谱图

- **WHEN** 消费页面提供多个谱图用于对比
- **THEN** `SpectrumChart` 必须渲染叠加对比视图，并保持各序列展示可区分

#### Scenario: 应用基线校正

- **WHEN** 用户执行受支持的基线校正操作
- **THEN** 组件必须更新谱图展示，以反映校正后的基线状态
