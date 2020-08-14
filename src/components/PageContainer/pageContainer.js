import React from "react";

import RideForm from "../RideForm/rideForm";

const PageContainer = () => (
  <div style={{ marginLeft: "30px" }}>
    <h1>Want to know your ride estimate cost upfront?</h1>
    <span style={{ fontSize: "22px" }}>Fill in the following fields:</span>
    <RideForm />
  </div>
);

export default PageContainer;
