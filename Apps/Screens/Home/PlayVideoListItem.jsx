import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function PlayVideoListItem({ video }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  const BottomTabHeight= useBottomTabBarHeight();

  const ScreenHeight = Dimensions.get('window').height-BottomTabHeight;

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={[styles.video, {height: ScreenHeight}]}
        source={{ uri: video?.videoUrl }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={setStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
