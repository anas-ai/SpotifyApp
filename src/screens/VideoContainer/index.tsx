import { View } from 'react-native';
import VideoListComponent from '../../components/VideoLlistComponents/VideoListComponent';
import { globalStyles } from '../../styles/globalStyles';
import { videoUrls } from '../Home';

const VIDEO_SCREEN = ({navigation}: any) => {
  return (
    <View style={globalStyles.globalContainer}>
      <VideoListComponent
        navigation={navigation}
        videoUrls={videoUrls}
        title="Videos"
      />
    </View>
  );
};

export default VIDEO_SCREEN;
