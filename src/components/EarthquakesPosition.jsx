import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Map from "./Map";

export default function EarthquakesPosition() {
  const [data, setData] = useState(null);
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const today = new Date();
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(today.getTime() - oneDayInMs)
  );
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${new Date(
          selectedStartDate
        )
          .toISOString()
          .substr(0, 10)}&endtime=${new Date(selectedEndDate)
          .toISOString()
          .substr(0, 10)}&minmagnitude=1`
      )
        .then((response) => response.json())
        .then((data) => setData(data));
    }, 15000);

    return () => clearInterval(intervalId);
  }, [selectedStartDate]);

  let outPut = data?.features[20];
  data?.features.map((itm) => {
    // console.log(itm.properties, "data");
  });

  return (
    <div>
      <TextField
        id="date"
        label="Date"
        type="date"
        value={selectedStartDate.toISOString().substr(0, 10)}
        onChange={(event) => setSelectedStartDate(new Date(event.target.value))}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mr: 2, mb: 2, mt: 2 }}
      />
      <TextField
        id="date"
        label="Date"
        type="date"
        value={selectedEndDate.toISOString().substr(0, 10)}
        onChange={(event) => setSelectedEndDate(new Date(event.target.value))}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mb: 2, mt: 2 }}
      />
      <Map points={data?.features} />
    </div>
  );
}
