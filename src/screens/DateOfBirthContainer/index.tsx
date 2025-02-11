import {View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {colors} from '../../styles/color';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../../components/CustomButton/CustomButton';
import {Controller, useForm} from 'react-hook-form';
import { ScreenName } from '../../constants/ScreensNames';

const DateOfBirthScreen = ({navigation}: any) => {
  const [date, setDate] = useState<Date>(new Date());

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({defaultValues: {date: new Date()}});

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data);
    navigation.navigate(ScreenName.CREATE_ACCOUNT_SCREEN); 
  };



  return (
    <SafeAreaView style={globalStyles.globalContainer}>
      <CustomBackButton title="Create account" navigation={navigation} />
      <View style={{marginTop: verticalScale(40)}}>
        <ResponsiveText
          title="What's your date of"
          fontColor={colors.white}
          fontSize={30}
          fontWeight="bold"
        />
        <ResponsiveText
          title="birth?"
          fontColor={colors.white}
          fontSize={30}
          fontWeight="bold"
        />
      </View>
      <View style={{marginTop: verticalScale(20), alignItems: 'center'}}>
        <Controller
          name="date"
          control={control}
          rules={{
            required: 'Date of birth is required',
            validate: value => {
              const minAge = 13; 
              const today = new Date();
              const birthDate = new Date(value);
              const age = today.getFullYear() - birthDate.getFullYear();
              const monthDiff = today.getMonth() - birthDate.getMonth();
              const dayDiff = today.getDate() - birthDate.getDate();

              if (
                age > minAge ||
                (age === minAge &&
                  (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
              ) {
                return true;
              }

              return "Sorry, you don't meet the age requirements.";
            },
          }}
          render={({field: {onChange, value}}) => (
            <DatePicker
              date={value instanceof Date ? value : date}
              onDateChange={selectedDate => {
                setDate(selectedDate);
                onChange(selectedDate);
              }}
              mode="date"
              theme="dark"
            />
          )}
        />
        {errors.date && (
          <ResponsiveText
            title={errors.date.message}
            fontColor={colors.red}
            fontSize={14}
            fontWeight="normal"
          />
        )}

        <View style={{marginTop: verticalScale(50)}}>
          <CustomButton
            title="Next"
            buttonStyle={{borderRadius: scale(50), width: scale(100)}}
            titleStyle={{fontSize: moderateScale(18), color: colors.black}}
            disabled={isSubmitting}
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DateOfBirthScreen;
