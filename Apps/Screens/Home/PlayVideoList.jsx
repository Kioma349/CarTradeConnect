import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import PlayVideoListItem from './PlayVideoListItem';
import { supabase } from '../../Utils/SupabaseConfig';

export default function PlayVideoList() {
    const { params } = useRoute();
    const navigation = useNavigation();
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        if (params?.selectedVideo) {
            setVideoList([params.selectedVideo]); // Assurez-vous que ceci est nécessaire.
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
            .not('id', 'eq', excludeId) // Excluez l'ID de la vidéo sélectionnée pour éviter les doublons
            .order('id', { ascending: true });

        if (error) {
            console.error('Erreur lors de la récupération des vidéos:', error);
            return;
        }

        setVideoList(prev => [...prev, ...data]); // Fusionner les vidéos sans doublons
    };

    return (
        <View>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-circle-sharp" size={54} color="black" />
                <Text style={styles.backText}>Retour</Text>
            </TouchableOpacity>

            <FlatList
                data={videoList}
                renderItem={({ item }) => <PlayVideoListItem video={item} />}
                keyExtractor={item => item.id.toString()} // Assurez-vous que la clé est basée sur l'ID
            />
        </View>
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
