import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { ResizeMode, Video } from 'expo-av'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Colors from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'

export default function PlayVideoListItem({ video, activeIndex, index, userLikeHandler,user }) {
    const videoRef = useRef(null);
    const [status, setStatus] = useState({});
    const BottomTabHeight = useBottomTabBarHeight();
    const navigation=useNavigation()
    const ScreenHeight = Dimensions.get('window').height - BottomTabHeight;
    const checkIsUserAlreadyLike=()=>{
      const result=video.VideoLikes?.find(item=>item.userEmail==user.primaryEmailAddress.emailAddress)
        return result;
    }

    const onOtherUserProfileClick=(OtherUser)=>{
        navigation.navigate('other-user',{
            user:OtherUser
        })
    }

    return (
        <View>

            <View style={{
                position: 'absolute', zIndex: 10,
                bottom: 20, padding: 20,
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                width: '100%',
                alignItems: 'flex-end'
            }}>
                <View >
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10
                    }}>
                        <TouchableOpacity onPress={()=>onOtherUserProfileClick(video.Users)}>
                        <Image source={{ uri: video?.Users.profileImage }}
                            style={{
                                width: 40, height: 40,
                                backgroundColor: Colors.WHITE, borderRadius: 99
                            }}
                        />
                        </TouchableOpacity>
                        <Text style={{
                            fontFamily: 'outfit',
                            color: Colors.WHITE, fontSize: 16
                        }}>{video.Users.name}</Text>

                    </View>
                    <Text style={{
                        fontFamily: 'outfit',
                        color: Colors.WHITE, fontSize: 16, marginTop: 7
                    }}>{video.description}</Text>
                </View>
                <View style={{ display: 'flex', gap: 15 }}>
                    <>
                    {checkIsUserAlreadyLike() ?
                        <TouchableHighlight onPress={() => userLikeHandler(video, true)}>
                            <Ionicons name="heart" size={40} color="white" />
                        </TouchableHighlight>
                        :
                        <TouchableHighlight onPress={() => userLikeHandler(video, false)}>
                            <Ionicons name="heart-outline" size={40} color="white" />
                        </TouchableHighlight>}
                        <Text style={{color:Colors.WHITE,textAlign:'center',marginTop:-15}}>
                            {video?.VideoLikes?.length}
                        </Text>
                        </>
                    <Ionicons name="chatbubble-outline" size={35} color="white" />
                    <Ionicons name="paper-plane-outline" size={35} color="white" />
                </View>
            </View>
            <Video
                ref={videoRef}
                style={[styles.video, { height: ScreenHeight }]}
                source={{
                    uri: video?.videoUrl,
                }}
                useNativeControls={false}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay={activeIndex == index}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    video: {
        alignSelf: 'center',
        width: Dimensions.get('window').width,

    },
})