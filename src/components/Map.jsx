import React from "react";
import {
  Circle,
  FeatureGroup,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ points, tempPoints }) {
  // console.log(points, "Points");
  L.Icon.Default.imagePath = "leaflet_images/";

  const icon = L.icon({
    iconRetinaUrl: iconRetina,
    iconUrl: iconMarker,
    iconSize: [20, 20],
  });

  const compareObjects = (a, b) => a.id === b.id;
  const purpleOptions = { color: "purple" };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {tempPoints
        ?.filter(
          (item2) => !points?.find((item1) => compareObjects(item1, item2))
        )
        .map((elm, i) => {
          return (
            <FeatureGroup pathOptions={purpleOptions} key={i}>
              <Tooltip sticky>
                <p>
                  <b>Title:</b> {elm.properties.title}
                </p>
                <p>Magnitude: {elm.properties.mag}</p>
                <p>Place: {elm.properties.place}</p>
                <p>Type: {elm.properties.type}</p>
                <p>
                  Time:{" "}
                  {new Date(elm.properties.updated).toISOString().split("T")[0]}{" "}
                </p>
              </Tooltip>
              <Circle
                center={[
                  elm.geometry.coordinates[1],
                  elm.geometry.coordinates[0],
                ]}
                radius={1000}
              />
            </FeatureGroup>
          );
        })}

      {points?.map((elm, i) => {
        return (
          <Marker
            position={[
              elm.geometry.coordinates[1],
              elm.geometry.coordinates[0],
            ]}
            icon={icon}
            key={i}
          >
            <Tooltip sticky>
              <p>
                <b>Title:</b> {elm.properties.title}
              </p>
              <p>
                <b>Magnitude:</b> {elm.properties.mag}
              </p>
              <p>
                <b>Place:</b> {elm.properties.place}
              </p>
              <p>Type: {elm.properties.type}</p>
              <p>
                Time:{" "}
                {new Date(elm.properties.updated).toISOString().split("T")[0]}
              </p>
              <p>Aert: {elm.properties.alert === null ? "No" : "Yes"}</p>
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
