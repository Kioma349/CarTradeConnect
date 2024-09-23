import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

export default function VideoThumbnailItem({ video }) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => navigation.navigate('play-video', { selectedVideo: video })}
        >
            <View style={styles.bottomInfo}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: video?.Users?.profileImage }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.username}>{video?.Users?.username}</Text>
                </View>
                <View style={styles.likesInfo}>
                    <Text style={styles.likesCount}>36</Text>
                    <Ionicons name="heart-outline" size={24} color="white" />
                </View>
            </View>
            <Image
                source={{ uri: video?.thumbnail }}
                style={styles.thumbnail}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5
    },
    bottomInfo: {
        position: 'absolute',
        zIndex: 10,
        bottom: 0,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    profileImage: {
        width: 20,
        height: 20,
        backgroundColor: Colors.WHITE,
        borderRadius: 99
    },
    username: {
        color: Colors.WHITE,
        fontFamily: 'outfit-bold',
        fontSize: 12,
        marginLeft: 5,
        marginTop: 5,
        textShadowColor: Colors.BLACK
    },
    likesInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    likesCount: {
        fontFamily: 'outfit',
        fontSize: 12,
        color: Colors.WHITE
    },
    thumbnail: {
        width: '100%',
        height: 250,
        borderRadius: 10
    }
})
