import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {PNG_IMG} from '../../constants/ImagesName';
import {colors} from '../../styles/color';
import {globalStyles} from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton/CustomButton';
import PhoneIcon from '../../assets/svgs/Phone.Icon';
import GoogleSvg from '../../assets/svgs/GoogleSvg';
import FaceBookSvg from '../../assets/svgs/FaceBookSvg';
import {ScreenName} from '../../constants/ScreensNames';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';

const AuthScreen = ({navigation}: any) => {
  const Social_Logins = [
    {
      Icon: (
        <PhoneIcon width={scale(30)} height={scale(30)} fill={colors.white} />
      ),
      LoginTitle: 'Continue with phone number',
    },
    {
      Icon: <GoogleSvg width={scale(30)} height={scale(30)} />,
      LoginTitle: 'Continue with Google ',
    },
    {
      Icon: <FaceBookSvg width={scale(30)} height={scale(30)} />,
      LoginTitle: 'Continue with Facebook ',
    },
  ];

  const handleLogin = () => {
    navigation.navigate(ScreenName.LOGIN_SCREEN);
  };
  const handleSignUpEmail = () => {
    navigation.navigate(ScreenName.EMAIL_SIGN_UP_SCREEN);
  };

  return (
    <SafeAreaView style={[globalStyles.globalContainer]}>
      <CustomBackButton navigation={navigation} />

      <View style={styles.container}>
        <View style={{alignItems: 'center', marginBottom: scale(40)}}>
          <View style={styles.iconContainer}>
            <Image source={PNG_IMG.APP_LOGO_WEBP} style={styles.img} />
          </View>
          <View style={styles.textContainer}>
            <ResponsiveText
              title="Sign up to explore"
              fontColor={colors.white}
              fontWeight="bold"
              fontSize={26}
            />
            <ResponsiveText
              title="Naats & Qawwalis"
              fontColor={colors.white}
              fontWeight="bold"
              fontSize={26}
            />
          </View>
        </View>

        <View style={styles.buttonStyleContainer}>
          <CustomButton
            onPress={handleSignUpEmail}
            title="Continue with email"
            titleStyle={styles.buttonTitleStyle}
            buttonStyle={styles.buttonStyle}
            disabled={false}
            loading={false}
          />
          <View style={{marginTop: verticalScale(10)}}>
            {Social_Logins.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                style={styles.socialButton}>
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
        </View>

        <TouchableOpacity
          style={{marginTop: scale(20)}}
          activeOpacity={0.8}
          onPress={handleLogin}>
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
    height: scale(150),
    width: scale(150),
    resizeMode: 'center',
    borderRadius: scale(80),
  },
  buttonStyleContainer: {
    alignItems: 'center',
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

export default AuthScreen;
