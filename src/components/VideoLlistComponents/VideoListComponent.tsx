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
}: {
  navigation: any;
  title: string;
  videoUrls: any;
}) => {
  return (
    <SafeAreaView style={{marginTop: scale(10)}}>
      <ResponsiveText
        title={title}
        fontColor={colors.white}
        fontSize={24}
        fontWeight="700"
        fontStyle={{marginVertical: scale(10)}}
      />
      <FlatList
        data={videoUrls}
        horizontal
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ScreenName.VIDEO_DETAILS_SCREEN, {
                videoId: item.id,
                videoUrl: item.link,
              })
            }
            style={{marginRight: 15}}
            key={item.id}>
            <Image
              source={{
                uri: `https://img.youtube.com/vi/${
                  item.link.split('/')[4]
                }/0.jpg`,
              }}
              style={{
                width: screenWidth * 0.6,
                height: screenHeight * 0.25,
                borderRadius: 10,
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
