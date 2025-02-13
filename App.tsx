import {ActivityIndicator, View} from 'react-native';
import AppNavigators from './src/Navigators/AppNavigators';
import StatusBarComponent from './src/components/StatusBarComponent/CustomStatusBar';
import {colors} from './src/styles/color';
import {useAuth} from './src/hooks/useAuth';
import {globalStyles} from './src/styles/globalStyles';

const App = () => {
  const {isLoading} = useAuth();
  if (isLoading) {
    return (
      <View
        style={[
          globalStyles.globalContainer,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <ActivityIndicator size="large" color={colors.ButtonColor} />
      </View>
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
