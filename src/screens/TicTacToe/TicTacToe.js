import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, AsyncStorage, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import imgBackground from '../../assets/bg-img.jpeg';

class TicTacToe extends Component {

    constructor(props){
        super(props);
        Dimensions.addEventListener("change", this.dimensionsCallback)
    }

    state = {
        respStyles: {
            flexDirection: "column"
        },
        board: Array(9).fill(""),
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


        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
          ];
          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              this.setState({
                message: board[a] + " wins!",
                playableGame: false,
              })
              this.playWinningVideo();
              let winner = board[0] + " wins!"
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
          return null;
        
        
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
            board: Array(9).fill(""),
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
                            <Text style={styles.buttonText}>- RESET -</Text>
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
        backgroundColor: "teal",
        justifyContent: "center",
        alignItems: "center"
    },
    gameContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 25,
        borderRadius: 10

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
        borderBottomWidth: 4,
        borderColor: "#fff"
    },
    touchOpacity: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
    },
    cellContainer: {
        height: 80,
        width:  80,
        borderColor: "orange",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonHolder: {
        borderRadius: 5,
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 17
    },
    messageText: {
        fontSize: 22,
        fontWeight: '800'
    }

})

export default TicTacToe;