import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import colors from "../utils/color";
import assets from "../../Assets";
import StyleButton from "../components/Button/StyleButton";
import InputButton from "../components/Button/InputButton";

const styles = StyleSheet.create({
  inputWrapper: {
    paddingLeft: 16,
    paddingTop: 13,
    paddingBottom: 8,
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: colors.VERY_LIGHT_PINK,
    backgroundColor: colors.WHITE,
  },
  guideText: {
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: -0.5,
    color: colors.BROWNISH_GREY,
  },
  textInput: {
    paddingStart: 0,
    padding: 0,
    lineHeight: 20,
    fontSize: 14,
    marginTop: 6,
    flex: 1,
    flexDirection: "row",
    color: colors.BLACK_5,
    letterSpacing: -1.05,
  },
  contentText: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 15,
  },
  alertText: {
    fontSize: 10,
    lineHeight: 11,
    letterSpacing: -0.75,
    color: colors.WARM_PINK,
    paddingTop: 10,
  },
});

const LoginInput = ({
  placeholder,
  guideText,
  borderTopRadius,
  borderBottomRadius,
  alertText,
  button,
  onChangeText,
  maxLength,
  secureTextEntry,
  value,
  onPress,
  password,
  count,
  invalid,
  buttonDisable,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <View
      style={
        focus
          ? [
              styles.inputWrapper,
              {
                borderColor: colors.BLACK_5,
                borderTopRightRadius: borderTopRadius,
                borderTopLeftRadius: borderTopRadius,
                borderBottomRightRadius: borderBottomRadius,
                borderBottomLeftRadius: borderBottomRadius,
              },
            ]
          : [
              styles.inputWrapper,
              {
                borderTopRightRadius: borderTopRadius,
                borderTopLeftRadius: borderTopRadius,
                borderBottomRightRadius: borderBottomRadius,
                borderBottomLeftRadius: borderBottomRadius,
              },
            ]
      }
    >
      <Text style={styles.guideText}>{guideText}</Text>
      <View style={{ flexDirection: "row", paddingRight: 15 }}>
        <TextInput
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={styles.textInput}
          value={value}
          placeholder={`${placeholder}`}
          placeholderTextColor={colors.BROWN_GREY_1}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry ? true : false}
          maxLength={maxLength}
          autoCapitalize={"none"}
        />
        {button ? (
          <InputButton
            text={button}
            onPress={onPress}
            disabled={buttonDisable}
          />
        ) : null}
        {count}
      </View>

      {alertText ? alertText : null}
    </View>
  );
};

export default LoginInput;
