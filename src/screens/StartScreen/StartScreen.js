import React, { Component } from 'react'; 
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import imageGrid from '../../assets/grid2.png'

class StartScreen extends Component {

    gameStartHandler = () => {
        this.props.navigator.push({
            screen: "tictactoe.TicTacToe",
            title: "Tic Tac Toe",
            navigatorStyle: {
                navBarButtonColor: "black"
              }
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>WELCOME</Text>
                    <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeadingText}>To the multi-player</Text>
                        <View style={styles.tictactoeSubHeading}>
                            <Text style={styles.subHeadingText}>Tic-Tac-Toe</Text>
                        </View>
                        <Text style={styles.subHeadingText}>game!</Text>
                    </View>
                </View>
                <View>
                    <Image source={imageGrid} style={styles.imageGrid} />
                </View>
                <View style={styles.buttonHolder}>
                    <TouchableWithoutFeedback onPress={this.gameStartHandler}>
                        <View>
                         <Text style={styles.buttonText}>Play!</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {      
        borderWidth: 1,
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#7acfd6"
    },
    headingContainer: {
        alignItems: "center"
    },
    subHeadingContainer: {
        alignItems: "center"
    },
    tictactoeSubHeading: {
        borderWidth: 1,
        borderColor: "#000",
        padding: 5,
        marginTop: 10,
        marginBottom: 10
    },
    imageGrid: {
        height: 200,
        width: 200
    },
    buttonHolder: {
        borderColor: "#000",
        borderWidth: 3,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        alignItems: "center"
    },
    buttonText: {
        color: "#000"
    },
    headingText: {
        color: "#000",
        fontSize: 30,
        marginBottom: 15,
        fontWeight: "bold"
    },
    subHeadingText: {
        color: "#000",
        fontSize: 14,
        fontWeight: "100",
        
    }
})


export default StartScreen;