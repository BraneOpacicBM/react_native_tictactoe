import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';


import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';


class SharePlaceScreen extends Component {

    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }

    state = {
        placeName: '',
        disableButton: true,
        controls: {
            placeName: {
                value: '',
                valid: false,
                validationRules: {
                    notEmpty: true
                },
                touched: false,
                location: {
                    value: null,
                    valid: false
                }
            }
        }
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if(event.type === "NavBarButtonPress") {
            if(event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }

    placeNameChangedHandler = val => {
        // let controls = {...this.state.controls};
        // let controlsPlaceName = {...this.state.controls.placename};

        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            }
        })
        
    }


    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }


    placeAddedHandler = () => {
        this.props.onAddPlace(this.state.controls.placeName.value, this.state.controls.location.value);
        
    }
    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <MainText><HeadingText>Share a place with us!</HeadingText></MainText>
                    <PickImage />
                    <PickLocation onLocationPick={this.locationPickedHandler}/>
                    <PlaceInput 
                    placeName={this.state.controls.placeName.value} 
                    onChangeText={this.placeNameChangedHandler}/>
                    <View style={styles.button}>
                        <Button 
                        title="Share the Place!" 
                        onPress={this.placeAddedHandler}
                        disabled={!this.state.controls.placeName.valid || !this.state.controls.location.valid}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location) => dispatch(addPlace(placeName, location))
    }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);