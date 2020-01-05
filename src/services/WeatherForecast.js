export class WeatherForecast {
	constructor() {
		this.location = '';
		this.description = '';
		this.weatherIcon = '';

		this.temperature = 0;
		this.temperatureFeelsLike = 0;
		this.temperatureHighest = 0;
		this.temperatureLowest = 0;

		this.cloudiness = 0;
		this.windSpeed = 0;
		this.humidity = 0;

		this.sunrise = 0;
		this.sunset = 0;
		this.isDayLight = false;

		this.getLocation();
	}

	/*
	 * Get users current location
	 */
	getLocation() {
		if (navigator.onLine) {
			navigator.geolocation.getCurrentPosition(position =>
				this.updateForecast(position.coords)
			);
		}
	}

	/*
	 * Get current forecast based on users position
	 */
	async updateForecast(coords) {
		let data = null;

		try {
			data = await this.getForecast(coords);
		} catch (e) {
			console.log('There was an error, ', e);
		}

		this.setData(data);
	}

	/*
	 * Fetch weather forecast from openweathermap.org
	 */
	async getForecast({ latitude, longitude }) {
		let key = '5c6c3b43fd40fea14df38a848bebf667';
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
		let response = await fetch(url);

		return await response.json();
	}

	/*
	 * Update with new data
	 */
	setData(data) {
		this.location = `${data.name}, ${data.sys.country}`;
		this.description = data.weather[0].description;
		this.weatherIcon = this.getWeatherIcon(data.weather[0].id);

		this.temperature = Math.round(data.main.temp);
		this.temperatureFeelsLike = Math.round(data.main.feels_like);
		this.temperatureHighest = Math.round(data.main.temp_max);
		this.temperatureLowest = Math.round(data.main.temp_min);

		this.cloudiness = data.clouds.all;
		this.windSpeed = data.wind.speed;
		this.humidity = data.main.humidity;

		this.sunrise = data.sys.sunrise;
		this.sunset = data.sys.sunset;
		this.isDayLight = this.checkIfDayLight(this.sunrise, this.sunset);
	}

	/*
	 * Get weather icon based on current weather type
	 */
	getWeatherIcon(id) {
		// check if thunderstorm
		if (id >= 200 && id <= 232) {
			return 'thunderstorm.svg';
		}

		// check if rain
		if (id >= 300 && id <= 531) {
			return 'rain.svg';
		}

		// check if snow
		if (id >= 600 && id <= 622) {
			return 'snow.svg';
		}

		// check if atmosphere
		if (id >= 701 && id <= 781) {
			return 'mist.svg';
		}

		// check if clouds
		if (id >= 801 && id <= 804) {
			return 'clouds.svg';
		}

		return 'clear.svg';
	}

	/*
	 * Check if its day or night based on time of sunrise and sunset
	 */
	checkIfDayLight(sunrise, sunset) {
		const now = Math.round(new Date() / 1000);
		return now >= sunrise && now <= sunset;
	}
}
