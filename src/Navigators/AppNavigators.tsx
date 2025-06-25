import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenName } from '../constants/ScreensNames';
import { AuthStack } from '../routes';
import TabNavigator from './TabNavigator/TabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigators = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenName.SIGNUP_OR_LOGIN}>
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
        
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigators;
