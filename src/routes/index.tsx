import { ScreenName } from '../constants/ScreensNames';
import TabNavigator from '../Navigators/TabNavigator/TabNavigator';
import AuthScreen from '../screens/AuthContainer';
import PostScreen from '../screens/BottomTapsContainers/PostContainer';
import SearchScreenTab from '../screens/BottomTapsContainers/SearchContainer';
import SearchScreenMain from '../screens/BottomTapsContainers/SearchContainer/SearchSreen';
import ShortsVideoScreen from '../screens/BottomTapsContainers/ShortsContainers';
import CheckYourEmailScreen from '../screens/CheckYourEmailContainer';
import ChooseArtistScreen from '../screens/ChooseArtistContainer';
import LoginWithNumber from '../screens/ContinueWithNumberContainer';
import ContinueWithEmailLogin from '../screens/CountinueEmailLoginContainer';
import CreateAccount from '../screens/CreateAccountContaienr';
import CreatePassword from '../screens/CreatePasswordContainer';
import DateOfBirthScreen from '../screens/DateOfBirthContainer';
import GenderScreen from '../screens/GenderContaienr';
import LiveDetailsScreen from '../screens/LiveDetailsScreen';
import LiveScreen from '../screens/LiveScreenContainer';
import LoginScreen from '../screens/LoginConainer';
import LogWithoutPassword from '../screens/LoginWithoutPasswordContainer';
import MusicDetailsScreen from '../screens/MusicDetailsContainer';
import MusicScreen from '../screens/MusicScreensContainer';
import PodcastScreen from '../screens/PodcastContainer';
import PodcastDetailsScreen from '../screens/PodcastDetailsContainer';
import PodcastFavScrreen from '../screens/PodcastFavContaienr';
import SelectPlaylist from '../screens/SelectAplaylistContainer';
import SingUpScreen from '../screens/SingUPorLoginContainer';
import SingUpEmailScreen from '../screens/SingUpWithEmailContainer';
import MusicCetegoryScreen from '../screens/VideoCetegoryContainer';
import VIDEO_SCREEN from '../screens/VideoContainer';
import VideoDetailsScreen from '../screens/VideoDetailsContainer';
import FavVideoDetilsScreen from '../screens/VideoFavDetailsContainer';

export const AuthStack = [
  {name: ScreenName.SIGNUP_OR_LOGIN, Component: SingUpScreen},
  {name: ScreenName.AUTH_SCREEN, Component: AuthScreen},
  {name: ScreenName.LOGIN_SCREEN, Component: LoginScreen},
  {name: ScreenName.EMAIL_SIGN_UP_SCREEN, Component: SingUpEmailScreen},
  {
    name: ScreenName.CONTINUE_WITH_EMAIL_LOGIN,
    Component: ContinueWithEmailLogin,
  },
  {name: ScreenName.LOG_IN_WITHOUT_PASSWORD, Component: LogWithoutPassword},
  {name: ScreenName.CHECK_YOUR_EMAIL, Component: CheckYourEmailScreen},
  {name: ScreenName.CREATE_A_PASSWORD, Component: CreatePassword},
  {name: ScreenName.DATE_OF_BIRTH_SCREEN, Component: DateOfBirthScreen},
  {name: ScreenName.GENDER_SCREEN, Component: GenderScreen},
  {name: ScreenName.CREATE_ACCOUNT_SCREEN, Component: CreateAccount},
  {name: ScreenName.MUSIC_CATEGORY_SCREEN, Component: MusicCetegoryScreen},
  {name: ScreenName.CHOOSE_ARTISTS_SCREEN, Component: ChooseArtistScreen},
  {name: ScreenName.LOG_WITH_NUMBER, Component: LoginWithNumber},
  {name: ScreenName.VIDEO_DETAILS_SCREEN, Component: VideoDetailsScreen},
  {name: ScreenName.HOME_SCREEN_IN_AUTH, Component: TabNavigator},
  {name: ScreenName.MUSIC_SCREEN, Component: MusicScreen},
  {name: ScreenName.MUSIC_DETAILS_SCREEN, Component: MusicDetailsScreen},
  {name: ScreenName.SELECT_PLAYLIST_SCREEN, Component: SelectPlaylist},
  {name: ScreenName.SEARCH_SCREEN, Component: SearchScreenTab},
  {name: ScreenName.POST_SCREEN, Component: PostScreen},
  {name: ScreenName.SHORTS_VIDEO_SCREEN, Component: ShortsVideoScreen},
  {name: ScreenName.PODCAST_SCREEN, Component: PodcastScreen},
  {name: ScreenName.LIVE_SCREEN, Component: LiveScreen},
  {name: ScreenName.SEARCH_SCRREN_MAIN, Component: SearchScreenMain},
  {name: ScreenName.VIDEO_SCREEN, Component: VIDEO_SCREEN},
  {name: ScreenName.PODCAST_DETAILS_SCREEN, Component: PodcastDetailsScreen},
  {name: ScreenName.FAV_PODCAST_SCREEN, Component: PodcastFavScrreen},
  {name: ScreenName.LIVE_DETAILS_SCREEN, Component: LiveDetailsScreen},
  {name: ScreenName.VIDEO_FAV_DETAILS_SCREEN, Component: FavVideoDetilsScreen},
];
