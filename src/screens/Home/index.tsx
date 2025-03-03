import {useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import MusicListComponent from '../../components/MusicListComponet/MusicListComponent';
import PodcastListComponent from '../../components/PodcastListComponent/PodcastListComponent';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import VideoListComponent from '../../components/VideoLlistComponents/VideoListComponent';
import {ScreenName} from '../../constants/ScreensNames';
import {colors} from '../../styles/color';
import {globalStyles} from '../../styles/globalStyles';
import LiveScreen from '../LiveScreenContainer';
import MusicScreen from '../MusicScreensContainer';

const HomeTab = [
  {id: 1, TabName: 'Home'},
  {id: 2, TabName: 'Video'},
  {id: 3, TabName: 'Music', screenNavigation: ScreenName.MUSIC_SCREEN},
  {id: 4, TabName: 'Podcast', screenNavigation: ScreenName.PODCAST_SCREEN},
  {id: 5, TabName: 'Live'},
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const videoUrls: any = [
  {
    id: 1,
    link: 'https://www.youtube.com/embed/25VRdPO8xJ0',
  },
  {
    id: 2,
    link: 'https://www.youtube.com/embed/WQdqgrWvy6g',
  },
  {
    id: 3,
    link: 'https://www.youtube.com/embed/4kGVdHt0U5o',
  },
  {
    id: 5,
    link: 'https://www.youtube.com/embed/NXM37eeDF74',
  },
  {
    id: 6,
    link: 'https://www.youtube.com/embed/A_1V9AColh4',
  },
  {
    id: 7,
    link: 'https://www.youtube.com/embed/V258-P0Zhs8',
  },
];

export interface song {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  url: string;
}

export const songsList: song[] = [
  {
    title: 'Death Bed',
    artist: 'Powfu',
    artwork: 'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
    url: 'https://samplesongs.netlify.app/Death%20Bed.mp3',
    id: '1',
  },
  {
    title: 'Bad Liar',
    artist: 'Imagine Dragons',
    artwork: 'https://samplesongs.netlify.app/album-arts/bad-liar.jpg',
    url: 'https://samplesongs.netlify.app/Bad%20Liar.mp3',
    id: '2',
  },
  {
    title: 'Faded',
    artist: 'Alan Walker',
    artwork: 'https://samplesongs.netlify.app/album-arts/faded.jpg',
    url: 'https://samplesongs.netlify.app/Faded.mp3',
    id: '3',
  },
  {
    title: 'Hate Me',
    artist: 'Ellie Goulding',
    artwork: 'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
    url: 'https://samplesongs.netlify.app/Hate%20Me.mp3',
    id: '4',
  },
  {
    title: 'Solo',
    artist: 'Clean Bandit',
    artwork: 'https://samplesongs.netlify.app/album-arts/solo.jpg',
    url: 'https://samplesongs.netlify.app/Solo.mp3',
    id: '5',
  },
  {
    title: 'Without Me',
    artist: 'Halsey',
    artwork: 'https://samplesongs.netlify.app/album-arts/without-me.jpg',
    url: 'https://samplesongs.netlify.app/Without%20Me.mp3',
    id: '6',
  },
];

const HomeScreen = ({navigation}: any) => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <SafeAreaView style={globalStyles.globalContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FlatList
          data={HomeTab}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveTab(item?.TabName)}>
              <ResponsiveText
                title={item.TabName}
                fontColor={
                  activeTab === item.TabName ? colors.black : colors.white
                }
                fontStyle={{
                  backgroundColor:
                    activeTab === item.TabName
                      ? colors.ButtonColor
                      : 'transparent',
                  height: screenHeight * 0.04,
                  width: screenWidth * 0.2,
                  textAlign: 'center',
                  padding: scale(2),
                  borderRadius: scale(10),
                  paddingTop: scale(5),
                  marginLeft: index === 0 ? 0 : 10,
                  borderColor:
                    activeTab === item.TabName ? colors.white : colors.white,
                  borderWidth: activeTab === item.TabName ? 0.5 : 1,
                }}
                fontSize={13}
                fontWeight="700"
              />
            </TouchableOpacity>
          )}
        />
      </View>

      {activeTab === 'Home' && (
        <View>
          <VideoListComponent
            navigation={navigation}
            title="All Videos"
            videoUrls={videoUrls}
          />
          <MusicListComponent
            navigation={navigation}
            title="All Music"
            songsList={songsList}
          />
        </View>
      )}
      {activeTab === 'Video' && (
        <VideoListComponent
          navigation={navigation}
          title="All Videos"
          videoUrls={videoUrls}
        />
      )}
      {activeTab === 'Music' && (
        <MusicListComponent
          navigation={navigation}
          title="All Music"
          songsList={songsList}
        />
      )}
      {activeTab === 'Podcast' && <PodcastListComponent />}
      {activeTab === 'Live' && <LiveScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabItems: {
    backgroundColor: colors.bgPink,
    borderRadius: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
});

export default HomeScreen;
