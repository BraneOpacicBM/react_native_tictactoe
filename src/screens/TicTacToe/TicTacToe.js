import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class TicTacToe extends Component {

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

    constructor(props){
        super(props);
        Dimensions.addEventListener("change", this.dimensionsCallback)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.dimensionsCallback)
    }
    

    resetHandler = () => {
        this.props.navigator.push({
            screen: "tictactoe.VideoScreen",
            title: "Congrats!",
            navigatorStyle: {
                navBarButtonColor: "black"
              }
        })
    }
    

    render(){

        

        return(
            <View style={[styles.wrapper, this.state.respStyles.flexDirection === "row" ? { justifyContent: "center", alignItems: "center"} : null]}>
                <View style={[styles.gameContainer, {flexDirection: this.state.respStyles.flexDirection, marginTop: 20}]}>
                    <View style={[styles.messageDisplayWrapper, this.state.respStyles.flexDirection === "row" ? { alignSelf: "flex-start", marginTop: 50} : null]}>
                        <Text style={styles.messageText}>X moves first!</Text>
                    </View>
                    <View style={[styles.boardContainer, this.state.respStyles.flexDirection === "row" ? {marginLeft: 30, marginRight: 30, marginTop: 20} : null ]}>
                        <View style={styles.cellContainer}><Icon size={40} color="red" name="md-radio-button-off" /></View>
                        <View style={styles.cellContainer}><Icon size={40} color="blue" name="md-close" /></View>
                        <View style={styles.cellContainer}></View>
                        <View style={styles.cellContainer}></View>
                        <View style={styles.cellContainer}></View>
                        <View style={styles.cellContainer}></View>
                        <View style={styles.cellContainer}></View>
                        <View style={styles.cellContainer}></View>
                        <View style={styles.cellContainer}></View>
                        
                        
                    </View>
                    <View style={[styles.buttonHolder, this.state.respStyles.flexDirection === "row" ? { alignSelf: "flex-end", marginBottom: 80} : null]}>
                        <TouchableWithoutFeedback onPress={this.resetHandler}>
                            <View>
                            <Text style={styles.buttonText}>Reset</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#7acfd6"
    },
    gameContainer: {
        justifyContent: "center",
        alignItems: "center"
        
        
    },
    boardContainer: {
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        height: 240,
        width:  240,
        marginBottom: 60
    },
    messageDisplayWrapper: {
        marginTop: 20,
        marginBottom: 40,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: "#fff"
        
    },
    cellContainer: {
        height: 80,
        width:  80,
        borderColor: "black",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    cellInner: {
        borderColor: "blue",
        borderWidth: 1,
        flex: 1
    },
    buttonHolder: {
        borderColor: "#fff",
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
    messageText: {
        fontSize: 18
    }

})

export default TicTacToe;