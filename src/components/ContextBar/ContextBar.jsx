import React, { useContext } from "react";
import DataContext from "../../context/DataContext";
import styles from "./ContextBar.module.scss";

export const ContextBar = () => {
  const { appData } = useContext(DataContext);

  return (
    <div className={styles.component}>
      <h1 className={styles.title}>COVID-19 UK | Overview</h1>
      <p className={styles.date}>{`Last updated: ${
        appData?.lastUpdated || "fetching"
      }`}</p>
    </div>
  );
};
