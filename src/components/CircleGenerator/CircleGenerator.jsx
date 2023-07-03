import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import "./CircleGenerator.css";

const CircleGenerator = () => {
  const [width, setWidth] = useState(25);
  const [height, setHeight] = useState(25);
  const [customWidth, setCustomWidth] = useState(25);
  const [customHeight, setCustomHeight] = useState(25);
  const [pixels, setPixels] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);

  const generatePixels = () => {
    if (width === 0 || height === 0) {
      setPixels([]);
      return;
    }

    if (width === height) {
      generateCirclePixels();
    } else {
      generateOvalPixels();
    }
  };

  const generateCirclePixels = () => {
    const radius = Math.floor(Math.min(width, height) / 2);
    const centerX = width % 2 === 0 ? (width - 1) / 2 : Math.floor(width / 2);
    const centerY = height % 2 === 0 ? (height - 1) / 2 : Math.floor(height / 2);
    const newPixels = [];
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const distanceX = Math.abs(x - centerX);
        const distanceY = Math.abs(y - centerY);
        const distanceToCenter = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );
  
        if (Math.abs(distanceToCenter - radius) <= 0.5) {
          if (x === centerX && y === centerY) {
            newPixels.push({ x, y, filled: true });
          } else {
            // Check if the current pixel is part of the line in the X-axis or Y-axis
            if (x === centerX || y === centerY) {
              newPixels.push({ x, y, filled: true, isCenter: true });
            } else {
              newPixels.push({ x, y, filled: true });
            }
          }
        } else {
          newPixels.push({ x, y, filled: false });
        }
      }
    }
  
    if (width % 2 !== 0 && height % 2 !== 0) {
      newPixels.push({ x: centerX, y: centerY, filled: true, isCenter: true });
    }
  
    setPixels(newPixels);
  };

  const generateOvalPixels = () => {
    const newPixels = [];
  
    const radiusX = Math.floor(customWidth / 2);
    const radiusY = Math.floor(customHeight / 2);
    const centerX = Math.floor(customWidth / 2);
    const centerY = Math.floor(customHeight / 2);
  
    const radiusX2 = radiusX * radiusX;
    const radiusY2 = radiusY * radiusY;
  
    let x = 0;
    let y = radiusY;
  
    let dx = 0;
    let dy = 2 * radiusX2 * y;
  
    let p = Math.round(radiusY2 - radiusX2 * radiusY + (0.25 * radiusX2));
  
    while (dx < dy) {
      if (centerY + y < customHeight) {
        newPixels.push({ x: centerX + x, y: centerY + y, filled: true });
        newPixels.push({ x: centerX - x - 1, y: centerY + y, filled: true });
      }
      if (centerY - y >= 0) {
        newPixels.push({ x: centerX - x - 1, y: centerY - y, filled: true });
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
      if (centerY + y < customHeight) {
        newPixels.push({ x: centerX + x, y: centerY + y, filled: true });
        newPixels.push({ x: centerX - x - 1, y: centerY + y, filled: true });
      }
      if (centerY - y >= 0) {
        newPixels.push({ x: centerX - x - 1, y: centerY - y, filled: true });
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
  
    const totalPixels = customWidth * customHeight;
  
    for (let i = 0; i < totalPixels; i++) {
      const x = i % customWidth;
      const y = Math.floor(i / customWidth);
  
      if (!newPixels.some((pixel) => pixel.x === x && pixel.y === y)) {
        newPixels.push({ x, y, filled: false });
      }
    }
  
    setPixels(newPixels);
  
    // Actualizar las dimensiones del grid para adaptarse al nuevo tamaño
    const pixelGrid = document.querySelector(".pixel-grid");
    pixelGrid.style.gridTemplateColumns = `repeat(${customWidth}, 1fr)`;
    pixelGrid.style.gridTemplateRows = `repeat(${customHeight}, 1fr)`;
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  const toggleButton = () => {
    setIsActive(!isActive);
  };


  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);

    if (isActive) {
      setWidth(newSize);
      setHeight(newSize);
    } else {
      if (e.target.name === "width") {
        setCustomWidth(newSize);
      } else if (e.target.name === "height") {
        setCustomHeight(newSize);
      }
    }
};

useEffect(() => {
    if (isActive) {
      generatePixels();
    } else {
      generateOvalPixels(); // Generar óvalos en lugar de círculos cuando no está activo
    }
}, [isActive, height, width]);

useEffect(() => {
    generatePixels();
}, [isActive, width]);

useEffect(() => {
    if (!isActive) {
      setWidth(customWidth);
      setHeight(customHeight);
    }
}, [customWidth, customHeight, isActive]);

useEffect(() => {
    generatePixels();
    setPixels((prevPixels) =>
      prevPixels.map((pixel) => {
        const inCenterX = pixel.x >= centerX - 1 && pixel.x <= centerX + 1;
        const inCenterY = pixel.y >= centerY - 1 && pixel.y <= centerY + 1;

        if (inCenterX && inCenterY) {
          return { ...pixel };
        } else {
          return pixel;
        }
      })
    );
}, [centerX, centerY, customWidth, customHeight]);

useEffect(() => {
    setCenterX(Math.floor((customWidth - 1) / 2));
    setCenterY(Math.floor((customHeight - 1) / 2));
}, [customWidth, customHeight]);

  return (
    <div className="App">

      <h1>Generador de Círculos</h1>
      <div className="settings">
        <TextField
          sx={{ m: 1, width: 200 }}
          name="width"
          type="number"
          variant="outlined"
          label="Width"
          value={isActive ? width : customWidth}
          onChange={handleSizeChange}
          />
        <TextField
          sx={{ m: 1, width: 200 }}
          name="height"
          type="number"
          variant="outlined"
          label="Height"
          value={isActive ? height : customHeight}
          onChange={handleSizeChange}
          />
        <button style={{backgroundColor:isActive?"green":"green", color: isActive ? "black":"black"}} onClick={toggleButton}>{isActive ? "Circle" : "Oval"}</button>
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

export default CircleGenerator;
