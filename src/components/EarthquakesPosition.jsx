import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Map from "./Map";

export default function EarthquakesPosition() {
  const [tempData, setTempData] = useState(null);
  const [dataToPrintPointer, setDataToPrintPointer] = useState(null);
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const today = new Date();
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(today.getTime() - oneDayInMs)
  );
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const getData = async () => {
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
      .then((data) => setTempData(data));
  };

  useEffect(() => {
    // getData();

    const intervalId = setInterval(() => {
      getData();
    }, 15000);
    return () => clearInterval(intervalId);
  }, [tempData]);

  const onSubmitHandler = async () => {
    await getData();
    setDataToPrintPointer(tempData);

    console.log(tempData, "tempData");
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="date"
          label="Date"
          type="date"
          size="small"
          value={selectedStartDate.toISOString().substr(0, 10)}
          onChange={(event) =>
            setSelectedStartDate(new Date(event.target.value))
          }
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mr: 2, mb: 2, mt: 2 }}
        />
        <TextField
          id="date"
          label="Date"
          type="date"
          size="small"
          value={selectedEndDate.toISOString().substr(0, 10)}
          onChange={(event) => setSelectedEndDate(new Date(event.target.value))}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2, mt: 2, mr: 2 }}
        />
        <Button variant="contained" onClick={onSubmitHandler}>
          Submit
        </Button>
      </div>
      <Map
        points={dataToPrintPointer?.features}
        tempPoints={tempData?.features}
      />
    </div>
  );
}
