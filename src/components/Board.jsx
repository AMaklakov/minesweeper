import React, { useCallback, useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import Cell from './Cell'
import { BOMB, DEFAULT_FIELD_SIZE, openChain, createField } from '../util'

export default function Field({ size = DEFAULT_FIELD_SIZE }) {
  const [field, minesCount] = useMemo(() => createField(size, 0.25), [size])

  const [isEnd, setIsEnd] = useState('')
  const [openCells, setOpenCells] = useState(new Set())
  const [flags, setFlags] = useState(new Set())

  const handleOpen = useCallback(
    (position) => {
      if (isEnd) {
        return
      }

      setOpenCells((prev) => {
        const open = _.clone(prev)
        _.each(openChain(field, position), (p) => open.add(p))
        return open
      })

      if (field[position] === BOMB) {
        setIsEnd(position)
      }
    },
    [field, isEnd]
  )

  const handleFlag = useCallback(
    (position) => {
      if (isEnd) {
        return
      }
      setFlags((prev) => {
        const flags = _.clone(prev)
        flags.has(position) ? flags.delete(position) : flags.add(position)
        return flags
      })
    },
    [isEnd]
  )

  useEffect(() => {
    if (!openCells.size) {
      handleOpen(_.findKey(field, (v) => v === 0))
    }
  }, [field, handleOpen, openCells.size])

  useEffect(() => {
    if (field[isEnd]) {
      setTimeout(() => alert('Вы проиграли. Обновите страницу, чтобы начать заново'), 100)
      return
    }

    if (flags.size === minesCount && Array.from(flags).every((pos) => field[pos] === BOMB)) {
      setIsEnd('win')
      setTimeout(() => alert('Вы выиграли! 🎉🎉🎉 \n Обновите страницу чтобы начать заново'), 100)
    }
  }, [field, flags, isEnd, minesCount])

  return (
    <>
      <div className="analytics">
        <span>
          Флагов: {flags.size} из {minesCount}
        </span>
        <span>Территории открыто: {((openCells.size / (size * size)) * 100).toFixed(2)}%</span>
      </div>
      <div className="field">
        {_.chunk(Object.entries(field), size).map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map(([position, value]) => (
              <Cell
                key={position}
                position={position}
                value={value}
                isOpen={isEnd || openCells.has(position)}
                isFlag={flags.has(position)}
                onClick={handleOpen}
                onMouse2={handleFlag}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
