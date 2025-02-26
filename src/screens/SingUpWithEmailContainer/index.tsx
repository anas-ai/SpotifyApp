import React, { useState } from 'react';
import {KeyboardAvoidingView, StyleSheet, TextInput, View} from 'react-native';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {colors} from '../../styles/color';
import {globalStyles} from '../../styles/globalStyles';
import {useForm, Controller} from 'react-hook-form';
import CustomButton from '../../components/CustomButton/CustomButton';
import {moderateScale, scale} from 'react-native-size-matters';
import { ScreenName } from '../../constants/ScreensNames';

const SingUpEmailScreen = ({navigation}: any) => {
  const [SaveEmail,setEmail] = useState('')
  const {
    control,
    watch,
    handleSubmit,
    formState: {errors, isLoading},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const email = watch('email');

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate(ScreenName.CREATE_A_PASSWORD,{SaveEmail})
    setEmail(data)
  };
  
  
  return (
    <KeyboardAvoidingView style={globalStyles.globalContainer}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', gap: scale(80)}}>
        <CustomBackButton navigation={navigation} title='Create account' />
        
      </View>
      <ResponsiveText
        title="What's your email?"
        fontColor={colors.white}
        fontSize={30}
        fontWeight="bold"
        fontStyle={{marginTop: 50}}
      />
      <View style={{marginVertical: scale(10)}}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'email',
            pattern: {
              value:
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Enter valid email',
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

      <ResponsiveText
        title="You'll need to confirm this email later."
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
          disabled={!email}
          loading={false}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {},
});

export default SingUpEmailScreen;
