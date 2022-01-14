import React from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "#common/colors";
import { getHeaderHeight } from "#nav/utils";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingRight: 20,
    zIndex: 1,
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.white,
  },
  titleText: {
    fontSize: 19,
    letterSpacing: -1,
    fontWeight: "300",
    color: "#333333",
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  buttonLeft: {
    width: 60,
    height: 29,
    borderRadius: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#577aea",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRight: {
    marginLeft: 5,
    width: 60,
    height: 29,
    borderRadius: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e85151",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextLeft: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: -0.9,
    textAlign: "center",
    color: "#577aea",
  },
  buttonTextRight: {
    fontSize: 12,
    letterSpacing: -0.9,
    color: "#e85151",
  },
});

export const usePageHeaderPadding = (headerHeight) => {
  const inset = useSafeAreaInsets();
  const height = headerHeight ?? getHeaderHeight() + inset.top;
  const padding = 65;
  const heightWithPadding = height + padding;

  return {
    inset: headerHeight ? { top: 0 } : inset,
    height,
    heightWithPadding,
    padding,
  };
};

export const PageHeader = ({
  children,
  scrollY,
  hasBackButton,
  headerHeight,
  hasReadButton,
}) => {
  const { inset, height, heightWithPadding, padding } =
    usePageHeaderPadding(headerHeight);
  const { width } = Dimensions.get("screen");

  const styleBackground = useAnimatedStyle(() => {
    "worklet";
    const v = scrollY.value / heightWithPadding;

    return {
      opacity: Math.min(Math.max(v, 0), 0.9),
    };
  }, [heightWithPadding]);

  const styleTitle = useAnimatedStyle(() => {
    "worklet";
    const ratio = scrollY.value / padding; // 스크롤 내릴때 - 올릴때 +
    const v1 = 1 + (1 - ratio) * 0.6; // 스크롤 내릴때 + 올릴때 - 다내렷을때 1.6
    const scale = Math.min(Math.max(v1, 1), 1.6); //위에 붙엇을때 1, 아래 붙엇을때 1.6

    // console.log('v1', v1);
    // console.log('scale', scale);

    return {
      transform: [
        { scale: scale },
        {
          translateX:
            ((width - 40 - (!hasBackButton ? 0 : 80)) * ((scale - 1) / 2)) /
            scale,
        },
        { translateY: 50 * (scale - 1) },
      ],
      // marginRight:40
    };
  }, [heightWithPadding, width]);

  const styleContents = useAnimatedStyle(() => {
    "worklet";
    const ratio = scrollY.value / padding; // 스크롤 내릴때 - 올릴때 +
    const v1 = 1 + (1 - ratio) * 0.6; // 스크롤 내릴때 + 올릴때 - 다내렷을때 1.6
    const scale = Math.min(Math.max(v1, 1), 1.6); //위에 붙엇을때 1, 아래 붙엇을때 1.6

    console.log(
      "margin",
      ((width - 25 - (!hasBackButton ? 0 : 80)) * (scale - 1)) / scale
    );
    return {
      marginRight:
        ((width - 25 - (!hasBackButton ? 0 : 80)) * (scale - 1)) / scale,
    };
  }, [heightWithPadding]);

  return (
    <View
      style={[
        styles.container,
        {
          height,
          paddingTop: inset.top,
          paddingLeft: !hasBackButton ? 20 : 40,
        },
      ]}
    >
      <Animated.View style={[styles.bg, styleBackground]} />
      <Animated.View
        style={[
          {
            height: height - inset.top,
            justifyContent: "center",
          },
          styleTitle,
        ]}
      >
        <Animated.View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
            styleContents,
          ]}
        >
          <Text style={styles.titleText}>{children}</Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.buttonLeft}>
              <Text style={styles.buttonTextLeft}>전체읽음</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRight}>
              <Text style={styles.buttonTextRight}>전체삭제</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default PageHeader;
