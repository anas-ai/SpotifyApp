import React, {useCallback} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import IconLeft from 'react-native-vector-icons/AntDesign';
import {colors} from '../../styles/color';
import ResponsiveText from '../ResponsiveText/ResponsiveText';
import {ScreenName} from '../../constants/ScreensNames';
import {useNavigation} from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;

// ✅ Static podcast list (replace or pass from parent later)

const LiveList = [
  {
    id: 1,
    videoId: 'MLba5f7ErNg',
    title:
      'LIVE जश्ने मौलूदे काबा || हुसैनी सोसाइटी || Sayed Sound || Moula Ali || Irfan Tufail || Kamar Warsi',
  },
  {id: 2, videoId: 'A7XbhTCIJhU', title: 'LIVE जश्ने मौलूदे काबा || हुसैनी सोसाइटी || Sayed Sound || Moula Ali || Irfan Tufail || Kamar Warsi'},
  {
    id: 3,
    videoId: 'bWfgrl7_kyg',
    title:
      'LIVE उर्स मुबारक हजरत छोटू बादशाह || Ratlam LIVE Conference || एजुकेशन कॉन्फ्रेंस 23 वां उर्स मुबारक',
  },
  {id: 4, videoId: 'aAPflzUr8tI', title: 'LIVE उर्स मुबारक हजरत छोटू बादशाह || Allama Ahmad Nakshbanddi'},
  {
    id: 5,
    videoId: 'GhDKJ-RJwSY',
    title: 'जश्ने गौसुलवरा || Live Kota || Allama Ahmad Nakshbanddi || Abdul Qadir Bapu || Mahawali Sound Kota',
  },
  {
    id: 6,
    videoId: 'DrGZN27IPgI',
    title:
      'LIVE रईस अनीस साबरी || 41 वा उर्स मुबारक छापर वाले बाबा 2024 || Jafar Shadab || Rais Anis Sabri',
  },
  {
    id: 7,
    videoId: 'ozW9y071jfg',
    title: 'LIVE 97 वा उर्स मुबारक मंसूर अली बाबा || Mujtaba Aziz Naza || Aaftab Qadri || Usman Pathan',
  },
  {id: 8, videoId: '6pOCTou77EY', title: 'LIVE 97 वा उर्स मुबारक मंसूर अली बाबा || Mujtaba Aziz Naza || Aaftab Qadri || Usman Pathan'},
  // {
  //   id: 9,
  //   videoId: 'kJQP7kiw5Fk',
  //   title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
  // },
  // {id: 10, videoId: '60ItHLz5WEA', title: 'Alan Walker - Faded'},
  // {id: 11, videoId: 'CevxZvSJLk8', title: 'Katy Perry - Roar'},
  // {id: 12, videoId: '2Vv-BfVoq4g', title: 'Ed Sheeran - Perfect'},
  // {id: 13, videoId: 'JGwWNGJdvx8', title: 'Ed Sheeran - Shape of You'},
];

interface PodcastItem {
  id: number;
  videoId: string;
  title: string;
}

const LiveComponent = () => {
  const getThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  };

  const navigation = useNavigation();

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: screenHeight * 0.32 + scale(30), // height + margin
      offset: (screenHeight * 0.32 + scale(30)) * index,
      index,
    }),
    [],
  );
  return (
    <View>
      <ResponsiveText
        title="Most Heard In India"
        fontSize={14}
        fontColor={colors.gray}
        fontWeight="600"
        fontStyle={{marginTop: scale(30)}}
      />

      <View style={styles.header}>
        <ResponsiveText
          title="Live"
          fontColor={colors.white}
          fontSize={20}
          fontWeight="bold"
        />

        {/* <TouchableOpacity style={styles.viewAllButton}>
          <ResponsiveText
            title="View all"
            fontColor={colors.gray}
            fontSize={14}
          />
          <IconLeft name="right" size={14} color={colors.gray} />
        </TouchableOpacity> */}
      </View>

      <FlatList
        data={LiveList}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={7}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
        ListFooterComponent={() => (
          <View style={[styles.footer, {paddingBottom: scale(60)}]}>
            <ResponsiveText title="No more items" fontColor={colors.white} />
          </View>
        )}
        contentContainerStyle={{paddingBottom: scale(20)}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate(ScreenName.LIVE_DETAILS_SCREEN, {
                liveItems: item,
                Livelist: LiveList,
              })
            }>
            <Image
              source={{uri: getThumbnail(item.videoId)}}
              style={styles.thumbnail}
            />
            <View style={styles.titleContainer}>
              <ResponsiveText
                title={
                  item.title.length > 25
                    ? item.title.substring(0, 25) + '...'
                    : item.title
                }
                fontColor={colors.white}
                fontStyle={styles.title}
                fontSize={14}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: scale(10),
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  footer: {
    marginBottom: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginTop: scale(20),
  },
  thumbnail: {
    height: screenHeight * 0.32,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: scale(10),
  },
  titleContainer: {
    marginTop: scale(10),
  },
  title: {
    textAlign: 'center',
    lineHeight: scale(22),
  },
});

export default LiveComponent;
