import React, { useState, useEffect } from 'react';
import { TextField, Button } from "@mui/material";
import './CircleGenerator.css';

const CircleGenerator = () => {
  const [width, setWidth] = useState(25);
  const [height, setHeight] = useState(25);
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
      setCenterX(width % 2 === 0 ? (width - 1) / 2 : Math.floor(width / 2));
      setCenterY(height % 2 === 0 ? (height - 1) / 2 : Math.floor(height / 2));
      const newPixels = [];
  
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (
            x >= centerX - Math.floor(width / 2) &&
            x <= centerX + Math.floor((width - 1) / 2) &&
            y >= centerY - Math.floor(height / 2) &&
            y <= centerY + Math.floor((height - 1) / 2)
          ) {
            newPixels.push({ x, y, filled: true, isCenter: true });
          } else if (
            (x === centerX && y >= centerY - Math.floor(height / 2) && y <= centerY + Math.floor((height - 1) / 2)) ||
            (y === centerY && x >= centerX - Math.floor(width / 2) && x <= centerX + Math.floor((width - 1) / 2))
          ) {
            newPixels.push({ x, y, filled: true });
          } else {
            newPixels.push({ x, y, filled: false });
          }
        }
      }
  
      if (width % 2 !== 0 && height % 2 !== 0) {
        // Agregar líneas rectas desde el centro hasta cada borde
        const left = Math.floor((width - 1) / 2);
        const right = Math.floor(width / 2);
        const top = Math.floor((height - 1) / 2);
        const bottom = Math.floor(height / 2);
  
        for (let x = centerX - left; x <= centerX + right; x++) {
          newPixels.push({ x, y: centerY, filled: true });
        }
  
        for (let y = centerY - top; y <= centerY + bottom; y++) {
          newPixels.push({ x: centerX, y, filled: true });
        }
      }
  
      setPixels(newPixels);
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
        const distanceToCenter = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  
        if (Math.abs(distanceToCenter - radius) <= 0.5) {
          if (x === centerX && y === centerY) {
            newPixels.push({ x, y, filled: true, });
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
  

  
  
  
  

  const toggleButton = () => {
    setIsActive(!isActive);
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setWidth(isActive ? newSize : 10);
    setHeight(isActive ? newSize : 10);
  };

  useEffect(() => {
    generatePixels();
  }, [width, height]);

  useEffect(() => {
    generatePixels();
  }, [width, height]);

  useEffect(() => {
    generatePixels();

    setPixels((prevPixels) =>
      prevPixels.map((pixel) => {
        const inCenterX = pixel.x >= centerX - 1 && pixel.x <= centerX + 1;
        const inCenterY = pixel.y >= centerY - 1 && pixel.y <= centerY + 1;

        if (inCenterX && inCenterY) {
          return { ...pixel,  };
        } else {
          return pixel;
        }
      })
    );
  }, [centerX, centerY]);

  return (
    <div className="App">
      <h1>Generador de Círculos</h1>
      <div className="settings">
        <TextField
          sx={{ m: 1, width: 200 }}
          type="number"
          variant="outlined"
          label="Width"
          value={width}
          onChange={handleSizeChange}
        />
        <TextField
          sx={{ m: 1, width: 200 }}
          type="number"
          variant="outlined"
          label="Height"
          value={height}
          onChange={handleSizeChange}
        />
        <button onClick={toggleButton}>{isActive ? 'Desactivar' : 'Activar'}</button>
      </div>
      <div className="pixel-grid">
        {pixels.map((pixel, index) => (
          <div
            key={index}
            className={`pixel ${pixel.filled ? 'filled' : ''} ${pixel.isCenter ? 'center' : ''}`}
            style={{ gridColumn: pixel.x + 1, gridRow: pixel.y + 1 }}
          />
        ))}
      </div>
    </div>
  );
};

export default CircleGenerator;