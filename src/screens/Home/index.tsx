import {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import MusicListComponent from '../../components/MusicListComponet/MusicListComponent';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import VideoListComponent from '../../components/VideoLlistComponents/VideoListComponent';
import {ScreenName} from '../../constants/ScreensNames';
import {colors} from '../../styles/color';
import {globalStyles} from '../../styles/globalStyles';

const HomeTab = [
  {id: 1, TabName: 'All'},
  {id: 2, TabName: 'Video'},
  {id: 3, TabName: 'Music', screenNavigation: ScreenName.MUSIC_SCREEN},
];

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

export const songsList = [
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
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('All');

  return (
    <SafeAreaView style={globalStyles.globalContainer}>
      <ScrollView>
        <View style={styles.tabContainer}>
          <View style={styles.tabItems}>
            <ResponsiveText
              title="A"
              fontColor={colors.bgBlack}
              fontWeight="bold"
              fontSize={18}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            {HomeTab.map((item, index) => (
              <TouchableOpacity
                key={index}
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
                    paddingVertical: scale(8),
                    paddingHorizontal: scale(20),
                    borderRadius: scale(20),
                    textAlign: 'center',
                    borderColor:
                      activeTab === item.TabName ? colors.white : colors.white,
                    borderWidth: activeTab === item.TabName ? 0.5 : 1,
                  }}
                  fontSize={13}
                  fontWeight="700"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          {activeTab === 'All' && (
            <View>
              <VideoListComponent
                navigation={navigation}
                title="All Videos"
                videoUrls={videoUrls}
              />
              <MusicListComponent
                navigation={navigation}
                title="Made For Anas"
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
              title="Made For Anas"
              songsList={songsList}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  tabItems: {
    backgroundColor: colors.bgPink,
    borderRadius: 30,
    width: 38,
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
  },
});

export default HomeScreen;
