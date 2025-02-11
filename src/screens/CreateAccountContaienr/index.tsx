import {Divider} from '@rneui/themed';
import {useCallback, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';
import CustomButton from '../../components/CustomButton/CustomButton';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {colors} from '../../styles/color';
import {globalStyles} from '../../styles/globalStyles';
import {useForm, Controller} from 'react-hook-form';
import {ScreenName} from '../../constants/ScreensNames';

const CreateAccount = ({navigation, route}: any) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isLoading},
    setValue,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate(ScreenName.MUSIC_CATEGORY_SCREEN);
  };

  const handleCheckboxChange = useCallback(() => {
    setToggleCheckBox(!toggleCheckBox);
  }, []);
  return (
    <SafeAreaView style={globalStyles.globalContainer}>
      <CustomBackButton navigation={navigation} title="Create account" />
      <View style={styles.titleStyle}>
        <ResponsiveText
          title="What's your name?"
          fontColor={colors.white}
          fontSize={30}
          fontWeight="bold"
        />
      </View>

      <View style={styles.TextInputContainer}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={colors.white}
              style={[
                styles.input,
                {backgroundColor: value ? colors.InputBgColor : colors.white},
              ]} // Dynamic background color
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
          rules={{
            required: true,
          }}
        />
      </View>

      {/* Show error message only if validation fails */}
      {/* {errors.name && (
        <ResponsiveText
          title={errors.name.message} // Display error message
          fontColor="red"
          fontSize={12}
          fontWeight="400"
          fontStyle={{ marginTop: scale(2) }}
        />
      )} */}

      <ResponsiveText
        title="This appears on your Spotify profile."
        fontColor={colors.white}
        fontSize={13}
        fontWeight="400"
        fontStyle={{marginTop: scale(2), paddingLeft: 0}}
      />
      <View style={{marginTop: 20}}>
        <Divider />
      </View>

      <ResponsiveText
        title="By tapping 'Create account', you agree to the Spotify Terms of Use."
        fontColor={colors.white}
        fontSize={13}
        fontWeight="400"
        fontStyle={{marginTop: scale(20)}}
      />
      <TouchableNativeFeedback>
        <ResponsiveText
          title="Terms of Use"
          fontColor={colors.ButtonColor}
          fontSize={13}
          fontStyle={{marginTop: scale(20)}}
        />
      </TouchableNativeFeedback>

      <ResponsiveText
        title="To learn more about how Spotify collects, uses, shares, and protects your personal data, please see the Spotify Privacy."
        fontColor={colors.white}
        fontSize={13}
        fontWeight="400"
        fontStyle={{marginTop: scale(20), lineHeight: 16}}
      />
      <TouchableNativeFeedback>
        <ResponsiveText
          title="Privacy Policy"
          fontColor={colors.ButtonColor}
          fontSize={13}
          fontStyle={{marginTop: scale(20)}}
        />
      </TouchableNativeFeedback>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ResponsiveText
          title="I would prefer not to receive marketing messages from Spotify."
          fontColor={colors.white}
          fontSize={12}
          fontWeight="400"
          fontStyle={{marginTop: scale(20), lineHeight: 16, flex: 1}}
        />
        <View style={{marginTop: scale(10)}}>
          {/* <CheckBox
            disabled={false}
            value={toggleCheckBox}
            tintColors={{true: '#3be477', false: 'white'}}
            onValueChange={handleCheckboxChange}
          /> */}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ResponsiveText
          title="Share my registration data with Spotify's content providers for marketing purposes."
          fontColor={colors.white}
          fontSize={12}
          fontWeight="400"
          fontStyle={{marginTop: scale(20), lineHeight: 16, flex: 1}}
        />
        <View style={{marginTop: scale(10)}}>
          {/* <CheckBox
            disabled={false}
            value={toggleCheckBox2}
            tintColors={{true: '#3be477', false: 'white'}}
            onValueChange={() => setToggleCheckBox2(!toggleCheckBox2)}
          /> */}
        </View>
      </View>

      <CustomButton
        title="Create account"
        buttonStyle={{marginTop: scale(80), borderRadius: scale(50)}}
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        disabled={isLoading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TextInputContainer: {
    borderRadius: scale(5),
    marginTop: scale(10),
  },
  titleStyle: {
    marginTop: scale(50),
  },
  input: {
    paddingLeft: 20,
    color: colors.white,
    height: 40, // Add height for better appearance
    borderRadius: scale(5), // Ensure input is rounded
  },
});

export default CreateAccount;
