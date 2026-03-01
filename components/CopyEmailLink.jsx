'use client'
import { useRef } from 'react'

const EMAIL = 'krystof@jezek.me'

export default function CopyEmailLink() {
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
      className="link"
      data-cursor="Copy Email"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={{
        border: 'none',
        background: 'none',
        padding: 0,
        cursor: 'none',
        textAlign: 'left',
      }}
    >
      {EMAIL}
    </button>
  )
}
