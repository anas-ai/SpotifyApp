import {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {ScreenName} from '../../constants/ScreensNames';
import {colors} from '../../styles/color';
import {globalStyles} from '../../styles/globalStyles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeTab = [
  {id: 1, TabName: 'All'},
  {id: 2, TabName: 'Video', screenNavigation: ScreenName.HOME_SCREEN_IN_AUTH},
  {id: 3, TabName: 'Music', screenNavigation: ScreenName.MUSIC_SCREEN},
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

const MusicScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  return (
    <SafeAreaView style={globalStyles.globalContainer}>
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
              onPress={() => {
                setSelectedTab(item.TabName);
                if (item?.screenNavigation) {
                  navigation.navigate(item?.screenNavigation);
                }
              }}>
              <ResponsiveText
                title={item.TabName}
                fontColor={
                  selectedTab === item.TabName ? colors.black : colors.white
                }
                fontStyle={{
                  backgroundColor:
                    selectedTab === item.TabName
                      ? colors.ButtonColor
                      : 'transparent',
                  paddingVertical: scale(8),
                  paddingHorizontal: scale(20),
                  borderRadius: scale(20),
                  textAlign: 'center',
                  borderColor:
                    selectedTab === item.TabName ? colors.white : colors.white,
                  borderWidth: selectedTab === item.TabName ? 0.5 : 1,
                }}
                fontSize={13}
                fontWeight="700"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{marginTop: scale(50)}}>
        <ResponsiveText
          title="Made For Anas"
          fontColor={colors.white}
          fontSize={24}
          fontWeight="700"
        />
        <View style={{marginTop: 20}}>
          <FlatList
            data={songsList}
            horizontal
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
              onPress={() =>
                navigation.navigate(ScreenName.MUSIC_DETAILS_SCREEN, {
                  selectedSong: item,
                  songsList: songsList,
                })
              }
              
                style={{marginRight: 15}}
                key={item.id}>
                <Image
                  source={{uri: item?.artwork}}
                  style={{
                    width: screenWidth * 0.6,
                    height: screenHeight * 0.25,
                    borderRadius: 10,
                  }}
                />
                <ResponsiveText
                  title={item?.title}
                  fontColor={colors.gray}
                  fontSize={14}
                  fontStyle={{
                    marginVertical: verticalScale(6),
                    textAlign: 'center',
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
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
export default MusicScreen;
