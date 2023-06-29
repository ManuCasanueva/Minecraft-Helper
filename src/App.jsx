import { useState } from 'react'
import CoordsCalculator from "../src/components/CoordsCalculator/CoordsCalculator"
import CircleGenerator from './components/CircleGenerator/CircleGenerator'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CoordsCalculator/>
      <CircleGenerator/>
    
    </>
  )
}

export default App
