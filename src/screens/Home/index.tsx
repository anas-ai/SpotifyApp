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
  {id: 1, TabName: 'All', },
  {id: 2, TabName: 'Video'},
  {id: 3, TabName: 'Music', screenNavigation:ScreenName.MUSIC_SCREEN},
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

const HomeScreen = ({navigation}: any) => {
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
            <TouchableOpacity key={index} onPress={() => {setSelectedTab(item.TabName); if(item?.screenNavigation){
              navigation.navigate(item?.screenNavigation)
            }}}>
              <ResponsiveText
                title={item.TabName}
                fontColor={selectedTab === item.TabName ? colors.black : colors.white}
                fontStyle={{
                  backgroundColor:
                    selectedTab === item.TabName ? colors.ButtonColor : 'transparent',
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
          title="To get you started"
          fontColor={colors.white}
          fontSize={24}
          fontWeight="700"
        />
        <View style={{marginTop: 20}}>
          <FlatList
            data={videoUrls}
            horizontal
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ScreenName.VIDEO_DETAILS_SCREEN, {
                    videoId: item.id,
                    videoUrl: item.link,
                  })
                }
                style={{marginRight: 15}}
                key={item.id}>
                <Image
                  source={{
                    uri: `https://img.youtube.com/vi/${
                      item.link.split('/')[4]
                    }/0.jpg`,
                  }}
                  style={{
                    width: screenWidth * 0.6,
                    height: screenHeight * 0.25,
                    borderRadius: 10,
                  }}
                />
                <ResponsiveText
                  title={`Video ${index + 1}`}
                  fontColor={colors.gray}
                  fontSize={14}
                  fontStyle={{
                    marginVertical: verticalScale(6),
                    textAlign: 'auto',
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

export default HomeScreen;
