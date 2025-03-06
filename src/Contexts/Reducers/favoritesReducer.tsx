import AsyncStorage from "@react-native-async-storage/async-storage";

type SongType = {
    id: string,
    title: string,
    artist: string,
    artwork: string,
    url: string
};

export const favoritesInitialState: { favoriteSongs: SongType[] } = {
    favoriteSongs: [],
};

export const favoritesReducer = (state = favoritesInitialState, action: any) => {
    switch (action.type) {
        case "ADD_TO_FAVORITES": {
            const updatedFavorites = [...state.favoriteSongs, action.payload];
            AsyncStorage.setItem('favoriteSongs', JSON.stringify(updatedFavorites));
            return { ...state, favoriteSongs: updatedFavorites };
        }
        case "REMOVE_FROM_FAVORITES": {
            const updatedFavorites = state.favoriteSongs.filter(song => song.id !== action.payload);
            
            // Update AsyncStorage
            AsyncStorage.setItem('favoriteSongs', JSON.stringify(updatedFavorites));

            return { ...state, favoriteSongs: updatedFavorites };
        }
        case 'LOAD_FAVORITES': {
            return { ...state, favoriteSongs: action.payload };
        }
        default:
            return state;
    }
};

