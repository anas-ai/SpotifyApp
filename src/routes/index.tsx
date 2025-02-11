import { ScreenName } from '../constants/ScreensNames';
import TabNavigator from '../Navigators/TabNavigator/TabNavigator';
import AuthScreen from '../screens/AuthContainer';
import CheckYourEmailScreen from '../screens/CheckYourEmailContainer';
import ChooseArtistScreen from '../screens/ChooseArtistContainer';
import LoginWithNumber from '../screens/ContinueWithNumberContainer';
import ContinueWithEmailLogin from '../screens/CountinueEmailLoginContainer';
import CreateAccount from '../screens/CreateAccountContaienr';
import CreatePassword from '../screens/CreatePasswordContainer';
import DateOfBirthScreen from '../screens/DateOfBirthContainer';
import GenderScreen from '../screens/GenderContaienr';
import LoginScreen from '../screens/LoginConainer';
import LogWithoutPassword from '../screens/LoginWithoutPasswordContainer';
import MusicCetegoryScreen from '../screens/VideoCetegoryContainer';
import SingUpScreen from '../screens/SingUPorLoginContainer';
import SingUpEmailScreen from '../screens/SingUpWithEmailContainer';
import VideoDetailsScreen from '../screens/VideoDetailsContainer';
import MusicScreen from '../screens/MusicScreensContainer';
import MusicDetailsScreen from '../screens/MusicDetailsContainer';

export const AuthStack = [
  { name: ScreenName.SIGNUP_OR_LOGIN, Component: SingUpScreen },
  { name: ScreenName.AUTH_SCREEN, Component: AuthScreen },
  { name: ScreenName.LOGIN_SCREEN, Component: LoginScreen },
  { name: ScreenName.EMAIL_SIGN_UP_SCREEN, Component: SingUpEmailScreen },
  { name: ScreenName.CONTINUE_WITH_EMAIL_LOGIN, Component: ContinueWithEmailLogin },
  { name: ScreenName.LOG_IN_WITHOUT_PASSWORD, Component: LogWithoutPassword },
  { name: ScreenName.CHECK_YOUR_EMAIL, Component: CheckYourEmailScreen },
  { name: ScreenName.CREATE_A_PASSWORD, Component: CreatePassword },
  { name: ScreenName.DATE_OF_BIRTH_SCREEN, Component: DateOfBirthScreen },
  { name: ScreenName.GENDER_SCREEN, Component: GenderScreen },
  { name: ScreenName.CREATE_ACCOUNT_SCREEN, Component: CreateAccount },
  { name: ScreenName.MUSIC_CATEGORY_SCREEN, Component: MusicCetegoryScreen },
  { name: ScreenName.CHOOSE_ARTISTS_SCREEN, Component: ChooseArtistScreen },
  { name: ScreenName.LOG_WITH_NUMBER, Component: LoginWithNumber },
  { name: ScreenName.VIDEO_DETAILS_SCREEN, Component: VideoDetailsScreen },
  { name: ScreenName.HOME_SCREEN_IN_AUTH, Component: TabNavigator },
  { name: ScreenName.MUSIC_SCREEN, Component: MusicScreen },
  { name: ScreenName.MUSIC_DETAILS_SCREEN, Component: MusicDetailsScreen },
  
];



 