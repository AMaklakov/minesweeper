import React, { useCallback, useState } from 'react'
import Field from './Board'
import { DEFAULT_FIELD_SIZE } from '../util'

const App = () => {
  const [inputValue, setInputValue] = useState(DEFAULT_FIELD_SIZE)
  const [size, setSize] = useState(DEFAULT_FIELD_SIZE)

  const handleInputChange = useCallback((event) => {
    const value = event.target.value

    if (Number.isInteger(Number(value))) {
      setInputValue(Number(value))
    }
  }, [])

  const handleStartGame = useCallback(() => setSize(inputValue), [inputValue])

  return (
    <>
      <h1>Сапер</h1>
      <div>
        <p>Введите размер поля</p>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleStartGame}>Начать!</button>
      </div>
      <Field size={size} key={size} />
    </>
  )
}

export default App
