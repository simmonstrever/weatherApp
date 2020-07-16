let currentWeather = {
	city: "",
	temperature: "",
	humidity: "",
	windSpeed: "",
	uvIndex: "",
	lat: "",
	lon: "",
	id: "",
	icon: ""
}

// localStorage.setItem('currentWeather', JSON.stringify({
// 	city: `${response.main.temp}`,
// 	temperature: "",
// 	humidity: "",
// 	windSpeed: "",
// 	uvIndex: "",
// 	lat: "",
// 	lon: "",
// 	id: "",
// 	icon: ""
// }));
// var currentWeather = JSON.parse(localStorage.getItem('currentWeather'));



// var user = JSON.parse(localStorage.getItem('user'));
// let savedCurrentWeather = [];
// let savedForecast = [];

/* Local Storage
	1) on function
	2) iterates through saved trip and current weather saved
	3) repopulates last key value pair if refreshed */

	// localStorage.setItem('user', JSON.stringify({
	// 	username: 'htmldog',
	// 	api_key: 'abc123xyz789'
	// }));
	
	// var currentWeather = JSON.parse(localStorage.getItem('currentWeather'));








$("#searchCity").on("click", function () {









	var city = $("#search").val();
	var key = "922170f09e7e847c60969243d491caad";
	//five day forecast API
	var fiveDay = {
		"async": true,
		"crossDomain": true,
		"url": `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`,
		"method": "GET"
	}

	$.ajax(fiveDay).done(function (results) {





		console.log(results);
		currentWeather.id = results.city.id;
		console.log(currentWeather.id)


		var days = results.list.filter(function (forecast) {
			return forecast.dt_txt.includes("12:00:00")
		})
		// savedForecast.push(days);
		// console.log(savedForecast);

		for (var i = 0; i < days.length; i++) {
			var cardCol = $(`<div class="col s12 m2" id="card${[i]}"><div class="icon-block"><h2 class="center brown-text"><h5 class="center card-title" id="card-title${[i]}" > ${days[i].dt_txt} </h5><i class="card-image" id="cardImage${[i]}"> <img class="center" src="https://openweathermap.org/img/wn/${days[i].weather[0].icon}.png"></i></h2><p class="light center">${days[i].main.temp}</p></div></div>`);
			$("#forecastRow").append(cardCol);
		}
		
		$("#forecastRow").append(cardCol);
		$("#forecastTitle").text("5 Day Forecast");






		//current weather API
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": `https://api.openweathermap.org/data/2.5/weather?id=${currentWeather.id}&units=imperial&q=${currentWeather.city}&appid=${key}`,
			"method": "GET"
		}

		$.ajax(settings).done(function (response) {

			console.log(response);
			console.log(response.weather[0].icon)
			currentWeather.icon = response.weather[0].icon;
			var icon = $(`<img>`);
			$(icon).attr("src", `https://openweathermap.org/img/wn/${currentWeather.icon}.png`);
			currentWeather.id = response.id;
			currentWeather.city = $("#search").val();
			$("#cityName").text(currentWeather.city);
			$("#cityName").append(icon);
			currentWeather.temperature = response.main.temp;
			$("#cityTemp").text(currentWeather.temperature)
			currentWeather.humidity = response.main.humidity;
			$("#cityHumidity").text(currentWeather.humidity);
			currentWeather.windSpeed = response.wind.speed;
			$("#cityWindSpeed").text(currentWeather.windSpeed);
			currentWeather.lat = response.coord.lat;
			currentWeather.lon = response.coord.lon;
			console.log(currentWeather);
			// savedCurrentWeather.push(currentWeather);
			// console.log(savedCurrentWeather);


			
			


			// `https://api.openweathermap.org/data/2.5/uv/forecast?appid=${key}&lat=${currentWeather.lat}&lon=${currentWeather.lon}&cnt=3`;

			// 		var uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${key}&lat=${currentWeather.lat}&lon=${currentWeather.lon}`
			// 		console.log(currentWeather);

			// console.log(uvURL);

			var uvURL = {
				"url": `https://api.openweathermap.org/data/2.5/uvi?appid=${key}&lat=${currentWeather.lat}&lon=${currentWeather.lon}`,
				"method": "GET",
				"timeout": 0,
			};

			$.ajax(uvURL).done(function (ultraviolet) {
				console.log(ultraviolet.value);
				currentWeather.uvIndex = ultraviolet.value;
				$("#cityUvIndex").text(currentWeather.uvIndex);
				if (currentWeather.uvIndex < 5) {
					$("cityUvIndex").attr("style", "background-color: green");
				} else if ( currentWeather.uvIndex > 5 && currentWeather.uvIndex <10 ) {
					$("#cityUvIndex").attr("style", "background-color: yellow");
				} else if (currentWeather.uvIndex >10){
					$("#cityUvIndex").attr("style", "background-color: red")
				}


			});
		});
	});
	// console.log(currentWeather);
});
// console.log(currentWeather);
// localStorage.setItem('currentWeatherIndex', JSON.stringify(currentWeather));



