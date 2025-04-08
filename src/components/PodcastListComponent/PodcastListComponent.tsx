import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import IconLeft from 'react-native-vector-icons/AntDesign';
import {colors} from '../../styles/color';
import ResponsiveText from '../ResponsiveText/ResponsiveText';
import {ScreenName} from '../../constants/ScreensNames';

interface PodcastItem {
  id: number;
  link: string;
  title: string;
}

interface PodcastListProps {
  podcastitem: PodcastItem[]; // ✅ Expect an array of podcasts
  navigation: any;
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const PodcastListComponent: React.FC<PodcastListProps> = ({
  podcastitem,
  navigation,
}: any) => {
  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  };

  return (
    <View>
      <ResponsiveText
        title="Most Heard In India"
        fontSize={14}
        fontColor={colors.gray}
        fontWeight="600"
        fontStyle={{marginTop: scale(30)}}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: scale(10),
        }}>
        <ResponsiveText
          title={'Trending Podcasts'}
          fontColor={colors.white}
          fontSize={20}
          fontWeight="bold"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={{flexDirection: 'row', alignItems: 'center', gap: scale(10)}}>
          <ResponsiveText
            title={'View all'}
            fontColor={colors.gray}
            fontSize={14}
          />
          <IconLeft name="right" size={14} style={{color: colors.gray}} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={podcastitem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View
            style={{
              marginBottom: '50%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ResponsiveText title={'No more items'} fontColor={colors.white} />
          </View>
        )}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{marginTop: scale(20)}}
            onPress={() =>
              navigation.navigate(ScreenName.PODCAST_DETAILS_SCREEN, {
                podcast: item,
                allPodcast:podcastitem

              })
            }>
            <View>
              <Image
                source={{uri: getYouTubeThumbnail(item.link)}}
                style={{
                  height: screenHeight * 0.32,
                  width: '100%',
                  resizeMode: 'contain',
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
                    lineHeight: scale(22),
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
