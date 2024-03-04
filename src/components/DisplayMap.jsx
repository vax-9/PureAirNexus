/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import Europe from "@react-map/europe";
import World from "@react-map/world";
import { MapInteractionCSS } from "react-map-interaction";
import { useState } from "react";

function DisplayMap(props) {
  const [mapType, setMaptype] = useState("europe");

  return (
    <div>
      <div className=" mx-auto my-10 flex max-w-[400px] justify-around">
        <Button onClick={() => setMaptype("europe")}>Europe</Button>
        <Button onClick={() => setMaptype("world")}>World</Button>
      </div>
      <div className="m-4 mx-auto flex h-[400px] max-w-[800px] items-center justify-center rounded-lg border-2 border-gray-900 text-center">
        {mapType === "world" ? (
          <MapInteractionCSS showControls={true}>
            <World
              mapColor="red"
              strokeColor="#6DB1E1"
              strokeWidth={1}
              hoverColor="#5DAE49"
              onSelect={(st) => {
                props.setCountry({
                  name: st,
                  code: props.countryCodeTranscriber.find(
                    (state) => state.Name === st,
                  ).Code,
                });
              }}
              size={1000}
            />
          </MapInteractionCSS>
        ) : (
          <MapInteractionCSS disableZoom={true} showControls={true}>
            <Europe
              mapColor="red"
              strokeColor="#6DB1E1"
              strokeWidth={1}
              hoverColor="#5DAE49"
              onSelect={(st) => {
                props.setCountry({
                  name: st,
                  code: props.countryCodeTranscriber.find(
                    (state) => state.Name === st,
                  ).Code,
                });
              }}
              size={750}
            />
          </MapInteractionCSS>
        )}
      </div>
    </div>
  );
}

export default DisplayMap;
