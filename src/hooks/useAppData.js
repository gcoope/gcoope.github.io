import { useContext } from "react";
import DataContext from "../context/DataContext";

export default () => {
  const context = useContext(DataContext);
  return context;
};
