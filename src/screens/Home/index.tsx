import {useState, useCallback} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
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
import LiveComponent from '../../components/LiveComponent/LiveComponent';

const HomeTab = [
  {id: 1, TabName: 'Home'},
  {id: 2, TabName: 'Video'},
  {id: 3, TabName: 'Music', screenNavigation: ScreenName.MUSIC_SCREEN},
  {id: 4, TabName: 'Podcast', screenNavigation: ScreenName.PODCAST_SCREEN},
  {id: 5, TabName: 'Live'},
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export type videoUrlType = {
  id: number;
  link: string;
  title: string;
};

export const videoUrls: videoUrlType[] = [
  {
    id: 1,
    link: 'https://www.youtube.com/embed/tZDR7uYgjjY',
    title:
      'Mujtaba Aziz Naza की 2025 में बिलकुल नई दिल को छू लेने वाली Naat | Wo Noor Hai Mujassam | Viral Naat',
  },
  {
    id: 2,
    link: 'https://www.youtube.com/embed/KXQSDwpXd18',
    title:
      '15th Jashne Chote Bade Sarkar 2025 || या छोटे बड़े सरकार || Junaid Sultani बदायूं उर्स 2025',
  },
  {
    id: 3,
    link: 'https://www.youtube.com/embed/32zptW5eesU',
    title:
      'Mujtaba Aziz Naza की सबसे Famous Qawwali || जगत गुरु ख्वाजा मैं तोरी गली आई || Jagat Guru Khwaja',
  },
  {
    id: 4,
    link: 'https://www.youtube.com/embed/sE13l6FA2bI',
    title:
      'Ghous Pak Manqabat 2025 जश्न 11वी का तेरा गौस ए आज़म | Sadakat Sabri | है ये ईद ए ग़ौसुलवरा गौस ए आज़म',
  },
  {
    id: 5,
    link: 'https://www.youtube.com/embed/YMU--pn3b40',
    title:
      'नैनन मा समाओ प्यारे ख्वाजा जी || Mujtaba Aziz Naza || Garib Nawaz New Qawwali 2025 || Chatti Sharif',
  },
  {
    id: 6,
    link: 'https://www.youtube.com/embed/HGdrx8NzEQc',
    title:
      'Dongri Ke Sultan के बाद एक और World Famous Qawwali Mujtaba Aziz Naza | Khwaja Khwaja Hind Ke Sultan',
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

export interface PodcastItem {
  id: number;
  link: string;
  title: string;
}

export const podcastitem: PodcastItem[] = [
  {
    id: 1,
    link: 'https://www.youtube.com/watch?v=WiTTYnITqaE',
    title:
      'Syed Sohail Qadri Fatmi Podcast || Promo || Cooming Soon Interview Sohail Bapu || Deewana Podcast ',
  },
  {
    id: 2,
    link: 'https://www.youtube.com/watch?v=LP9rtFWsvX0',
    title:
      'Junaid Sultani ने अपनी Life के बारे में खुलकर बताया || Deewana Podcast : Episode 2 || Junaid Sultani',
  },
  {
    id: 3,
    link: 'https://www.youtube.com/watch?v=QBfPx2ob9Jk',
    title:
      'Syed Aminul Qadri Podcast 2025 || Qawwali पर आला हज़रत का फरमान || Latest Episode || Deewana Podcast ',
  },
  {
    id: 4,
    link: 'https://www.youtube.com/watch?v=Hvlfw_dJjTU',
    title:
      'Camere में Live दिखा जिन्न का साया || Horror Podcast 2025 || Syed Mukhtar Ashraf Qadri Interview',
  },
  {
    id: 5,
    link: 'https://www.youtube.com/watch?v=wunjMTsDOlE',
    title:
      'Syed Naimatullah Hussaini ने राफज़ीयत के फ़तवे पर किया बड़ा खुलासा || Deewana Podcast New Episode 2025',
  },
  {
    id: 6,
    link: 'https://www.youtube.com/watch?v=hgT-N1peXzg',
    title:
      'Molana Tahseen Jilani Podcast 2025 | हिन्दू मुस्लिम लेडीज Fans के लिया क्या बोल दिया Deewana Podcast',
  },
  {
    id: 7,
    link: 'https://www.youtube.com/watch?v=bShE_PhDrWI',
    title:
      'Ashraf E Millat ने दावते इस्लामी पर किया बड़ा खुलासा | Podcast Syed Mohammad Ashraf Ashrafi Al Jilani',
  },
  {
    id: 8,
    link: 'https://www.youtube.com/watch?v=_PRYz26BE5o',
    title:
      'डोंगरी के सुल्तान Qawwali से पूरी दुनिया मे Famous Mujtaba Aziz Naza का Interview || Deewana Podcast',
  },
  {
    id: 9,
    link: 'https://www.youtube.com/watch?v=0DfjTjQv5uc',
    title:
      'Online Games में बर्बाद होते Youths || A.R. Hussain ने किया बड़ा खुलासा || A.R. Hussain Podcast',
  },
  {
    id: 10,
    link: 'https://www.youtube.com/watch?v=Y6gPJh-203g',
    title:
      'Hafiz Tahir Qadri के बारे मे क्या बोल दिया Syed Abdul Qadri Bapu ने || IND vs PAK || Deewana Podcast',
  },
  {
    id: 11,
    link: 'https://www.youtube.com/watch?v=FQ6auCwI8os',
    title:
      'Syed Mehdi Miya Interview || रजवी और चिश्ती सिलसिले पर किया बड़ा खुलासा || Deewana Podcast',
  },
  {
    id: 12,
    link: 'https://www.youtube.com/watch?v=dRnTBSm9xY4',
    title:
      'Deewana Podcast : Episode 1 || Allama Ahmed Naqshbandi Sahab Hyderabad || Exclusive Podcast',
  },
];

const HomeScreen = ({navigation}: any) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or data refresh
    setTimeout(() => {
      setRefreshing(false);
      console.log(`Refreshed ${activeTab} tab!`);
      // Add your data fetching logic here, e.g., refetch videoUrls, songsList, podcastitem, or live data
    }, 1500);
  }, [activeTab]);

  const renderRefreshControl = () => (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={colors.ButtonColor}
      title="Refreshing..."
      titleColor={colors.white}
    />
  );

  return (
    <SafeAreaView
      style={[globalStyles.globalContainer, {paddingTop: scale(20)}]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FlatList
          data={HomeTab}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{paddingBottom: 20}}
              activeOpacity={0.9}
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
        <FlatList
          data={[1]}
          keyExtractor={() => 'home-content'}
          refreshControl={renderRefreshControl()}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <>
              <VideoListComponent
                navigation={navigation}
                title="All Videos"
                videoUrls={videoUrls}
                isHorizontal={true}
              />
              <MusicListComponent
                navigation={navigation}
                title="All Music"
                songsList={songsList}
                isHorizontal={true}
              />
              <PodcastListComponent
                podcastitem={podcastitem}
                navigation={navigation}
                isHorizontal={true}
                subTitle="Trending Podcasts"
              />
              <LiveComponent isHorizontal={true} title="Live" />
            </>
          )}
        />
      )}

      {activeTab === 'Video' && (
        <FlatList
          data={[1]}
          keyExtractor={() => 'video-content'}
          refreshControl={renderRefreshControl()}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <VideoListComponent
              navigation={navigation}
              title="All Videos"
              videoUrls={videoUrls}
              isHorizontal={false}
            />
          )}
        />
      )}
      {activeTab === 'Music' && (
        <FlatList
          data={[1]}
          keyExtractor={() => 'music-content'}
          refreshControl={renderRefreshControl()}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <MusicListComponent
              navigation={navigation}
              title="All Music"
              songsList={songsList}
              isHorizontal={false}
            />
          )}
        />
      )}
      {activeTab === 'Podcast' && (
        <FlatList
          data={[1]}
          keyExtractor={() => 'podcast-content'}
          showsVerticalScrollIndicator={false}
          refreshControl={renderRefreshControl()}
          renderItem={() => (
            <PodcastListComponent
              podcastitem={podcastitem}
              navigation={navigation}
              isHorizontal={false}
            />
          )}
        />
      )}
      {activeTab === 'Live' && (
        <LiveScreen
          navigation={navigation}
          refreshControl={renderRefreshControl()}
        />
      )}
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
