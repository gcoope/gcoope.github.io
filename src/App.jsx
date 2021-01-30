import React, { useEffect } from "react";
import { ContextBar } from "./components/ContextBar/ContextBar";
import DashboardLayout from "./components/DashboardLayout";
import DataCards from "./components/DataCards";
import useAppData from "./hooks/useAppData";
import { fetchData } from "./modules/FetchData";

export const App = () => {
  const { appData, setAppData } = useAppData();

  useEffect(async () => {
    const requestData = async () => {
      const data = await fetchData();
      setAppData({
        ...appData,
        ...data,
      });
    };
    requestData();
  }, []);

  return (
    <DashboardLayout>
      <ContextBar />
      <DataCards />
      <p>map</p>
      <p>graph</p>
    </DashboardLayout>
  );
};

export default App;
