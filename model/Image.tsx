// 이미지 인식 

import React from "react";

import * as tf from "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';
import { fetch } from "@tensorflow/tfjs-react-native";
import * as jpeg from "jpeg-js";

import { Text, TextInput, View } from "react-native";
import { useState } from "react";

const Image = () => {
  const [url, setUrl] = useState('');
  const [displayText, setDisplayText] = useState('loading');

  const getPrediction = async (url: string) => {
    setDisplayText("Loading Tensor flow")
    await tf.ready();
    setDisplayText("Loading Mobile Net");
    const model = await mobilenet.load(); // 우리를 위해 반환하거나 우리가 할 수 있는 모델, 그런 다음 이미지를 분류하는 데 사용
    const response = await fetch(url, {}, {isBinary: true})
    const imageData = await response.arrayBuffer();
  };

  const imageToTensor = (rawData) => {

  };

  return (
    <View>
      <Text>Only works with jpeg Images</Text>
      <TextInput 
        style={{ height: 40, width: "90%", borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setUrl(text)}
        value={url}
      />
      <Image source={{ uri: url }}></Image>
    </View>
  )
};
export default Image;