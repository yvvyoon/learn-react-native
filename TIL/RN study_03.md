## 날씨 앱 만들기 #3

### 온도 가져오기

#### 섭씨 vs 화씨

섭씨를 사용하려면 API URL에 ***&units=metric*** 추가하고, 화씨를 사용하려면 ***&units=imperial***을 추가한다.

IP 기준으로 현재 위치를 가져오자.

`https://ip-api.com`

```json
{
    "query": "223.62.188.135",
    "status": "success",
    "continent": "Asia",
    "continentCode": "AS",
    "country": "South Korea",
    "countryCode": "KR",
    "region": "11",
    "regionName": "Seoul",
    "city": "Seoul",
    "district": "",
    "zip": "02878",
    "lat": 37.5985,
    "lon": 126.9783,
    "timezone": "Asia/Seoul",
    "currency": "KRW",
    "isp": "SK Telecom",
    "org": "SKTelecom",
    "as": "AS9644 SK Telecom",
    "asname": "SKTELECOM-NET-AS",
    "mobile": true,
    "proxy": false
}
```

<br>

`Simulator - Debug - Location - Custom Location...`

위 경로로 들어가서 ***ip-api.com***에서 얻은 위도, 경도를 넣고 새로고침하면 잘 나온다.

```json
Object {
  "base": "stations",
  "clouds": Object {
    "all": 90,
  },
  "cod": 200,
  "coord": Object {
    "lat": 37.6,
    "lon": 126.98,
  },
  "dt": 1571998915,
  "id": 1835847,
  "main": Object {
    "humidity": 72,
    "pressure": 1018,
    "temp": 17.33,
    "temp_max": 18,
    "temp_min": 17,
  },
  "name": "Seoul-teukbyeolsi",
  "sys": Object {
    "country": "KR",
    "id": 5501,
    "sunrise": 1571953743,
    "sunset": 1571992989,
    "type": 1,
  },
  "timezone": 32400,
  "visibility": 10000,
  "weather": Array [
    Object {
      "description": "overcast clouds",
      "icon": "04n",
      "id": 804,
      "main": "Clouds",
    },
  ],
  "wind": Object {
    "deg": 240,
    "speed": 1,
  },
}
```

<br>

근데 강남구로 안 나오고, 서울특별시로만 나오지?

뭐 아무튼, 이제 날씨 아이콘을 넣자.

<br>

### PropTypes

컴포넌트의 prop의 값을 검증하기 위해 값을 지정할 수 있는 모듈이다.

<br>

> **$ yarn add prop-types**

<br>

```javascript
import PropTypes from 'prop-types';
```

<br>

### 날씨 이름 가져오기

openweathermap.org 하단의 

***Current weather data - Parameters of API response - List of condition codes***

로 들어가면 각 코드별 날씨 이름을 가져올 수 있다.

각 날씨 이름들을 배열로 저장하고 condition에 저장했다.

```js
Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    'Thunderstorm',
    'Drizzle',
    'Rain',
    'Snow',
    'Atmosphere',
    'Clear',
    'Clouds',
    'Haze',
    'Mist',
    'Dust',
  ]).isRequired,
};
```

<br>

최종적으로 App.js로 넘어와서 JSON 결과 데이터에서 condition, temp를 setState()로 상태를 저장하고 Weather 컴포넌트에 전달하여 화면에 출력해보자.

```jsx
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

		// isLoading이 true이면 <Loading />, false이면 <Weather /> 리턴
		return isLoading ? (
			<Loading />
		) : (
			<Weather temp={Math.round(temp)} condition={condition} />
		);
	}
}
```