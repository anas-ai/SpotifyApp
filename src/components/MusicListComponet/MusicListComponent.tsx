import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {ScreenName} from '../../constants/ScreensNames';
import {colors} from '../../styles/color';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SongCard = ({song, onPress}) => (
  <TouchableOpacity onPress={onPress} style={{marginRight: 15}}>
    <Image
      source={{uri: song?.artwork}}
      style={{
        width: screenWidth * 0.6,
        height: screenHeight * 0.25,
        borderRadius: 10,
      }}
    />
    <ResponsiveText
      title={song?.title}
      fontColor={colors.gray}
      fontSize={14}
      fontStyle={{marginVertical: verticalScale(6), textAlign: 'center'}}
    />
  </TouchableOpacity>
);

const MusicListComponent = ({navigation, title = '', songsList}:any) => {
  return (
    <SafeAreaView>
      <View style={{marginTop: scale(10)}}>
        <ResponsiveText
          title={title}
          fontColor={colors.white}
          fontSize={24}
          fontWeight="700"
        />
        <View style={{marginTop: 20}}>
          <FlatList
            data={songsList}
            horizontal
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <SongCard
                song={item}
                onPress={() =>
                  navigation.navigate(ScreenName.MUSIC_DETAILS_SCREEN, {
                    selectedSong: item,
                    songsList: songsList,
                  })
                }
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MusicListComponent;
