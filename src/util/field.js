import { getNeighbourCells } from '../const/const'
import _ from 'lodash'
import fp from 'lodash/fp'

export const createField = (width, height, numberOfMines) => {
  const field = _.times(height, () => _.times(width, _.constant('0')))

  const positions = new Set()

  while (positions.size !== numberOfMines) {
    const x = _.random(width - 1)
    const y = _.random(height - 1)
    positions.add(`${x} ${y}`)
    field[y][x] = '*'
  }

  const fieldWithNumbers = _.map(field, (row, y) => _.map(row, (cell, x) => getCellNumber(field, x, y, cell)))
  return [fieldWithNumbers, [...positions]]
}

export const getCellNumber = (field, x, y, cell) => {
  if (cell === '*') {
    return cell
  }

  return countSurroundBombs(getNeighbourCells(x, y, field.length), field)
}

const countSurroundBombs = (cells, field) =>
  fp.compose(
    fp.toString,
    fp.size,
    fp.filter(([x, y]) => field[y][x] === '*')
  )(cells)
