import { format, subMonths } from "date-fns";

async function dateRangeFetch(start, end, timeRange) {
  const response = await fetch(
    `https://api.v2.emissions-api.org/api/v2/carbonmonoxide/statistics.json?&interval=${timeRange}&begin=${start}&end=${end}&limit=40&offset=0`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );
  const data = await response.json();
  return data;
}

async function pointFetch(lon, lat) {
  const dataRange = await fetch(
    "https://api.v2.emissions-api.org/api/v2/carbonmonoxide/data-range.json",
  );
  const lastData = await dataRange.json();

  const firstMesurement = format(subMonths(lastData.last, 1), "yyyy-MM-dd");

  const lastMesurement = format(await lastData.last, "yyyy-MM-dd");

  const response = await fetch(
    `https://api.v2.emissions-api.org/api/v2/carbonmonoxide/average.json?point=${lon}&point=${lat}&begin=${firstMesurement}&end=${lastMesurement}&limit=40&offset=0`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );
  const data = await response.json();
  const sortedData = await data.sort((a, b) => {
    if (a.end > b.end) return -1;
    if (a.end < b.end) return 1;
    return 0;
  });

  return sortedData;
}

async function mapFetch(country, start, end) {
  const response = await fetch(
    `https://api.v2.emissions-api.org/api/v2/carbonmonoxide/statistics.json?country=${country}&interval=week&begin=${start}&end=${end}&limit=20&offset=0`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );
  const data = await response.json();
  return data;
}

export { dateRangeFetch, mapFetch, pointFetch };
