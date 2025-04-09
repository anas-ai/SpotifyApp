import {View} from 'react-native';
import VideoListComponent from '../../components/VideoLlistComponents/VideoListComponent';
import {globalStyles} from '../../styles/globalStyles';
import {videoUrls} from '../Home';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';

const VIDEO_SCREEN = ({navigation}: any) => {
  return (
    <View style={globalStyles.globalContainer}>
      <CustomBackButton navigation={navigation} />

      <VideoListComponent
        navigation={navigation}
        videoUrls={videoUrls}
        title="Videos"
        isHorizontal={true}
      />
    </View>
  );
};

export default VIDEO_SCREEN;
