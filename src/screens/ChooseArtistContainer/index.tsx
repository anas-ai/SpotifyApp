import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {colors} from '../../styles/color';
import {scale, verticalScale} from 'react-native-size-matters';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import {Controller, useForm} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScreenName} from '../../constants/ScreensNames';

const ChooseArtistScreen = ({navigation}: any) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors, isLoading},
  } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const searchQuery = watch('search');

  const Tabs = ['For You', 'Hindi', 'International', 'Punjabi'];
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedArtists, setSelectedArtists] = useState<any>([]);

  const ArtistsData = [
    {
      id: 1,
      name: 'Arijit Singh',
      ArtisiImg: require('../../assets/images/ArijitImg.png'),
      art: 'Hindi',
    },
    {
      id: 2,
      name: 'Neha Kakkar',
      ArtisiImg: require('../../assets/images/ArijitImg.png'),
      art: 'Hindi',
    },
    {
      id: 3,
      name: 'Taylor Swift',
      ArtisiImg: require('../../assets/images/ArijitImg.png'),
      art: 'International',
    },
    {
      id: 4,
      name: 'Ed Sheeran',
      ArtisiImg: require('../../assets/images/ArijitImg.png'),
      art: 'International',
    },
    {
      id: 5,
      name: 'Diljit Dosanjh',
      ArtisiImg: require('../../assets/images/ArijitImg.png'),
      art: 'Punjabi',
    },
    {
      id: 6,
      name: 'Sidhu Moosewala',
      ArtisiImg: require('../../assets/images/ArijitImg.png'),
      art: 'Punjabi',
    },
  ];

  const handleSelect = (id: any) => {
    setSelectedArtists((prev: any) =>
      prev.includes(id)
        ? prev.filter((item: any) => item !== id)
        : [...prev, id],
    );
  };

  const handleNextBtn = () => {
    navigation.navigate(ScreenName.HOME_SCREEN_IN_AUTH);
  };

  const filteredArtists = useMemo(() => {
    return ArtistsData.filter(item => {
      const meatchSearch = item?.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const tabSearch =
        selectedTab && selectedTab !== 'For You'
          ? item.art == selectedTab
          : true;
      return meatchSearch && tabSearch;
    });
  }, [searchQuery, selectedTab]);
  return (
    <SafeAreaView style={globalStyles.globalContainer}>
      <ResponsiveText
        title="Choose 3 or more "
        fontColor={colors.white}
        fontSize={30}
        fontWeight="bold"
      />
      <ResponsiveText
        title="artists you like . "
        fontColor={colors.white}
        fontSize={30}
        fontWeight="bold"
      />

      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: scale(5),
          marginTop: 14,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <SearchIcon name="search1" size={26} color={colors.black} />
        <Controller
          name="search"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Search"
              placeholderTextColor={colors.black}
              style={{fontSize: 15, paddingLeft: 10, fontWeight: '400'}}
            />
          )}
        />
      </View>

      <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
        {Tabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedTab(item == selectedTab ? null : item)}>
            <ResponsiveText
              title={item}
              fontColor={selectedTab == item ? colors.black : colors.white}
              fontStyle={{
                backgroundColor:
                  selectedTab == item ? colors.ButtonColor : 'transparent',
                paddingVertical: scale(8),
                paddingHorizontal: scale(10),
                borderRadius: scale(20),
                textAlign: 'center',
                borderColor: selectedTab == item ? colors.white : colors.white,
                borderWidth: selectedTab == item ? 0.5 : 1,
              }}
              fontSize={12}
              fontWeight="500"
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{marginTop: 18}}>
        <FlatList
          data={filteredArtists}
          numColumns={3}
          key={3}
          renderItem={({item, index}) => (
            <View key={index}>
              <View
                style={{
                  marginTop: scale(20),
                  margin: 10,
                }}>
                <TouchableOpacity
                  onPress={() => handleSelect(item.id)}
                  activeOpacity={0.8}
                  style={{alignItems: 'center'}}>
                  <Image
                    source={item?.ArtisiImg}
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: colors.white,
                      borderRadius: scale(50),
                    }}
                  />

                  <ResponsiveText
                    title={item?.name}
                    fontColor={colors.white}
                    fontSize={14}
                    fontWeight="600"
                  />
                  {selectedArtists.includes(item.id) && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="white"
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <View
        style={{
          marginTop: verticalScale(100),
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {selectedArtists.length >= 3 ? (
            <TouchableOpacity style={styles.nextButton} onPress={handleNextBtn}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          ) : (
            selectedArtists.length > 0 && (
              <ResponsiveText
                title={`${
                  selectedArtists.length > 0 ? selectedArtists.length : 1
                }`}
                fontColor={colors.white}
                fontSize={16}
                fontWeight="600"
              />
            )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nextButton: {
    marginTop: 20,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  nextText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
});
export default ChooseArtistScreen;
