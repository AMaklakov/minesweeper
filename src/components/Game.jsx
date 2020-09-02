import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Cell } from './Cell'
import { getOpenCells } from '../util/open-cells'
import _ from 'lodash'
import fp from 'lodash/fp'
import { createField } from '../util/field'
import { DEFAULT_FIELD_SIZE } from '../const/const'

export const Game = ({ size = DEFAULT_FIELD_SIZE }) => {
  const [cells, minesPositions, numberOfMines] = useMemo(() => {
    const numberOfMines = Math.round(size * size * 0.25)
    const [field, minesPositions] = createField(size, size, numberOfMines)
    return [field, minesPositions, numberOfMines]
  }, [size])

  const [isGameOver, setIsGameOver] = useState(false)
  const [openCells, setOpenCells] = useState([])
  const [flags, setFlags] = useState([])

  const openCell = useCallback(
    (x, y) => {
      const cellsToOpen = getOpenCells(cells, x, y)
      setOpenCells((openCells) => _.uniq([...openCells, ...cellsToOpen]))
    },
    [cells]
  )

  useEffect(() => {
    const y = fp.findIndex(fp.find(fp.isEqual('0')))(cells)
    const x = fp.findIndex(fp.isEqual('0'))(cells[y])
    openCell(x, y)
  }, [])

  useEffect(() => {
    if (flags.length === numberOfMines && _.difference(flags, minesPositions).length === 0) {
      setIsGameOver(true)
      setTimeout(() => alert('Вы выиграли! 🎉🎉🎉 \n Обновите страницу чтобы начать заново'))
    }
  }, [flags, numberOfMines, minesPositions])

  const handleEnd = useCallback(() => {
    setIsGameOver(true)
    setTimeout(() => alert('Вы проиграли! Обновите страницу чтобы начать заново'))
  }, [])

  const handleSetFlag = useCallback((x, y) => {
    const position = `${x} ${y}`
    setFlags((flags) => (flags.includes(position) ? _.without(flags, position) : [...flags, position]))
  }, [])

  const territory = useMemo(() => (openCells.length / (size * size)).toFixed(2), [openCells, cells, size])

  return (
    <div className="App">
      <div style={styles.analytics}>
        <span>
          Флагов: {flags.length} из {numberOfMines}
        </span>
        <span>Территории открыто: {territory}%</span>
      </div>
      {cells.map((row, y) => (
        <div style={{ display: 'flex' }} key={`y-${y}`}>
          {row.map((cell, x) => {
            const position = `${x} ${y}`
            return (
              <Cell
                size={size}
                isGameOver={isGameOver}
                key={position}
                text={cell}
                isOpen={openCells.includes(position)}
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

const styles = {
  analytics: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
}
