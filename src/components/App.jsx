import React, { useCallback, useState } from 'react'
import { Game } from './Game'
import { DEFAULT_FIELD_SIZE } from '../const/const'

const App = () => {
  const [inputValue, setInputValue] = useState(DEFAULT_FIELD_SIZE)
  const [size, setSize] = useState(DEFAULT_FIELD_SIZE)

  const handleInputChange = useCallback((event) => {
    console.log(event.target)
    const value = event.target.value

    if (Number.isInteger(Number(value))) {
      setInputValue(Number(value))
    }
  }, [])

  const handleStartGame = useCallback(() => setSize(inputValue), [inputValue])

  return (
    <div>
      <h1>Сапер</h1>
      <div>
        <p>Введите размер поля</p>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleStartGame}>Начать!</button>
      </div>
      <Game key={size} size={size} />
    </div>
  )
}

export default App
