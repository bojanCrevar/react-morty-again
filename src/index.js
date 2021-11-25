import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <div className="bg-gray-400	">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
