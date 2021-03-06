# React Native

그 동안 페어 프로젝트와 최종 프로젝트에서 각각 백엔드, 블록체인 파트를 맡으며 나름 산전수전을 겪고 많은 것을 배웠다. 

이제 해피해킹 최종 해커톤과 제주 블록체인 해커톤만이 남았는데 이번 기회에 제대로 다뤄보지 않은 프론트엔드단을 도전해보고 싶었다. 

우리 프로젝트의 End User들은 모바일앱을 사용하게 될 것이므로 iOS와 안드로이드 동시 개발이 가능한 React Native를 사용하기로 결정됐다. 

학원에서 React 배울 때 왜 쓰는지 도저히 이해가 가지 않는 기능들도 있어 상당히 어려웠지만 그 때의 기억을 되살려 앱을 만들어보고자 한다.

시작해봅시다.

<br>

## 날씨 앱 만들기 #1

### Expo

Expo는 Xcode의 시뮬레이터로 테스트하지 않고, iOS에서 바로 앱을 테스트할 수 있도록 해주는 클라이언트 소프트웨어이다.

create-react-app처럼 react native에 필요한 설정 파일들이 없다는 것이 장점이다.

Expo와 별개로 React Native Cli로도 개발이 가능한데, 이는 UIcli 방식이므로 네이티브 파일들에 대한 접근이 용이하다.

Xcode로 개발하려면 개발자 계정(유료...)이 필요한데, Expo는 그럴 필요가 전-혀 없다.

그럼 이제 설치해보자.

<br>

> **$ sudo npm install -g expo-cli**
>
> *\+ expo-cli@3.4.1*
> *added 1381 packages from 761 contributors in 73.793s*

<br>

자 이제 프로젝트를 시작해보자. 먼저 디렉토리를 만들고 expo를 init 하자.

맨땅에서 시작할 거니까 default로 설정하고 앱 이름도 설정해주고 엔터-엔터.

다 설치하고 npm start/expo start를 하면 브라우저에 페이지가 뜨고 본격적으로 프로젝트 개발이 시작된다.

- *뜨는 페이지 왼쪽 하단에서 QR 코드를 확인할 수 있는데 안드로이드 환경에서 앱에 접근하기 위함이다. iOS에서는 Expo에서 로그인만 하면 다~ 됨.*

<br>

> **$ expo init nice-weather**
>
> *Nice Weather App*
>
> **$ npm start**

<br>

Expo 브라우저에서 Run on iOS Simulator로 시뮬레이터를 띄울 수 있고, iOS에서 Expo를 통해 앱을 바로 테스트할 수 있다. 단, 동일한 네트워크 대역을 사용해야 연결돼!

시뮬레이터 또는 iOS를 통해 내 프로젝트 앱을 실행하면 잠깐의 스플래쉬 이미지 등장과 함께 App.js 파일의 내용을 읽어서 화면에 띄워준다.

Text 태그의 내용을 수정하고 저장하면 실시간으로 시뮬레이터 또는 iOS에서도 동일하게 변경된다.

신기하다. Live Reload.

<br>

> *command + R : 수동 새로고침*
>
> *command + D : 개발자 메뉴 (디바이스 해상도 설정 가능)*

<br>

> **$ yarn ios**
>
> **$ npm run ios**
>
> *-> 시뮬레이터로 프로젝트를 실행하라는 커맨드*

<br>

### React Native 작동 방식

iOS, 안드로이드 둘 다 자바스크립트 네이티브 엔진을 내장하고 있다.

RN은 내가 개발한 자바스크립트 코드를 네이티브 엔진에게 보내서 자바스크립트와 iOS, 안드로이드와의 브릿지 역할을 수행하는 아이이다.

그러나, 항상 브릿지가 필요하다는 것이 오히려 단점이 될 수도 있다. 중간에서 통신을 해줘야 하므로 많은 양의 데이터를 만질 땐 벅차다. 단순 컨텐츠는 몰라도 게임 같은 무거운 앱은 적절하지 않아!

RN에서는 div, span 태그를 쓰지 않고 View, Text를 사용하고, 기본 화면에서 배경색을 yellow로 바꿔봤다.

```react
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
```

<br>

App.js를 수정하다 보면 에러가 자주 뜰텐데 네이티브라서 그렇다고 한다... expo를 내렸다가 다시 올리면 되긴 된다 :(

<br>

### React Native 레이아웃 규칙

flex 박스와 flexDirection에 대해서 알아보자.

```react
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.yellowView} />
      <View style={styles.blueView} />
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
    // flexDirection: "row"
  },
  yellowView: {
    // 자식 컴포넌트들의 flex는 비율 개념인데,
    // 1과 3이면 1/4, 3/4로 레이아웃이 설정됨
    // 여기서는 blue가 화면의 3/4를 차지
    flex: 1,
    backgroundColor: 'yellow',
  },
  blueView: {
    flex: 3,
    backgroundColor: 'blue',
  }
});
```

<br>

![IMG_8382](https://user-images.githubusercontent.com/12066892/67141060-e4dbb480-f29a-11e9-8e01-93d24334c24d.PNG)

