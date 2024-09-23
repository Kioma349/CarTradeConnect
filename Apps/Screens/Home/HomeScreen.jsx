import { View, Text, Button, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { supabase } from '../../Utils/SupabaseConfig';
import Colors from '../../Utils/Colors'

export default function HomeScreen() {
    const { user } = useUser();

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

            console.log(data);
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

        console.log(data);
        console.log(error);
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
        </View>
    )
}
