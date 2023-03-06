import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StepOne from "./components/Forms/step-one";
import StepThree from "./components/Forms/step-three";
import StepTwo from "./components/Forms/step-two";
import Navbar from "./components/Navigation/navbar";
import Home from "./pages/Home";
import Success from "./pages/Success";
import UploadNft from "./pages/UploadNft";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nft-upload" element={<UploadNft />}>
            <Route path="select-provider" element={<StepOne />} />
            <Route path="upload-files" element={<StepTwo />} />
            <Route path="choose-url" element={<StepThree />} />
          </Route>
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
