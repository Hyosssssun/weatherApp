import React from 'react'
import './detail.css'

export default function Detail({ weatherInfo, basicInfo }) {
  const { city } = basicInfo;
  const { day, date, weather, icon, tempAver, tempMin, tempMax, humidity, sunrise, sunset, feelsLike } = weatherInfo;
  return (
    <section className='detail-card'>
      <div className='detail-card-day'>
        <h1>{day} {date}</h1>
      <h3>{city}</h3>
      </div>
        <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather-icon"/>
      <div className='detail-card-info'>
        <h1>{tempAver}, {weather}</h1>
        <div className='detail-card-info-detail'>
          <p><span>Feels-like </span>{feelsLike}</p>
          <p><span>Low </span>{tempMin}</p>
          <p><span>High </span>{tempMax}</p>
          <p><span>Sunrise </span>{sunrise}</p>
          <p><span>Sunset </span>{sunset}</p>
          <p><span>Humidity </span>{humidity}</p>
        </div>
      </div>
    </section>
  )
}