import { Image, Linking, SafeAreaView, StyleSheet, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';
import CustomButton from '../../components/CustomButton/CustomButton';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import { PNG_IMG } from '../../constants/ImagesName';
import { colors } from '../../styles/color';
import { globalStyles } from '../../styles/globalStyles';

const CheckYourEmailScreen = ({navigation}: any) => {
    const handleOpenEmailApp =()=>{
        Linking.openURL('mailto:anasrizvi4206@gmail.com')
    }
  return (
    <SafeAreaView style={globalStyles.globalContainer}>
      <CustomBackButton title="Check your email" navigation={navigation} />
      <View style={styles.titileStyle}>
        <ResponsiveText
          title="We sent you an email with a link that will log you in at"
          fontSize={14}
          fontColor={colors.white}
          fontWeight='500'
        />

        <ResponsiveText
          title="anasrizvi4206@gmail.com"
          fontSize={14}
          fontColor={colors.white}
          fontWeight='500'

        />
      </View>
      <View style={styles.imgContainer}>
        <Image source={PNG_IMG.EMAILCHECK_ICON} style={styles.img} />
      </View>
      <View style={{alignItems: 'center',marginVertical:verticalScale(30)}}>
        <CustomButton
        onPress={handleOpenEmailApp}
          title="Open Email app"
          titleStyle={{
            color: 'black',
            fontSize: moderateScale(16),
            fontWeight: '700',
          }}
          buttonStyle={{
            borderRadius: scale(50),
            width: scale(180),
            backgroundColor: colors.white,
          }}
          loading={false}
          disabled={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titileStyle: {
    marginTop: scale(16),
    alignItems: 'center',
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(50),
  },
  img: {
    height: scale(150),
    width: scale(150),
  },
});

export default CheckYourEmailScreen;
