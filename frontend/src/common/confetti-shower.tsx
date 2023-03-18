import React from "react";
import Confetti from "react-confetti";

const ConfettiShower = () => {
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={1000}
      recycle={false}
      colors={[
        "#9B70FFD9",
        "#70BAFFE5",
        "#70BAFFA6",
        "#70FFF5A6",
        "#9B70FF59",
        "#70FFF5D9",
        "#9B70FF59",
        "#70BAFFE5",
        "#9B70FF",
      ]}
      tweenDuration={10000}
      opacity={0.7}
    />
  );
};

export { ConfettiShower };
