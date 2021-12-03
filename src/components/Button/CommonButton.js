import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import colors from '#common/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WARM_PINK,
  },
  container_round: {
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  container_disabled: {
    backgroundColor: colors.VERY_LIGHT_PINK_2,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});

const CommonButton = ({
  children,
  fit,
  disabled,
  onPress,
  modal,
  style = {},
}) => {
  const inset = useSafeAreaInsets();

  const boxStyles = [styles.container, style]; //boxStyles에 styles.container배열에 style객체를 넣음.
  const textStyles = [styles.text, style]; //textStyles 에 styles.text객체를 넣음
  let bottomPadding = inset.bottom; // bottomPadding에 각 기기별로 bottomPadding을 넣을수있게함.
  if (!fit) {
    //fit 이라는 props가 없다면?
    boxStyles.push(styles.container_round); // boxStyles에 styles.container_round를 넣는다.
    // 그런데 Push한건 알겠는데.. 그럼 배열이 2개가 되는건데 왜 이렇게한걸까?
    // 마지막이 읽히긴할텐데 그럼 어쨋든 2개가 겹쳐있어서 좋진않을것같은데 질문이 필요하다
    bottomPadding = 0; //fit이라는 속성이 오지않을때 바닥에 딱 inset.bottom 패딩을 초기화시켜준다.
  }

  if (disabled) {
    boxStyles.push(styles.container_disabled); //disalbe props를 받는다면 container_disabled속성을 넣는다.
  }

  if (modal && Platform.OS === 'android') {
    bottomPadding = 0;
  }

  const [pending, setPending] = useState(); // 비동기..? 를 관리하기 위해 useState를 설정하고
  const handlePress = () => {
    const r = onPress?.(); //이건 사실 이해가 가지않는다. onPress?.(); ?? 이게뭐람..
    if (r instanceof Promise) {
      // 만약 r의 타입이 Promisef라면? 이건 연구가 필요하다. instanceof에 대해서 검색 ㄲ
      setPending(true); // Promise라면 pending상태를 true로 만들어준다.
      r.catch(() => {}).then(() => {
        // 이게 도대체뭐지.. 대충 pending이 끝나면
        setPending(false); //여기서 pending상태를 false로 만들어주는것같은데.. promise에 대해 정확하게 파악 필요
      });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85} // TouchableOpacity 의 번쩍 강도를 낮춰주는것같다
      style={[boxStyles, {paddingBottom: bottomPadding}]} // boxStyle을 위에서 관리해주었다.
      disabled={disabled || pending} //만약 pending상태거나 disabled상태라면 disabled를 한다.
      onPress={handlePress}>
      <View style={styles.wrapper}>
        <Text style={textStyles}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommonButton;
