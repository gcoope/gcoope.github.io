import React, { useEffect } from "react";
import { ContextBar } from "./components/ContextBar/ContextBar";
import DashboardLayout from "./components/DashboardLayout";
import DataCards from "./components/DataCards";
import Graph from "./components/Graph";
import News from "./components/News/News";
import useAppData from "./hooks/useAppData";
import { fetchData, fetchNewsData } from "./modules/FetchData";
import styles from "./App.module.scss";

export const App = () => {
  const { appData, setAppData } = useAppData();

  useEffect(async () => {
    const requestData = async () => {
      const data = await fetchData();
      const news = await fetchNewsData();
      setAppData({
        ...appData,
        ...data,
        newsStories: news,
      });
    };
    requestData();
  }, []);

  return (
    <DashboardLayout>
      <ContextBar />
      <DataCards />
      <div className={styles.graphNewsWrap}>
        <Graph className={styles.graph} />
        <News className={styles.news} />
      </div>
      {/* <p>Map coming soon</p> */}
    </DashboardLayout>
  );
};

export default App;
