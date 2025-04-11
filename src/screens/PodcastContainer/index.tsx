import {View, Text} from 'react-native';
import PodcastListComponent from '../../components/PodcastListComponent/PodcastListComponent';
import {globalStyles} from '../../styles/globalStyles';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';
import {podcastitem} from '../Home';

const PodcastScreen = ({navigation}: any) => {
  return (
    <View style={globalStyles.globalContainer}>
      <CustomBackButton navigation={navigation} title="Podcast" />
      <PodcastListComponent
        podcastitem={podcastitem}
        navigation={navigation}
        title=""
        subTitle="Trending Podcasts"
      />
    </View>
  );
};

export default PodcastScreen;
