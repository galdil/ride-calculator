import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";

const FormInput = (props) => {
  const [inputValue, setInputValue] = useState("");

  const { label } = props;

  function handleChange(event) {
    setInputValue(event.target.value);
    if (props.onChange) {
      props.onChange(inputValue);
    }
  }
  return (
    <>
      <TextField id="standard-basic" label={label} onChange={handleChange} />
    </>
  );
};

export default FormInput;
