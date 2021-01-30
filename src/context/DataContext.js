import React, { useState } from "react";

const defaultData = {
  lastUpdated: undefined,
  positive: {
    daily: null,
    total: null,
  },
  deaths: {
    daily: null,
    total: null,
  },
  vaccine1: {
    daily: null,
    total: null,
  },
  vaccine2: {
    daily: null,
    total: null,
  },
  newsStories: [],
};

const DataContext = React.createContext();

export const DataContextProvider = ({ children }) => {
  const [appData, setData] = useState(defaultData);

  const setAppData = (data) => {
    setData(data);
  };

  return (
    <DataContext.Provider value={{ appData, setAppData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
