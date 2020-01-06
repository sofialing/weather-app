import moment from 'moment';

export class WeatherForecast {
	constructor() {
		this.location = '';
		this.description = '';
		this.weatherIcon = require(`../assets/icons/clouds-day.svg`);

		this.temperature = 0;
		this.temperatureFeelsLike = 0;
		this.temperatureHighest = 0;
		this.temperatureLowest = 0;

		this.cloudiness = 0;
		this.windSpeed = 0;
		this.humidity = 0;

		this.sunrise = '00:00';
		this.sunset = '00:00';
		this.isDayLight = true;

		this.getLocation();
	}

	/*
	 * Get users current location
	 */
	getLocation() {
		const obj = this;
		if (navigator.onLine) {
			navigator.geolocation.getCurrentPosition(
				obj.updateForecast.bind(obj),
				obj.handleError.bind(obj)
			);
		} else {
			obj.description = 'Geolocation is not supported by this browser.';
		}
	}

	/*
	 * Show error message if user deny access to geolocation
	 */
	handleError(error) {
		this.description = error.message;
	}

	/*
	 * Get current forecast based on users position
	 */
	async updateForecast({ coords }) {
		let data = null;

		try {
			data = await this.getForecast(coords);
		} catch (e) {
			console.log('An error occurred: ', e);
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

		this.temperature = Math.round(data.main.temp);
		this.temperatureFeelsLike = Math.round(data.main.feels_like);
		this.temperatureHighest = Math.round(data.main.temp_max);
		this.temperatureLowest = Math.round(data.main.temp_min);

		this.cloudiness = data.clouds.all;
		this.windSpeed = data.wind.speed;
		this.humidity = data.main.humidity;

		this.sunrise = moment.unix(data.sys.sunrise).format('kk:mm');
		this.sunset = moment.unix(data.sys.sunset).format('kk:mm');
		this.isDayLight = this.checkIfDayLight(data.sys.sunrise, data.sys.sunset);

		this.weatherIcon = this.getWeatherIcon(data.weather[0].id);
	}

	/*
	 * Get weather icon based on current weather type
	 */
	getWeatherIcon(id) {
		const time = this.isDayLight ? 'day' : 'night';

		// check if thunderstorm
		if (id >= 200 && id <= 232) {
			return require(`../assets/icons/thunderstorm-${time}.svg`);
		}

		// check if rain
		if (id >= 300 && id <= 531) {
			return require(`../assets/icons/rain-${time}.svg`);
		}

		// check if snow
		if (id >= 600 && id <= 622) {
			return require(`../assets/icons/snow-${time}.svg`);
		}

		// check if atmosphere
		if (id >= 701 && id <= 781) {
			return require(`../assets/icons/fog-${time}.svg`);
		}

		// check if clouds
		if (id >= 801 && id <= 804) {
			return require(`../assets/icons/clouds-${time}.svg`);
		}

		return require(`../assets/icons/clear-${time}.svg`);
	}

	/*
	 * Check if its day or night based on time of sunrise and sunset
	 */
	checkIfDayLight(sunrise, sunset) {
		const now = Math.round(new Date() / 1000);
		return now >= sunrise && now <= sunset;
	}
}
