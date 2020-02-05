import axios from 'axios';
import moment from 'moment';

export const weatherMixin = {
	methods: {
		// Fetch data from Open Weather Map API
		async fetchData(url, query) {
			return await axios.get(url + query + process.env.VUE_APP_API_KEY);
		},

		// Get and return current weather
		async getWeather(query) {
			const API_URL =
				'https://api.openweathermap.org/data/2.5/weather?units=metric';
			const { data } = await this.fetchData(API_URL, query);
			return {
				description: data.weather[0].description,
				temperature: Math.round(data.main.temp),
				location: data.sys.country
					? `${data.name}, ${data.sys.country}`
					: data.name,
				wind: data.wind.speed,
				humidity: data.main.humidity,
				feels_like: Math.round(data.main.feels_like),
				sunrise: [
					moment.unix(data.sys.sunrise).format('kk:mm'),
					data.sys.sunrise
				],
				sunset: [
					moment.unix(data.sys.sunset).format('kk:mm'),
					data.sys.sunset
				],
				type: this.getWeatherType(data.weather[0].id)
			};
		},

		// Get and return weather forecast
		async getForecast(query) {
			const API_URL =
				'https://api.openweathermap.org/data/2.5/forecast?units=metric';
			const { data } = await this.fetchData(API_URL, query);
			return this.filterData(data.list);
		},

		// Filter weather forecast
		filterData(data) {
			const today = moment().format('YYYY-MM-DD');
			const time = '12:00:00';
			return data
				.filter(
					item =>
						!item.dt_txt.includes(today) && item.dt_txt.includes(time)
				)
				.map(item => ({
					temp: Math.round(item.main.temp),
					type: this.getWeatherType(item.weather[0].id),
					day: moment(item.dt_txt).format('ddd')
				}));
		},

		// Get weather type for current weather
		getWeatherType(id) {
			// Check if thunder
			if (id >= 200 && id <= 232) {
				return 'thunder';
			}

			// Check if rain
			if (id >= 300 && id <= 531) {
				return 'rain';
			}

			// Check if snow
			if (id >= 600 && id <= 622) {
				return 'snow';
			}

			// Check if atmosphere
			if (id >= 701 && id <= 781) {
				return 'mist';
			}

			// Check if clouds
			if (id >= 801 && id <= 804) {
				return 'clouds';
			}

			return 'clear';
		}
	}
};
