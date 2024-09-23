import React, { useEffect, useState, createContext, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useRoute, useNavigation } from '@react-navigation/native';
import PlayVideoListItem from './PlayVideoListItem';
import { supabase } from '../../Utils/SupabaseConfig';

// Contexte pour gérer la vidéo actuellement en lecture
export const VideoPlayContext = createContext();

export default function PlayVideoList() {
    const { params } = useRoute();
    const navigation = useNavigation();
    const [videoList, setVideoList] = useState([]);
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const windowHeight = Dimensions.get('window').height;
    const bottomTabHeight = useBottomTabBarHeight();

    useEffect(() => {
        if (params?.selectedVideo) {
            setVideoList([params.selectedVideo]);
            getLatestVideoList(params.selectedVideo.id);
        }
    }, [params]);

    const getLatestVideoList = async (excludeId) => {
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
            .not('id', 'eq', excludeId)
            .order('id', { ascending: true });

        if (error) {
            console.error('Erreur lors de la récupération des vidéos:', error);
            return;
        }

        setVideoList(prev => [...prev, ...data]);
    };

    return (
        <VideoPlayContext.Provider value={{ currentPlaying, setCurrentPlaying }}>
            <View>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle-sharp" size={54} color="black" />
                    <Text style={styles.backText}>Retour</Text>
                </TouchableOpacity>

                <FlatList
                    data={videoList}
                    style={{ zIndex: -1 }}
                    pagingEnabled
                    onScroll={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.y / (windowHeight - bottomTabHeight));
                        setCurrentPlaying(index);
                    }}
                    renderItem={({ item, index }) => (
                        <PlayVideoListItem video={item} activeIndex={currentPlaying} index={index} />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </VideoPlayContext.Provider>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute', 
        zIndex: 10, 
        padding: 20, 
        paddingTop: 50
    },
    backText: {
        fontFamily: 'outfit',
        fontSize: 18
    }
});
