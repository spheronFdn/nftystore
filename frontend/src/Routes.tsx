import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import StepOne from "./components/Forms/select-protocol";
import StepThree from "./components/Forms/choose-link";
import StepTwo from "./components/Forms/drop-files";
import Navbar from "./components/Navigation/navbar";
import Footer from "./components/Footer/footer";
import Home from "./pages/Home";
import Success from "./pages/Success";
import UploadNft from "./pages/UploadNft";

const Router = () => {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nft-upload" element={<UploadNft />}>
            <Route path="select-provider" element={<StepOne />} />
            <Route path="upload-files" element={<StepTwo />} />
            <Route path="choose-url" element={<StepThree />} />
            <Route path="success" element={<Success />} />
          </Route>
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
};

export default Router;
