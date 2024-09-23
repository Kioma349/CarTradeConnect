import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';




export default function VideoThumbnailItem({ video }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={{ flex: 1, margin: 5 }}
        onPress={(o) => navigation.navigate('play-video', { 
            selectedVideo:video 
        })}>
            <>
            <View style={{ position: 'absolute', zIndex: 10, bottom: 0, padding: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>

                    <Image source={{ uri: video?.Users?.profileImage }}
                        style={{ width: 20, height: 20, backgroundColor: Colors.WHITE, borderRadius: 99 }}

                    />

                    <Text style={{
                        color: Colors.WHITE,
                        fontFamily: 'outfit-bold', fontSize: 12, marginLeft: 5, marginTop: 5, textShadowColor: Colors.BLACK
                    }}>{video?.Users?.username}</Text>


                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3 }}>

                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 12, color: Colors.WHITE
                    }}>36</Text>

                    <Ionicons name="heart-outline" size={24} color="white" />
                </View>





            </View>


            <Image source={{ uri: video?.thumbnail }}
                style={{ width: '100%', height: 250, borderRadius: 10 }}

            />
            </>
        </TouchableOpacity>
    )
}