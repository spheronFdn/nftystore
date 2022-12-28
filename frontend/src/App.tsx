import React, { useState } from "react";
import { uploadFiles } from "./api";
import "./App.css";
import Dropzone from "./components/Dropzone";
import ProtocolProvider from "./components/ProtocolProvider";

function App() {
  const [files, setFiles] = useState([]);
  const [apitoken, setApitoken] = useState<string>("");
  const [protocol, setProtocol] = useState<string>("");
  // Arweave, Filecoin, Pinata
  console.log("PROTOCOL: ", files, protocol);
  const handleSubmit = () => {
    uploadFiles(protocol, files);
  };

  return (
    <div className="App">
      <div className="hero-text">NFT-Meta-Widget</div>
      <ProtocolProvider selectedProtocol={protocol} setProtocol={setProtocol} />
      <Dropzone files={files} setFiles={setFiles} />
      {/* API TOKEN TEXT FIELD */}
      <button className="upload__button" onClick={handleSubmit}>
        Upload Files
      </button>
    </div>
  );
}

export default App;
