import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {colors} from '../../styles/color';
import {Controller, useForm} from 'react-hook-form';
import {moderateScale, scale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton/CustomButton';
import Eye from '../../assets/svgs/Eye';
import Eyeoff from '../../assets/svgs/Eyeoff';
import { ScreenName } from '../../constants/ScreensNames';

const CreatePassword = ({navigation}: any) => {
  const [isPasswordVisible, setPasswordVisible] = useState<any>(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isLoading},
    watch,
  } = useForm({
    defaultValues: {
      password: '',
    },
  });
  const password = watch('password');

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate(ScreenName.GENDER_SCREEN)
  };

  return (
    <KeyboardAvoidingView style={globalStyles.globalContainer}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', gap: scale(80)}}>
        <CustomBackButton navigation={navigation} title="Create account" />
      </View>
      <ResponsiveText
        title="Create a password"
        fontColor={colors.white}
        fontSize={24}
        fontWeight="bold"
        fontStyle={{marginTop: 50}}
      />
      <View style={{marginVertical: scale(10)}}>
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

      <ResponsiveText
        title="Use at least 10 characters."
        fontColor={colors.white}
        fontSize={12}
        fontStyle={{paddingLeft: 8}}
      />
      <View style={{marginVertical: scale(20), alignSelf: 'center'}}>
        <CustomButton
          title="Next"
          titleStyle={{
            color: colors.bgBlack1,
            fontWeight: 'bold',
            fontSize: moderateScale(18),
          }}
          buttonStyle={{width: scale(100), borderRadius: scale(20)}}
          disabled={!password}
          loading={false}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({});
