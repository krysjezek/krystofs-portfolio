'use client'
import { useRef } from 'react'

const EMAIL = 'krystof@jezek.me'

export default function CopyEmailButton({ className, children, unstyled }) {
  const btnRef = useRef(null)
  const copiedRef = useRef(false)

  const handleClick = async () => {
    await navigator.clipboard.writeText(EMAIL)
    copiedRef.current = true

    const btn = btnRef.current
    btn.dataset.cursor = 'Email Copied!'
    btn.dispatchEvent(new CustomEvent('cursorupdate', { bubbles: true }))
  }

  const handleMouseEnter = () => {
    if (copiedRef.current) {
      copiedRef.current = false
      const btn = btnRef.current
      btn.dataset.cursor = 'Copy Email'
    }
  }

  return (
    <button
      ref={btnRef}
      type="button"
      className={className}
      data-cursor="Copy Email"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={unstyled ? {
        border: 'none',
        background: 'none',
        padding: 0,
        textAlign: 'left',
      } : undefined}
    >
      {children || EMAIL}
    </button>
  )
}
