import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { lambdaUrl } from "./consts";
import "./rideForm.css";

const submitButtonStyle = {
  position: "absolute",
  left: "75%",
  top: "35%",
};

const RideForm = () => {
  const [input, setInput] = useState({
    pickUpLat: "",
    pickUpLong: "",
    dropLat: "",
    dropLong: "",
    numOfPassengers: 1,
  });

  const [errors, setErrors] = useState({
    pickUpLat: false,
    pickUpLong: false,
    dropLat: false,
    dropLong: false,
    numOfPassengers: false,
  });

  const [estimateCost, setEstimateCost] = useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let hasError = false;
    let updatedErrors = errors;
    for (const [key, value] of Object.entries(input)) {
      if (value === "") {
        updatedErrors[key] = true;
        hasError = true;
      } else {
        updatedErrors[key] = false;
      }
    }

    setErrors({ ...errors, updatedErrors });
    return !hasError;
  };

  const sanitizePayload = (date) => {
    let currentDays = new Array(7).fill(0);
    let currentHours = new Array(12).fill(0);
    const hour = date.toLocaleString("en-US", { hour: "numeric" });
    const pm = +(hour.slice(2, 4) === "PM");

    currentHours[hour.slice(0, 1)] = 1;
    currentDays[date.getDay()] = 1;

    return `${input.pickUpLong},${input.pickUpLat},${input.dropLong},${input.dropLat},${
      input.numOfPassengers
    },${Math.floor(Math.random() * 5000) + 1},${currentDays},${pm},${currentHours}`;
  };

  const handleCalculateClicked = () => {
    const valid = validate();
    const payload = sanitizePayload(new Date());
    if (valid) {
      fetch(lambdaUrl, {
        method: "post",
        body: JSON.stringify({ data: payload }),
      }).then(
        async (res) => {
          const response = await res.json();
          setEstimateCost(response.predictions[0].score);
          console.log(response.predictions[0].score);
        },
        (e) => {
          console.log(e);
        }
      );
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <form className="form">
        <FormControl>
          <InputLabel htmlFor="age-native-simple">Number of passengers</InputLabel>
          <Select value={input.numOfPassengers} name="numOfPassengers" onChange={handleChange}>
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"5"}>5</MenuItem>
            <MenuItem value={"6"}>6</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="standard-basic"
          label="From where (lat)"
          name="pickUpLat"
          onChange={handleChange}
          required
          error={errors.pickUpLat}
          onBlur={validate}
        />
        <TextField
          id="standard-basic"
          label="From where (long)"
          name="pickUpLong"
          onChange={handleChange}
          error={errors.pickUpLong}
          onBlur={validate}
          required
        />
        <TextField
          required
          id="standard-basic"
          label="To (lat)"
          name="dropLat"
          error={errors.dropLat}
          onBlur={validate}
          onChange={handleChange}
        />
        <TextField
          required
          id="standard-basic"
          label="To (long)"
          name="dropLong"
          error={errors.dropLong}
          onBlur={validate}
          onChange={handleChange}
        />

        <Button
          style={submitButtonStyle}
          onClick={handleCalculateClicked}
          variant="contained"
          color="primary"
        >
          Calculate
        </Button>
      </form>
      {estimateCost && (
        <div className="estimate-cost">Your estimate cost is: {estimateCost.toFixed(2)}$</div>
      )}
    </div>
  );
};

export default RideForm;
