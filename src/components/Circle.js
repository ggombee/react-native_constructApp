import React from 'react';
import {View, Image} from 'react-native';

const Circle = ({
  children,
  width,
  height,
  marginTop,
  backgroundColor,
  img,
  marginLeft,
  opacity,
}) => {
  return (
    <View
      style={{
        opacity,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        borderRadius: 100,
        marginTop,
        marginLeft,
      }}>
      {img ? <Image source={img} /> : null}
      {children}
    </View>
  );
};

export default Circle;
