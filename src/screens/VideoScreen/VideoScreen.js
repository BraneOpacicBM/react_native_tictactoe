import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import LightVideo from '../../assets/background.mp4';
import WinnerInfo from '../../components/WinnerInfo/WinnerInfo';


class VideoScreen extends Component {

    backToApp = () => {
        this.props.navigator.popToRoot();
    }

    render(){
        return(
            <View style={styles.container}>
                <Video
                source={LightVideo}
                resizeMode="cover"
                style={StyleSheet.absoluteFill}
                shouldPlay={true}
                paused={false}
                repeat={true}
                rate={1.0}
                volume={1.0}
                muted={false}
                />
                <WinnerInfo btnPress={this.backToApp}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%"
    }
})

export default VideoScreen;