import React, { useCallback, useMemo } from 'react'
import { BOMB, COLORS } from '../util'

export default function Cell({ position, value, isOpen, isFlag, onClick, onMouse2 }) {
  const handleClick = useCallback(() => onClick?.(position), [position, onClick])

  const handleMouse2 = useCallback(
    (e) => {
      e.preventDefault()
      onMouse2?.(position)
    },
    [position, onMouse2]
  )

  const label = useMemo(() => {
    const label = value === BOMB ? '💣' : value
    if (isFlag && isOpen) return label + '🚩'
    if (isFlag) return '🚩'
    if (isOpen) return label
    return ''
  }, [isFlag, isOpen, value])

  return (
    <div style={{ backgroundColor: COLORS[label] }} onClick={handleClick} onContextMenu={handleMouse2}>
      {label}
    </div>
  )
}
