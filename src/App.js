import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import MapComponent from "./Map";

function App() {
  const [ipDetails, setipDetails] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  useEffect(() => {
    Axios.get("https://ipapi.co/json/")
      .then((res) => {
        console.log(res);
        setipDetails(res.data);
        setLat(res.data.latitude);
        setLon(res.data.longitude);
      })
      .catch((error) => {
        console.error("Error fetching IP details:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>IP Address Finder</h1>
      <div className="content">
        {ipDetails ? (
          <div className="left">
            <h4>Your IP Address is :</h4>
            <p>{ipDetails.ip}</p>
            <h4>Approximate Location:</h4>
            <p>
              {ipDetails.city} , {ipDetails.region} , {ipDetails.country_name}
            </p>
            <h4>Internet Service Provider:</h4>
            <p>{ipDetails.org}</p>
          </div>
        ) : (
          <p className="loading">Loading IP details...</p>
        )}

        <div className="right">
          {lat && lon ? (
            <MapComponent lat={lat} lon={lon} />
          ) : (
            <p>Loading map...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
