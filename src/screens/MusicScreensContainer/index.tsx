import {
  View
} from 'react-native';
import MusicListComponent from '../../components/MusicListComponet/MusicListComponent';
import { colors } from '../../styles/color';
import { songsList } from '../Home';
import { globalStyles } from '../../styles/globalStyles';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';

const MusicScreen = ({navigation}: any) => {
  return (
    
    <View style={globalStyles.globalContainer}>
      <CustomBackButton navigation={navigation}/>
      <MusicListComponent
        navigation={navigation}
        title="Made For Anas"
        songsList={songsList}
      />
    </View>
  );
};

export default MusicScreen;
