import { useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { scale, verticalScale } from 'react-native-size-matters';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import { colors } from '../../styles/color';
import { globalStyles } from '../../styles/globalStyles';

const LoginWithNumber = ({navigation}: any) => {
  const phoneInput = useRef(null);
  const [country, setCountry] = useState<any>({cca2: 'US', callingCode: '1'});

  return (
    <SafeAreaView style={globalStyles.globalContainer}>
      <CustomBackButton navigation={navigation} />

      <ResponsiveText
        title="Enter phone number"
        fontColor={colors.white}
        fontSize={28}
        fontWeight="700"
        fontStyle={{marginTop: verticalScale(20)}}
      />
      <View>
        <PhoneInput
          ref={phoneInput}
          defaultValue=""
          defaultCode={country.cca2}
          layout="first"
          onChangeFormattedText={text => console.log('Phone:', text)}
          withShadow
          withDarkTheme
          autoFocus
          textContainerStyle={{borderRadius: scale(5)}}
          containerStyle={{borderRadius: scale(8)}}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginWithNumber;
