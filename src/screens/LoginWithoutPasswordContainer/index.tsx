import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {colors} from '../../styles/color';
import {moderateScale, scale} from 'react-native-size-matters';
import {Controller, useForm} from 'react-hook-form';
import CustomButton from '../../components/CustomButton/CustomButton';
import { ScreenName } from '../../constants/ScreensNames';

const LogWithoutPassword = ({navigation}: any) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors, isLoading},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate(ScreenName.CHECK_YOUR_EMAIL)
  };
  const email = watch('email');
  return (
    <KeyboardAvoidingView style={globalStyles.globalContainer}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', gap: scale(80)}}>
        <CustomBackButton
          navigation={navigation}
          title="Log in without password"
        />
      </View>
      <ResponsiveText
        title="Email or username"
        fontColor={colors.white}
        fontSize={30}
        fontWeight="bold"
        fontStyle={{marginTop: 50}}
      />
      <View style={{marginVertical: scale(6)}}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
            pattern: {
              value:
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'invalid email',
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
            fontSize={12}
          />
        )}
      </View>

      <ResponsiveText
        title="We'll send you an email with a link that will log you in."
        fontColor={colors.white}
        fontSize={12}
        fontStyle={{paddingLeft: 8}}
      />
      <View style={{marginVertical: scale(20), alignSelf: 'center'}}>
        <CustomButton
          title="Get link"
          titleStyle={{
            color: colors.bgBlack1,
            fontWeight: 'bold',
            fontSize: moderateScale(16),
          }}
          buttonStyle={{width: scale(100), borderRadius: scale(20)}}
          disabled={!email}
          loading={false}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LogWithoutPassword;

const styles = StyleSheet.create({});
