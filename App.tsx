import {ActivityIndicator, View, AppState} from 'react-native';
import {useEffect} from 'react';
import AppNavigators from './src/Navigators/AppNavigators';
import StatusBarComponent from './src/components/StatusBarComponent/CustomStatusBar';
import {colors} from './src/styles/color';
import {useAuth} from './src/hooks/useAuth';
import {globalStyles} from './src/styles/globalStyles';
import TrackPlayer from 'react-native-track-player';
import LottieLoader from './src/components/AnimationsComponent/LottieLoader';

const App = () => {
  const {isLoading} = useAuth();

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

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  if (isLoading) {
    return (
      // <View
      //   style={[
      //     globalStyles.globalContainer,
      //     {alignItems: 'center', justifyContent: 'center'},
      //   ]}>
      //   <ActivityIndicator size="large" color={colors.ButtonColor} />
      // </View>
      <LottieLoader/>
    );
  }

  return (
    <View style={{flex: 1}}>
      <StatusBarComponent backgroundColor={colors.black} />
      <AppNavigators />
    </View>
  );
};

export default App;
