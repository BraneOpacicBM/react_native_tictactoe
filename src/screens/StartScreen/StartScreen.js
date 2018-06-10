import React, { Component } from 'react'; 
import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import imageGrid from '../../assets/grid2.png';


class StartScreen extends Component {

    constructor(props){
        super(props);
        Dimensions.addEventListener("change", this.dimensionsCallback)
    }

    state = {
        respStyles: {
            flexDirection: "column"
        }
    }

    dimensionsCallback = (dims) => {
        this.setState(prevState => {
            return {
                respStyles: {
                    flexDirection: Dimensions.get("window").height > 500 ? "column" : "row"
                }
            }
        })
    }

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
            <View style={[styles.container, {flexDirection: this.state.respStyles.flexDirection}]}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>WELCOME</Text>
                    <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeadingText}>To the multi-player</Text>
                        <View style={styles.tictactoeSubHeading}>
                            <Text style={[styles.subHeadingText, styles.tictactoeText]}>Tic-Tac-Toe</Text>
                        </View>
                        <Text style={styles.subHeadingText}>game!</Text>
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={imageGrid} style={styles.imageGrid} />
                </View>
                <View style={styles.buttonHolder}>
                    <TouchableOpacity onPress={this.gameStartHandler}>
                        <View style={styles.touchOpacity}>
                         <Text style={styles.buttonText}>Play!</Text>
                        </View>
                    </TouchableOpacity>
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
        alignItems: "center",
        borderWidth: 1,
        borderWidth: 0
        
    },
    subHeadingContainer: {
        alignItems: "center"
    },
    imageContainer: {
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 6
    },
    tictactoeSubHeading: {
        borderWidth: 3,
        borderColor: "#fff",
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 25,
        marginBottom: 25
    },
    imageGrid: {
        height: 230,
        width: 230
    },
    buttonHolder: {
        borderColor: "#000",
        borderWidth: 3,
        borderRadius: 5,
        alignItems: "center",
    },
    touchOpacity: {
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
    },
    buttonText: {
        color: "#000"
    },
    headingText: {
        color: "#000",
        fontSize: 40,
        marginBottom: 20,
        fontWeight: "900"
    },
    subHeadingText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "100",
        
    },
    tictactoeText: {
        color: "#fff",
        
    }
})


export default StartScreen;