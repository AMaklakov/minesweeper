import React, { useCallback, useState } from 'react'
import Field from './Board'
import { DEFAULT_FIELD_SIZE } from '../util'

export default function App() {
  const [inputValue, setInputValue] = useState(DEFAULT_FIELD_SIZE)
  const [size, setSize] = useState(DEFAULT_FIELD_SIZE)

  const handleInputChange = useCallback((event) => {
    const value = Number(event.target.value)
    if (Number.isInteger(value)) {
      setInputValue(value)
    }
  }, [])

  const handleStartGame = useCallback(() => setSize(inputValue), [inputValue])

  return (
    <>
      <div className="flex-col-center">
        <h1>Сапер</h1>
        <div>
          <p>Введите размер поля</p>
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <button onClick={handleStartGame}>Начать!</button>
        </div>
      </div>
      <Field key={size} size={size} />
    </>
  )
}
