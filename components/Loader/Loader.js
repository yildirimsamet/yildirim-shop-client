import React from "react";
import Loading from "react-loading-components";

const Loader = () => (
  <div style={{ height: "24px" }}>
    <Loading type="tail_spin" width={24} height={24} fill="#fff" />
  </div>
);

export default Loader;
