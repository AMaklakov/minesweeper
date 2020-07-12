import { getNeighbourCells } from '../const/const'

export const getOpenCells = (field, x, y, visited = []) => {
  const cell = field[y][x]
  const record = `${x} ${y}`

  if (cell === '*') {
    return []
  }

  if (cell !== '0') {
    return visited.includes(record) ? [] : [record]
  }

  return getNeighbourCells(x, y, field.length).reduce(
    (buff, [newX, newY]) => {
      const neighbour = field[newY][newX]
      const neighbourRecord = `${newX} ${newY}`

      if (neighbour === '*') {
        return buff
      }

      if (neighbour !== '0') {
        return visited.includes(neighbourRecord) ? buff : [...buff, neighbourRecord]
      }

      return visited.includes(neighbourRecord)
        ? buff
        : [...buff, ...getOpenCells(field, newX, newY, [...buff, ...visited])]
    },
    [record]
  )
}
