// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import { scale } from 'react-native-size-matters';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// const podcasts = [
//   {
//     id: '1',
//     title: 'The Future of AI',
//     host: 'Tech Talks',
//     image: 'https://source.unsplash.com/100x100/?podcast,mic',
//   },
//   {
//     id: '2',
//     title: 'Mindfulness & Meditation',
//     host: 'Calm Voices',
//     image: 'https://source.unsplash.com/100x100/?meditation,peace',
//   },
//   {
//     id: '3',
//     title: 'Startup Success Stories',
//     host: 'Business Insights',
//     image: 'https://source.unsplash.com/100x100/?startup,entrepreneur',
//   },
// ];

// const PodcastListComponent = () => {
//   const [currentPodcast, setCurrentPodcast] = useState(null);

//   const playPodcast = (podcast) => {
//     setCurrentPodcast(podcast);
//   };

//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.podcastItem}
//       onPress={() => playPodcast(item)}>
//       <Image source={{uri: item.image}} style={styles.podcastImage} />
//       <View style={styles.podcastDetails}>
//         <Text style={styles.podcastTitle}>{item.title}</Text>
//         <Text style={styles.podcastHost}>{item.host}</Text>
//       </View>
//       <Ionicons name="play-circle" size={36} color="#ff5a5f" />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={{marginTop:scale(30)}}>
//       <Text style={styles.header}>Podcasts</Text>

//       <FlatList
//         data={podcasts}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         ItemSeparatorComponent={() => <View style={styles.separator} />}
//       />

//       {currentPodcast && (
//         <View style={styles.bottomPlayer}>
//           <Image
//             source={{uri: currentPodcast.image}}
//             style={styles.playerImage}
//           />
//           <View style={styles.playerDetails}>
//             <Text style={styles.playerTitle}>{currentPodcast?.title}</Text>
//             <Text style={styles.playerHost}>{currentPodcast?.host}</Text>
//           </View>
//           <Ionicons name="pause-circle" size={40} color="#fff" />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#121212', padding: 20},
//   header: {fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 20},
//   podcastItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: '#1e1e1e',
//     borderRadius: 10,
//   },
//   podcastImage: {width: 60, height: 60, borderRadius: 10},
//   podcastDetails: {flex: 1, marginLeft: 15},
//   podcastTitle: {fontSize: 18, color: '#fff', fontWeight: 'bold'},
//   podcastHost: {fontSize: 14, color: '#aaa'},
//   separator: {height: 10},

//   bottomPlayer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ff5a5f',
//     padding: 15,
//     marginTop:scale(50),
//     borderRadius:scale(5)
//   },
//   playerImage: {width: 50, height: 50, borderRadius: 10},
//   playerDetails: {flex: 1, marginLeft: 15},
//   playerTitle: {fontSize: 16, color: '#fff', fontWeight: 'bold'},
//   playerHost: {fontSize: 12, color: '#eee'},
// });

// export default PodcastListComponent;
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
