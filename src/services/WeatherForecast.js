export class WeatherForecast {
	constructor() {
		this.location = '';
		this.description = '';
		this.weatherIcon = '';

		this.temperature = 0;
		this.temperatureHighest = 0;
		this.temperatureLowest = 0;

		this.cloudiness = 0;
		this.windSpeed = 0;
		this.humidity = 0;

		this.sunrise = 0;
		this.sunset = 0;

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
		this.weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

		this.temperature = Math.round(data.main.temp);
		this.temperatureHighest = Math.round(data.main.temp_max);
		this.temperatureLowest = Math.round(data.main.temp_min);

		this.cloudiness = data.clouds.all;
		this.windSpeed = data.wind.speed;
		this.humidity = data.main.humidity;

		this.sunrise = data.sys.sunrise;
		this.sunset = data.sys.sunset;
	}
}
