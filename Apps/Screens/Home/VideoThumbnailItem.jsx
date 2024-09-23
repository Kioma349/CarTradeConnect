import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function VideoThumbnailItem({ video }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.thumbnailContainer}
      onPress={() => navigation.navigate('play-video', { selectedVideo: video })}
    >
      <Image
        source={{ uri: video?.thumbnail }}
        style={styles.thumbnailImage}
      />
      <View style={styles.infoContainer}>
        <Image
          source={{ uri: video?.Users?.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{video?.Users?.username}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  thumbnailContainer: {
    flex: 1,
    margin: 5,
    position: 'relative',
  },
  thumbnailImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 20,
    height: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
  },
  username: {
    color: Colors.WHITE,
    fontFamily: 'outfit-bold',
    fontSize: 12,
    marginLeft: 5,
    marginTop: 5,
    textShadowColor: Colors.BLACK,
    textShadowRadius: 10,
  },
});
