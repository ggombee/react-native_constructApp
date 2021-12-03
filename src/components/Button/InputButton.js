import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../utils/color";

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 24,
    backgroundColor: "#454545",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 10,
  },
});

const InputButton = ({ text, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonWrapper,
        {
          backgroundColor: disabled
            ? colors.VERY_LIGHT_PINK_2
            : colors.DARK_GRAY,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default InputButton;
