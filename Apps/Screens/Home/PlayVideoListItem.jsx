import React, { useRef, useState } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { View, Text, TextInput, Image, Dimensions, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Colors from '../../Utils/Colors'
import { useRoute, useNavigation } from '@react-navigation/native'
import { s3bucket } from '../../Utils/S3BucketConfig'
import { supabase } from '../../Utils/SupabaseConfig'
import Ionicons from '@expo/vector-icons/Ionicons'



export default function PlayVideoListItem({ video }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  const BottomTabHeight = useBottomTabBarHeight();

  const ScreenHeight = Dimensions.get('window').height - BottomTabHeight;

  return (
    <View style={styles.container}>

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


        <View style={{ display: 'flex', gap: 40 }}>

          <Ionicons name="heart-outline" size={45} color="white" />
          <Ionicons name="chatbubble-outline" size={45} color="white" />
          <Ionicons name="paper-plane-outline" size={45} color="white" />
        </View>

      </View>


      <Video
        ref={videoRef}
        style={[styles.video, { height: ScreenHeight }]}
        source={{ uri: video?.videoUrl }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay = {false}
        onPlaybackStatusUpdate={setStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
