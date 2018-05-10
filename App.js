import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PlaceList from './src/components/PlaceList/PlaceList';
import ListItem from './src/components/ListItem/ListItem';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import placeImage from './src/assets/beautiful-place.jpg';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

export default class App extends Component {

  state = {
    places: [],
    selectedPlace: null
  }



  placeAddedHandler = placeName => {


    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          name: placeName,
          key : `${Math.random()}`,
          image: placeImage
        })
      }
    })
  }

  placeDeletedHandler = () => {
        this.setState(prevState => {
          return {
            places: prevState.places.filter((place) => {
              return place.key !== prevState.selectedPlace.key;
            }),
            selectedPlace: null
          }
        })
  }

  moodalClosedHandler = () => {
    this.setState({
      selectedPlace: null
    })
  }

  placeSelectedHandler = (key) => {

    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      }
    })

  }

  render() {

    

    return (
      <View style={styles.container}>
        <PlaceDetail 
        selectedPlace={this.state.selectedPlace} 
        onItemDeleted={this.placeDeletedHandler}
        onModalClosed={this.moodalClosedHandler}
        />
        <PlaceInput
        onPlaceAdded={this.placeAddedHandler}>
        </PlaceInput>
        <PlaceList 
        places={this.state.places}
        onItemSelected={this.placeSelectedHandler}
        />
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
