import AppLoading from "expo-app-loading";
import React, { useState } from "react";

import * as Font from "expo-font";
import { Image, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";

import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";

import { WebView } from 'react-native-webview';
import Root from "./navigation/Root";

import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";

const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      // 외부에서 가져오는 이미지
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  // * hook을 이용한 assets, fonts 불러오는 방법 (preload의 역할만 필요 시, 유용)
  // * loading 함수에서 다른 작업을 못하는 단점 존재
  // const [assets] = useAssets([require("./som.png")]);
  // const [loaded] = Font.useFonts(Ionicons.font);

  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);

  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]); // promise들의 배열
    const images = loadImages([
      require("./som.png"),
      "https://reactnative.dev/img/oss_logo.png",
    ]);

    await Promise.all([...fonts, ...images]); // promise.all > promise들이 끝날 때 까지 기다린다
  };

  const isDark = useColorScheme() === 'dark';

  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading} // 이 함수가 종료되면 onFinish 함수 호출
        onFinish={onFinish} // 로딩이 끝나면 호출되는 함수
        onError={console.error}
      />
      // <WebView
      //   source={{uri: 'https://fresh-walrus-11.loca.lt'}}
      //   style={{marginTop: 20}}
      // />
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}