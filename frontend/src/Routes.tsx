import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import SelectProvider from "./components/Forms/select-provider";
import ChooseLink from "./components/Forms/choose-link";
import UploadFiles from "./components/Forms/upload-files";
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
            <Route path="select-provider" element={<SelectProvider />} />
            <Route path="upload-files" element={<UploadFiles />} />
            <Route path="choose-url" element={<ChooseLink />} />
            <Route path="success" element={<Success />} />
          </Route>
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
};

export default Router;
