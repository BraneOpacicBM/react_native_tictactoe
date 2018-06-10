import { Navigation } from 'react-native-navigation';
import TicTacToe from './src/screens/TicTacToe/TicTacToe';
import StartScreen from './src/screens/StartScreen/StartScreen';
import VideoScreen from './src/screens/VideoScreen/VideoScreen';


// Register Screens
Navigation.registerComponent("tictactoe.StartScreen", () => StartScreen);
Navigation.registerComponent("tictactoe.TicTacToe", () => TicTacToe);
Navigation.registerComponent("tictactoe.VideoScreen", () => VideoScreen);


//Start an App
Navigation.startSingleScreenApp({
  screen: {
    screen: "tictactoe.StartScreen",
    navigatorStyle: {
      navBarHidden: true,
    }
  }
})