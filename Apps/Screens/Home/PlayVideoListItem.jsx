import { View, Text, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { Video, ResizeMode } from 'expo-av';

export default function PlayVideoListItem({video}) {
    const videoRef = useRef(null);
    const [status, setStatus] = useState({});
  return (
    <View>
      
      <Video
        ref={videoRef}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />

    </View>
  )
}



const styles = StyleSheet.create({
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
      },

})