import { View } from 'react-native';
import AppNavigators from './src/Navigators/AppNavigators';
import StatusBarComponent from './src/components/StatusBarComponent/CustomStatusBar';
import { colors } from './src/styles/color';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBarComponent backgroundColor={colors.black} />
      <AppNavigators />
    </View>
  );
};

export default App;
