import React, { useState } from "react";
import Dropzone from "../Dropzone";

const StepOne = () => {
  const [files, setFiles] = useState([]);
  return (
    <div>
      <Dropzone files={files} setFiles={setFiles} />
    </div>
  );
};

export default StepOne;
