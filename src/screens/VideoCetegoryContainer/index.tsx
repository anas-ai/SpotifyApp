import { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScreenName } from '../../constants/ScreensNames';
import { colors } from '../../styles/color';
import { moderateScale, scale } from 'react-native-size-matters';

const bgcolors = {
  white: '#FFFFFF',
  black: '#000000',
  orange: '#FF5733',
  purple: '#9C27B0',
  green: '#4CAF50',
  blue: '#2196F3',
  red: '#F44336',
  yellow: '#FFC107',
  brown: '#795548',
  pink: '#E91E63',
};

type Genres = {
  id: number;
  language: string;
  img: any;
  bgColor: string;
};

const MusicModules = [
  {
    id: 1,
    language: 'Hindi',
    img: require('../../assets/images/ArijitImg.png'),
    bgColor: bgcolors.orange,
  },
  {
    id: 2,
    language: 'International',
    img: require('../../assets/images/ArijitImg.png'),
    bgColor: bgcolors.yellow,
  },
  {
    id: 3,
    language: 'Punjabi',
    img: require('../../assets/images/ArijitImg.png'),
    bgColor: bgcolors.purple,
  },
  {
    id: 4,
    language: 'Tamil',
    img: require('../../assets/images/ArijitImg.png'),
    bgColor: bgcolors.yellow,
  },
  {
    id: 5,
    language: 'Telugu',
    img: require('../../assets/images/ArijitImg.png'),
    bgColor: bgcolors.green,
  },
  {
    id: 6,
    language: 'Malayalam',
    img: require('../../assets/images/ArijitImg.png'),
    bgColor: bgcolors.blue,
  },
  {
    id: 7,
    language: 'Marathi',
    img: require('../../assets/images/ArijitImg.png'),
    bgColor: bgcolors.brown,
  },
  {
    id: 8,
    language: 'Gujarati',
    img: require('../../assets/images/ArijitImg.png'),
    bgColor: bgcolors.pink,
  },
  {
    id: 9,
    language: 'Bengali',
    img: require('../../assets/images/ArijitImg.png'),
    bgColor: bgcolors.blue,
  },
  {
    id: 10,
    language: 'Kannada',
    img: require('../../assets/images/ArijitImg.png'),
    bgColor: bgcolors.red,
  },
];

const MusicCategoryScreen = ({ navigation }: any) => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Function to refresh the screen
  const onRefresh = useCallback(() => {
    setRefreshing(true); // Show loading effect
    setTimeout(() => {
      setSelectedGenres([]); // Reset selected genres
      setRefreshing(false);
    }, 1000); // Simulate a network call delay
  }, []);

  const handleSelect = (id: number) => {
    setSelectedGenres(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleNavigation = () => {
    navigation.navigate(ScreenName.CHOOSE_ARTISTS_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>What music do you like?</Text>

      <FlatList
        data={MusicModules}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              { backgroundColor: item.bgColor },
              selectedGenres.includes(item.id) && styles.selectedCard,
            ]}
            onPress={() => handleSelect(item.id)}
          >
            <Text style={styles.language}>{item.language}</Text>
            <Image source={item.img} style={styles.artistImg} />
            {selectedGenres.includes(item.id) && (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="white"
                style={styles.checkmark}
              />
            )}
          </TouchableOpacity>
        )}
      />

      {selectedGenres.length > 0 && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNavigation}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default MusicCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgBlack,
    padding: scale(16),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: bgcolors.white,
    marginBottom: scale(20),
  },
  card: {
    flexDirection: 'column', // Stack elements vertically
    alignItems: 'center',
    justifyContent: 'center',
    margin: scale(8),
    borderRadius: scale(10),
    padding: scale(10),
    height: scale(120), // Increase height for better spacing
    width: scale(145),
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: bgcolors.white,
  },
  artistImg: {
    width: scale(60), // Reduce size to fit well
    height: scale(50),
    borderRadius: scale(25),
    resizeMode: 'cover',
    marginTop: scale(8),
  },
  language: {
    color: bgcolors.white,
    fontSize: scale(16),
    fontWeight: 'bold',
    textAlign: 'center', // Center text
  },
  checkmark: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: bgcolors.white,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  nextText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: bgcolors.black,
  },
});

