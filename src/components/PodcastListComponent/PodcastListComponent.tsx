import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { ScreenName } from '../../constants/ScreensNames';
import { colors } from '../../styles/color';
import ResponsiveText from '../ResponsiveText/ResponsiveText';

interface PodcastItem {
  id: number;
  link: string;
  title: string;
}

interface PodcastListProps {
  podcastitem: PodcastItem[]; // ✅ Expect an array of podcasts
  navigation: any;
  isHorizontal?: boolean; // 👈 optional prop
  title?: string;
  subTitle?: string;
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const PodcastListComponent: React.FC<PodcastListProps> = ({
  podcastitem,
  navigation,
  isHorizontal,
  title,
  subTitle,
}: any) => {
  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  };

  return (
    <View>
      {!isHorizontal && !!title && (
  <ResponsiveText
    title={title}
    fontSize={14}
    fontColor={colors.white}
    fontWeight="600"
    fontStyle={{marginTop: scale(10)}}
  />
)}

      {/* "Most Heard In India" */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: scale(10),
        }}>
        <ResponsiveText
          title={subTitle}
          fontColor={colors.white}
          fontSize={24}
          fontWeight="bold"
        />
        {/* 'Trending Podcasts' */}
        {/* <TouchableOpacity
          activeOpacity={0.8}
          style={{flexDirection: 'row', alignItems: 'center', gap: scale(10)}}>
          <ResponsiveText
            title={'View all'}
            fontColor={colors.gray}
            fontSize={14}
          />
          <IconLeft name="right" size={14} style={{color: colors.gray}} />
        </TouchableOpacity> */}
      </View>

      <FlatList
        data={podcastitem}
        keyExtractor={item => item.id.toString()}
        horizontal={isHorizontal}
        showsHorizontalScrollIndicator={!isHorizontal}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: scale(20),
        }}
        ListEmptyComponent={<View />}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginBottom: isHorizontal ? 0 : scale(15),
              marginRight: isHorizontal ? scale(15) : 0,
              width: isHorizontal ? screenWidth * 0.6 : '100%',
              marginLeft: index === 0 ? 0 : scale(0),
            }}
            onPress={() =>
              navigation.navigate(ScreenName.PODCAST_DETAILS_SCREEN, {
                podcast: item,
                allPodcast: podcastitem,
              })
            }>
            <View>
              <Image
                source={{uri: getYouTubeThumbnail(item.link)}}
                style={{
                  height: screenHeight * 0.25,
                  width: '100%',
                  resizeMode: 'cover',
                  borderRadius: scale(10),
                }}
              />
              <View style={{marginTop: scale(10)}}>
                <ResponsiveText
                  title={
                    item?.title.length > 20
                      ? item?.title.substring(0, 20) + '...'
                      : item?.title
                  }
                  fontColor={colors.white}
                  fontStyle={{
                    flex: 1,
                    textAlign: 'center',
                    lineHeight: scale(20),
                  }}
                  fontSize={14}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PodcastListComponent;

const styles = StyleSheet.create({});
