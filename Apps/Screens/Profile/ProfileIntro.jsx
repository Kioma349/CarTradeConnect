import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-expo';
import Colors from './../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileIntro({ postList }) {
    const { user } = useUser();
    const { signOut } = useClerk();
    const [totalPostLikes, setTotalPostLikes] = useState(0);

    useEffect(() => {
        postList && calculateTotalLikes();
    }, [postList]);

    const calculateTotalLikes = () => {
        let totalLikes = 0;
        postList.forEach(element => {
            totalLikes += element.VideoLikes?.length || 0;
        });
        setTotalPostLikes(totalLikes);
    };

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <View style={{ marginTop: 30, position: 'relative' }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 24
            }}>Mon Profil</Text>

            <TouchableOpacity onPress={handleSignOut} style={{ position: 'absolute', right: -1, top: -1, alignItems: 'center' }}>
                <Ionicons name="log-out-outline" size={38} color="black" />
                <Text style={{ color: 'black', fontSize: 12 }}>Déconnexion</Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Image source={{ uri: user.imageUrl }}
                    style={{
                        width: 90,
                        height: 90,
                        borderRadius: 99
                    }}
                />
                <Text style={{
                    fontSize: 22,
                    fontFamily: 'outfit-medium'
                }}>{user?.fullName}</Text>
                <Text style={{
                    fontSize: 17,
                    fontFamily: 'outfit',
                    color: Colors.BACKGROUND_TRASNP
                }}>{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>
            <View style={{ marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between' }}>
                <View style={{
                    padding: 20,
                    alignItems: 'center'
                }}>
                    <Ionicons name="videocam" size={24} color="black" />
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 20
                    }}>{postList?.length} Post</Text>
                </View>
                <View style={{
                    padding: 20,
                    alignItems: 'center'
                }}>
                    <Ionicons name="heart" size={24} color="black" />
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 20
                    }}>{totalPostLikes} Likes</Text>
                </View>
            </View>
        </View>
    );
}
