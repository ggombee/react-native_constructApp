import React from "react";
import {
  Text,
  ScrollView,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StyleSheet } from "react-native";
import colors from "../../utils/color";
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
import assets from "../../../Assets";
import LoginInput from "../../components/LoginInput";
import Circle from "../../components/Circle";
import AsyncStorageManager, {
  AUTO_LOGIN,
} from "../../utils/AsyncStorageManager";

const Auth = () => {
  //   const inset = useSafeAreaInsets();
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    initAutoLogin();
  }, []);

  const initAutoLogin = async () => {
    const result = await AsyncStorageManager.getItem(AUTO_LOGIN);
    if (result === null) {
      AsyncStorageManager.setItem(AUTO_LOGIN, JSON.stringify(false));
      setChecked(false);
    } else {
      setChecked(JSON.parse(result));
    }
  };

  // Save Async Storage
  const setAutoLogin = async () => {
    AsyncStorageManager.setItem(AUTO_LOGIN, JSON.stringify(!checked))
      .then(() => {
        setChecked(!checked);
      })
      .catch((error) => {
        console.log(error);
        // 변경 오류
      });
  };

  return (
    <ScrollView style={style.loginWrapper}>
      <View
        style={{ flex: 1 }}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          flexGrow: 1,
          // paddingBottom: inset.bottom,
        }}
      >
        <Image source={assets.logo_login} style={style.logo} />
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            borderColor: colors.VERY_LIGHT_PINK,
            borderWidth: 0.5,
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <LoginInput
            placeholder={"아이디를 입력하세요"}
            guideText={"아이디"}
            borderTopRadius={10}
            value={id}
            onChangeText={setId}
          />
          <LoginInput
            placeholder={"비밀번호를 입력하세요"}
            guideText={"비밀번호"}
            borderBottomRadius={10}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={style.checkBox} onPress={setAutoLogin}>
          <Circle
            width={20}
            height={20}
            img={assets.check_small_white}
            backgroundColor={
              checked ? colors.WARM_PINK : colors.VERY_LIGHT_PINK
            }
          />
          <Text style={style.checkBoxText}>로그인유지</Text>
        </TouchableOpacity>
      </View>
      <View style={style.snsWrapper}>
        <View style={style.snsAdvWrapper}>
          <View style={style.snsGapLine}>
            <Text style={{ fontWeight: "500", color: colors.BLACK_5 }}>
              혹은
              <Text>
                {`  `}
                소셜아이디
              </Text>
              로 로그인
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Auth;

const style = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    paddingLeft: 25,
    paddingRight: 25,
  },
  logo: {
    marginTop: 60,
    marginBottom: 51,
    width: 189,
    height: 88,
  },
  checkBox: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 33,
  },
  checkBoxIcon: {
    position: "absolute",
    top: 7,
    left: 5,
  },
  checkBoxText: {
    letterSpacing: -0.7,
    color: colors.BLACK_5,
    marginLeft: 6,
  },
  snsWrapper: {
    justifyContent: "center",
    alignContent: "center",
  },
  snsSortWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  snsText: {
    marginTop: 6,
    fontSize: 11,
    letterSpacing: -0.82,
    color: colors.BROWN_GREY_1,
  },
  snsAdvWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  snsAdv: {
    paddingHorizontal: 20,
    color: colors.BROWN_GREY_1,
    fontSize: 12,
    lineHeight: 16,
  },
  snsGapLine: { flex: 1, backgroundColor: colors.VERY_LIGHT_PINK, height: 1 },
});
