import { getRandomInt } from './util'
import { getNeighbourCells } from '../const/const'

export const createField = (width, height, numberOfMines) => {
  const field = Array(height)
    .fill(null)
    .map(() => new Array(width).fill('0'))

  const positions = new Set()

  while (positions.size !== numberOfMines) {
    const x = getRandomInt(0, width)
    const y = getRandomInt(0, height)
    positions.add(`${x} ${y}`)
    field[y][x] = '*'
  }

  return [field.map((row, y) => row.map((cell, x) => getCellNumber(field, x, y, cell))), [...positions]]
}

export const getCellNumber = (field, x, y, cell) => {
  if (cell === '*') {
    return cell
  }

  return getNeighbourCells(x, y, field.length)
    .filter(([newX, newY]) => field[newY][newX] === '*')
    .length.toString()
}
