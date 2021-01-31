import React, { useContext } from "react";
import cx from "classnames";
import DataContext from "../../context/DataContext";
import Card from "../Card/Card";
import styles from "./News.module.scss";

export const News = ({ className }) => {
  const { appData } = useContext(DataContext);

  const renderNews = () => {
    if (!appData || !appData.newsStories.length) return <p>Loading...</p>;

    return (
      <ul className={styles.newsList}>
        {appData.newsStories.slice(0, 5).map((story) => {
          return (
            <li key={story.title}>
              <a href={story.link}>{story.title}</a>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Card className={cx(styles.component, className)}>
      <h4 className={styles.title}>COVID News - BBC News</h4>
      {renderNews()}
    </Card>
  );
};

export default News;
