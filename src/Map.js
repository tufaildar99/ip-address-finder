import React, { useState, useEffect } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Import the required CSS
import "./Map.css";

const API_KEY =
  "pk.eyJ1IjoidHVmYWlsZGFyOTkiLCJhIjoiY20wZGdvMWhqMGNibzJpczh2ZWM5N3F0eCJ9.UahuMneVQ4xK0eCE1M9zRg";

const MapComponent = ({ lat, lon }) => {
  const [viewPort, setViewPort] = useState({
    latitude: lat,
    longitude: lon,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    setViewPort((prevState) => ({
      ...prevState,
      latitude: lat,
      longitude: lon,
    }));
  }, [lat, lon]);

  return (
    <div className="map-container">
      <div className="map">
        <Map
          mapboxAccessToken={API_KEY}
          {...viewPort}
          onMove={(evt) => setViewPort(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker longitude={lon} latitude={lat}></Marker>
        </Map>
      </div>
    </div>
  );
};

export default MapComponent;
