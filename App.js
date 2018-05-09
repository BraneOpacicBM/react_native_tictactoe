import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PlaceList from './src/components/PlaceList/PlaceList';
import ListItem from './src/components/ListItem/ListItem';
import PlaceInput from './src/components/PlaceInput/PlaceInput';

export default class App extends Component {

  state = {
    places: []
  }



  placeAddedHandler = placeName => {


    this.setState(prevState => {
      return {
        places: prevState.places.concat(placeName)
      }
    })
  }


  render() {

    

    return (
      <View style={styles.container}>
        <PlaceInput
        onPlaceAdded={this.placeAddedHandler}>
        </PlaceInput>
        <PlaceList places={this.state.places} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  

});
