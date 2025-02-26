import {
  View
} from 'react-native';
import MusicListComponent from '../../components/MusicListComponet/MusicListComponent';
import { colors } from '../../styles/color';
import { songsList } from '../Home';

const MusicScreen = ({navigation}: any) => {
  return (
    <View style={{}}>
      <MusicListComponent
        navigation={navigation}
        title="Made For Anas"
        songsList={songsList}
      />
    </View>
  );
};

export default MusicScreen;
