import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {colors} from '../../styles/color';
import {scale, verticalScale} from 'react-native-size-matters';
import {ScreenName} from '../../constants/ScreensNames';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const VideoListComponent = ({
  navigation,
  title = '',
  videoUrls = [],
  isHorizontal = false,
}: {
  navigation: any;
  title: string;
  videoUrls: any;
  isHorizontal: boolean;
}) => {
  return (
    <SafeAreaView style={{marginTop:isHorizontal? scale(10):0}}>
      <ResponsiveText
        title={isHorizontal ? title : ''}
        fontColor={colors.white}
        fontSize={24}
        fontWeight="700"
        fontStyle={{marginVertical:isHorizontal? scale(10):0}}
      />
      <FlatList
        data={videoUrls}
        horizontal={isHorizontal}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{marginBottom:scale(150)}}/>}
        renderItem={({item, index}) => (
          <TouchableOpacity
          activeOpacity={0.9}
            onPress={() =>
              navigation.navigate(ScreenName.VIDEO_DETAILS_SCREEN, {
                videoId: item.id,
                videoUrl: item.link,
              })
            }
            style={{
              marginRight: 15,
              justifyContent: isHorizontal ? 'center' : 'center',
              alignItems: isHorizontal ? 'center' : 'center',
            }}
            key={item.id}>
            <Image
              source={{
                uri: `https://img.youtube.com/vi/${
                  item.link.split('/')[4]
                }/0.jpg`,
              }}
              style={{
                width: isHorizontal ? screenWidth * 0.6 : screenWidth * 0.9,
                height: screenHeight * 0.25,
                borderRadius: scale(10),
              }}
            />
            <ResponsiveText
              title={`Video ${index + 1}`}
              fontColor={colors.gray}
              fontSize={14}
              fontStyle={{
                marginVertical: verticalScale(6),
                textAlign: 'auto',
              }}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default VideoListComponent;
