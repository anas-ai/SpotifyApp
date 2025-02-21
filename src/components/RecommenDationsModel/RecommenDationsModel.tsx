import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { scale } from 'react-native-size-matters';
import IconClose from 'react-native-vector-icons/AntDesign';
import { colors } from '../../styles/color';
import ResponsiveText from '../ResponsiveText/ResponsiveText';

const RecommenDationsModel = ({isVisible, setIsVisible}: any) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn="slideInUp"
      backdropOpacity={0.8}
      onBackdropPress={() => setIsVisible(false)}
      style={styles.ModelStyle}>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsVisible(false)}
          style={styles.ButtonStyle}>
          <IconClose
            name="close"
            size={30}
            style={{
              color: colors.white,
            }}
          />
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: 12, paddingVertical: 14}}>
          <ResponsiveText
            title="About recommendations"
            fontColor={colors.white}
            fontWeight="bold"
            fontSize={30}
            fontStyle={{width: '75%', marginTop: scale(10)}}
          />
          <ResponsiveText
            title="Our recommendations help you find audio you’ll enjoy, whether that’s an old favorite or
            a new song or show you never knew you’d be into."
            fontColor={colors.white}
            fontSize={16}
            fontStyle={styles.fontstyle}
          />
          <ResponsiveText
            title="Our editors around the globe have extensive knowledge about music and culture, and make
            sure our playlists are created with the best listener experience in mind.."
            fontColor={colors.white}
            fontSize={16}
            fontStyle={styles.fontstyle}
          />
          <ResponsiveText
            title="Our personalized recommendations are tailored to your unique taste, taking into account
            a variety of factors, such as what you’re listening to and when, the listening habits of
            people who have similar taste in music and podcasts, and the expertise of our music and
            podcast specialists."
            fontColor={colors.white}
            fontSize={16}
            fontStyle={styles.fontstyle}
          />
          <ResponsiveText
            title="In some cases, commercial considerations may influence our recommendations, but listener
            satisfaction is our priority and we only ever recommend content we think you’ll want to
            hear. Our recommendations rely on signals from you, so keep on listening to the songs
            and podcasts you love!"
            fontColor={colors.white}
            fontSize={16}
            fontStyle={styles.fontstyle}
          />
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  ModelStyle: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  ButtonContainer: {
    backgroundColor: colors.bgBlack1,
    flex: 1,
  },
  ButtonStyle: {
    backgroundColor: colors.graytextColor,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
  },
  fontstyle: {
    lineHeight: 24,
    marginTop: scale(16),
    textAlign: 'justify',
  },
});

export default RecommenDationsModel;
