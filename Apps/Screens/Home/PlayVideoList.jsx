import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import PlayVideoListItem from './PlayVideoListItem';
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from '../../Utils/Colors'
import { FlatList } from 'react-native-gesture-handler';


export default function PlayVideoList() {
  const { params } = useRoute();
  const [videoList, setVideoList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // S'assure que les données de vidéo sont passées et les met dans un état
    if (params?.selectedVideo) {
      setVideoList([params.selectedVideo]);  // Assurez-vous que selectedVideo est un objet approprié
    }
  }, [params]);

  return (
    <View>

      <View>

      <TouchableOpacity style={{position:'absolute', zIndex:10, padding:20, paddingTop:50
      }} onPress={() => {navigation.goBack()}}>
        <Ionicons name="arrow-back-circle-sharp" size={54} color="black" />
        <Text style={{fontFamily: 'outfit',
        fontSize: 18}}>Retour</Text>
      </TouchableOpacity>

      </View>

      <FlatList
        data={videoList}
        style={{zIndex:-1}}
        renderItem={({ item }) => <PlayVideoListItem video={item} />}
        keyExtractor={item => item.id.toString()}
      />

    </View>
  );
}

