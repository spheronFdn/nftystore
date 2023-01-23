import React from "react";
import { Outlet } from "react-router-dom";
import UploadNftStyle from "../../styles/uploadnft.module.css";

const UploadNft = () => {
  return (
    <div className={UploadNftStyle.container}>
      <div>STEPS - 1 - 2 - 3</div>
      <Outlet />
    </div>
  );
};

export default UploadNft;
