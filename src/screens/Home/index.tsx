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
    link: 'https://www.youtube.com/embed/DFkt-3AyR0w',
    title:
      'Kabhi Rulaya Kabhi Muskura Ke Chhod Diya | Zeeshan Faizan Sabri | निगाहे यार ने पागल बना के छोड़ दिया',
  },
  {
    id: 2,
    link: 'https://www.youtube.com/embed/PkfgqSwHFYM',
    title:
      'Dulha Bana Hai Khwaja पंडित जी भी सुनकर झूम उठे | Chand Qadri दूल्हा बना है ख्वाजा अजमेर की बस्ती मे',
  },
  {
    id: 3,
    link: 'https://www.youtube.com/embed/TRhlmXx8ZI0',
    title:
      'Kapasan Muharram 2025 || कपासन में मुहर्रम 2025 पर धूम धाम से निकले ताज़िये || Night Taziya Kapasan',
  },
  {
    id: 4,
    link: 'https://www.youtube.com/embed/KDorvwq5CIM',
    title:
      'मुहर्रम 2025 में सारे यज़ीदी सुनकर बेचैन || Junaid Sultani || यज़ीद मुर्दाबाद हुसैन जिंदाबाद रहेगा',
  },
  {
    id: 5,
    link: 'https://www.youtube.com/embed/qvv5nZdfekE',
    title:
      'Muharram पर फिलिस्तीन वासियो की पुकार || Adnan Azim Naza | Ajao Ya Hussain Bulata Hai Palestine 2025',
  },
  {
    id: 6,
    link: 'https://www.youtube.com/embed/ZCr_lxZWxaQ',
    title:
      'नया साल नया धमाका नया अंदाज़ || Junaid Sultani || Haq Nibhana Mere Hussain Ka Hai New Version 2025',
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
    artwork: 'https://res.cloudinary.com/dbn0pogq1/image/upload/v1752725957/a0mkqwvqgonbqy02p3am.jpg',
    url: 'https://res.cloudinary.com/dbn0pogq1/video/upload/v1752726737/e7dnhbwgjs4p4piblnb2.mp3',
    id: '1',
  },
  {
    title: '2025 में गरीब नवाज़ की सबसे ज्यादा Viral Qawwali || Sadkat Sabri || कदम कदम पे करम तुम्हारा',
    artist: 'Imagine Dragons',
    artwork: 'https://res.cloudinary.com/dbn0pogq1/image/upload/v1752727632/h5ckhosvrfxvhw1tviay.jpg',
    url: 'https://res.cloudinary.com/dbn0pogq1/video/upload/v1752728490/xmep1qx3c3k2hkpudo2s.mp3',
    id: '2',
  },
  {
    title: 'Dil Ne Pukara Khwaja || Murad Aatish || Garib Nawaz Qawwali 2025 || Tu Hai Sahara Khwaja',
    artist: 'Alan Walker',
    artwork: 'https://res.cloudinary.com/dbn0pogq1/image/upload/v1752727438/cq9needugg7szroytcan.jpg',
    url: 'https://res.cloudinary.com/dbn0pogq1/video/upload/v1752729521/jaiibzlq4py7hbc9u0rb.mp3',
    id: '3',
  },
  {
    title: 'Hae Mera Dil Khwaja Tera Ho Gaya || Aamil Aarif || सोने का कलश देखा दिल खो गया New Qawwali 2025',
    artist: 'Ellie Goulding',
    artwork: 'https://res.cloudinary.com/dbn0pogq1/image/upload/v1752727480/hyomflatdbozdtpep5qq.jpg',
    url: 'https://res.cloudinary.com/dbn0pogq1/video/upload/v1752729914/vdewoh1mz0e2ucxvzfv2.mp3',
    id: '4',
  },
  {
    title: 'Muharram 2025 में सभी दीवाने हो गए ये Viral Qawwali सुनकर Junaid Sultani || Hussain Zindabaad Rahega',
    artist: 'Clean Bandit',
    artwork: 'https://img.youtube.com/vi/qfHnobTs8gg/hqdefault.jpg',
    url: 'https://res.cloudinary.com/dbn0pogq1/video/upload/v1752730109/krnf7pscsghsazo0tvd4.mp3',
    id: '5',
  },
  {
    title: 'करो किरपा मोरे ख्वाजा महाराजा || Sarfaraz Chisty Qawwali 2023 || More khwaja Maharaja Qawwali 2023',
    artist: 'Halsey',
    artwork: 'https://res.cloudinary.com/dbn0pogq1/image/upload/v1752727561/rzhvlc4dpaaxbm3jykf5.jpg',
    url: 'https://res.cloudinary.com/dbn0pogq1/video/upload/v1752730207/ynuzsoxjbd5mapb7osqi.mp3',
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
