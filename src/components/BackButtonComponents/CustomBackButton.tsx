import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../styles/color';
import ResponsiveText from '../ResponsiveText/ResponsiveText';
import {scale} from 'react-native-size-matters';

const CustomBackButton = ({
  navigation,
  title,
  paddingLeft,
  TitlefontSize,
  paddingBottom
}: any) => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center',paddingBottom:paddingBottom || 0}}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleBack}>
        <Icon name="arrow-back" size={30} color={colors.white} />
      </TouchableOpacity>
      <ResponsiveText
        title={title}
        fontColor={colors.white}
        fontWeight="bold"
        fontSize={TitlefontSize || 20}
        fontStyle={{paddingLeft: paddingLeft || scale(90)}}
      />
    </View>
  );
};

export default CustomBackButton;
