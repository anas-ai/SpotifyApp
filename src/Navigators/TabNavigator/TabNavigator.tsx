import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScreenName} from '../../constants/ScreensNames';
import HomeScreen from '../../screens/Home';
import ProfileScreen from '../../screens/ProfielContainer';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarStyle: {
        height: scale(56),
        backgroundColor: 'transparent',
        position: 'absolute',
        elevation: 0,
        borderTopWidth: 0,
        width: '100%',
      },
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === ScreenName.HOME_SCREEN) {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === ScreenName.PROFILE_SCREEN) {
          iconName = 'account-outline';
        } else {
          iconName = 'dots-horizontal';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarShowLabel: true,
      tabBarActiveTintColor: '#FFF',
      tabBarInactiveTintColor: '#888',
    })}>
    <Tab.Screen
      name={ScreenName.HOME_SCREEN} // Ensure it's using the unique name
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name={ScreenName.PROFILE_SCREEN}
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
  );
};

export default TabNavigator;
