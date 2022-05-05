import React from 'react'
import './detail.css'

export default function Detail({ weatherInfo }) {
  const { day, date, weather, icon, tempAver, tempMin, tempMax, humidity, sunrise, sunset, feelsLike } = weatherInfo;
  console.log({ weatherInfo })
  return (
    <section className='detail-card'>
      <div className='detail-card-day'>
        <h1>{day} {date}</h1>
      </div>
        <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather-icon"/>
      <div className='detail-card-info'>
        <h1>{tempAver}, {weather}</h1>
        <div className='detail-card-info-detail'>
          <p><span>feelslike </span>{feelsLike}</p>
          <p><span>Low </span>{tempMin}</p>
          <p><span>High </span>{tempMax}</p>
          <p><span>Sunrise </span>{sunrise}</p>
          <p><span>Sunset </span>{sunset}</p>
          <p><span>humidity </span>{humidity}</p>
        </div>
      </div>
    </section>
  )
}
    // <section className="display-section">
		// 		{basicInfo && (
		// 			<h3>{basicInfo.day}, {basicInfo.date} in {basicInfo.city}</h3>
		// 		)}
		// 		--------------------------------------------------------------------
		// 		{weatherInfo?.map((day, index)=>
		// 			<div key={index}>
		// 				<h2>{day.day} {day.date}</h2>
		// 				<p>Today is : {day.weather}</p>
		// 				<img src={`http://openweathermap.org/img/w/${day.icon}.png`} alt="weather-icon"/>
		// 				<p>Average temparature : {day.tempAver} °C</p>
		// 				<p>feels like : {day.feelsLike}</p>
		// 				<p>minimum temparature : {day.tempMin} °C</p>
		// 				<p>maximum temparature : {day.tempMax} °C</p>
		// 				<p>humidity : {day.humidity}</p>
		// 				<p>sunrise : {day.sunrise}</p>
		// 				<p>sunset : {day.sunset}</p>
		// 				--------------------------------------------------------------------
		// 			</div>
		// 		)}
		// 	</section>