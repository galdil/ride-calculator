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
  const [numOfPassengers, setNumOfPassengers] = useState("");

  const handleChange = (event) => {
    setNumOfPassengers(event.target.value);
    console.log(numOfPassengers);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <form className="form">
        <FormControl>
          <InputLabel htmlFor="age-native-simple">Number of passengers</InputLabel>
          <Select value={numOfPassengers} onChange={handleChange}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
          </Select>
        </FormControl>

        <TextField id="standard-basic" label="From where (lat)" />
        <TextField id="standard-basic" label="From where (long)" />
        <TextField id="standard-basic" label="To (lat)" />
        <TextField id="standard-basic" label="To (long)" />

        <Button
          style={submitButtonStyle}
          type="submit"
          value="Submit"
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
