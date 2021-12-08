import React from "react";
import {
  Text,
  ScrollView,
  Image,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../../utils/color";
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
import assets from "../../../Assets";
import LoginInput from "../../components/LoginInput";
import Circle from "../../components/Circle";
import AsyncStorageManager, {
  AUTO_LOGIN,
} from "../../utils/AsyncStorageManager";
import CommonButton from "../../components/Button/CommonButton";

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

  const handleSubmit = () => {
    return;
  };

  return (
    <ScrollView style={style.loginWrapper}>
      <View
        style={{ flex: 1 }}
        // eslint-disable-next-line react-native/no-inline-style
        contentContainerStyle={{
          flexGrow: 1,
          // paddingBottom: inset.bottom,
        }}
      >
        <Image source={assets.logo_login} style={style.logo} />
        <View
          // eslint-disable-next-line react-native/no-inline-style
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
        <CommonButton backgroundColor={colors.WARM_PINK} onPress={handleSubmit}>
          로그인
        </CommonButton>
        <View style={style.helpWrapper}>
          <TouchableOpacity
            style={style.helpButton}
            onPress={() => navigation.navigate("AgreeCheck")}
          >
            <Text style={style.helpText}>회원가입</Text>
          </TouchableOpacity>
          <View style={style.helpButtonGap} />
          <TouchableOpacity
            style={style.helpButton}
            onPress={() => navigation.navigate("LandingHelpFindID")}
          >
            <Text style={[style.helpText]}>아이디찾기</Text>
          </TouchableOpacity>
          <View style={style.helpButtonGap} />
          <TouchableOpacity
            style={style.helpButton}
            onPress={() => navigation.navigate("LandingHelpFindPW")}
          >
            <Text style={style.helpText}>비밀번호찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.snsWrapper}>
        <View style={style.snsAdvWrapper}>
          <View style={style.snsGapLine} />
          <Text style={style.snsAdv}>
            혹은
            <Text
              style={{
                fontWeight: "500",
                color: colors.BLACK_5,
              }}
            >
              {" "}
              소셜아이디
            </Text>
            로 로그인
          </Text>
          <View style={style.snsGapLine} />
        </View>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 32,
          justifyContent: "center",
        }}
      >
        {Platform.OS === "ios" && (
          <TouchableOpacity
            style={style.snsSortWrapper}
            onPress={handleAppleLogin}
          >
            <Image source={Assets.apple} />
            <Text style={style.snsText}>애플</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            style.snsSortWrapper,
            { marginLeft: Platform.OS === "ios" ? 17 : 0, marginRight: 17 },
          ]}
          onPress={handleFacebookLogin}
        >
          <Image source={Assets.facebook} />
          <Text style={style.snsText}>페이스북</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.snsSortWrapper, { marginRight: 17 }]}
          onPress={handleKakapLogin}
        >
          <Image source={Assets.kakao} />
          <Text style={style.snsText}>카카오</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.snsSortWrapper}
          onPress={() => handleNaverLogin()}
        >
          <Image source={Assets.naver} />
          <Text style={style.snsText}>네이버</Text>
        </TouchableOpacity>
      </View> */}
      {/* <KeyboardSpace /> */}
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
  helpWrapper: {
    marginTop: 20,
    paddingBottom: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  helpButton: { paddingHorizontal: 10 },
  helpButtonGap: {
    width: 1,
    backgroundColor: colors.VERY_LIGHT_PINK_2,
    height: 10,
  },
  helpText: {
    fontWeight: "300",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.9,
    color: colors.BROWNISH_GREY,
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
