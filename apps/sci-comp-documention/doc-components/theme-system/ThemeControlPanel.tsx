import { useEffect, type CSSProperties } from 'react'
import {
  Button,
  Form,
  Input,
  type SciInstrumentThemeTokens,
} from '@sci-comp/core'
import { themePresets } from './themePlaygroundData'

const sectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: 20,
  borderRadius: 20,
  border: '1px solid var(--rp-c-divider)',
  background: 'var(--rp-c-bg)',
  boxShadow: 'var(--rp-c-shadow-3)',
}

const titleStyle: CSSProperties = {
  margin: 0,
  color: 'var(--rp-c-text-1)',
}

const presetRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
}

interface ThemeControlPanelProps {
  overrides: Partial<SciInstrumentThemeTokens>
  onBlur: (patch: Partial<SciInstrumentThemeTokens>) => void
  onReset: () => void
  onPresetSelect: (key: string) => void
}

export function ThemeControlPanel({
  overrides,
  onBlur,
  onReset,
  onPresetSelect,
}: ThemeControlPanelProps) {
  const [form] = Form.useForm()

  // 当 overrides 变化时，同步表单的值
  useEffect(() => {
    form.setFieldsValue({
      colorPrimary: overrides.colorPrimary,
      colorDanger: overrides.colorDanger,
      colorText: overrides.colorText,
      colorBgContainer: overrides.colorBgContainer,
      borderRadius: overrides.borderRadius,
      controlHeightSM: overrides.controlHeightSM,
      controlHeight: overrides.controlHeight,
      controlHeightLG: overrides.controlHeightLG,
    })
  }, [overrides, form])

  const handleReset = () => {
    form.resetFields()
    onReset()
  }

  const handlePresetClick = (key: string) => {
    onPresetSelect(key)
  }

  const handleFieldBlur = (key: string, value: string) => {
    let processedValue: string | number = value
    if (
      key !== 'colorPrimary' &&
      key !== 'colorDanger' &&
      key !== 'colorText' &&
      key !== 'colorBgContainer'
    ) {
      processedValue = Number(value)
    }
    onBlur({ [key]: processedValue })
  }

  return (
    <section style={sectionStyle}>
      <h3 style={titleStyle}>主题输入</h3>
      <Form form={form} layout="vertical" style={{ width: '100%' }}>
        <Form.Item label="主色" name="colorPrimary">
          <Input
            onBlur={(event) =>
              handleFieldBlur('colorPrimary', event.target.value)
            }
          />
        </Form.Item>
        <Form.Item label="危险色" name="colorDanger">
          <Input
            onBlur={(event) =>
              handleFieldBlur('colorDanger', event.target.value)
            }
          />
        </Form.Item>
        <Form.Item label="文本色" name="colorText">
          <Input
            onBlur={(event) => handleFieldBlur('colorText', event.target.value)}
          />
        </Form.Item>
        <Form.Item label="容器背景色" name="colorBgContainer">
          <Input
            onBlur={(event) =>
              handleFieldBlur('colorBgContainer', event.target.value)
            }
          />
        </Form.Item>
        <Form.Item label="圆角" name="borderRadius">
          <Input
            onBlur={(event) =>
              handleFieldBlur('borderRadius', event.target.value)
            }
          />
        </Form.Item>
        <Form.Item label="小尺寸高度" name="controlHeightSM">
          <Input
            onBlur={(event) =>
              handleFieldBlur('controlHeightSM', event.target.value)
            }
          />
        </Form.Item>
        <Form.Item label="默认高度" name="controlHeight">
          <Input
            onBlur={(event) =>
              handleFieldBlur('controlHeight', event.target.value)
            }
          />
        </Form.Item>
        <Form.Item label="大尺寸高度" name="controlHeightLG">
          <Input
            onBlur={(event) =>
              handleFieldBlur('controlHeightLG', event.target.value)
            }
          />
        </Form.Item>
      </Form>
      <div style={presetRowStyle}>
        {themePresets.map((preset) => (
          <Button
            key={preset.key}
            variant="secondary"
            onClick={() => handlePresetClick(preset.key)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
      <Button variant="ghost" onClick={handleReset}>
        重置
      </Button>
    </section>
  )
}
