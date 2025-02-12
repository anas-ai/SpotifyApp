import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenName } from '../constants/ScreensNames';
import { AuthStack } from '../routes';
import TabNavigator from './TabNavigator/TabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigators = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenName.MUSIC_SCREEN}>
        {AuthStack.map((item, index) => (
          <Stack.Screen
            key={index}
            name={item?.name}
            component={item?.Component}
            options={{
              headerShown: false,
              gestureEnabled: true,
              animation: 'slide_from_right',
              animationDuration: 500,
            }}
          />
        ))}
        {/* MainTabs screen will be used for the TabNavigator */}
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator} // This should navigate to the tab navigator with the unique home screen name
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigators;
