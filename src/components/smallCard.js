import React from "react";
import "./smallCard.css";

export default function SmallCard({ weatherInfo, handleClick }) {
  return (
    <section className="smallcardcontainer">
      {weatherInfo?.map((day, index) => (
        <div className="smallcard" key={index} onClick={()=>handleClick(index)}>
          <h2>{day.day}</h2>
          <div className="rightsidesmallcard">
          <img
            className="smallcardicon"
            src={`http://openweathermap.org/img/w/${day.icon}.png`}
            alt="weather-icon"
          />
          <p className="temp">{day.tempAver}</p>
        </div>
        </div>
      ))}
    </section>
  );
}
