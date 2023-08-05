"use client"

import React, { useContext } from "react";
import styles from "./darkmode.module.css";
import { Context } from "@/context/DarkMode";

const DarkModeToggle = () => {
  const { toggle, mode } = useContext(Context);
  return (
    <div className={styles.container} onClick={toggle}>
      <div className={styles.icon}>☀️</div>
      <div className={styles.icon}>🌙</div>
      <div
        className={styles.ball}
        style={mode === "light" ? { left: "2px" } : { right: "2px" }}
      />
    </div>
  );
};

export default DarkModeToggle;