import React, { useState } from "react";
import moment from "moment-timezone";
import "./App.css";

function App() {
	const [location, setLocation] = useState("");
	const [weatherInfo, setWeatherInfo] = useState([]);
	const [basicInfo, setBasicInfo] = useState({
		city: "",
		day: "",
		date: "",
	});


	const apiKey = process.env.REACT_APP_API_KEY;
	const currentAPI = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
	let weeksInfo = [];

	const searchLocation = (event) => {
		event.key === "Enter" && fetch(currentAPI).then((response) => response.json()).then((today) => {
			console.log("***** today data *****", today);
			fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${today.coord.lat}&lon=${today.coord.lon}&exclude=minutely&units=metric&appid=${apiKey}`)
				.then((res) => res.json()).then((weeks) => {
					console.log("***** week data *****", weeks);
					let date = moment.unix(weeks.daily[0].dt).tz(weeks.timezone)
					setBasicInfo({
						city: `${location}, ${today.sys.country}`,
						day: date.format("dddd"),
						date: date.format("Do MMMM"),
					});
					for (let i = 0; i < 8; i++) {
						let thisday = weeks.daily[i]
						weeksInfo = [...weeksInfo, {
								day: moment.unix(thisday.dt).tz(weeks.timezone).format("dddd"),
								date: moment.unix(thisday.dt).tz(weeks.timezone).format("Do MMMM"),
								tempAver: ((Number(thisday.temp.max) + Number(thisday.temp.min)) /2).toFixed(2),
								tempMax: thisday.temp.max,
								tempMin: thisday.temp.min,
								icon: thisday.weather[0].icon,
								weather: thisday.weather[0].main,
								feelsLike: thisday.feels_like.day,
								humidity: thisday.humidity,
								sunrise: moment.unix(thisday.sunrise).tz(weeks.timezone).format("HH:mm a"),
								sunset: moment.unix(thisday.sunset).tz(weeks.timezone).format("HH:mm a"),
							},
						];
						setWeatherInfo(weeksInfo);
					}
				});
		});
	};

	console.log('***** basic info *****', basicInfo)
	console.log('***** weather info *****', weatherInfo)
	return (
		<div className="App">
			<h1>Welcome to Our app </h1>
			--------------------------------------------------------------------
			<section className="search-section">
				<h2>Enter your city!</h2>
				<input
					value={location}
					onChange={(event) => setLocation(event.target.value)}
					onKeyPress={searchLocation}
					placeholder="Enter Location"
					type="text"
				/>
			</section>
			<section className="display-section">
				{basicInfo && (
					<h3>{basicInfo.day}, {basicInfo.date} in {basicInfo.city}</h3>
				)}
				--------------------------------------------------------------------
				{weatherInfo?.map((day, index)=>
					<div key={index}>
						<h2>{day.day} {day.date}</h2>
						<p>Today is : {day.weather}</p>
						<img src={`http://openweathermap.org/img/w/${day.icon}.png`} alt="weather-icon"/>
						<p>Average temparature : {day.tempAver} °C</p>
						<p>feels like : {day.feelsLike}</p>
						<p>minimum temparature : {day.tempMin} °C</p>
						<p>maximum temparature : {day.tempMax} °C</p>
						<p>humidity : {day.humidity}</p>
						<p>sunrise : {day.sunrise}</p>
						<p>sunset : {day.sunset}</p>
						--------------------------------------------------------------------
					</div>
				)}
			</section>
		</div>
	);
}

export default App;
