import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Eye from '../../assets/svgs/Eye';
import Eyeoff from '../../assets/svgs/Eyeoff';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';
import CustomButton from '../../components/CustomButton/CustomButton';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import { ScreenName } from '../../constants/ScreensNames';
import { colors } from '../../styles/color';
import { globalStyles } from '../../styles/globalStyles';

const ContinueWithEmailLogin = ({navigation}: any) => {
  const {
    control,
    watch,
    handleSubmit,
    formState: {errors, isLoading},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate(ScreenName.HOME_SCREEN_IN_AUTH)
  };

  const email = watch('email');
  const password = watch('password');

  const [isPasswordVisible, setPasswordVisible] = useState<any>(false);

  const handleWithoutPassword = () => {
    navigation.navigate(ScreenName.LOG_IN_WITHOUT_PASSWORD);
  };

  return (
    <SafeAreaView style={globalStyles.globalContainer}>
      <CustomBackButton navigation={navigation} />
      <View style={{marginVertical: scale(10)}}>
        <ResponsiveText
          title="Email of username"
          fontColor={colors.white}
          fontSize={30}
          fontWeight="700"
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'email',
            pattern: {
              value:
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Email password',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={{
                backgroundColor: colors.InputBgColor,
                borderRadius: scale(5),
                color: colors.white,
                padding: scale(10),
              }}
              placeholder="Enter your email"
              placeholderTextColor={colors.gray}
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && (
          <ResponsiveText
            title={errors.email.message}
            fontColor={colors.white}
          />
        )}
      </View>
      <View style={{marginVertical: scale(10)}}>
        <ResponsiveText
          title="Password"
          fontColor={colors.white}
          fontSize={30}
          fontWeight="700"
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Password is required',
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                'Password must contain at least 8 characters, including a letter, a number, and a special character.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.InputBgColor,
                borderRadius: scale(5),
                paddingHorizontal: scale(10),
              }}>
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={{
                  flex: 1,
                  color: colors.white,
                  paddingVertical: scale(10),
                }}
                placeholder="Enter your password"
                placeholderTextColor={colors.gray}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible ? (
                  <Eye color={colors.white} />
                ) : (
                  <Eyeoff color={colors.white} height={20} width={20} />
                )}
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.password && (
          <ResponsiveText
            title={errors.password.message}
            fontColor={colors.white}
          />
        )}
      </View>

      <View style={{marginVertical: scale(20), alignItems: 'center'}}>
        <CustomButton
          title="Log in"
          titleStyle={{
            color: colors.bgBlack1,
            fontWeight: 'bold',
            fontSize: moderateScale(16),
          }}
          buttonStyle={{width: scale(100), borderRadius: scale(20)}}
          disabled={!email || !password}
          loading={false}
          onPress={handleSubmit(onSubmit)}
        />
        <TouchableOpacity
          onPress={handleWithoutPassword}
          style={{
            borderRadius: scale(20),
            borderWidth: 1,
            width: scale(150),
            alignItems: 'center',
            paddingVertical: verticalScale(2),
            borderColor: colors.borderGrey,
            marginTop: scale(30),
          }}
          activeOpacity={0.8}>
          <ResponsiveText
            title="Log in without password"
            fontColor={colors.white}
            fontWeight="600"
            fontSize={12}
          />
        </TouchableOpacity>
      </View>
      <View></View>
    </SafeAreaView>
  );
};

export default ContinueWithEmailLogin;
