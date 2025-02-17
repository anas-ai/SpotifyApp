import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useRef} from 'react';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {colors} from '../../styles/color';
import {scale} from 'react-native-size-matters';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const ActionSheetComponent = ({actionSheetRef}: any) => {
  return (
    <ActionSheet
      containerStyle={styles.ActionSheetContianer}
      ref={actionSheetRef}
      gestureEnabled>
        <View>
          
        </View>
      </ActionSheet>
  );
};

const styles = StyleSheet.create({
  ActionSheetContianer: {
    backgroundColor: colors.bgBlack1,
    height: screenHeight * 0.4,
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
  },
  artistsCurrentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(20),
  },
  ActionSheetImgStyle: {
    height: screenHeight * 0.07,
    width: screenWidth * 0.2,
    resizeMode: 'contain',
    borderRadius: scale(5),
  },
});

export default ActionSheetComponent;
