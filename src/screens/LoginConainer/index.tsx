import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { PNG_IMG } from '../../constants/ImagesName';
import { colors } from '../../styles/color';
import { globalStyles } from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton/CustomButton';
import PhoneIcon from '../../assets/svgs/Phone.Icon';
import GoogleSvg from '../../assets/svgs/GoogleSvg';
import FaceBookSvg from '../../assets/svgs/FaceBookSvg';
import { ScreenName } from '../../constants/ScreensNames';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';

const LoginScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = (screenNavigation: string | undefined) => {
    if (!screenNavigation) return; // Prevent navigation errors
  
    if (screenNavigation === ScreenName.HOME_SCREEN_IN_AUTH || ScreenName.LOG_WITH_NUMBER) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate(screenNavigation);
      }, 2000);
    } else {
      navigation.navigate(screenNavigation);
    }
  };
  

  const Social_Logins = [
    {
      Icon: <PhoneIcon width={scale(30)} height={scale(30)} fill={colors.white} />,
      LoginTitle: 'Continue with phone number',
      screenNavigation: ScreenName.LOG_WITH_NUMBER,
    },
    {
      Icon: <GoogleSvg width={scale(30)} height={scale(30)} />,
      LoginTitle: 'Continue with Google ',
      screenNavigation: ScreenName.HOME_SCREEN_IN_AUTH, // Ensure this is defined
    },
    {
      Icon: <FaceBookSvg width={scale(30)} height={scale(30)} />,
      LoginTitle: 'Continue with Facebook ',
      screenNavigation: undefined, // No navigation for now
    },
  ];

  return (
    <SafeAreaView style={[globalStyles.globalContainer]}>
      <CustomBackButton navigation={navigation} />

      <View style={styles.container}>
        <View style={{ alignItems: 'center', marginBottom: scale(40) }}>
          <View style={styles.iconContainer}>
            <Image source={PNG_IMG.SPOTIFY_ICON} style={styles.img} />
          </View>
          <View style={styles.textContainer}>
            <ResponsiveText
              title="Log in to Spotify"
              fontColor={colors.white}
              fontWeight="bold"
              fontSize={28}
            />
          </View>
        </View>

        <View style={styles.buttonStyleContainer}>
          <CustomButton
            onPress={() => navigation.navigate(ScreenName.CONTINUE_WITH_EMAIL_LOGIN)}
            title="Continue with email"
            titleStyle={styles.buttonTitleStyle}
            buttonStyle={styles.buttonStyle}
            disabled={false}
            loading={false}
          />
          <View style={{ marginTop: verticalScale(10) }}>
            {Social_Logins.map((item, index) => (
              <TouchableOpacity
                onPress={() => handleSocialLogin(item?.screenNavigation)}
                activeOpacity={0.8}
                key={index}
                style={styles.socialButton}
                disabled={loading}
              >
                <View style={styles.socialButtonContent}>
                  {item.Icon}
                  <ResponsiveText
                    title={item.LoginTitle}
                    fontColor={colors.white}
                    fontWeight="bold"
                    fontSize={15}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {loading && <ActivityIndicator size="large" color={colors.ButtonColor} style={{ marginTop: 20 }} />}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  img: {
    height: scale(70),
    width: scale(80),
    resizeMode: 'contain',
  },
  buttonStyleContainer: {
    alignItems: 'center',
    marginTop: scale(30),
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

export default LoginScreen;
