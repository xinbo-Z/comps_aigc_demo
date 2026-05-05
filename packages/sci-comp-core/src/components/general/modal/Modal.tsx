import { Modal as AntModal } from 'antd'
import styles from './Modal.module.css'
import type { ModalProps } from './types'

/**
 * 合并多个类名部分，过滤掉 falsy 值
 */
function getClassName(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/**
 * Modal 弹窗组件
 *
 * 基于 Ant Design Modal 封装，支持全屏模式
 *
 * @example
 * ```tsx
 * <Modal
 *   title="标题"
 *   open={isOpen}
 *   onCancel={handleCancel}
 * >
 *   <p>弹窗内容</p>
 * </Modal>
 * ```
 */
export function Modal({
  fullscreen = false,
  className,
  wrapClassName,
  wrapProps,
  ...restProps
}: ModalProps) {
  return (
    <AntModal
      {...restProps}
      className={getClassName([styles.modal, className])}
      wrapClassName={getClassName([
        fullscreen && styles.fullscreenWrap,
        wrapClassName,
      ])}
      wrapProps={
        fullscreen ? { ...wrapProps, 'data-fullscreen': 'true' } : wrapProps
      }
    />
  )
}
