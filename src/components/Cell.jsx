import React, { useCallback, useMemo } from 'react'

export const Cell = ({ text, isOpen, onEnd, onOpenCell, x, y, onSetFlag, isFlag, isGameOver }) => {
  const handleClick = useCallback(() => {
    if (!isGameOver) {
      text === '*' ? onEnd() : onOpenCell(x, y)
    }
  }, [onEnd, onOpenCell, x, y, text, isGameOver])

  const handleSetFlag = useCallback(
    (e) => {
      e.preventDefault()
      !isGameOver && onSetFlag(x, y)
    },
    [x, y, onSetFlag, isGameOver]
  )
  const label = useMemo(() => {
    if (isGameOver) {
      if (text !== '*') {
        return text
      }

      return isFlag ? '🚩' : '💣'
    }

    if (!isOpen && !isFlag) {
      return ''
    }

    if (isFlag) {
      return '🚩'
    }

    return text === '*' ? '💣' : text
  }, [text, isGameOver, isFlag, isOpen])

  return (
    <div style={{ width: SIZE, height: SIZE, lineHeight: SIZE, textAlign: 'center', padding: 2 }}>
      <div
        style={{ width: '100%', height: '100%', backgroundColor: '#fafafa', color: COLORS[text] }}
        onClick={handleClick}
        onContextMenu={handleSetFlag}>
        {label}
      </div>
    </div>
  )
}

const COLORS = {
  '0': 'darkgray',
  '1': 'green',
  '2': 'rgb(33, 82, 0)',
  '3': 'rgb(60, 76, 5)',
  '4': 'rgb(117, 118, 7)',
  '5': 'rgb(120, 51, 13)',
  '6': 'rgb(126, 34, 2)',
  '7': 'rgb(131, 17, 0)',
  '8': 'red',
}

const SIZE = `${100 / 45}vw`
