import React, {useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import SettingIcons from 'react-native-vector-icons/Feather';
import ProfileIcons from 'react-native-vector-icons/FontAwesome5';
import Chevronforward from 'react-native-vector-icons/Ionicons';
import FavoritsArtists from '../../../components/FavoritsItems/LiveComponent/FavoritsLiveComponet';
import FavoritsSongs from '../../../components/FavoritsItems/FavoritsSongs/FavoritsSongs';
import FavouriteVideo from '../../../components/FavoritsItems/VideoFavroits/FavouriteVideo';
import ResponsiveText from '../../../components/ResponsiveText/ResponsiveText';
import {PNG_IMG} from '../../../constants/ImagesName';
import {useAuth} from '../../../hooks/useAuth';
import {colors} from '../../../styles/color';
import FavroritsPodcast from '../../../components/FavoritsItems/FavrotisPodcast/FavroritsPodcast';
import FavoritsLive from '../../../components/FavoritsItems/LiveComponent/FavoritsLiveComponet';
import {Divider} from '@rneui/themed';
import {ScreenName} from '../../../constants/ScreensNames';
import {useThemeStore} from '../../../store/themes';
// import { Text } from 'react-native-svg';
import {Text} from 'react-native';

const ProfileScreen = ({navigation}: any) => {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const {mode, setMode, resolvedTheme} = useThemeStore();

  const toggleTheme = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
  };

  const isDark = resolvedTheme === 'dark';

  type NavigableComponent = React.FC<{navigation: any}>;

  const [selectedComponent, setSelectedComponent] =
    useState<NavigableComponent | null>(null);

  const {favoriteVideosCount, favoriteSongsCount} = useAuth();

  /* ✅ Profile Items */
  const ProfileItems = [
    {
      id: 1,
      icons: 'music',
      title: 'Liked Songs',
      // count: favoriteSongsCount?.toString(),
      component: FavoritsSongs,
    },
    {
      id: 3,
      icons: 'globe',
      title: 'Live',
      component: FavoritsLive,
    },

    // {
    //   id: 5,
    //   icons: 'list',
    //   title: 'Playlists',
    //   count: '0',
    //   component: SelectPlaylist,
    // },
    {
      id: 6,
      icons: 'video',
      title: 'Videos',
      // count: favoriteVideosCount?.toString(),
      component: FavouriteVideo,
    },
    {
      id: 4,
      icons: 'podcast',
      title: 'Podcast',
      // count: '0',
      component: FavroritsPodcast,
    },
  ];

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
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDark ? colors.bgBlack1 : colors.white},
      ]}>
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSettingsModalVisible(true)}>
          <SettingIcons name="settings" color={colors.white} size={25} />
        </TouchableOpacity>
      </View>

      <Animated.View style={{flex: 1, opacity: fadeAnim}}>
        {!selectedComponent ? (
          <>
            {/* ✅ Profile Section */}
            <View style={styles.ProfileContainer}>
              <View style={styles.ProfileImageContainer}>
                <Image
                  source={PNG_IMG.APP_LOGO_WEBP}
                  style={styles.profileImage}
                />
                <ResponsiveText
                  title="user"
                  fontColor={colors.white}
                  fontWeight="400"
                  fontSize={16}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate(ScreenName.EDIT_PROFILE_SCREEN)
                }>
                <ResponsiveText
                  title="Edit"
                  fontColor={colors.ButtonColor}
                  fontWeight="400"
                  fontSize={16}
                />
              </TouchableOpacity>
            </View>

            {/* ✅ Profile Items List */}
            <ResponsiveText
              title="My Favorites"
              fontColor={colors.white}
              fontWeight="500"
              fontSize={20}
              fontStyle={{alignSelf: 'center'}}
            />
            <FlatList
              data={ProfileItems}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => switchComponent(item.component)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: scale(12),
                      paddingHorizontal: scale(15),
                      borderBottomWidth: 0.5,
                      borderBottomColor: '#333',
                      margin: scale(4),
                      marginTop: index === 0 ? scale(24) : scale(10),
                      justifyContent: 'space-between',
                    }}>
                    {/* Left Section: Icon + Title */}

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: scale(10),
                      }}>
                      <ProfileIcons
                        name={item.icons}
                        color={colors.white}
                        size={20}
                      />
                      <ResponsiveText
                        title={item.title}
                        fontSize={16}
                        fontColor={colors.white}
                      />
                    </View>

                    {/* Right Section: Count + Chevron */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: scale(10),
                      }}>
                      <ResponsiveText fontColor={colors.white} fontSize={14} />
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

      <Modal
        visible={settingsModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setSettingsModalVisible(false)}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.bgBlack1,
            padding: scale(16),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: scale(20),
            }}>
            <ResponsiveText
              title="Settings"
              fontColor={colors.white}
              fontWeight="500"
              fontSize={22}
            />
            <TouchableOpacity onPress={() => setSettingsModalVisible(false)}>
              <SettingIcons name="x" size={25} color={colors.white} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: scale(26),
            }}>
            <View>
              <ResponsiveText
                title="Anas Rizvi"
                fontColor={colors.white}
                fontWeight="500"
                fontSize={18}
              />
              <ResponsiveText
                title="anasrizvi4206@gmail.com"
                fontColor={colors.gray}
                fontWeight="400"
                fontSize={12}
              />
            </View>

            <Image
              source={PNG_IMG.VIRAT_PNG}
              style={{
                height: scale(80),
                width: scale(80),
                borderRadius: scale(50),
              }}
            />
          </View>

          {/* <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate(ScreenName.EDIT_PROFILE_SCREEN)}>
            <ResponsiveText
              title="Edit Profile"
              fontColor={colors.white}
              fontWeight="500"
              fontSize={16}
              fontStyle={{marginTop: scale(20)}}
            />
          </TouchableOpacity> */}
          <TouchableOpacity activeOpacity={0.9}>
            <ResponsiveText
              title="Log Out"
              fontColor={colors.ButtonColor}
              fontWeight="500"
              fontSize={16}
              fontStyle={{marginTop: scale(18)}}
            />
          </TouchableOpacity>

          <Switch
            value={mode === 'dark'}
            onValueChange={toggleTheme}
            thumbColor={colors.white}
            trackColor={{false: '#666', true: colors.ButtonColor}}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgBlack1,
    paddingTop: scale(30),
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

  listText: {
    flex: 1,
    marginLeft: scale(15),
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.bgBlack1, // or any full-screen background
    padding: scale(16),
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(20),
  },

  modalBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
