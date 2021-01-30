import React, { useContext } from "react";
import cx from "classnames";
import DataContext from "../../context/DataContext";
import Card from "../Card/Card";
import { UpArrow } from "../../assets";
import styles from "./DataCards.module.scss";

const DataCardContent = ({ title, dayCount, totalCount, negative }) => {
  return (
    <>
      <div className={styles.dataCardHeadWrap}>
        <div className={styles.dataCardIcon}>
          <UpArrow
            title={`${negative ? "Down" : "Up"} from previous day`}
            className={cx(styles.arrow, { [styles.down]: negative })}
          />
        </div>
        <h3 className={styles.dataCardTitle}>{title}</h3>
      </div>
      <div className={styles.dataCardContent}>
        <p className={styles.dataCardCount}>{dayCount.toLocaleString()}</p>
        <p className={styles.dataCardLabel}>Today</p>
        <p className={styles.dataCardCount}>{totalCount.toLocaleString()}</p>
        <p className={styles.dataCardLabel}>Cumulative total</p>
      </div>
    </>
  );
};

export const DataCards = () => {
  const { appData } = useContext(DataContext);

  return (
    <div className={styles.component}>
      <Card className={styles.dataCard}>
        <DataCardContent
          title="Positive cases"
          dayCount={appData?.positive.daily || "-"}
          totalCount={appData?.positive.total || "-"}
          negative={!appData.positive.increase}
        />
      </Card>
      <Card className={styles.dataCard}>
        <DataCardContent
          title="Deaths"
          dayCount={appData?.deaths.daily || "-"}
          totalCount={appData?.deaths.total || "-"}
          negative={!appData.deaths.increase}
        />
      </Card>
      <Card className={styles.dataCard}>
        <DataCardContent
          title="Vaccines (1st Dose)"
          dayCount={appData?.vaccine1.daily || "-"}
          totalCount={appData?.vaccine1.total || "-"}
          negative={!appData.vaccine1.increase}
        />
      </Card>
      <Card className={styles.dataCard}>
        <DataCardContent
          title="Vaccines (2nd Dose)"
          dayCount={appData?.vaccine2.daily || "-"}
          totalCount={appData?.vaccine2.total || "-"}
          negative={!appData.vaccine2.increase}
        />
      </Card>
    </div>
  );
};

export default DataCards;
