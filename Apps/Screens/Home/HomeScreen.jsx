import { View, Text, Button, StyleSheet, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { supabase } from '../../Utils/SupabaseConfig';
import Colors from '../../Utils/Colors'
import { Video } from 'expo-av';
import VideoThumbnailItem from './VideoThumbnailItem';

export default function HomeScreen() {
    const { user } = useUser();
    const [videoList, setVideoList] = useState([]);


    useEffect(() => {
        if (user) {
            updateProfileImage();
            getLatestVideoList(); // On récupère les 10 dernières vidéos
        }
    }, [user]);

    const updateProfileImage = async () => {
        if (user?.imageUrl) {
            const { data, error } = await supabase
                .from('Users')
                .update({ profileImage: user.imageUrl })
                .eq('email', user.primaryEmailAddress.emailAddress)
                .select();

            // console.log(data); 
            // setVideoList(data);
        }
    }

    const getLatestVideoList = async () => {
        const { data, error } = await supabase
            .from('PostList')
            .select(`
                *,
                Users (
                    username, 
                    name, 
                    profileImage
                )
            `)
            .range(0, 9);


            setVideoList(data);
            // console.log(data);
            // console.log(error);
    }

    return (
        <View style={{ padding: 20, paddingTop: 25 }}>
            <View style={{
                display: 'flex', flexDirection: 'row',
                justifyContent: 'space-between', alignItems: 'center',
                paddingTop: 50, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: Colors.GRAY
            }}>
                <Text style={{
                    fontSize: 30,
                    fontFamily: 'outfit-bold',
                }}>CarTradeConnect</Text>

                <Image source={{ uri: user?.imageUrl }}
                    style={{ width: 50, height: 50, borderRadius: 99 }} />
            </View>

            <View>
                <FlatList
                data={videoList}
                numColumns={2}
                renderItem={({item,index})=> (
                    <VideoThumbnailItem video={item}/>
                )}
                />
            </View>
        </View>
    )
}
