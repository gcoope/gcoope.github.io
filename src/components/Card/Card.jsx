import React from "react";
import cx from "classnames";
import styles from "./Card.module.scss";

export const Card = ({ children, className }) => {
  return <div className={cx(styles.component, className)}>{children}</div>;
};

export default Card;
