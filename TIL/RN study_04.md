## 날씨 앱 만들기 #4

### 아이콘 사용하기

`https://docs.expo.io/versions/v35.0.0/guides/icons/`

위 링크에서 ***@expo/vector-icons directory***로 들어가면 각 그룹(?)별 아이콘을 모두 볼 수 있다.

검색창에서 내가 원하는 아이콘을 고르고 그룹을 선택한 다음에 import하면 사용할 수 있다.

```jsx
import { MaterialCommunityIcons } from '@expo/vector-icons';

<MaterialCommunityIcons
  size={100}
  // 해당 condition이 정의되지 않았을 때
  // default 아이콘 설정해주기
  name={
    weatherOptions[condition].iconName || 'weather-sunset'
  }
  color="white"
  ></MaterialCommunityIcons>
```

<br>

### Background에 그라데이션 넣기

#### LinearGradient

`https://docs.expo.io/versions/v35.0.0/sdk/linear-gradient/`

```jsx
import { LinearGradient } from 'expo-linear-gradient';

const weatherOptions = {
	Haze: {
		iconName: 'weather-fog',
		gradient: ['#5c258d', '#4389a2'],
		title: '',
		subtitle: '',
	},
	Thunderstorm: {
		iconName: 'weather-lightning',
		gradient: ['#ff8008', '#ffc837'],
		title: '천둥번개',
		subtitle: '자동차가 제일 안전해요!',
	},
	Drizzle: {
		iconName: 'weather-lightning-rainy',
		gradient: ['#4DA0B0', '#D39D38'],
		title: '',
		subtitle: '',
	},
	Rain: {
		iconName: 'weather-lightning-rainy',
		gradient: ['#304352', '#d7d2cc'],
		title: '',
		subtitle: '',
	},
	Snow: {
		iconName: 'snowflake',
		gradient: ['#eef2f3', '#8e9eab'],
		title: '눈',
		subtitle: '썰매타러 가장',
	},
	Atmosphere: {
		iconName: 'weather-hail',
		gradient: ['#FF5F6D', '#FFC371'],
		title: '',
		subtitle: '',
	},
	Clear: {
		iconName: 'white-balance-sunny',
		gradient: ['#4CA1AF', '#C4E0E5'],
		title: '맑음',
		subtitle: '한강 맥주 가즈아!',
	},
	Mist: {
		iconName: 'weather-fog',
		gradient: ['#bbd2c5', '#536976'],
		title: '',
		subtitle: '',
	},
	Dust: {
		iconName: 'weather-fog',
		gradient: ['#e7e9bb', '#403b4a'],
		title: '미세먼지',
		subtitle: '마스크 챙겨요!',
	},
};
```

<br>

LinearGradient는 colors 옵션이 없으면 에러나니까 주의하자!

`https://uigradients.com/#Politics`

위 링크에서 여러 그라데이션을 선택할 수 있다.

<br>

### 끄으으으읏!

