import {View, Text} from 'react-native';
import PodcastListComponent from '../../components/PodcastListComponent/PodcastListComponent';
import { globalStyles } from '../../styles/globalStyles';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';

const PodcastScreen = ({navigation}:any) => {
  return (
    <View style={globalStyles.globalContainer}>
      <PodcastListComponent />
    </View>
  );
};

export default PodcastScreen;
