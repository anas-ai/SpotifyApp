import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconPlus from 'react-native-vector-icons/MaterialCommunityIcons';
import IconDownload from 'react-native-vector-icons/MaterialCommunityIcons';
import IconDotsHorizontal from 'react-native-vector-icons/MaterialCommunityIcons';
import IconSuffle from 'react-native-vector-icons/MaterialCommunityIcons';

import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {PNG_IMG} from '../../constants/ImagesName';
import {ScreenName} from '../../constants/ScreensNames';
import {colors} from '../../styles/color';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MusicDetailsScreen = ({navigation, route}) => {
  const {songsList} = route.params || {};

  return (
    <LinearGradient
      colors={[colors.graytextColor, '#2a2a2a', '#241001', '#000000']}
      style={{
        flex: 1,
        paddingVertical: scale(10),
        paddingHorizontal: scale(14),
      }}>
      <View>
        {/* Back Button */}
        <Icon
          name="arrow-back"
          size={30}
          color={colors.white}
          onPress={() => navigation.navigate(ScreenName.HOME_SCREEN_IN_AUTH)}
          style={{marginBottom: scale(10)}}
        />

        {/* Search Bar */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.DarkerTone,
              height: scale(42),
              borderRadius: scale(8),
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: scale(12),
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Icon name="search" size={24} color={colors.white} />
            <TextInput
              placeholder="Find in playlist"
              placeholderTextColor={colors.graytextColor}
              style={{
                flex: 1,
                color: colors.white,
                fontSize: scale(14),
                fontWeight: '600',
                marginLeft: scale(8),
              }}
              keyboardType="twitter"
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: scale(60),
              height: scale(42),
              backgroundColor: '#1E1E1E',
              borderRadius: scale(6),
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: scale(10),
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <ResponsiveText
              title="Sort"
              fontColor={colors.white}
              fontWeight="500"
              fontSize={14}
            />
          </TouchableOpacity>
        </View>

        {/* Artist Image */}
        <View style={{alignItems: 'center', marginTop: scale(24)}}>
          <Image
            source={{uri: songsList?.artwork}}
            style={{
              width: screenWidth * 0.6,
              height: screenHeight * 0.3,
              borderRadius: scale(12),
              borderWidth: 2,
              borderColor: '#704830',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.3,
              shadowRadius: 6,
            }}
          />
        </View>
        <ResponsiveText
          title={songsList?.title}
          fontColor={colors.gray}
          fontStyle={{marginTop: scale(10), textAlign: 'center'}}
          fontSize={13}
          fontWeight="600"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: scale(5),
        }}>
        <Image
          source={PNG_IMG.SPOTIFY_ICONS_PNG}
          style={{height: 24, width: 24, resizeMode: 'contain'}}
        />
        <ResponsiveText
          title="Made for you"
          fontColor={colors.gray}
          fontSize={13}
          fontWeight="500"
        />
      </View>
      <ResponsiveText
        title="2h 44 min"
        fontColor={colors.gray}
        fontSize={13}
        fontWeight="500"
        fontStyle={{marginTop: 10}}
      />
      <View>
        <View
          style={{
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
            marginTop: scale(8),
          }}>
          <IconPlus
            name="plus-circle"
            size={24}
            color={colors.white}
            style={{width:scale(30)}}
          />
          <IconDownload
            name="download-circle"
            size={24}
            color={colors.white}
            style={styles.IconStyle}
          />
          <IconDotsHorizontal
            name="dots-horizontal"
            size={24}
            color={colors.white}
            style={styles.IconStyle}
          />
        </View>
        <View>
          <IconSuffle name='shuffle' size={24} color={colors.white} style={{width:scale(30)}}/>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  IconStyle:{width:scale(30)}
})
export default MusicDetailsScreen;
