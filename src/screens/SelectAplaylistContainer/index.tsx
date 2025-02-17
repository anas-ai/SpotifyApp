import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {colors} from '../../styles/color';
import CustomButton from '../../components/CustomButton/CustomButton';
import {ScreenName} from '../../constants/ScreensNames';

const SelectPlaylist = ({navigation}: any) => {
  const handleBackNavigation = () => {
    navigation.goBack();
  };
  return (
    <View style={globalStyles.globalContainer}>
      <View style={styles.headerStyle}>
        <ResponsiveText
          title="Select a playlist"
          fontColor={colors.white}
          fontWeight="700"
          fontSize={18}
        />
        <CustomButton
          title="Cancel"
          type="clear"
          titleStyle={{color: colors.red}}
          onPress={handleBackNavigation}
        />
      </View>
    </View>
  );
};

export default SelectPlaylist;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
