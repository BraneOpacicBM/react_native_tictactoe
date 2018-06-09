

import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class TicTacToe extends Component {

    state = {
        respStyles: {
            flexDirection: "column"
        },
        board: ["", "", "",
                 "", "", "",
                  "", "", ""],
        playerTurn: "X",
        message: "It's X's turn!"
    }

    selectElement = (e, index) => {
        let boardItems = [...this.state.board];
        if(boardItems[index] === "") {
            boardItems[index] = this.state.playerTurn;
            this.setState(prevState => {
                return {
                    board: boardItems,
                    playerTurn: prevState.playerTurn === "X" ? "O" : "X",
                    message: prevState.message === "It's X's turn!" ? "It's O's turn!" : "It's X's turn!"
                }
            })
            this.checkForWinner(this.state.board)
        }
        
    }

    checkForWinner = (board) => {
        console.log(board)
        if(board[0] !== "" && board[0] === board[1] && board[0] === board[2]){
            this.setState({
                message: board[0] + " is the winner!"
            })
          } else if(board[3] !== "" && board[3] === board[4] && board[3] === board[5]){
            cthis.setState({
                message: board[3] + " is the winner!"
            })
          } else if(board[6] !== "" && board[6] === board[7] && board[6] === board[8]){
            this.setState({
                message: board[6] + " is the winner!"
            })
          } else if(board[0] !== "" && board[0] === board[3] && board[0] === board[6]){
            cthis.setState({
                message: board[0] + " is the winner!"
            })
          } else if(board[1] !== "" && board[1] === board[4] && board[1] === board[7]){
            this.setState({
                message: board[1] + " is the winner!"
            })
          } else if(board[2] !== "" && board[2] === board[5] && board[2] === board[8]){
            this.setState({
                message: board[2] + " is the winner!"
            })
          } else if(board[0] !== "" && board[0] === board[4] && board[0] === board[8]){
            this.setState({
                message: board[0] + " is the winner!"
            })
          } else if(board[2] !== "" && board[2] === board[4] && board[2] === board[6]){
            this.setState({
                message: board[2] + " is the winner!"
            })
          } else  {
            if([].concat(board).sort().reverse().pop() !== "") {
                this.setState({
                    message: "It's a draw!"
                })
            }
          }
    }

    buttonReset = () => {
        this.setState({
            board: ["", "", "",
                    "", "", "",
                    "", "", ""],
            playerTurn: "X",
            message: "It's X's turn!"
        })
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
        this.setState({
            respStyles: {
                flexDirection: "column"
            },
            board: ["", "", "",
                     "", "", "",
                      "", "", ""],
            playerTurn: "X",
            message: "It's X's turn!"
        })

        // this.props.navigator.push({
        //     screen: "tictactoe.VideoScreen",
        //     title: "Congrats!",
        //     navigatorStyle: {
        //         navBarButtonColor: "black"
        //       }
        // })
    }
    

    render(){

        let boardCells = [...this.state.board].map((cell, index) => {
            return <TouchableWithoutFeedback key={index} onPress={(e) => this.selectElement(e, index)}>
                <View style={styles.cellContainer}>
                    {this.state.board[index] !== "" ? (this.state.board[index] === "X" ? <Icon size={40} color="red" name="md-close" /> : <Icon size={40} color="blue" name="md-radio-button-off" />) : null }
                </View>
            </TouchableWithoutFeedback>
        })

        return(
            <View style={[styles.wrapper, this.state.respStyles.flexDirection === "row" ? { justifyContent: "center", alignItems: "center"} : null]}>
                <View style={[styles.gameContainer, {flexDirection: this.state.respStyles.flexDirection, marginTop: 20}]}>
                    <View style={[styles.messageDisplayWrapper, this.state.respStyles.flexDirection === "row" ? { alignSelf: "flex-start", marginTop: 50} : null]}>
                        <Text style={styles.messageText}>{this.state.message}</Text>
                    </View>
                    <View style={[styles.boardContainer, this.state.respStyles.flexDirection === "row" ? {marginLeft: 30, marginRight: 30, marginTop: 20} : null ]}>
                        {boardCells}
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
        flexDirection: "row",
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