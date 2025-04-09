import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {ScreenName} from '../../constants/ScreensNames';
import {colors} from '../../styles/color';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MusicListComponent = ({
  navigation,
  title = '',
  songsList,
  isHorizontal = false,
  
}: any) => {
  const SongCard = ({song, onPress, index}: any) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: !isHorizontal ? 'row' : 'column',
        marginTop: !isHorizontal ? scale(20) : 0,
        alignItems:!isHorizontal ? 'center' :'center',
        justifyContent:!isHorizontal ?'space-between':'center',
        borderWidth:!isHorizontal?scale(1):0,
        borderColor:!isHorizontal ?colors.gray:'',
        padding:!isHorizontal ? 10:0,
        borderRadius:!isHorizontal?scale(8):0,
      }}
      activeOpacity={0.9}>
      <Image
        source={{uri: song?.artwork}}
        style={{
          width: isHorizontal ? screenWidth * 0.5 : scale(80),
          height: isHorizontal ? screenHeight * 0.25 : scale(80),
          borderRadius:scale(10),
          marginRight:index===0?0:15
        }}
        resizeMode="contain"
      />
      <ResponsiveText
        title={song?.title}
        fontColor={colors.white}
        fontSize={14}
        fontStyle={{marginVertical: verticalScale(6), textAlign: 'center'}}
      />
    </TouchableOpacity>
  );
  return (
    <View style={{marginTop:isHorizontal?0:0}}>
      <ResponsiveText
        title={isHorizontal?title:''}
        fontColor={colors.white}
        fontSize={24}
        fontWeight="700"
      />
      <View style={{marginTop: isHorizontal?scale(20):0}}>
        <FlatList
          data={songsList}
          horizontal={isHorizontal}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{marginBottom:scale(170)}}/>}
          renderItem={({item, index}) => (
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
  );
};

export default MusicListComponent;
