import { useState } from 'react'
import CoordsCalculator from "../src/components/CoordsCalculator/CoordsCalculator"
import CircleGenerator from './components/CircleGenerator/CircleGenerator'
import OvalGenerator from './components/OvalGenerator/OvalGenerator'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CoordsCalculator/>
      <CircleGenerator/>
      <OvalGenerator/>
    </>
  )
}

export default App
