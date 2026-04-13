import { Modal as AntModal } from 'antd'
import styles from './Modal.module.css'
import type { ModalProps } from './types'

function getClassName(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

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
      wrapClassName={getClassName([fullscreen && styles.fullscreenWrap, wrapClassName])}
      wrapProps={fullscreen ? { ...wrapProps, 'data-fullscreen': 'true' } : wrapProps}
    />
  )
}
