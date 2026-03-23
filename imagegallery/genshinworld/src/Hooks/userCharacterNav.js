// ─────────────────────────────────────────────────────────────
//  hooks/useCharacterNav.js
//
//  Encapsulates all navigation state and keyboard handling.
//  The UI components call this hook and get back everything
//  they need — no state management scattered across the tree.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'

/**
 * @param {number} total  — total number of characters
 * @returns {{
 *   activeIndex : number,
 *   contentKey  : number,   — bump this as a React `key` to re-trigger stagger anims
 *   isAnimating : boolean,
 *   slideDir    : 'left' | 'right',
 *   goTo        : (index: number, dir?: string) => void,
 *   goPrev      : () => void,
 *   goNext      : () => void,
 * }}
 */
export function useCharacterNav(total) {
  const [activeIndex,  setActiveIndex]  = useState(0)
  const [contentKey,   setContentKey]   = useState(0)
  const [isAnimating,  setIsAnimating]  = useState(false)
  const [slideDir,     setSlideDir]     = useState('right')

  const goTo = useCallback((newIndex, direction = 'right') => {
    if (isAnimating || newIndex === activeIndex) return
    setSlideDir(direction)
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex(newIndex)
      setContentKey(k => k + 1)
      setIsAnimating(false)
    }, 360)
  }, [isAnimating, activeIndex])

  const goPrev = useCallback(
    () => goTo((activeIndex - 1 + total) % total, 'left'),
    [goTo, activeIndex, total]
  )

  const goNext = useCallback(
    () => goTo((activeIndex + 1) % total, 'right'),
    [goTo, activeIndex, total]
  )

  // Keyboard navigation
  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [goPrev, goNext])

  return { activeIndex, contentKey, isAnimating, slideDir, goTo, goPrev, goNext }
}