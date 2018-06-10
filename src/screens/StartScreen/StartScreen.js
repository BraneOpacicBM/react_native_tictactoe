import React, { Component } from 'react'; 
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import imageGrid from '../../assets/grid2.png';
import imgBackground from '../../assets/bg-img.jpeg';


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
            <View style={[styles.container]}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>WELCOME</Text>
                    <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeadingText}>TO THE MULTI-PLAYER</Text>
                    </View>
                </View>
                <View style={styles.midPage}>
                    <View style={[styles.midPageFirst]}>
                        <Text style={styles.tictactoeMidPage}>TicTacToe</Text>
                        <Text style={styles.tictactoeMidPage}>GAME!</Text>
                    </View>
                    <View style={styles.midPageSecond}>
                        <Image source={imageGrid} style={this.state.respStyles.flexDirection === "column" ? styles.imageGrid : styles.imageGridLandscape} />
                    </View>
                </View>
                <View style={styles.bottomPage}>
                    <View style={styles.buttonHolder}>
                        <TouchableOpacity onPress={this.gameStartHandler}>
                            <View style={styles.touchOpacity}>
                            <Text style={styles.buttonText}>- PLAY -</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {      
        borderWidth: 4,
        flex: 1,
        alignItems: "center",
        padding: 10
    },
    headingContainer: {
        alignItems: "center",
        justifyContent: 'center',
        width: '100%',
        flex: 2,
        marginBottom: 10,
        backgroundColor: 'teal'
        
    },
    subHeadingContainer: {
        alignItems: "center",
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5
    },
    midPage: {
        width: '100%',
        flex: 2,
        marginBottom: 10,
        flexDirection: 'row'
    },
    midPageFirst: {
        flex: 2,
        marginRight: 5,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tictactoeMidPage: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500'
    },
    midPageSecond: {
        flex: 4,
        backgroundColor: 'teal',
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomPage: {
        width: '100%',
        backgroundColor: 'teal',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
    imageGridLandscape: {
        height: 150,
        width: 150
    },
    buttonHolder: {
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    touchOpacity: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 50,
        paddingRight: 50,
    },
    buttonText: {
        color: "#fff",
        fontSize: 21
    },
    headingText: {
        color: "#fff",
        fontSize: 45,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 5,
          shadowOpacity: 0.6,
        marginBottom: 20,
        fontWeight: "900"
    },
    subHeadingText: {
        color: "#000",
        fontSize: 14,
        fontWeight: "900",
        
    },
    tictactoeText: {
        color: "#fff",
        
    }
})


export default StartScreen;