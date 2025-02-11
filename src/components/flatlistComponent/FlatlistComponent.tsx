import { Dimensions, FlatList, Image, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../styles/color';
import ResponsiveText from '../ResponsiveText/ResponsiveText';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const FlatlistComponent = ({title,source,data}:any) => {
  return (
    <View style={{marginTop: scale(50)}}>
      <ResponsiveText
        title={title}
        fontColor={colors.white}
        fontSize={24}
        fontWeight="700"
      />
      <FlatList
        data={data}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 0}}
        renderItem={({item, index}) => (
          <View
            style={{
              marginLeft: index === 0 ? 0 : 20,
              marginTop: scale(10),
            }}>
            <Image
              source={source}
              style={{
                backgroundColor: colors.white,
                height: screenHeight * 0.23,
                width: screenWidth * 0.45,
              }}
            />
            <ResponsiveText
              title="Arijit Singh"
              fontColor={colors.gray}
              fontStyle={{marginVertical:verticalScale(6),textAlign:'auto'}}
              fontSize={14}
            />
          </View>
        )}
      />
    </View>
  );
};

export default FlatlistComponent;
