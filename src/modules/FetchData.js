import axios from "axios";

export const fetchData = async () => {
  const baseURL = "https://api.coronavirus.data.gov.uk/v1/data";
  const AreaType = "overview"; // Use nation for specifics
  const AreaName = "england";

  const filters = [`areaType=${AreaType}`];
  //   , `areaName=${AreaName}`

  const structure = {
    date: "date",
    name: "areaName",
    code: "areaCode",
    newCasesByPublishDate: "newCasesByPublishDate",
    cumCasesByPublishDate: "cumCasesByPublishDate",
    newDeathsByDeathDate: "newDeaths28DaysByPublishDate",
    cumDeathsByDeathDate: "cumDeaths28DaysByPublishDate",
  };

  const apiParams = {
    filters: filters.join(";"),
    structure: JSON.stringify(structure),
    // latestBy: "newCasesByPublishDate",
    format: "json",
  };

  const results = await axios
    .get(baseURL, {
      params: apiParams,
      timeout: 10000,
    })
    .then((response) => {
      const data = response.data.data[0];
      const prevData = response.data.data[1];

      return {
        lastUpdated: data.date,
        positive: {
          daily: data.newCasesByPublishDate,
          total: data.cumCasesByPublishDate,
          increase: data.newCasesByPublishDate > prevData.newCasesByPublishDate,
        },
        deaths: {
          daily: data.newDeathsByDeathDate,
          total: data.cumDeathsByDeathDate,
          increase: data.newDeathsByDeathDate > prevData.newDeathsByDeathDate,
        },
        vaccine1: {
          daily: null,
          total: null,
          increase: true,
        },
        vaccine2: {
          daily: null,
          total: null,
          increase: true,
        },
      };
    })
    .catch((e) => console.error(e));

  return results;
};
