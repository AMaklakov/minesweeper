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
  CLOSEST.map(([dx, dy]) => [x + dx, y + dy]).filter(([x, y]) => x >= 0 && x < size && y >= 0 && y < size)

export const DEFAULT_FIELD_SIZE = 45
