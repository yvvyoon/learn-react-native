import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import Weather from './Weather';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = '00d697c5fe1c098a9832ae421bc90989';

export default class extends React.Component {
	state = {
		isLoading: true,
	};

	getWeather = async (latitude, longitude) => {
		// axios 모듈 GET 방식으로 API를 통해 얻은 데이터 fetch
		const {
			data: {
        main: { temp },
        weather
			},
		} = await axios.get(
			`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`,
		);

		this.setState({
			isLoading: false,
			condition: weather[0].main,
			// ES6 문법으로
			temp,
		});
	};

	getLocation = async () => {
		try {
			await Location.requestPermissionsAsync();
			// const response = await Location.requestPermissionsAsync();
			// permission에 대해서는 undefined
			// console.log(response);

			const {
				coords: { latitude, longitude },
			} = await Location.getCurrentPositionAsync();
			// console.log(coords.latitude, coords.longitude);
			this.getWeather(latitude, longitude);

			// 에러 던지기
			// throw Error();
		} catch (error) {
			Alert.alert('위치를 알 수 없습니다.', '힝');
		}
	};

	componentDidMount() {
		this.getLocation();
	}

	render() {
		const { isLoading, temp, condition } = this.state;

		// isLoading이 true이면 <Loading />, false이면 null 리턴
		return isLoading ? (
			<Loading />
		) : (
			<Weather temp={Math.round(temp)} condition={condition} />
		);
	}
}
