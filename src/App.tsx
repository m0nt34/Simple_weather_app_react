import React, { useEffect, useRef, useState } from "react";
import searchImg from "../src/assets/images/search.png";
import clearImg from "../src/assets/images/clear.png";
import cloudsImg from "../src/assets/images/clouds.png";
import drizzleImg from "../src/assets/images/drizzle.png";
import humidityImg from "../src/assets/images/humidity.png";
import mistImg from "../src/assets/images/mist.png";
import rainImg from "../src/assets/images/rain.png";
import snowImg from "../src/assets/images/snow.png";
import windImg from "../src/assets/images/wind.png";

import "./App.css";

function App() {
  //http://api.weatherapi.com/v1/current.json?key=84905fe211eb40ce999212339240402&q=tbilisis
  const cityInp = useRef<HTMLInputElement | null>(null);
  const abortController = new AbortController();
  let inputValueFromRef;
  const [info, setInfo] = useState([
    { temperature: "" },
    { location: "" },
    { humidity: "" },
    { windSpeed: "" },
    { condition: "" },
  ]);
  const [loading, setLoading] = useState(true);
  function handleButtonClick() {
    inputValueFromRef = cityInp.current?.value;
    console.log("Input Value:", inputValueFromRef);
    getWetherInfo(inputValueFromRef?.toLowerCase());
  }
  function getWetherInfo(city: string | undefined) {
    let Url = `http://api.weatherapi.com/v1/current.json?key=84905fe211eb40ce999212339240402&q=${city}`;
    setLoading(true);
    fetch(Url, { signal: abortController.signal })
    .then((res) => res.json())
    .then((data) => {
      setLoading(false);
      
      setInfo([
        { temperature: data.current.temp_c },
        { location: data.location.name },
        { humidity: data.current.humidity },
        { windSpeed: data.current.wind_kph },
        { condition: data.current.condition.icon },
      ]);
    }).catch(error=>{
      console.log(error)
      setLoading(true);
    });
    console.log(info);
    return () => {
      abortController.abort();
    };
  }

  return (
    <>
      <div className="cont">
        <div className="up_content">
          <input type="text" placeholder="Search..." ref={cityInp} />
          <button
            onClick={() => {
              handleButtonClick();
            }}
          >
            <img src={searchImg} alt="img" />
          </button>
        </div>
        {loading ? (
          <>
            <div className="Loading_cont" style={{ marginTop: "25px",display:"flex" ,alignItems:'center',justifyContent:'center'}}>
              <span></span>
              <span></span>
              <span></span>
            </div>

          </>
        ) : (
          <>
            <h1 className="temperature">
              <span>{info[0].temperature}</span>°C
            </h1>
            <div className="location_icon_cont">
              <h1 className="location">{info[1].location}</h1>
              <img src={info[4].condition} alt="img" />
            </div>
            <div className="bottom_cont">
              <div className="hum_cont">
                <div className="ad_cont">
                  <img src={humidityImg} alt="img" />
                  <h3>
                    <span>{info[2].humidity}</span>%
                  </h3>
                </div>
                <p>Humidity</p>
              </div>
              <div className="wind_cont">
                <div className="ad_cont">
                  <img src={windImg} alt="img" />
                  <h3>
                    <span>{info[3].windSpeed}</span>km/h
                  </h3>
                </div>
                <p>Wind Speed</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
