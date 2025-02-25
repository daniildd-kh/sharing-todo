import React from "react";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  size?: number;
}

const Spinner = ({ size }: SpinnerProps) => {
  return (
    <span
      className={styles.spinner}
      style={size ? { width: `${size}px`, height: `${size}px` } : {}}
    ></span>
  );
};

export default Spinner;
