import React from 'react';
import { Alert } from 'react-native';
import Loading from './loading';
import * as Location from 'expo-location';
import axios from 'axios';
import { } from 'dotenv/config';

const API_KEY = process.env.API_KEY;

export default class extends React.Component {
  state = {
    isLoading: true
  };

  getWeather = async (latitude, longitude) => {
    // axios 모듈 GET 방식으로 API를 통해 얻은 데이터 fetch
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
    );
    console.log(data);
  }

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      // const response = await Location.requestPermissionsAsync();
      // permission에 대해서는 undefined
      // console.log(response);

      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      // console.log(coords.latitude, coords.longitude);
      this.getWeather(latitude, longitude);
      this.setState({ isLoading: true });

      // 에러 던지기 
      // throw Error();
    }
    catch (error) {
      Alert.alert('위치를 알 수 없습니다.', '힝');
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading } = this.state;

    // isLoading이 true이면 <Loading />, false이면 null 리턴
    return isLoading ? <Loading /> : null;
  }
}