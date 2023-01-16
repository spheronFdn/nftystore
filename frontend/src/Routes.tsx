import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StepOne from "./components/Forms/step-one";
import StepTwo from "./components/Forms/step-two";
import UploadNft from "./pages/UploadNft";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>ds</>} />
        <Route path="/nft-upload" element={<UploadNft />}>
          <Route path="1" element={<StepOne />} />
          <Route path="2" element={<StepTwo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
