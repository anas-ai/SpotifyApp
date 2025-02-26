import {
  Dimensions,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../../styles/color';
import {moderateScale, scale} from 'react-native-size-matters';
import {useRef, useState} from 'react';
import {useAuth} from '../../../../hooks/useAuth';
import {song, songsList} from '../../../Home';
import {ScreenName} from '../../../../constants/ScreensNames';
import ResponsiveText from '../../../../components/ResponsiveText/ResponsiveText';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const SearchScreenMain = ({navigation}: any) => {
  const [search, setSearch] = useState<string>('');
  const [filteredSongs, setFilteredSongs] = useState<song[]>([]);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredSongs([]);
    } else {
      const filtered = songsList.filter(song =>
        song.title.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredSongs(filtered);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.bgBlack1}}>
      <View
        style={{
          backgroundColor: colors.graytextColor,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          height: scale(50),
          paddingHorizontal: 12,
        }}>
        <Icon
          name="arrow-back"
          size={30}
          color={colors.white}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          placeholder="What do you want to listen to?"
          placeholderTextColor={colors.gray}
          value={search}
          onChangeText={handleSearch}
          style={{color: colors.white, fontSize: moderateScale(16)}}
        />
      </View>
      {filteredSongs.length > 0 ? (
        <FlatList
          data={filteredSongs}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                padding: scale(12),
                borderRadius: scale(10),
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: scale(10),
                gap: scale(20),
              }}
              onPress={() =>
                navigation.navigate(ScreenName.MUSIC_DETAILS_SCREEN, {
                  selectedSong: item,
                  songsList: filteredSongs,
                })
              }>
              <Image
                source={{uri: item?.artwork}}
                style={{
                  height: screenHeight * 0.05,
                  width: screenWidth * 0.1,
                  borderRadius: scale(5),
                }}
              />
              <ResponsiveText
                title={item?.title}
                fontColor={colors.white}
                fontSize={14}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ResponsiveText
              title="Play what you love"
              fontColor={colors.white}
              fontSize={18}
              fontWeight="bold"
            />
            <ResponsiveText
              title="Search for artists,songs,podcasts,and more."
              fontColor={colors.gray}
              fontSize={14}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default SearchScreenMain;
