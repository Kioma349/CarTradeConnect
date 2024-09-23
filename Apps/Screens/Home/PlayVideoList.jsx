import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PlayVideoListItem from './PlayVideoListItem';

export default function PlayVideoList() {
  const { params } = useRoute();
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    // S'assure que les données de vidéo sont passées et les met dans un état
    if (params?.selectedVideo) {
      setVideoList([params.selectedVideo]);  // Assurez-vous que selectedVideo est un objet approprié
    }
  }, [params]);

  return (
    <View>
      <FlatList
        data={videoList}
        renderItem={({ item }) => <PlayVideoListItem video={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}
