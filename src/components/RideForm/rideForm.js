import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

import "./rideForm.css";

const submitButtonStyle = {
  position: "absolute",
  right: "20px",
};

const RideForm = () => {
  const [input, setInput] = useState({
    pickUpLat: "",
    pickUpLong: "",
    dropLat: "",
    dropLong: "",
    numOfPassengers: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCalculateClicked = () => {
    console.log(input);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <form className="form">
        <FormControl>
          <InputLabel htmlFor="age-native-simple">Number of passengers</InputLabel>
          <Select value={input.numOfPassengers} name="numOfPassengers" onChange={handleChange}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="standard-basic"
          label="From where (lat)"
          name="pickUpLat"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="From where (long)"
          name="pickUpLong"
          onChange={handleChange}
        />
        <TextField id="standard-basic" label="To (lat)" name="dropLat" onChange={handleChange} />
        <TextField id="standard-basic" label="To (long)" name="dropLong" onChange={handleChange} />

        <Button
          style={submitButtonStyle}
          onClick={handleCalculateClicked}
          variant="contained"
          color="primary"
        >
          Calculate
        </Button>
      </form>
    </div>
  );
};

export default RideForm;
