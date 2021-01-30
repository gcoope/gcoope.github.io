import axios from "axios";
import Parser from "rss-parser";

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
    format: "json",
  };

  // TODO the vaccine params don't seem to work when passed as request params
  // This URL provides the previous <2500 days of vaccine data
  const hardCodedVaccineReq =
    "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=%7B%22areaType%22:%22areaType%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22date%22:%22date%22,%22newPeopleVaccinatedFirstDoseByPublishDate%22:%22newPeopleVaccinatedFirstDoseByPublishDate%22,%22newPeopleVaccinatedSecondDoseByPublishDate%22:%22newPeopleVaccinatedSecondDoseByPublishDate%22,%22cumPeopleVaccinatedFirstDoseByPublishDate%22:%22cumPeopleVaccinatedFirstDoseByPublishDate%22,%22cumPeopleVaccinatedSecondDoseByPublishDate%22:%22cumPeopleVaccinatedSecondDoseByPublishDate%22%7D&format=json";

  const vaccineResults = await axios
    .get(hardCodedVaccineReq)
    .then((response) => {
      const todayData = response.data.data[0];
      const prevData = response.data.data[1];
      return {
        vaccine1: {
          daily: todayData.newPeopleVaccinatedFirstDoseByPublishDate,
          total: todayData.cumPeopleVaccinatedFirstDoseByPublishDate,
          increase:
            todayData.newPeopleVaccinatedFirstDoseByPublishDate >
            prevData.newPeopleVaccinatedFirstDoseByPublishDate,
        },
        vaccine2: {
          daily: todayData.newPeopleVaccinatedSecondDoseByPublishDate,
          total: todayData.cumPeopleVaccinatedSecondDoseByPublishDate,
          increase:
            todayData.newPeopleVaccinatedSecondDoseByPublishDate >
            prevData.newPeopleVaccinatedSecondDoseByPublishDate,
        },
      };
    })
    .catch((e) => console.error(e));

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
      };
    })
    .catch((e) => console.error(e));

  return {
    ...results,
    ...vaccineResults,
  };
};

export const fetchNewsData = async () => {
  const parser = new Parser();
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
  const feed = await parser.parseURL(
    CORS_PROXY + "http://feeds.bbci.co.uk/news/health/rss.xml?edition=uk"
  );
  const stories = [];
  if (feed) {
    feed.items.forEach((item) => {
      const title = item.title.toLowerCase();
      if (title.includes("covid") || title.includes("coronavirus")) {
        stories.push({
          title: item.title,
          link: item.link,
        });
      }
    });
  }

  return stories;
};
