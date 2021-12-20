import React from "react";

const myStyle = {
  background: "url(rickandmorty.png)",
  opacity: "0.2",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPositionX: "center",
  backgroundPositionY: "center",
  backgroundAttachment: "fixed",
  height: "100%",
  width: "100%",
  position: "absolute",
  top: 0,
  left: 0,
};
const HomePage = () => {
  return (
    <div className="flex-1 relative">
      <div style={myStyle}></div>
      <div className="text-center">
        <h1 className="lg:text-6xl lg:pt-48 md:text-4xl md:pt-32 sm:text-2xl sm:pt-20 opacity-60">
          Welcome to the Rick and Morty app
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
