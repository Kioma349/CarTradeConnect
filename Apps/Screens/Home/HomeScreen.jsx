import { View, Text, Button, StyleSheet, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { supabase } from '../../Utils/SupabaseConfig';
import Colors from '../../Utils/Colors'


import VideoThumbnailItem from './VideoThumbnailItem';

export default function HomeScreen() {
    const { user } = useUser();
    const [videoList, setVideoList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadCount, setLoadCount] = useState(0);


    useEffect(() => {
        user && updateProfileImage();
        setLoadCount(0);
    }, [user]);


    useEffect(() => {
        getLatestVideoList();
    }, [loadCount]);

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
        setLoading(true); // On met le loading à true
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
            .range(loadCount, loadCount + 9)
            // .range(0, 7) // On récupère les 10 dernières vidéos
            .order('id', { ascending: true }); // On récupère les 10 dernières vidéos trier par l'id
        // .order('createdAt', {ascending: false}); // On récupère les 10 dernières vidéos trier par la date de création


        setVideoList(videoList=>[...videoList, ...data]);

        console.log(data);
        if (data) {
            setLoading(false);
        }
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
                    style={{ display: 'flex' }}
                    onRefresh={getLatestVideoList} // On refresh la liste

                    onEndReached={() => setLoadCount(loadCount + 7)} // On est à la fin de la liste
                    onEndReachedThreshold={0.2}
                    // onEndReached={()=> console.log('End reached')} // On est à la fin de la liste
                    refreshing={loading} // On affiche le loading
                    renderItem={({ item, index }) => (
                        <VideoThumbnailItem video={item} />
                    )}
                />
            </View>
        </View>
    )
}
