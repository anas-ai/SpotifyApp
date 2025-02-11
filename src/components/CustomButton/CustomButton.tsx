import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '@rneui/themed';
import { colors } from '../../styles/color';
import { CustomButtonProps } from '../../constants/Types';

const CustomButton:React.FC<CustomButtonProps> = ({onPress,title,titleStyle,buttonStyle,loading=false,disabled=false,type}) => {
  return (
    <View>
      <Button
        onPress={onPress}
        title={title}
        titleStyle={[styles.buttonTitle,titleStyle]}
        buttonStyle={[styles.loginButton,buttonStyle]}
        loading={loading}
        disabled={disabled}
        type={type}
      />
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
    loginButtonContainer: {
      marginTop: 50,
    },
    buttonTitle: {
      fontSize: 20,
      fontWeight: '600',
    },
    loginButton: {
      backgroundColor: colors.ButtonColor,
      borderRadius: 4,
      paddingVertical: 10,
    },
  });
