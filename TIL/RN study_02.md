## 날씨 앱 만들기 #2

### 메인 페이지 UI 구성

개인적으로 찐한 민트가 너무 좋다.

유럽 여행 때 입으려고 산, 처음 입은지 하루만에 음식 묻어서 버린 민트 맨투맨이 생각난다 :(

<br>

- loading.js

```react
import React from 'react';
import Loading from './loading';

export default function App() {
  return <Loading />;
}
```

```react
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Loading() {
    return <View style={styles.container}>
        <Text style={styles.text}>Getting the nice weather</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        paddingVertical: 100,
        backgroundColor: '#3EB489'
    },
    text: {
        color: '#2C2C2C',
        fontSize: 30
    }
});
```

<br>

### Geolocation

앱 UI는 어느정도 완성했고, 실제로 위치 정보를 사용하자!

Facebook Github에서 검색하면 다 나온다.

`https://facebook.github.io/react-native/docs/geolocation`

<br>

생각보다 RN에서 자체적으로 제공하는 geolocation API는 강력하지 않아보인다. 더 어썸한 Expo의 Location SDK를 사용해보자.

`https://docs.expo.io/versions/v35.0.0/sdk/location/`

특정 위치에 들어오거나 나갈 때 앱에서 반응을 일으키는 API도 있다. 오.

<br>

> **Location.startGeofencingAsync (taskName, regions)**
>
> *taskName은 string, regions는 array로 전달받는다.*
>
> - *regions*
>   - *identifier (string)*
>   - *latitude (number)*
>   - *longitude (number)*
>   - *radius (number)*
>   - *notifyOnEnter (boolean)*
>   - *notifyOnExit (boolean)*
>
> <br>
>
> *리턴형은 Promise*

<br>

#### Location SDK 설치

`expo install expo-location`

(코딩)

<br>

Expo로 실행하면 아래와 같이 경고 메시지가 뜬다.

<br>

> *Warning*
>
> *Possible Unhandled Promise Rejection (id: 0):*
>
> *Error: LOCATION permission is required to do this operation.*
>
> *...*

<br>

아무래도 위치 정보도 개인정보이므로 함부로 데이터를 이용할 수 없도록 하기 위함인 것 같다.

permission이 없으므로 permission을 요청하자.

<br>

> **Location.requestPermissionsAsync ()**

<br>

```json
Object {
  "coords": Object {
    "accuracy": 5,
    "altitude": 0,
    "altitudeAccuracy": -1,
    "heading": -1,
    "latitude": 37.785834,
    "longitude": -122.406417,
    "speed": -1,
  },
  "timestamp": 1571553628399.0369,
}
```

<br>

<img width="306" alt="스크린샷 2019-10-20 오후 3 49 21" src="https://user-images.githubusercontent.com/12066892/67155830-39416b80-f351-11e9-9928-285946a177c9.png">

<br>

### API로 날씨 데이터 가져오기

#### OpenWeather

'https://openweathermap.org'

현재 날씨, 시간별 날씨, 16일 단위 날씨 등 여러 종류의 API를 제공하고 있다.

가입 후 API key를 발급받고 import하자.

```java
const API_KEY = '~~~';
```

<br>

#### API -> Current weather data -> By geographic coordinates

API URL에 위도, 경도를 넣고 엔터!

`http://api.openweathermap.org/data/2.5/weather?lat=37.785834&lon=-122.406417`

<br>

> {"cod":401, "message": "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."}

<br>

에러가 났다. URL에 API key도 같이 입력해줘야 한다.

`http://api.openweathermap.org/data/2.5/weather?lat=37.785834&lon=-122.406417&APPID={내APIKEY}`

정상적으로 데이터가 뜬다!

<br>

```json
{
  "coord": {
    "lon": -122.41,
    "lat": 37.79
  },
  "weather": [
    {
      "id": 801,
      "main": "Clouds",
      "description": "few clouds",
      "icon": "02n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 285.23,
    "pressure": 1019,
    "humidity": 87,
    "temp_min": 283.71,
    "temp_max": 287.04
  },
  "visibility": 16093,
  "wind": {
    "speed": 1.5,
    "deg": 300
  },
  "clouds": {
    "all": 20
  },
  "dt": 1571555767,
  "sys": {
    "type": 1,
    "id": 5817,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1571581353,
    "sunset": 1571621160
  },
  "timezone": -25200,
  "id": 5391959,
  "name": "San Francisco",
  "cod": 200
}
```

<br>

#### Axios 설치

데이터를 fetch하기 위해 Axios 모듈을 설치한다.

`npm install axios`

<br>

```react
getWeather = async (latitude, longitude) => {
  // axios 모듈 GET 방식으로 API를 통해 얻은 데이터 fetch
  const { data } = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
  );
  console.log(data);
}
```

