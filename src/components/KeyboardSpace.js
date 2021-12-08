import React, { useState } from "react";
import { Animated } from "react-native";

const KeyboardSpace = React.memo(
  ({ onKeyboardShow, onKeyboardHide, paddingBottom, style }) => {
    const animated = useRef();
    const keyboardHeight = useRef(new Animated.Value(0));
    const [show, setShow] = useState();

    const keyboardWillShow = (event) => {
      onKeyboardShow && onKeyboardShow(false);
      setShow(true);
      if (animated.current) {
        animated.current.stop();
        animated.current = null;
      }

      animated.current = Animated.parallel([
        Animated.timing(keyboardHeight.current, {
          duration: event.duration,
          toValue: event.endCoordinates.height,
          useNativeDriver: false,
        }),
      ]);
      animated.current.start();
    };

    const keyboardWillHide = (event) => {
      onKeyboardHide && onKeyboardHide(false);

      if (animated.current) {
        animated.current.stop();
        animated.current = null;
      }

      animated.current = Animated.parallel([
        Animated.timing(keyboardHeight.current, {
          duration: event.duration,
          toValue: paddingBottom ? paddingBottom : 0,
          useNativeDriver: false,
        }),
      ]);
      animated.current.start();
    };

    const keyboardDidShow = (event) => {
      onKeyboardShow && onKeyboardShow(true);
      setShow(true);
    };

    const keyboardDidHide = (event) => {
      onKeyboardHide && onKeyboardHide(true);
      setShow(false);
    };

    useEffect(() => {
      const keyboardWillShowSub = Keyboard.addListener(
        "keyboardWillShow",
        keyboardWillShow
      );
      const keyboardWillHideSub = Keyboard.addListener(
        "keyboardWillHide",
        keyboardWillHide
      );
      const keyboardDidShowSub = Keyboard.addListener(
        "keyboardDidShow",
        keyboardDidShow
      );
      const keyboardDidHideSub = Keyboard.addListener(
        "keyboardDidHide",
        keyboardDidHide
      );

      return () => {
        keyboardWillShowSub.remove();
        keyboardWillHideSub.remove();
        keyboardDidShowSub.remove();
        keyboardDidHideSub.remove();
      };
    }, []);

    const inset = useSafeArea();

    if (Platform.OS === "android") {
      return null;
    }
    return (
      <Animated.View style={[{ minHeight: keyboardHeight.current }, style]}>
        <View style={{ height: inset.bottom }} />
      </Animated.View>
    );
  }
);

export default KeyboardSpace;
