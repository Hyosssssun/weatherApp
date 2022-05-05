import React from "react";
import "./smallCard.css";

export default function SmallCard({ weatherInfo }) {
  return (
    <section className="smallcardcontainer">
      {weatherInfo?.map((day, index) => (
        <div className="smallcard" key={index}>
          <h2>{day.day}</h2>
          <div>
          <img
            className="smallcardicon"
            src={`http://openweathermap.org/img/w/${day.icon}.png`}
            alt="weather-icon"
          />
          <p>{Math.round(day.tempAver)} °C</p>
        </div>
        </div>
      ))}
    </section>
  );
}
