import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CoordsCalculator from "../src/components/CoordsCalculator/CoordsCalculator";
import CircleGenerator from './components/CircleGenerator/CircleGenerator';
import OvalGenerator from "./components/OvalGenerator/OvalGenerator"
import NavBar from './components/Navbar/NavBar';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<CoordsCalculator />} />
        {/* <Route path="/oval" element={<OvalGenerator />} /> */}
        <Route path="/circle" element={<CircleGenerator />} />
      </Routes>
    </>
  );
}

export default App;