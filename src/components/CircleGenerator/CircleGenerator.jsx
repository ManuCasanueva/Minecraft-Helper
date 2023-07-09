import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Stage, Layer, Rect } from "react-konva";
import { createTheme } from "@mui/material/styles";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./CircleGenerator.css";

const CircleGenerator = () => {
  const [width, setWidth] = useState(25);
  const [height, setHeight] = useState(25);
  const [customWidth, setCustomWidth] = useState(35);
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

    if (isActive) {
      generateCirclePixels();
    } else {
      generateOvalPixels();
    }
  };

  const generateCirclePixels = () => {
    const radius = Math.floor(Math.min(width, height) / 2);
    const centerX = width % 2 === 0 ? (width - 1) / 2 : Math.floor(width / 2);
    const centerY =
      height % 2 === 0 ? (height - 1) / 2 : Math.floor(height / 2);
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
  
    const totalPixels = customWidth * customHeight;
  
    for (let i = 0; i < totalPixels; i++) {
      const currentX = i % customWidth;
      const currentY = Math.floor(i / customWidth);
  
      const distanceToCenter =
        ((currentX - centerX) * (currentX - centerX)) / (radiusX * radiusX) +
        ((currentY - centerY) * (currentY - centerY)) / (radiusY * radiusY);
  
      const isOnBoundary =
        Math.abs(distanceToCenter - 1) < 0.03 &&
        Math.abs(distanceToCenter - 1) > 0.01;
  
      if (isOnBoundary) {
        newPixels.push({ x: currentX, y: currentY, filled: true });
      } else {
        newPixels.push({ x: currentX, y: currentY, filled: false });
      }
    }
  
    setPixels(newPixels);
  };
  
  

  
  
  
  
  
  
  
  
  

  
  
  

  

  const toggleButton = () => {
    setIsActive(!isActive);
  };

  const handleIncrement = (fieldName) => {
    if (fieldName === "width") {
      setCustomWidth((prevWidth) => prevWidth + 2);
    } else if (fieldName === "height") {
      setCustomHeight((prevHeight) => prevHeight + 2);
    }
  };

  const handleDecrement = (fieldName) => {
    if (fieldName === "width") {
      setCustomWidth((prevWidth) => Math.max(prevWidth - 2, 1));
    } else if (fieldName === "height") {
      setCustomHeight((prevHeight) => Math.max(prevHeight - 2, 1));
    }
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
  
    if (newSize <= 150) {
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
    } else {
      // Aquí puedes manejar el caso en que el valor sea mayor a 150
      console.log("El valor debe ser menor o igual a 150");
    }
  };
  

  useEffect(() => {
    generatePixels();
  }, [isActive, width, height, customWidth, customHeight]);

  useEffect(() => {
    setCenterX(Math.floor((width - 1) / 2));
    setCenterY(Math.floor((height - 1) / 2));
  }, [width, height]);

  return (
    <div className="App">
      <h1 className="titulo" >Circle Generator</h1>
      {/* <Button sx={{fontFamily: "Minecraftia", }}
        variant="contained"
        color={isActive ? "primary" : "secondary"}
        onClick={toggleButton}
      >
        {isActive ? "Circle" : "Oval"}
      </Button> */}
      <div className="settings">
        <div className="botones">
          <TextField
            sx={{m: 1,width: 200,"& .MuiOutlinedInput-root": {color: "white", fontFamily: "Minecraftia","& fieldset": {borderColor: "white",},
            "&:hover fieldset": {borderColor: "white",},
            "&.Mui-focused fieldset": {borderColor: "white",},},
          "& .MuiInputLabel-outlined": {color: "white",},
          "& .MuiInputLabel-outlined.Mui-focused": {color: "white",},}}
            name="width"
            type="number"
            variant="outlined"
            label="Width"
            value={isActive ? width : customWidth}
            onChange={handleSizeChange}
          />

          {!isActive && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="10px"
              sx={{ marginTop: "0px", padding: "0px" }}
            >
              <Button
                onClick={() => handleIncrement("width")}
                sx={{ width: "10px", height: "10px", marginLeft: "0px" }}
              >
                <ArrowUpwardIcon
                  sx={{
                    color: "black",
                    width: "20px",
                    height: "20px",
                    marginLeft: "0px",
                  }}
                />
              </Button>
              <Button
                onClick={() => handleDecrement("width")}
                sx={{ width: "10px", height: "10px", marginLeft: "0px" }}
              >
                <ArrowDownwardIcon
                  sx={{
                    color: "black",
                    width: "20px",
                    height: "20px",
                    marginLeft: "0px",
                  }}
                />
              </Button>
            </Box>
          )}
        </div>
        <div className="botones">
          <TextField
            sx={{m: 1,width: 200,"& .MuiOutlinedInput-root": {color: "white",fontFamily: "Minecraftia","& fieldset": {borderColor: "white",},
            "&:hover fieldset": {borderColor: "white",},
            "&.Mui-focused fieldset": {borderColor: "white",},},
          "& .MuiInputLabel-outlined": {color: "white",},
          "& .MuiInputLabel-outlined.Mui-focused": {color: "white",},}}
            name="height"
            type="number"
            variant="outlined"
            label="Height"
            value={isActive ? height : customHeight}
            onChange={handleSizeChange}
          />
          {!isActive && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="10px"
              sx={{ marginTop: "0px", padding: "0px" }}
            >
              <Button
                onClick={() => handleIncrement("height")}
                sx={{ width: "10px", height: "10px", marginLeft: "0px",  }}
              >
                <ArrowUpwardIcon
                  sx={{
                    color: "black",
                    width: "20px",
                    height: "20px",
                    marginLeft: "0px",
                  }}
                />
              </Button>
              <Button
                onClick={() => handleDecrement("height")}
                sx={{ width: "10px", height: "10px", marginLeft: "0px" }}
              >
                <ArrowDownwardIcon
                  sx={{color: "black",width: "20px",height: "20px",marginLeft: "0px",}}
                />
              </Button>
            </Box>
          )}
        </div>
      </div>
      <div className="divCircle">
        <Stage
          width={isActive ? width * 10 : customWidth * 10}
          height={isActive ? height * 10 : customHeight * 10}
        >
          <Layer>
            {pixels.map((pixel, index) => (
              <Rect
                key={index}
                x={pixel.x * 10}
                y={pixel.y * 10}
                width={10}
                height={10}
                fill={pixel.filled ? "#ff0000" : ""}
                stroke="rgba(0, 0, 0, 0.432)"
              />
            ))}
            {pixels
              .filter((pixel) => pixel.isCenter)
              .map((pixel, index) => (
                <Rect
                  key={index}
                  x={pixel.x * 10}
                  y={pixel.y * 10}
                  width={10}
                  height={10}
                  fill="#11d82f"
                  stroke="rgba(0, 0, 0, 0.226)"
                />
              ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CircleGenerator;
