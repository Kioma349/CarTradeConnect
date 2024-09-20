import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useClerk, useUser } from '@clerk/clerk-expo';
import {supabase} from '../../Screens/Utils/SupabaseConfig';



export default function HomeScreen() {
  const { user } = useUser();

  useEffect(() => {
    user&&updateProfileImage();
  },[user]);

  const updateProfileImage = async () => {
    const { data, error } = await supabase
      .from('Users')
      .update({ profileImage: user?.imageUrl})
      .eq('email', user?.primaryEmailAddress?.emailAddress)
      .is('profileImage', null)
      .select();

      console.log("Mise à jour de l'image de profil", data);
      
  }

  return (
    <View style={{padding:20}}>
      <Text>HomeScreen</Text>
    </View>
  )
}