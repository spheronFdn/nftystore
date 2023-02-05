import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import FilledPrimaryButton from "../Buttons/filled-primary";
import ContentUrlCard from "../Cards/content-url-card";

const StepThree = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [protocol, uploadResponse, setUploadResponse] = useOutletContext<any>();
  const [active, setActive] = useState<string>("");
  const handleNext = () => {
    navigate("/success");
  };

  useEffect(() => {
    if (!protocol) {
      navigate("/nft-upload/select-provider");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Select Content URL</h1>
      <div className="grid grid-cols-1 gap-4 justify-items-center">
        <ContentUrlCard
          isFocused={true}
          isActive={active === "Spheron"}
          setActive={setActive}
          contentProvider={"Spheron"}
          link={"https://google.com"}
        />
        <ContentUrlCard
          isFocused={false}
          isActive={active === protocol}
          setActive={setActive}
          contentProvider={protocol}
          link={"https://google.com"}
        />
      </div>
      <div className="flex items-center justify-center button-container">
        <FilledPrimaryButton
          title={"Proceed"}
          loading={false}
          disabled={!Boolean(active)}
          handleClick={() => handleNext()}
        />
      </div>
    </>
  );
};

export default StepThree;
