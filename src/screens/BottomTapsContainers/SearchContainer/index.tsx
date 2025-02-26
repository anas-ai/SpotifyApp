import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '../../../styles/globalStyles';
import {colors} from '../../../styles/color';
import IconSearch from 'react-native-vector-icons/Feather';
import {moderateScale, scale} from 'react-native-size-matters';
import {useState} from 'react';
import ResponsiveText from '../../../components/ResponsiveText/ResponsiveText';
import {Image} from 'react-native';
import {PNG_IMG} from '../../../constants/ImagesName';
import {ScreenName} from '../../../constants/ScreensNames';

const browsingTabs = [
  {
    id: 1,
    title: 'Music',
    bgColor: colors.Neon_Pink,
    navigationScreen: ScreenName.MUSIC_SCREEN,
  },
  {
    id: 2,
    title: 'Poscasts',
    bgColor: colors.darkGreen,
    navigationScreen: ScreenName.PODCAST_SCREEN,
  },
  {
    id: 3,
    title: 'Video',
    bgColor: colors.bookmark_check_color,
    navigationScreen: ScreenName.VIDEO_SCREEN ,
  },
  {
    id: 4,
    title: 'Home',
    bgColor: colors.AritsOrangebg,
    navigationScreen: ScreenName.HOME_SCREEN,
  },
];

const screenHeight = Dimensions.get('screen').height;

const SearchScreenTab = ({navigation}: any) => {
  return (
    <View style={globalStyles.globalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate(ScreenName.SEARCH_SCRREN_MAIN)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: scale(5),
            paddingHorizontal: scale(10),
            height: scale(40),
          }}>
          <IconSearch size={scale(24)} name="search" color={colors.bgBlack} />

          <ResponsiveText
            title="What do You want to listen to?"
            fontColor={colors.bgBlack}
            fontWeight="bold"
            fontStyle={{paddingLeft: scale(10)}}
          />
        </View>
      </TouchableOpacity>
      <ResponsiveText
        title="Start browsing"
        fontColor={colors.white}
        fontWeight="bold"
        fontStyle={{marginTop: scale(16)}}
      />
      <View>
        <FlatList
          data={browsingTabs}
          numColumns={2}
          key={2}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate(item.navigationScreen)}>
              <View
                style={{
                  backgroundColor: item?.bgColor,
                  marginLeft: index % 2 === 0 ? 0 : scale(16),
                  height: screenHeight * 0.06,
                  width: scale(150),
                  marginTop: scale(16),
                  borderRadius: scale(5),
                  paddingHorizontal: scale(10),
                  paddingVertical: scale(4),
                  overflow: 'hidden',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <ResponsiveText
                  title={item?.title}
                  fontColor={colors.white}
                  fontWeight="bold"
                />
                <Image
                  source={PNG_IMG.ARTIS_IMG}
                  style={{height: 50, width: 50}}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default SearchScreenTab;

const styles = StyleSheet.create({});
