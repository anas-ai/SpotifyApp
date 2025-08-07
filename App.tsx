import {ActivityIndicator, View, AppState} from 'react-native';
import {useEffect, useState} from 'react';
import AppNavigators from './src/Navigators/AppNavigators';
import StatusBarComponent from './src/components/StatusBarComponent/CustomStatusBar';
import {colors} from './src/styles/color';
import {useAuth} from './src/hooks/useAuth';
import {globalStyles} from './src/styles/globalStyles';
import TrackPlayer from 'react-native-track-player';
import LottieLoader from './src/components/AnimationsComponent/LottieLoader';
import {NavigationContainer} from '@react-navigation/native';
import { useThemeStore } from './src/store/themes';
import { darkTheme, lightTheme } from './src/utils/themes';

const App = () => {
  const {isLoading} = useAuth();
  const {resolvedTheme,initializeTheme} = useThemeStore();
  const [themeLoading,setThemeLoading] = useState(true);

  useEffect(()=>{
    const loadTheme = async()=>{
      await initializeTheme();
      setThemeLoading(false)
    }
    loadTheme();
  },[])

  const appTheme = resolvedTheme === 'dark'? darkTheme : lightTheme;

  

  

  useEffect(() => {
    const initTrackPlayer = async () => {
      await TrackPlayer.setupPlayer();
    };

    initTrackPlayer();

    // Listen for App State Changes
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        TrackPlayer.pause(); // Pause when app goes in background
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  if (isLoading || themeLoading) {
    return (
      // <View
      //   style={[
      //     globalStyles.globalContainer,
      //     {alignItems: 'center', justifyContent: 'center'},
      //   ]}>
      //   <ActivityIndicator size="large" color={colors.ButtonColor} />
      // </View>
      <LottieLoader />
    );
  }

  return (
    <View style={{flex: 1}}>
      <StatusBarComponent backgroundColor={colors.black} />
      <NavigationContainer theme={appTheme}>
        <AppNavigators />
      </NavigationContainer>
    </View>
  );
};

export default App;
