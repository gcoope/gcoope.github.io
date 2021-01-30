import React from "react";
import styles from "./DashboardLayout.module.scss";

export const DashboardLayout = ({ children }) => {
  return <div className={styles.component}>{children}</div>;
};

export default DashboardLayout;
