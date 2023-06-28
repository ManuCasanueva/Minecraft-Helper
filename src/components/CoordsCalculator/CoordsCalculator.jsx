import React, { useState } from "react";
import { TextField } from "@mui/material";
import style from "../CoordsCalculator/CoordsCalculator.module.css";

const CoordsCalculator = () => {
  const [coords, setCoords] = useState({
    xCoords:"",
    yCoords:"",
    zCoords:"",
  });

  const [divisionCoords, setDivisionCoords] = useState({
    xCoords:"",
    yCoords:"",
    zCoords:"",
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (value === "") {
      const updatedCoords = {
        ...coords,
        [name]: ""
      };
      setCoords(updatedCoords);
  
      if (updatedCoords) {
        const { xCoords, yCoords, zCoords } = updatedCoords;
        const divisionX = parseFloat(xCoords) / 8;
        const divisionZ = parseFloat(zCoords) / 8;
        setDivisionCoords({
          xCoords: divisionX.toString(),
          yCoords: yCoords,
          zCoords: divisionZ.toString()
        });
      }
    } else if (!isNaN(parseFloat(value))) {
      const updatedCoords = {
        ...coords,
        [name]: value
      };
      setCoords(updatedCoords);
  
      if (updatedCoords) {
        const { xCoords, yCoords, zCoords } = updatedCoords;
        const divisionX = Math.floor(xCoords / 8);
        const divisionZ = Math.floor(zCoords / 8);
        setDivisionCoords({
          xCoords: divisionX.toString(),
          yCoords: yCoords,
          zCoords: divisionZ.toString()
        });
      }
    }
  };
  
  const handleChange2 = (event) => {
    const { name, value } = event.target;
  
    if (value === "") {
      const updatedCoords = {
        ...divisionCoords,
        [name]: ""
      };
      setDivisionCoords(updatedCoords);
  
      if (updatedCoords) {
        const { xCoords, yCoords, zCoords } = updatedCoords;
        const multiplicationX = parseFloat(xCoords) * 8;
        const multiplicationZ = parseFloat(zCoords) * 8;
        setCoords({
          xCoords: multiplicationX.toString(),
          yCoords: yCoords,
          zCoords: multiplicationZ.toString()
        });
      }
    } else if (!isNaN(parseFloat(value))) {
      const updatedCoords = {
        ...divisionCoords,
        [name]: value
      };
      setDivisionCoords(updatedCoords);
  
      if (updatedCoords) {
        const { xCoords, yCoords, zCoords } = updatedCoords;
        const multiplicationX = Math.floor(xCoords * 8);
        const multiplicationZ = Math.floor(zCoords * 8);
        setCoords({
          xCoords: multiplicationX.toString(),
          yCoords: yCoords,
          zCoords: multiplicationZ.toString()
        });
      }
    }
  };


  return (
    <>
    <div className={style.divContainer}>
      <h4 className={style.world}>OVERWORLD</h4>
      <div className={style.mainContainer}>
        <TextField
         sx={{
          m: 1,
          width: 200,  
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputLabel-outlined": {
            color: "white",
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "white",
          },
        }}
        name="xCoords"
        type="number"
        variant="outlined"
        label="Coordinates"
        value={coords.xCoords}
        onChange={handleChange}
        />
        <h3 className={style.coords}>X</h3>
        <TextField
        sx={{
          m: 1,
          width: 200,  
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputLabel-outlined": {
            color: "white",
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "white",
          },
        }}
        name="yCoords"
        type="number"
        variant="outlined"
        label="Coordinates"
        value={coords.yCoords}
        onChange={handleChange}
        inputProps={{ min: -Infinity }}
        />
        <h3 className={style.coords}>Y</h3>
        <TextField
       sx={{
        m: 1,
        width: 200,  
        "& .MuiOutlinedInput-root": {
          color: "white",
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
        "& .MuiInputLabel-outlined": {
          color: "white",
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
          color: "white",
        },
      }}
        name="zCoords"
        type="number"
        variant="outlined"
        label="Coordinates"
        value={coords.zCoords}
        onChange={handleChange}
        />
        <h3 className={style.coords}>Z</h3>
      </div>
      <h4 className={style.world}>NETHER</h4>
      <div className={style.mainContainer}>
        <TextField
          sx={{
            m: 1,
            width: 200,  
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-outlined": {
              color: "white",
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "white",
            },
          }}
          name="xCoords"
          type="number"
          variant="outlined"
          label="Coordinates"
          value={divisionCoords.xCoords}
          onChange={handleChange2}
        />
        <h3 className={style.coords}>X</h3>
        <TextField
         sx={{
          m: 1,
          width: 200,  
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputLabel-outlined": {
            color: "white",
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "white",
          },
        }}
          name="yCoords"
          type="number"
          variant="outlined"
          label="Coordinates"
          value={divisionCoords.yCoords}
          onChange={handleChange2}
        />
        <h3 className={style.coords}>Y</h3>
        <TextField
         sx={{
          m: 1,
          width: 200,  
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputLabel-outlined": {
            color: "white",
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "white",
          },
        }}
          name="zCoords"
          type="number"
          variant="outlined"
          label="Coordinates"
          value={divisionCoords.zCoords}
          onChange={handleChange2}
        />
        <h3 className={style.coords}>Z</h3>
      </div>
      </div>
    </>
  );
};

export default CoordsCalculator;
