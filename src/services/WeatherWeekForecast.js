import moment from 'moment';

export class WeatherWeekForecast {
	constructor() {
		this.list = [];
		this.sunrise = '';
		this.sunset = '';

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

		this.saveDayTime(data.city);
		this.filterData(data.list);
	}

	/*
	 * Fetch weather forecast from openweathermap.org
	 */
	async getForecast({ latitude, longitude }) {
		let key = '5c6c3b43fd40fea14df38a848bebf667';
		let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
		let response = await fetch(url);

		return await response.json();
	}

	/*
	 * Filter weather forecast
	 */
	filterData(data) {
		const today = moment().format('YYYY-MM-DD');
		const time = '12:00:00';

		this.list = data
			.filter(
				item => !item.dt_txt.includes(today) && item.dt_txt.includes(time)
			)
			.map(item => ({
				temp: Math.round(item.main.temp),
				icon: this.getWeatherIcon(item.weather[0].id),
				day: moment(item.dt_txt).format('ddd')
			}));
	}

	/*
	 * Save time of sunrise and sunset
	 */
	saveDayTime({ sunrise, sunset }) {
		this.sunrise = sunrise;
		this.sunset = sunset;
	}

	/*
	 * Check if day or night
	 */
	getDayTime() {
		const now = Math.round(new Date() / 1000);
		return now >= this.sunrise && now <= this.sunset;
	}

	/*
	 * Get weather icon based on weather type
	 */
	getWeatherIcon(id) {
		const time = this.getDayTime() ? 'day' : 'night';

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
}
