import React, { useState } from "react";
import ProtocolProvider from "../ProtocolProvider";

const StepOne = () => {
  const [protocol, setProtocol] = useState<string>("");

  return (
    <div>
      Select Protocol
      <ProtocolProvider setProtocol={setProtocol} selectedProtocol={protocol} />
    </div>
  );
};

export default StepOne;
