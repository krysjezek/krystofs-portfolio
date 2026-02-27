'use client'
import { useEffect } from 'react'

export default function LinkLines() {
  useEffect(() => {
    function onEnter(e) {
      if (!(e.target instanceof Element)) return
      const block = e.target.closest('.div-block-65')
      if (!block) return
      const mask = block.querySelector('.line-mask')
      if (!mask) return
      const rect = mask.getBoundingClientRect()
      const pct = ((e.clientX - rect.left) / rect.width) * 100
      mask.querySelector('.line')?.style.setProperty('--line-ox', pct + '%')
    }

    document.addEventListener('mouseenter', onEnter, true)
    return () => document.removeEventListener('mouseenter', onEnter, true)
  }, [])

  return null
}
