import fp from 'lodash/fp'

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

export const getNeighbourCells = (x, y, size) =>
  fp.compose(
    fp.filter(([x, y]) => x >= 0 && x < size && y >= 0 && y < size),
    fp.map(([dx, dy]) => [x + dx, y + dy])
  )(CLOSEST)

export const DEFAULT_FIELD_SIZE = 45
