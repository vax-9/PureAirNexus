import { Button, Option, Select } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import countryCodeTranscriber from "../country-code.json";
import { mapFetch } from "../components/ApiCalls";
import { format, subMonths } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";
import DisplayMap from "../components/DisplayMap";

function Map() {
  const [country, setCountry] = useState({ code: "IT", name: "Italy" });
  const [countryData, setCountryData] = useState([]);

  const hasPageRendered = useRef(false);
  const bottomEl = useRef(null);

  const today = new Date();
  const sixMonthBefore = subMonths(today, 6);

  const { isFetching, isError, data, refetch } = useQuery({
    queryKey: ["Map Statistics"],
    queryFn: () =>
      mapFetch(
        country.code,
        format(sixMonthBefore, "y-MM-dd"),
        format(today, "y-MM-dd"),
      ),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
    gcTime: 1,
  });

  async function handleFetch(e) {
    e.preventDefault();
    refetch();
    if (data[0]?.value.average) {
      setCountryData(data);
    }
    bottomEl?.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (hasPageRendered.current) {
      setCountryData(data);
    }
    hasPageRendered.current = true;
    bottomEl?.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  useEffect(() => {
    bottomEl?.current?.scrollIntoView({ behavior: "smooth" });
  }, [countryData]);

  // Chart configuration

  const chartConfig = {
    width:
      window.innerWidth > 480 ? (window.innerWidth > 900 ? 800 : 500) : 290,
    type: "line",
    height: 240,
    series: [
      {
        name: "Carbon Monoxide",
        data: countryData?.map(
          (mesure) => Math.round(mesure.value?.average * 10000) / 10000,
        ),
      },
    ],
    options: {
      chart: {
        zoom: { enabled: false },
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "mole",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },

      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 500,
          },
        },
        categories: countryData?.map((mesure) =>
          format(mesure.time?.interval_start, "dd/MM"),
        ),
      },
      yaxis: {
        max: 0.045,
        min: 0.025,
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 0,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <>
      <p className="mt-10 text-center">
        Select a country and see the carbon monoxide emission in the last 6
        month.{" "}
        <span className="hidden md:block">
          the map is accessable only on computer
        </span>
      </p>
      <div className="hidden md:block">
        <DisplayMap
          setCountry={setCountry}
          countryCodeTranscriber={countryCodeTranscriber}
        />
      </div>

      <div className="m-auto mt-10 flex w-72 flex-col items-center gap-10">
        <Select
          size="lg"
          label="Select Country"
          value={country ? country.name : ""}
          onChange={(elem) => {
            setCountry({
              name: elem,
              code: countryCodeTranscriber.find((state) => state.Name === elem)
                .Code,
            });
          }}
        >
          {countryCodeTranscriber.map((country) => (
            <Option
              key={country.Code}
              value={country.Name}
              className="flex items-center gap-2"
            >
              {country.Name}
            </Option>
          ))}
        </Select>
        {isFetching ? (
          <Button loading={true} className="w-32">
            Loading
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              handleFetch(e);
            }}
            className=" w-32"
          >
            Submit
          </Button>
        )}
        <div className="" ref={bottomEl}>
          {isFetching ? null : isError ? (
            <p>an error occurred, please retry</p>
          ) : countryData?.length > 0 ? (
            <Chart {...chartConfig} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Map;
