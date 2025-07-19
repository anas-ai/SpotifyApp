import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton/CustomButton';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {PNG_IMG} from '../../constants/ImagesName';
import {ScreenName} from '../../constants/ScreensNames';
import {colors} from '../../styles/color';
import {globalStyles} from '../../styles/globalStyles';
import DeewanaSoundSvg from '../../assets/svgs/DeewanaSoundlog';

const SingUpScreen = ({navigation}: any) => {
  const handleSignUp = () => {
    navigation.navigate(ScreenName.AUTH_SCREEN);
  };
  const handleLogin = () => {
    navigation.navigate(ScreenName.LOGIN_SCREEN);
  };

  return (
    <SafeAreaView style={[globalStyles.globalContainer, styles.container]}>
      <View style={{alignItems: 'center', marginBottom: scale(40)}}>
        <View style={styles.iconContainer}>
          <Image source={PNG_IMG.APP_LOGO_WEBP} style={styles.img} />
        </View>
        <View style={styles.textContainer}>
          <ResponsiveText
            title="Spiritual Naats & Soulful Qawwalis."
            fontColor={colors.white}
            fontWeight="bold"
            fontSize={24}
            fontStyle={{textAlign: 'center'}}
          />
          <ResponsiveText
            title="Only on Deewana Sound."
            fontColor={colors.white}
            fontWeight="bold"
            fontSize={24}
            fontStyle={{textAlign: 'center',width:'80%',marginTop:scale(20)}}
          />
        </View>
      </View>

      <View style={styles.buttonStyleContainer}>
        <CustomButton
          onPress={handleSignUp}
          title="Sign Up free"
          titleStyle={styles.buttonTitleStyle}
          buttonStyle={styles.buttonStyle}
          disabled={false}
          loading={false}
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            marginTop: scale(10),
            borderRadius: scale(20),
            borderWidth: 1,
            width: scale(270),
            alignItems: 'center',
            paddingVertical: verticalScale(8),
            borderColor: colors.borderGrey,
          }}
          activeOpacity={0.8}>
          <ResponsiveText
            title="Log in"
            fontColor={colors.white}
            fontWeight="600"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignSelf: 'center',
  },
  img: {
    height: scale(150),
    width: scale(150),
    borderRadius: scale(100),
  },
  buttonStyleContainer: {
    alignItems: 'center',
    marginTop: scale(30),
    position: 'absolute',
    bottom: scale(40),
  },
  buttonTitleStyle: {
    color: colors.black,
    width: scale(250),
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  buttonStyle: {
    borderRadius: moderateScale(20),
  },
  socialButton: {
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: colors.borderGrey,
    paddingHorizontal: scale(10),
    height: 50,
    marginTop: verticalScale(8),
    justifyContent: 'center',
    width: scale(270),
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});

export default SingUpScreen;

