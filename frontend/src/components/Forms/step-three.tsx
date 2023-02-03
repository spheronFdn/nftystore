import React, { useState } from "react";
import { ReactComponent as ArweaveIcon } from "../../assets/icons/arweave.svg";
import FilledPrimaryButton from "../Buttons/filled-primary";
import ContentUrlCard from "../Cards/content-url-card";

const StepThree = () => {
  const [active, setActive] = useState<string>("");
  const handleNext = () => {};
  return (
    <div>
      <div className="flex items-center justify-between"></div>
      <h1>Select Content URL</h1>
      <div className="grid grid-cols-1 gap-4">
        <ContentUrlCard
          isFocused={true}
          isActive={!Boolean(active)}
          setActive={function (): void {
            throw new Error("Function not implemented.");
          }}
          contentIcon={
            <>
              <ArweaveIcon />
            </>
          }
          contentProvider={"Arweave"}
          link={"https://google.com"}
          cardId={""}
        />
        <ContentUrlCard
          isFocused={false}
          isActive={Boolean(active)}
          setActive={function (): void {
            throw new Error("Function not implemented.");
          }}
          contentIcon={<></>}
          contentProvider={"Arweave"}
          link={"https://google.com"}
          cardId={""}
        />
      </div>
      <div className="flex items-center justify-center">
        <FilledPrimaryButton
          title={"Next"}
          loading={false}
          disabled={!Boolean(active)}
          handleClick={() => handleNext()}
        />
      </div>
    </div>
  );
};

export default StepThree;
