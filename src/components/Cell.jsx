import React, { useCallback, useMemo } from 'react'

export const Cell = ({ size, text, isOpen, onEnd, onOpenCell, x, y, onSetFlag, isFlag, isGameOver }) => {
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

  const styles = useStyles(size, text)
  return (
    <div style={styles.wrapper}>
      <div style={styles.inner} onClick={handleClick} onContextMenu={handleSetFlag}>
        {label}
      </div>
    </div>
  )
}

const useStyles = (size, text) => {
  let dimension = window.innerWidth / size
  if (dimension > 40) {
    dimension = 40
  }
  if (dimension < 10) {
    dimension = 10
  }

  return useMemo(
    () => ({
      wrapper: {
        width: dimension,
        height: dimension,
        lineHeight: dimension + 'px',
        padding: 2,
      },
      inner: {
        width: '100%',
        height: '100%',
        fontSize: dimension * 0.8,
        textAlign: 'center',
        backgroundColor: '#fafafa',
        color: COLORS[text],
      },
    }),
    [dimension, text]
  )
}

const COLORS = {
  '0': 'gray',
  '1': 'green',
  '2': 'rgb(33, 82, 0)',
  '3': 'rgb(60, 76, 5)',
  '4': 'rgb(117, 118, 7)',
  '5': 'rgb(120, 51, 13)',
  '6': 'rgb(126, 34, 2)',
  '7': 'rgb(131, 17, 0)',
  '8': 'red',
}
