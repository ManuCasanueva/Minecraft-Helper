import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import "./OvalGenerator.css";

const OvalGenerator = () => {
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(20);

  const [pixels, setPixels] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);

  const generatePixels = () => {
    if (width === 0 || height === 0) {
      setPixels([]);
      return;
    }
    if (width % 2 === 0 && height % 2 === 0 || width % 2 !== 0 && height % 2 !== 0) {
      generateOvalPixels();
    }
  };

  const generateOvalPixels = () => {
    const newPixels = [];
  
    const radiusX = Math.floor((width - 1) / 2);
    const radiusY = Math.floor((height - 1) / 2);
    const centerX = Math.floor(width / 2);
    const centerY = Math.floor(height / 2);
  
    const radiusX2 = radiusX * radiusX;
    const radiusY2 = radiusY * radiusY;
  
    let x = 0;
    let y = radiusY;
  
    let dx = 0;
    let dy = 2 * radiusX2 * y;
  
    let p = Math.round(radiusY2 - radiusX2 * radiusY + (0.25 * radiusX2));
  
    while (dx < dy) {
      if (centerY + y < height) {
        newPixels.push({ x: centerX + x, y: centerY + y, filled: true });
        newPixels.push({ x: centerX - x, y: centerY + y, filled: true });
      }
      if (centerY - y >= 0) {
        newPixels.push({ x: centerX - x, y: centerY - y, filled: true });
        newPixels.push({ x: centerX + x, y: centerY - y, filled: true });
      }
  
      x++;
      dx += 2 * radiusY2;
  
      if (p < 0) {
        p += radiusY2 + dx;
      } else {
        y--;
        dy -= 2 * radiusX2;
        p += radiusY2 + dx - dy;
      }
    }
  
    p = Math.round(radiusY2 * (x + 0.5) * (x + 0.5) + radiusX2 * (y - 1) * (y - 1) - radiusX2 * radiusY2);
  
    while (y >= 0) {
      if (centerY + y < height) {
        newPixels.push({ x: centerX + x, y: centerY + y, filled: true });
        newPixels.push({ x: centerX - x, y: centerY + y, filled: true });
      }
      if (centerY - y >= 0) {
        newPixels.push({ x: centerX - x, y: centerY - y, filled: true });
        newPixels.push({ x: centerX + x, y: centerY - y, filled: true });
      }
  
      y--;
      dy -= 2 * radiusX2;
  
      if (p > 0) {
        p += radiusX2 - dy;
      } else {
        x++;
        dx += 2 * radiusY2;
        p += radiusX2 - dy + dx;
      }
    }
  
    const totalPixels = width * height;
  
    for (let i = 0; i < totalPixels; i++) {
      const x = i % width;
      const y = Math.floor(i / width);
  
      if (!newPixels.some((pixel) => pixel.x === x && pixel.y === y)) {
        newPixels.push({ x, y, filled: false });
      }
    }
  
    setPixels(newPixels);
  };
  
  

  const toggleButton = () => {
    setIsActive(!isActive);
    generatePixels(); // Agrega esta línea para generar los píxeles inmediatamente después de cambiar el estado
  };

 const handleSizeChange = (e) => {
  const newSize = parseInt(e.target.value);

  if (!isActive) {
    if (e.target.name === "width") {
      setWidth(newSize);
    } else if (e.target.name === "height") {
      setHeight(newSize);
    }
  } else {
    setWidth(newSize);
    setHeight(newSize);
  }
};


  useEffect(() => {
    generatePixels();
  }, [isActive, width, height]);

  useEffect(() => {
    setCenterX(Math.floor((width - 1) / 2));
    setCenterY(Math.floor((height - 1) / 2));
  }, [width, height]);

  return (
    <div className="App">
      <h1>Generador de Óvalos</h1>
      <div className="settings">
        <TextField
          sx={{ m: 1, width: 200 }}
          name="width"
          type="number"
          variant="outlined"
          label="Ancho"
          value={width}
          onChange={handleSizeChange}
        />
        <TextField
          sx={{ m: 1, width: 200 }}
          name="height"
          type="number"
          variant="outlined"
          label="Alto"
          value={height}
          onChange={handleSizeChange}
        />
        <button
          style={{
            backgroundColor: isActive ? "green" : "red",
            color: isActive ? "black" : "white"
          }}
          onClick={toggleButton}
        >
          {isActive ? "Círculo" : "Óvalo"}
        </button>
      </div>
      <div className="divCircle">
        <div className="pixel-grid">
          {pixels.map((pixel, index) => (
            <div
              key={index}
              className={`pixel ${pixel.filled ? "filled" : ""} ${
                pixel.isCenter ? "center" : ""
              }`}
              style={{ gridColumn: pixel.x + 1, gridRow: pixel.y + 1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OvalGenerator;
