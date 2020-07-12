import React, { useCallback, useEffect, useState } from 'react'
import { Cell } from './Cell'
import without from 'lodash/without'

const App = () => {
  const [isGameOver, setIsGameOver] = useState(false)
  const [cells] = useState(createGame())
  const [openCells, setOpenCells] = useState(new Set())
  const [flags, setFlags] = useState([])

  const openCell = useCallback(
    (x, y) => {
      const cellsToOpen = getOpenCells(cells, x, y)
      setOpenCells(new Set([...openCells, ...cellsToOpen]))
    },
    [openCells, cells]
  )

  useEffect(() => {
    rowsFor: for (let y = 0; y < cells.length; y++) {
      for (let x = 0; x < cells[y].length; x++) {
        if (cells[y][x] === '0') {
          openCell(x, y)
          break rowsFor
        }
      }
    }
  }, [])

  const handleEnd = useCallback(() => {
    setIsGameOver(true)
    setTimeout(() => alert('Вы проиграли! Обновите страницу чтобы начать заново'))
  }, [])

  const handleSetFlag = useCallback((x, y) => {
    const position = `${x} ${y}`
    setFlags((flags) => (flags.includes(position) ? without(flags, position) : [...flags, position]))
  }, [])

  return (
    <div className="App">
      {cells.map((row, y) => (
        <div style={{ display: 'flex' }} key={`y-${y}`}>
          {row.map((cell, x) => {
            const position = `${x} ${y}`
            return (
              <Cell
                isGameOver={isGameOver}
                key={position}
                text={cell}
                isOpen={openCells.has(position)}
                isFlag={flags.includes(position)}
                x={x}
                y={y}
                onEnd={handleEnd}
                onOpenCell={openCell}
                onSetFlag={handleSetFlag}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

const diffs = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
]

const getOpenCells = (field, x, y, visited = []) => {
  const cell = field[y][x]

  if (cell === '*') {
    return []
  }

  if (cell !== '0') {
    return visited.includes(`${x} ${y}`) ? [] : [`${x} ${y}`]
  }

  return diffs.reduce(
    (buff, [dx, dy]) => {
      let newX = x + dx
      let newY = y + dy

      if (newX < 0 || newX >= 45 || newY < 0 || newY >= 45) {
        return buff
      }

      let newCell = field[newY][newX]
      if (newCell === '*') {
        return buff
      }

      if (newCell === '0') {
        return visited.includes(`${newX} ${newY}`)
          ? buff
          : [...buff, ...getOpenCells(field, newX, newY, [...buff, ...visited])]
      }

      return visited.includes(`${newX} ${newY}`) ? buff : [...buff, `${newX} ${newY}`]
    },
    [`${x} ${y}`]
  )
}

const getCellNumber = (field, x, y, cell) => {
  if (cell === '*') {
    return cell
  }

  return diffs
    .filter(([dx, dy]) => {
      let newX = x + dx
      let newY = y + dy

      if (newX < 0 || newX >= 45 || newY < 0 || newY >= 45) {
        return false
      }

      return field[newY][newX] === '*'
    })
    .length.toString()
}

const createGame = (width = 45, height = 45) => {
  const field = Array(height)
    .fill(null)
    .map(() => new Array(width).fill('0'))
  const size = width * height
  const numberOfMines = Math.round(size * 0.25)

  const positions = new Set()

  while (positions.size !== numberOfMines) {
    const x = getRandomInt(0, width)
    const y = getRandomInt(0, height)
    positions.add(`${x} ${y}`)
  }

  positions.forEach((position) => {
    const [x, y] = position.split(' ')
    field[y][x] = '*'
  })

  return field.map((row, y) => row.map((cell, x) => getCellNumber(field, x, y, cell)))
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

export default App
