import React, { useContext, useEffect, useState } from "react";
import cx from "classnames";
import Card from "../Card/Card";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Graph.module.scss";
import DataContext from "../../context/DataContext";

export const Graph = ({ className }) => {
  const { appData } = useContext(DataContext);

  const [caseAndDeathLabels, setLabels] = useState([]);
  const [newCasesData, setNewCasesDate] = useState([]);
  const [deathsData, setDeathsData] = useState([]);

  const [vaccineLabels, setVaccineLabels] = useState([]);
  const [vaccine1Data, setVaccine1Data] = useState([]);
  const [vaccine2Data, setVaccine2Data] = useState([]);

  const [currentLabels, setCurrentLabels] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");

  useEffect(() => {
    if (appData.allCasesAndDeaths.length) {
      const newCases = [];
      const deaths = [];
      const dates = [];
      for (let i = appData.allCasesAndDeaths.length - 1; i >= 0; i--) {
        const dayData = appData.allCasesAndDeaths[i];
        newCases.push(dayData.newCasesByPublishDate);
        deaths.push(dayData.newDeathsByDeathDate);
        dates.push(dayData.date);
      }
      setNewCasesDate(newCases);
      setLabels(dates);
      setDeathsData(deaths);

      // Default to New cases
      setCurrentData(newCases);
      setCurrentLabels(dates);
      setCurrentTitle("New Cases");
    }
    if (appData.allVaccines.length) {
      const labels = [];
      const vaccine1 = [];
      const vaccine2 = [];
      for (let i = appData.allVaccines.length - 1; i >= 0; i--) {
        const dayData = appData.allVaccines[i];
        labels.push(dayData.date);
        vaccine1.push(dayData.newPeopleVaccinatedFirstDoseByPublishDate);
        vaccine2.push(dayData.newPeopleVaccinatedSecondDoseByPublishDate);
      }
      console.log(labels);
      setVaccineLabels(labels);
      setVaccine1Data(vaccine1);
      setVaccine2Data(vaccine2);
    }
  }, [appData]);

  const state = {
    labels: currentLabels,
    datasets: [
      {
        label: currentTitle,
        fill: false,
        lineTension: 0.5,
        borderColor: "#3a73c9",
        backgroundColor: "#3a73c9",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        data: currentData,
      },
    ],
  };

  return (
    <Card className={cx(styles.component, className)}>
      <div className={styles.buttonContainer}>
        <button
          autoFocus
          title="Filter by new cases"
          onClick={() => {
            setCurrentData(newCasesData);
            setCurrentLabels(caseAndDeathLabels);
            setCurrentTitle("New Cases");
          }}
        >
          Cases
        </button>
        <button
          title="Filter by new deaths"
          onClick={() => {
            setCurrentData(deathsData);
            setCurrentLabels(caseAndDeathLabels);
            setCurrentTitle("Deaths");
          }}
        >
          Deaths
        </button>
        <button
          title="Filter by vaccinations (1st dose)"
          onClick={() => {
            setCurrentData(vaccine1Data);
            setCurrentLabels(vaccineLabels);
            setCurrentTitle("Vaccinations (1st Dose)");
          }}
        >
          Vaccinations (1st Dose)
        </button>
        <button
          title="Filter by vaccinations (2nd dose)"
          onClick={() => {
            setCurrentData(vaccine2Data);
            setCurrentLabels(vaccineLabels);
            setCurrentTitle("Vaccinations (2nd Dose)");
          }}
        >
          Vaccinations (2nd Dose)
        </button>
      </div>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: currentTitle,
            fontSize: 20,
          },
          legend: {
            display: false,
            position: "bottom",
          },
        }}
      />
    </Card>
  );
};

export default Graph;
