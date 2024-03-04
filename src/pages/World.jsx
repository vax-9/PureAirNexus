import { Button, Input } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { pointFetch } from "../components/ApiCalls";
import { useQuery } from "@tanstack/react-query";

function World() {
  const [geoPoint, setGeoPoint] = useState({
    lon: "",
    lat: "",
  });
  const [geoData, setGeoData] = useState([]);

  const hasPageRendered = useRef(false);

  const { isFetching, isError, data, isSuccess, refetch } = useQuery({
    queryKey: ["Map Statistics"],
    queryFn: () => pointFetch(geoPoint.lon, geoPoint.lat),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  function handleSubmit(e) {
    e.preventDefault();
    refetch();
    setGeoData(data);
  }

  useEffect(() => {
    if (hasPageRendered.current) {
      setGeoData(data);
    }
    hasPageRendered.current = true;
  }, [data]);

  return (
    <>
      <div className="px-10 pt-10">
        <p className="text-center">
          Select a specific point in the world and observe the most recent
          carbon monoxide measurement value.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mx-auto mt-20 flex max-w-[1000px] flex-col gap-10 md:flex-row ">
            <Input
              required
              className=""
              label="Longitude "
              placeholder="insert the longitude"
              variant="static"
              onChange={(e) =>
                setGeoPoint({ ...geoPoint, lon: e.target.value })
              }
            />
            <Input
              required
              className=""
              label="Latitude "
              placeholder="instert the latitude"
              variant="static"
              onChange={(e) =>
                setGeoPoint({ ...geoPoint, lat: e.target.value })
              }
            />
          </div>
          {isFetching ? (
            <Button loading={true} className="m-auto mt-10 flex">
              Loading
            </Button>
          ) : (
            <Button type="submit" className="m-auto mt-10 flex">
              Submit
            </Button>
          )}
        </form>
        <div className="mt-20 flex justify-center">
          {isFetching ? null : isError ? (
            <p>an error occurred, please retry</p>
          ) : geoData?.length > 0 ? (
            <div className="rounded-xl border p-5 text-center shadow-lg">
              <h3 className=" mb-4 text-xl font-semibold">
                Carbon monoxide found:
              </h3>
              <p className="text-lg font-light">
                {Math.round(geoData[0]?.average * 10000) / 10000} g/mole
              </p>
            </div>
          ) : geoData?.length === 0 && data?.length === 0 && isSuccess ? (
            <p>no data dound</p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default World;
