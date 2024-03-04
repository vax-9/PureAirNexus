import { useEffect, useRef, useState } from "react";
import { dateRangeFetch } from "../components/ApiCalls";
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { format } from "date-fns";
import DayPickerContent from "../components/DayPickerContent";
import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";

function Date() {
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeRange, setTimeRange] = useState("month");
  const [timeData, setTimeData] = useState([]);

  const hasPageRendered = useRef(false);

  const { isSuccess, isFetching, isError, data, refetch } = useQuery({
    queryKey: ["Map Statistics"],
    queryFn: () =>
      dateRangeFetch(
        format(beginDate, "y-MM-dd"),
        format(endDate, "y-MM-dd"),
        timeRange,
      ),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  function handleSubmit(e) {
    e.preventDefault();
    refetch();
    if (data[0].value.average) {
      setTimeData(data);
    }
  }

  useEffect(() => {
    if (hasPageRendered.current) {
      setTimeData(data);
    }
    hasPageRendered.current = true;
  }, [data]);

  // chart configuration

  const chartConfig = {
    width:
      window.innerWidth > 480 ? (window.innerWidth > 900 ? 800 : 500) : 290,
    type: "line",
    height: 240,
    series: [
      {
        name: "Carbon Monoxide",
        data: timeData?.map(
          (mesure) => Math.round(mesure.value.average * 10000) / 10000,
        ),
      },
    ],
    options: {
      chart: {
        zoom: { enabled: false },
        width: 800,
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
        categories: timeData?.map((mesure) =>
          format(mesure.time?.interval_start, "dd/MM"),
        ),
      },
      yaxis: {
        max: 0.04,
        min: 0.02,
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
      <p className="p-10 py-16 text-center">
        Search for global carbon monoxide emissions within a specified time
        range. The measurement starts in 2019.
      </p>
      <form className="m-auto flex w-9/12 flex-col" onSubmit={handleSubmit}>
        <div>
          <Select
            label="Select time range"
            value={timeRange}
            onChange={(val) => setTimeRange(val)}
          >
            <Option value="year">Year</Option>
            <Option value="month">Month</Option>
            <Option value="day">Day</Option>
          </Select>
        </div>
        <div className="mt-16">
          <Popover placement="bottom">
            <PopoverHandler>
              <Input
                required
                label="Starting date"
                onChange={() => null}
                value={beginDate ? format(beginDate, "y MM dd") : ""}
              />
            </PopoverHandler>
            <PopoverContent>
              <DayPickerContent date={beginDate} setDate={setBeginDate} />
            </PopoverContent>
          </Popover>
        </div>
        <div className=" mt-16">
          <Popover placement="bottom">
            <PopoverHandler>
              <Input
                required
                label="Ending date"
                onChange={() => null}
                value={endDate ? format(endDate, "y MM dd") : ""}
              />
            </PopoverHandler>
            <PopoverContent>
              <DayPickerContent date={endDate} setDate={setEndDate} />
            </PopoverContent>
          </Popover>
          {isFetching ? (
            <Button loading={true} type="submit" className="mt-20">
              Loading
            </Button>
          ) : (
            <Button type="submit" className="mt-20">
              Submit
            </Button>
          )}
        </div>
      </form>
      <div className="my-5 flex justify-center">
        {isFetching ? null : isError ? (
          "an error occurred, please retry"
        ) : timeData?.length > 0 ? (
          timeData?.length === 1 ? (
            <div className="rounded-xl border p-5 text-center shadow-lg">
              <h3 className=" mb-4 text-xl font-semibold">
                Carbon monoxide found:
              </h3>
              <p className="text-lg font-light">
                {Math.round(timeData[0]?.value.average * 10000) / 10000} g/mole
              </p>{" "}
            </div>
          ) : (
            <Chart {...chartConfig} />
          )
        ) : timeData?.length === 0 && isSuccess && data?.length === 0 ? (
          "no data found"
        ) : null}
      </div>
    </>
  );
}

export default Date;
