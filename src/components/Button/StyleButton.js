import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../utils/color";

const styles = StyleSheet.create({
  button: {
    borderRadius: 12.6,
    height: 26,
    backgroundColor: colors.WARM_PINK,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    letterSpacing: -0.6,
  },
});

const StyleButton = ({
  text,
  backgroundColor,
  color,
  paddingLeft,
  paddingRight,
  height,
  fontSize,
  shadowOffset,
  shadowOpacity,
  shadowColor,
  shadowRadius,
  onPress,
  containerStyle,
  style,
  fontFamily,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor,
          height: height,
          shadowOffset,
          shadowOpacity,
          shadowColor,
          shadowRadius,
        },
        containerStyle,
      ]}
      disabled={onPress ? false : true}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          {
            color: color,
            paddingLeft,
            paddingRight,
            fontSize: fontSize,
            fontFamily,
          },
          style,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default StyleButton;
