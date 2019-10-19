import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.blueView} />
      <View style={styles.whiteView} />
      <View style={styles.redView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // 모든 공간이 사용가능하다는 의미
    flex: 1,
    // flexDirection은 자식 컴포넌트들의 가로 세로 배치를 결정하는데,
    // default는 column이고 세로로 배치함.
    // row로 설정하면 가로로 배치함.
    flexDirection: 'row'
  },
  blueView: {
    // 자식 컴포넌트들의 flex는 비율 개념인데,
    // 1과 3이면 1/4, 3/4로 레이아웃이 설정됨
    // 여기서는 blue가 화면의 3/4를 차지
    flex: 1,
    backgroundColor: 'blue',
  },
  whiteView: {
    flex: 1,
    backgroundColor: 'white',
  },
  redView: {
    flex: 1,
    backgroundColor: 'red',
  }
});
