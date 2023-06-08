import _ from 'lodash'

export const DEFAULT_FIELD_SIZE = 8

export const BOMB = -1

export const COLORS = {
  '': 'rgba(0,0,0,0.1)',
  '🚩': 'rgba(0,0,0,0.1)',
  '💣': 'rgba(255,0,0,0.4)',
  0: 'rgba(0,0,0,0.1)',
  1: 'rgba(0, 0, 255, 0.2)',
  2: 'rgba(0, 220, 20, 0.3)',
  3: 'rgba(20, 100, 20, 0.4)',
  4: 'rgba(117, 118, 7, 0.3)',
  5: 'rgba(120, 51, 13, 0.3)',
  6: 'rgba(126, 34, 2, 0.3)',
  7: 'rgba(131, 17, 0, 0.3)',
  8: 'rgba(255, 0, 0, 0.3)',
}

export const CLOSEST = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
]

export const getNeighborCells = ([x, y]) => CLOSEST.map(([dx, dy]) => `${+x + dx}-${+y + dy}`)

export const openChain = (field, cell, visited = new Set([cell])) => {
  if (field[cell] !== 0) {
    return [cell]
  }

  getNeighborCells(cell.split('-'))
    .flatMap((position) =>
      field[position] === undefined || field[position] === BOMB || visited.has(position)
        ? []
        : openChain(field, position, visited.add(position))
    )
    .forEach((cell) => visited.add(cell))

  return Array.from(visited)
}

/** @returns {[ { [position: string]: number }, number ]} */
export const createField = (size, minesPercentage = 0.25) => {
  const positions = _.flatten(_.times(size, (i) => _.times(size, (j) => `${i}-${j}`)))
  const bombs = new Set(_.sampleSize(positions, Math.floor(size * size * minesPercentage)))

  const field = {}
  _.each(positions, (p) => (field[p] = bombs.has(p) ? BOMB : 0))
  bombs.forEach((p) =>
    _.each(getNeighborCells(p.split('-')), (neighbor) => {
      if (field[neighbor] !== undefined && field[neighbor] !== BOMB) {
        field[neighbor]++
      }
    })
  )

  return [field, bombs.size]
}
