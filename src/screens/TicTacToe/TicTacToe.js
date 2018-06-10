import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class TicTacToe extends Component {

    constructor(props){
        super(props);
        Dimensions.addEventListener("change", this.dimensionsCallback)
    }

    state = {
        respStyles: {
            flexDirection: "column"
        },
        board: ["", "", "",
                 "", "", "",
                  "", "", ""],
        playerTurn: "X",
        message: "X plays",
        checkForWinner: null,
        playableGame: true
    }

    selectElement = (e, index) => {
        let boardItems = [...this.state.board];
        if(boardItems[index] === "") {
            boardItems[index] = this.state.playerTurn;
            if(this.state.playableGame){
                this.setState(prevState => {
                    return {
                        board: boardItems,
                        playerTurn: prevState.playerTurn === "X" ? "O" : "X",
                        message: prevState.message === "X plays" ? "O plays" : "X plays" 
                    }
                },
                () => {
                    this.checkForWinner(this.state.board);
                }
            )
            }
            
        }
        
    }

    playWinningVideo = () => {
        setTimeout(() => {
            this.props.navigator.push({
                screen: "tictactoe.VideoScreen",
                title: "Congrats!",
                navigatorStyle: {
                    navBarButtonColor: "black",
                    navBarHidden: true
                  }
            })
        }, 1500)
    }

    checkForWinner = (board) => {
        console.log(board)
        if(board[0] !== "" && board[0] === board[1] && board[0] === board[2]){
            this.setState({
                message: board[0] + " wins!",
                playableGame: false
            })
            this.playWinningVideo();
            let winner = board[0] + " wins!"
            AsyncStorage.setItem("winner", JSON.stringify(winner));
          } else if(board[3] !== "" && board[3] === board[4] && board[3] === board[5]){
            this.setState({
                message: board[3] + " wins!",
                playableGame: false
            }),
            this.playWinningVideo();
            let winner = board[3] + " wins!"
            AsyncStorage.setItem("winner", JSON.stringify(winner));
          } else if(board[6] !== "" && board[6] === board[7] && board[6] === board[8]){
            this.setState({
                message: board[6] + " wins!",
                playableGame: false
            }),
            this.playWinningVideo();
            let winner = board[6] + " wins!"
            AsyncStorage.setItem("winner", JSON.stringify(winner));
          } else if(board[0] !== "" && board[0] === board[3] && board[0] === board[6]){
            this.setState({
                message: board[0] + " wins!",
                playableGame: false
            }),
            this.playWinningVideo();
            let winner = board[0] + " wins!"
            AsyncStorage.setItem("winner", JSON.stringify(winner));
          } else if(board[1] !== "" && board[1] === board[4] && board[1] === board[7]){
            this.setState({
                message: board[1] + " wins!",
                playableGame: false
            }),
            this.playWinningVideo();
            let winner = board[1] + " wins!"
            AsyncStorage.setItem("winner", JSON.stringify(winner));
          } else if(board[2] !== "" && board[2] === board[5] && board[2] === board[8]){
            this.setState({
                message: board[2] + " wins!",
                playableGame: false
            }),
            this.playWinningVideo();
            let winner = board[2] + " wins!"
            AsyncStorage.setItem("winner", JSON.stringify(winner));
          } else if(board[0] !== "" && board[0] === board[4] && board[0] === board[8]){
            this.setState({
                message: board[0] + " wins!",
                playableGame: false
            }),
            this.playWinningVideo();
            let winner = board[0] + " wins!"
            AsyncStorage.setItem("winner", JSON.stringify(winner));
          } else if(board[2] !== "" && board[2] === board[4] && board[2] === board[6]){
            this.setState({
                message: board[2] + " wins!",
                playableGame: false
            }),
            this.playWinningVideo();
            let winner = board[2] + " wins!"
            AsyncStorage.setItem("winner", JSON.stringify(winner));
          } else  {
            if([].concat(board).sort().reverse().pop() !== "") {
                this.setState({
                    message: "It's a draw!"
                })
                let winner = "Match was a draw!"
                AsyncStorage.setItem("winner", JSON.stringify(winner));
            }
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

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.dimensionsCallback)
    }
    

    resetHandler = () => {
        this.setState({
            board: ["", "", "",
                     "", "", "",
                      "", "", ""],
            playerTurn: "X",
            message: "X plays",
            playableGame: true
        })
    }
    

    render(){

        let boardCells = [...this.state.board].map((cell, index) => {
            return <TouchableOpacity key={index} onPress={(e) => this.selectElement(e, index)}>
                <View style={styles.cellContainer}>
                    {this.state.board[index] !== "" ? (this.state.board[index] === "X" ? <Icon size={40} color="red" name="md-close" /> : <Icon size={40} color="blue" name="md-radio-button-off" />) : null }
                </View>
            </TouchableOpacity>
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
                        <TouchableOpacity onPress={this.resetHandler}>
                            <View style={styles.touchOpacity}>
                            <Text style={styles.buttonText}>Reset</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#7acfd6",
        justifyContent: "center",
        alignItems: "center"
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
        marginTop: 5,
        marginBottom: 40,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: "#fff"
    },
    touchOpacity: {
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
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
        borderRadius: 5,
        alignItems: "center"
    },
    buttonText: {
        color: "#000"
    },
    messageText: {
        fontSize: 22,
        fontWeight: '800'
    }

})

export default TicTacToe;