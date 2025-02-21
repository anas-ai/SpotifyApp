import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScreenName} from '../../constants/ScreensNames';
import HomeScreen from '../../screens/Home';
import ProfileScreen from '../../screens/ProfielContainer';
import SearchScreenTab from '../../screens/BottomTapsContainers/SearchContainer';
import {colors} from '../../styles/color';
import PostScreen from '../../screens/BottomTapsContainers/PostContainer';
import ShortsVideoScreen from '../../screens/BottomTapsContainers/ShortsContainers';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}: any) => ({
        tabBarStyle: {
          height: scale(56),
          backgroundColor: 'transparent',
          position: 'absolute',
          elevation: 1,
          borderTopWidth: 1,
          width: '100%',
        },
        tabBarIcon: ({focused, color, size}: any) => {
          let iconName;

          if (route.name === ScreenName.HOME_SCREEN) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === ScreenName.SEARCH_SCREEN) {
            iconName = focused ? 'movie-search' : 'movie-search-outline';
          } else if (route.name === ScreenName.POST_SCREEN) {
            iconName = focused ? 'plus-box' : 'plus-box';
          } else if (route.name === ScreenName.SHORTS_VIDEO_SCREEN) {
            iconName = focused ? 'video-plus' : 'video-plus-outline';
          } else if (route.name === ScreenName.PROFILE_SCREEN) {
            iconName = focused ? 'account-outline' : 'account';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.ButtonColor,
        tabBarInactiveTintColor: colors.white,
      })}>
      <Tab.Screen
        name={ScreenName.HOME_SCREEN}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={ScreenName.SEARCH_SCREEN}
        component={SearchScreenTab}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={ScreenName.POST_SCREEN}
        component={PostScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={ScreenName.SHORTS_VIDEO_SCREEN}
        component={ShortsVideoScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={ScreenName.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
