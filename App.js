import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import TicTacToe from './src/screens/TicTacToe/TicTacToe';
import StartScreen from './src/screens/StartScreen/StartScreen';
import configureStore from './src/store/configureStore';


const store = configureStore();

// Register Screens
Navigation.registerComponent("tictactoe.StartScreen", () => StartScreen);
Navigation.registerComponent("tictactoe.TicTacToe", () => TicTacToe);


//Start an App
Navigation.startSingleScreenApp({
  screen: {
    screen: "tictactoe.StartScreen",
    navigatorStyle: {
      navBarHidden: true,
    }
  }
})