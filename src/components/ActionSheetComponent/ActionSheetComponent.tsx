import { useState, useRef } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Divider } from '@rneui/themed';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import { ScreenName } from '../../constants/ScreensNames';
import { colors } from '../../styles/color';
import { styles } from '../../screens/MusicDetailsContainer/StyleSheet';

const ActionSheetComponent = ({ navigation, route, handleActionSheetOpen: externalHandle }) => {
  const { selectedSong, songsList } = route.params || {};
  const [currentSong, setCurrentSong] = useState(selectedSong || songsList?.[0]);
  const [recommenDationsModelVisibal, setRecommenDationsModelVisibal] = useState(false);

  // Define the action sheet ref
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const ActionSheetitems = [
    {
      iconsName: 'pluscircleo',
      title: 'Add to playlist',
      navigateToScreen: ScreenName.SELECT_PLAYLIST_SCREEN,
    },
    { iconsName: 'sharealt', title: 'Share' },
    { iconsName: 'infocirlceo', title: 'About recommendations' },
  ];

  return (
    <View>
      <ActionSheet
        containerStyle={styles.ActionSheetContianer}
        ref={actionSheetRef}
        gestureEnabled
      >
        <View style={styles.artistsCurrentStyle}>
          <Image
            source={{ uri: currentSong?.artwork }}
            style={styles.ActionSheetImgStyle}
          />
          <View>
            <ResponsiveText
              title={currentSong?.title || 'Unknown Song'}
              fontColor={colors.white}
            />
            <ResponsiveText
              title="by Spotify"
              fontColor={colors.gray}
              fontSize={14}
            />
          </View>
        </View>
        <Divider style={{ marginTop: scale(16) }} color={colors.gray} />
        {ActionSheetitems.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (item?.navigateToScreen) {
                navigation.navigate(item.navigateToScreen);
              } else if (item.title === 'About recommendations') {
                setRecommenDationsModelVisibal(true);
              } else {
                console.log(`${item.title} clicked`);
              }
            }}
            key={index}
            style={{
              flexDirection: 'row',
              gap: scale(10),
              marginTop: scale(20),
              paddingHorizontal: scale(16),
              alignItems: 'center',
            }}
          >
            <Icon
              name={item?.iconsName}
              size={scale(24)}
              color={colors.gray}
              style={{ width: scale(30) }}
            />
            <ResponsiveText
              title={item?.title}
              fontWeight="400"
              fontColor={colors.white}
            />
          </TouchableOpacity>
        ))}
      </ActionSheet>
    </View>
  );
};

export default ActionSheetComponent;
