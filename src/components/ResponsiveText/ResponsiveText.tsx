import {View, Text} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import { ResponsiveTextTypes } from '../../constants/Types';

const ResponsiveText:React.FC<ResponsiveTextTypes> = ({
  title = '',
  fontColor,
  fontSize,
  fontWeight,
  fontStyle,
}) => {
  return (

    <Text
      style={{
        color: fontColor,
        fontSize: moderateScale(fontSize || 16),
        fontWeight: fontWeight,
        ...fontStyle,
      }}>
      {title}
    </Text>
  );
};

export default ResponsiveText;
