import { View } from 'react-native';
import LiveComponent from '../../components/LiveComponent/LiveComponent';

const LiveScreen = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <LiveComponent title="All Live Videos" url={''} id={0} videoId={''}/>
    </View>
  );
};

export default LiveScreen;
