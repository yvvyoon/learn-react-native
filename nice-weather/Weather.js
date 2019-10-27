import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// 각 날씨에 대해 이름과 배경색상, 텍스트 설정
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

export default function Weather({ temp, condition }) {
	return (
		// LinearGradient도 View의 일종임
		<LinearGradient
			colors={weatherOptions[condition].gradient}
			style={styles.container}
		>
			{/* StatusBar는 폰 상단 텍스트 */}
			<StatusBar barStyle="light-content"></StatusBar>
			<View style={styles.halfContainer}>
				<MaterialCommunityIcons
					size={100}
					// 해당 condition이 정의되지 않았을 때
					// default 아이콘 설정해주기
					name={
						weatherOptions[condition].iconName || 'weather-sunset'
					}
					color="white"
				></MaterialCommunityIcons>
				<Text style={styles.temp}>{temp}º</Text>
			</View>

			{/* ...을 이용하여 해당 스타일 객체의 모든 옵션에 접근*/}
			<View style={{ ...styles.halfContainer, ...styles.textContainer }}>
				<Text style={styles.title}>
					{weatherOptions[condition].title}
				</Text>
				<Text style={styles.subtitle}>
					{weatherOptions[condition].subtitle}
				</Text>
			</View>
		</LinearGradient>
	);
}

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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	temp: {
		fontSize: 42,
		color: 'white',
	},
	halfContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		color: 'white',
		fontSize: 44,
		fontWeight: '300',
		marginBottom: 10,
	},
	subtitle: {
		fontWeight: '600',
		color: 'white',
		fontSize: 24,
	},
	textContainer: {
		alignItems: 'flex-start',
		paddingHorizontal: 20,
	},
});
