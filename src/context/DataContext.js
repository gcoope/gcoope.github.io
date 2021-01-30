import React, { useState } from "react";

const defaultData = {
  lastUpdated: undefined,
  positive: {
    daily: 1234,
    total: 12345,
  },
  deaths: {
    daily: 123,
    total: 12345,
  },
  vaccine1: {
    daily: 222,
    total: 12345,
  },
  vaccine2: {
    daily: 333,
    total: 12345,
  },
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
