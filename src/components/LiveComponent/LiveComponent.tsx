import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
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
import {LiveItem} from '../../Contexts/Reducers/liveFvReducer';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const LiveList = [
  {
    id: 1,
    videoId: 'MLba5f7ErNg',
    title:
      'LIVE जश्ने मौलूदे काबा || हुसैनी सोसाइटी || Sayed Sound || Moula Ali || Irfan Tufail || Kamar Warsi',
  },
  {
    id: 2,
    videoId: 'A7XbhTCIJhU',
    title:
      'LIVE जश्ने मौलूदे काबा || हुसैनी सोसाइटी || Sayed Sound || Moula Ali || Irfan Tufail || Kamar Warsi',
  },
  {
    id: 3,
    videoId: 'bWfgrl7_kyg',
    title:
      'LIVE उर्स मुबारक हजरत छोटू बादशाह || Ratlam LIVE Conference || एजुकेशन कॉन्फ्रेंस 23 वां उर्स मुबारक',
  },
  {
    id: 4,
    videoId: 'aAPflzUr8tI',
    title: 'LIVE उर्स मुबारक हजरत छोटू बादशाह || Allama Ahmad Nakshbanddi',
  },
  {
    id: 5,
    videoId: 'GhDKJ-RJwSY',
    title:
      'जश्ने गौसुलवरा || Live Kota || Allama Ahmad Nakshbanddi || Abdul Qadir Bapu || Mahawali Sound Kota',
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
    title:
      'LIVE 97 वा उर्स मुबारक मंसूर अली बाबा || Mujtaba Aziz Naza || Aaftab Qadri || Usman Pathan',
  },
  {
    id: 8,
    videoId: '6pOCTou77EY',
    title:
      'LIVE 97 वा उर्स मुबारक मंसूर अली बाबा || Mujtaba Aziz Naza || Aaftab Qadri || Usman Pathan',
  },
];

interface LiveComponentProps {
  isHorizontal?: boolean;
  heading?: string;
  url: string;
  id: number;
  videoId: string;
  title: string;
}


const LiveComponent: React.FC<LiveComponentProps> = ({
  isHorizontal = false,
  title,
  heading,
}) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getThumbnail = (videoId: string) =>
    `https://img.youtube.com/vi/${videoId}/0.jpg`;

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: screenHeight * 0.32 + scale(30),
      offset: (screenHeight * 0.32 + scale(30)) * index,
      index,
    }),
    [],
  );

  return (
    <View>
      {heading ? (
        <ResponsiveText
          title={heading}
          fontSize={14}
          fontColor={colors.gray}
          fontWeight="600"
        />
      ) : null}

      {title ? (
        <View style={styles.header}>
          <ResponsiveText
            title={title}
            fontColor={colors.white}
            fontSize={25}
            fontWeight="bold"
            fontStyle={{marginTop: isHorizontal ? 0 : scale(30)}}
          />
        </View>
      ) : null}

      <FlatList<LiveItem>
        data={LiveList}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={!isHorizontal && false}
        showsHorizontalScrollIndicator={isHorizontal && false}
        horizontal={isHorizontal}
        getItemLayout={!isHorizontal ? getItemLayout : undefined}
        contentContainerStyle={[styles.listContainer]}
        ListFooterComponent={
          !isHorizontal
            ? () => (
                <View style={[styles.footer, {paddingBottom: scale(60)}]}>
                  <ResponsiveText
                    title="No more items"
                    fontColor={colors.white}
                  />
                </View>
              )
            : null
        }
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.card,
              isHorizontal
                ? {
                    width: screenWidth * 0.6,
                    marginRight: scale(15),
                  }
                : {marginTop: scale(20)},
            ]}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate(ScreenName.LIVE_DETAILS_SCREEN, {
                liveItems: item,
                Livelist: LiveList,
              })
            }>
            <Image
              source={{uri: getThumbnail(item.videoId)}}
              style={[
                styles.thumbnail,
                isHorizontal && {width: '100%', height: screenHeight * 0.25},
              ]}
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
  footer: {
    marginBottom: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    paddingBottom: scale(20),
  },
  card: {
    flex: 1,
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
