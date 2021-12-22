import React, { useState } from "react";

export const OverlayContext = React.createContext({});

const OverlayContextProvider = ({ children }) => {
  const [message, setMessage] = useState("Loading...");
  const [showLoading, setShowLoading] = useState(false);

  return (
    <OverlayContext.Provider
      //exposing states to the children
      value={{ message, setMessage, showLoading, setShowLoading }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export default OverlayContextProvider;
