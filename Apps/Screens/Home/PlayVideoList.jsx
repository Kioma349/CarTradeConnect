import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import PlayVideoListItem from './PlayVideoListItem';

export default function PlayVideoList() {
  const params=useRoute().params;
  const[videoList,setVideoList]=useState([]);

  useEffect(()=>{
    setVideoList([params.videoList]);
  },[])

  return (
    <View>
      <FlatList
      data={videoList}
      renderItem={({item})=>(
        <PlayVideoListItem video={item}/>
      )}
      />

    </View>
  )
}