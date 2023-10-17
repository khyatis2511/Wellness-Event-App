/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Modal.tsx

import { Button } from 'antd'
import React, { useState, type ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalStyle: React.CSSProperties = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: '60px'
  }

  return isOpen
    ? ReactDOM.createPortal(
        <div style={modalStyle}>
          <div className="modal-content">
            <Button className="close" onClick={onClose}>
              <b>&times;</b>
            </Button>
            {children}
          </div>
        </div>,
        document.getElementById('modal-root')!
    )
    : null
}

export default Modal
