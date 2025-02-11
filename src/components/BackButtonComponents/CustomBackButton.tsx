import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../styles/color';
import ResponsiveText from '../ResponsiveText/ResponsiveText';

const CustomBackButton = ({navigation, title}: any) => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', }}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleBack}>
        <Icon name="arrow-back" size={30} color={colors.white} />
      </TouchableOpacity>
      <ResponsiveText
        title={title}
        fontColor={colors.white}
        fontWeight="bold"
        fontStyle={{paddingLeft:90}}
      />
    </View>
  );
};

export default CustomBackButton;
