import React from "react";
import {
  Circle,
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ points }) {
  L.Icon.Default.imagePath = "leaflet_images/";

  const icon = L.icon({
    iconRetinaUrl: iconRetina,
    iconUrl: iconMarker,
    // shadowUrl: iconShadow,
    iconSize: [20, 20],
  });

  const center = [
    [39.4093333, -123.2663333],
    [33.648, -116.7418333],
    [33.6528333, -116.7195],
    [32.2869873, -101.7752001],
  ];
  const fillBlueOptions = { fillColor: "blue" };
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
      {/* 
      {points?.map((elm, i) => {
        return (
          <Circle
            center={[elm.geometry.coordinates[1], elm.geometry.coordinates[0]]}
            pathOptions={fillBlueOptions}
            radius={600}
            key={i}
          />
        );
      })} */}

      {/* {points?.map((elm, i) => {
        return (
          <FeatureGroup
            pathOptions={`${
              elm.properties.alert ? purpleOptions : fillBlueOptions
            }`}
            key={i}
          >
            <Tooltip sticky>
              <p>
                <b>Title:</b> {elm.properties.title}
              </p>
              <p>Magnitude: {elm.properties.mag}</p>
              <p>Place: {elm.properties.place}</p>
              <p>Type: {elm.properties.type}</p>
              <p>Time: {elm.properties.updated}</p>
            </Tooltip>

            <Circle
              center={[
                elm.geometry.coordinates[1],
                elm.geometry.coordinates[0],
              ]}
              radius={`${elm.properties.alert ? 800 : 400}`}
            />
          </FeatureGroup>
        );
      })} */}

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
              <p>Magnitude: {elm.properties.mag}</p>
              <p>Place: {elm.properties.place}</p>
              <p>Type: {elm.properties.type}</p>
              <p>Time: {elm.properties.updated}</p>
              <p>Aert: {elm.properties.alert === null ? "No" : "Yes"}</p>
            </Tooltip>
          </Marker>
        );
      })}

      {/* <Marker position={[51.505, -0.09]} icon={icon}>
        <Popup>Position 51.505, -0.09</Popup>
      </Marker> */}
    </MapContainer>
  );
}
