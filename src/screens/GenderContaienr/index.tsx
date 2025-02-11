import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import { ScreenName } from '../../constants/ScreensNames';
import { colors } from '../../styles/color';
import { globalStyles } from '../../styles/globalStyles';

const GenderScreen = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: '',
    },
  });

  const GenderTab = ['Female', 'Male', 'Non-binary', 'Other', 'Prefer not to say'];
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    console.log('Selected Gender:', data);
    navigation.navigate(ScreenName.DATE_OF_BIRTH_SCREEN,{selectedGender})
  };

  return (
    <SafeAreaView style={globalStyles.globalContainer}>
      <CustomBackButton title="Create account" navigation={navigation} />
      <View style={styles.titleContainer}>
        <ResponsiveText title="What's your gender?" fontColor={colors.white} fontSize={26} fontWeight="700" />
      </View>
      <View style={styles.buttonContainer}>
        <Controller
          control={control}
          name="gender"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <>
              {GenderTab.map((gender, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.genderButton,
                    {
                      borderColor: value === gender ? colors.white : colors.borderGrey,
                      backgroundColor: value === gender ? colors.white : 'transparent',
                    },
                  ]}
                  onPress={() => {
                    setSelectedGender(gender);
                    onChange(gender); // Updates the form value
                  }}>
                  <ResponsiveText title={gender} fontColor={value === gender ? colors.black : colors.white} fontWeight={value === gender ? 'bold' : '500'} />
                </TouchableOpacity>
              ))}
            </>
          )}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <ResponsiveText title="Continue" fontColor={colors.black} fontWeight="bold" />
      </TouchableOpacity>

      {errors.gender && <ResponsiveText title="Please select a gender" fontColor={colors.red} fontSize={14} />}
    </SafeAreaView>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({
  titleContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(50),
  },
  buttonContainer: {
    marginHorizontal: 100,
  },
  genderButton: {
    borderWidth: 2,
    borderRadius: scale(40),
    padding: scale(10),
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButton: {
    marginTop: verticalScale(30),
    alignSelf: 'center',
    backgroundColor: colors.white,
    padding: scale(12),
    borderRadius: scale(30),
  },
});
