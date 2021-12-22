import React, { useContext } from "react";
import { OverlayContext } from "../context/OverlayContext";
import styles from "./LoaderOverlay.module.css";

const LoaderOverlay = () => {
  const { message, showLoading } = useContext(OverlayContext);
  return (
    <div
      className={styles.overlay}
      style={{ display: showLoading ? "block" : "none" }}
    >
      <div className="spinner-border text-danger mt-60 text-6xl">{message}</div>
    </div>
  );
};

export default LoaderOverlay;
