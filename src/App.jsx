import { useState } from 'react'
import CoordsCalculator from "../src/components/CoordsCalculator/CoordsCalculator"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CoordsCalculator/>
    </>
  )
}

export default App
