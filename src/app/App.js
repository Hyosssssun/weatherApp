import React, { useState } from "react";
import moment from "moment-timezone";
import Detail from "../components/detail";
import SmallCard from "../components/smallCard";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [displayIndex, setDisplayIndex] = useState(0)
  const [basicInfo, setBasicInfo] = useState({
    city: "",
    day: "",
    date: "",
  });

  const apiKey = process.env.REACT_APP_API_KEY;
  const currentAPI = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  let weeksInfo = [];

  const searchLocation = (event) => {
    event.key === "Enter" &&
      fetch(currentAPI)
        .then((response) => response.json())
        .then((today) => {
          // console.log("***** today data *****", today);
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${today.coord.lat}&lon=${today.coord.lon}&exclude=minutely&units=metric&appid=${apiKey}`
          )
            .then((res) => res.json())
            .then((weeks) => {
              // console.log("***** week data *****", weeks);
              let date = moment.unix(weeks.daily[0].dt).tz(weeks.timezone);
              setBasicInfo({
                city: `${location}, ${today.sys.country}`,
                day: date.format("dddd"),
                date: date.format("Do MMMM"),
              });
              for (let i = 0; i < 8; i++) {
                let thisday = weeks.daily[i];
                weeksInfo = [
                  ...weeksInfo,
                  {
                    day: moment
                      .unix(thisday.dt)
                      .tz(weeks.timezone)
                      .format("dddd"),
                    date: moment
                      .unix(thisday.dt)
                      .tz(weeks.timezone)
                      .format("Do MMMM"),
                    tempAver:
                      Math.round(
                        (Number(thisday.temp.max) + Number(thisday.temp.min)) /
                          2
                      ) + " °C",
                    tempMax: Math.round(Number(thisday.temp.max)) + " °C",
                    tempMin: Math.round(Number(thisday.temp.min)) + " °C",
                    icon: thisday.weather[0].icon,
                    weather: thisday.weather[0].main,
                    feelsLike:
                      Math.round(Number(thisday.feels_like.day)) + " °C",
                    humidity: thisday.humidity + "%",
                    sunrise: moment
                      .unix(thisday.sunrise)
                      .tz(weeks.timezone)
                      .format("H:mm a"),
                    sunset: moment
                      .unix(thisday.sunset)
                      .tz(weeks.timezone)
                      .format("H:mm a"),
                  },
                ];
                setWeatherInfo(weeksInfo);
              }
            });
        });
  };
 

  // console.log("***** basic info *****", basicInfo);
  // console.log("***** weather info *****", weatherInfo);

  return (
    <div className="App">
      <section className="search-section">
        <h1>Forecast For Your Tour</h1>
        -------------------------------------
        <h2>Enter your city!</h2>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </section>
      {weatherInfo.length > 1 ? (
        <section className="display-section">
          <Detail
            className="detail-card"
            basicInfo={basicInfo}
            weatherInfo={weatherInfo[displayIndex]}
          />
          <SmallCard
            className="small-card"
            basicInfo={basicInfo}
            weatherInfo={weatherInfo}
            findDay={e=>setDisplayIndex(e.target.id)}
          />
        </section>
      ) : (
        <section className="display-section">
          <h3>❤️</h3>
        </section>
      )}
    </div>
  );
}

export default App;
