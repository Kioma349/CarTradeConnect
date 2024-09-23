import React, { useRef, useContext } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Colors from '../../Utils/Colors';
import { VideoPlayContext } from './PlayVideoList';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PlayVideoListItem({ video, activeIndex, index }) {
  const videoRef = useRef(null);
  const { currentPlaying, setCurrentPlaying } = useContext(VideoPlayContext);

  const BottomTabHeight = useBottomTabBarHeight();
  const ScreenHeight = Dimensions.get('window').height - BottomTabHeight;

  const handlePlay = () => {
    setCurrentPlaying(index);  // Activate video by index
    if (currentPlaying === index) {
      videoRef.current.playAsync();
    } else {
      videoRef.current.pauseAsync();
    }
  };

  return (
    <TouchableOpacity onPress={handlePlay} style={{ flex: 1 }}>
      <Video
        ref={videoRef}
        style={{ width: Dimensions.get('window').width, height: ScreenHeight }}
        source={{ uri: video?.videoUrl }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={currentPlaying === index}
      />
      <View style={{
        position: 'absolute',
        zIndex: 10,
        bottom: 20,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'flex-end'
      }}>
        <View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
            <Image source={{ uri: video?.Users.profileImage }}
              style={{ width: 40, height: 40, backgroundColor: Colors.WHITE, borderRadius: 99 }} />
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 18, color: Colors.WHITE
            }}>{video?.Users.username}</Text>
          </View>
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 18, color: Colors.WHITE, marginTop: 10
          }}>{video?.description}</Text>
        </View>
        <View style={{ display: 'flex', gap: 30 }}>
          <Ionicons name="heart-outline" size={45} color="white" />
          <Ionicons name="chatbubble-outline" size={45} color="white" />
          <Ionicons name="paper-plane-outline" size={45} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
