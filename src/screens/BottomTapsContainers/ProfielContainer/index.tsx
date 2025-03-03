import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import SettingIcons from 'react-native-vector-icons/Feather';
import ProfileIcons from 'react-native-vector-icons/FontAwesome5';
import Chevronforward from 'react-native-vector-icons/Ionicons';
import FavoritsArtists from '../../../components/FavoritsItems/ArtistsComponent/FavoritsArtistsComponet';
import FavoritsSongs from '../../../components/FavoritsItems/FavoritsSongs/FavoritsSongs';
import FavroritsPodcast from '../../../components/FavoritsItems/FavrotisPodcast/FavroritsPodcase';
import FavouriteVideo from '../../../components/FavoritsItems/VideoFavroits/FavouriteVideo';
import ResponsiveText from '../../../components/ResponsiveText/ResponsiveText';
import { PNG_IMG } from '../../../constants/ImagesName';
import { colors } from '../../../styles/color';
import SelectPlaylist from '../../SelectAplaylistContainer';

/* ✅ Profile Items */
const ProfileItems = [
  {
    id: 1,
    icons: 'music',
    title: 'Liked Songs',
    count: '0',
    component: FavoritsSongs,
  },
  {
    id: 3,
    icons: 'microphone',
    title: 'Artists',
    count: '0',
    component: FavoritsArtists,
  },
  {
    id: 4,
    icons: 'podcast',
    title: 'Podcast',
    count: '0',
    component: FavroritsPodcast,
  },
  {
    id: 5,
    icons: 'list',
    title: 'Playlists',
    count: '0',
    component: SelectPlaylist,
  },
  {
    id: 6,
    icons: 'video',
    title: 'Videos',
    count: '0',
    component: FavouriteVideo,
  },
];

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const [selectedComponent, setSelectedComponent] = useState<React.FC | null>(
    null,
  );
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const switchComponent = (component: React.FC | null) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectedComponent(() => component);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => switchComponent(null)}>
          <ResponsiveText
            title={selectedComponent ? 'Back' : 'My Profile'}
            fontColor={colors.white}
            fontWeight="500"
            fontSize={22}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <SettingIcons name="settings" color={colors.white} size={25} />
        </TouchableOpacity>
      </View>

      <Animated.View style={{flex: 1, opacity: fadeAnim}}>
        {!selectedComponent ? (
          <>
            {/* ✅ Profile Section */}
            <View style={styles.ProfileContainer}>
              <View style={styles.ProfileImageContainer}>
                <Image source={PNG_IMG.VIRAT_PNG} style={styles.profileImage} />
                <ResponsiveText
                  title="Anas Rizvi"
                  fontColor={colors.white}
                  fontWeight="400"
                  fontSize={16}
                />
              </View>
              <TouchableOpacity activeOpacity={0.8}>
                <ResponsiveText
                  title="Edit"
                  fontColor={colors.ButtonColor}
                  fontWeight="400"
                  fontSize={16}
                />
              </TouchableOpacity>
            </View>

            {/* ✅ Profile Items List */}
            <FlatList
              data={ProfileItems}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => switchComponent(item.component)}>
                  <View style={styles.listItem(index)}>
                    <ProfileIcons
                      name={item.icons}
                      color={colors.white}
                      size={20}
                    />
                    <ResponsiveText
                      title={item.title}
                      fontSize={16}
                      fontColor={colors.white}
                      style={styles.listText}
                    />
                    <View style={styles.countContainer}>
                      <ResponsiveText
                        title={item.count}
                        fontColor={colors.white}
                        fontSize={14}
                      />
                      <Chevronforward
                        name="chevron-forward"
                        color={colors.white}
                        size={14}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        ) : (
          React.createElement(selectedComponent, {navigation})
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgBlack1,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(14),
    paddingVertical: scale(24),
  },
  ProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(10),
    paddingHorizontal: scale(14),
  },
  ProfileImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    flex: 1,
  },
  profileImage: {
    backgroundColor: colors.ButtonColor,
    height: scale(35),
    width: scale(35),
    borderRadius: scale(50),
  },
  listItem: (index: number) => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(12),
    paddingHorizontal: scale(15),
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
    margin: scale(4),
    marginTop: index === 0 ? scale(24) : scale(10),
  }),
  listText: {
    flex: 1,
    marginLeft: scale(15),
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
});

export default ProfileScreen;
