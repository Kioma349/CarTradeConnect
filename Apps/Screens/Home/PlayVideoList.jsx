import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native'  // Assurez-vous d'importer TouchableOpacity d'ici
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import PlayVideoListItem from './PlayVideoListItem';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../Utils/SupabaseConfig';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useUser } from '@clerk/clerk-expo';

export default function PlayVideoList() {
  const params = useRoute().params;
  const [videoList, setVideoList] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState();
  const [currentVideoIndex, setCurrentVideoIndex] = useState();
  const { user } = useUser();
  const WindowHeight = Dimensions.get('window').height;
  const BottomTabHeight = useBottomTabBarHeight();

  useEffect(() => {
    setVideoList([params.selectedVideo]);
    GetLatestVideoList();
  }, [])

  const GetLatestVideoList = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('PostList')
      .select('*,Users(username,name,profileImage,email),VideoLikes(postIdRef,userEmail)')
      .range(0, 7)
      .order('id', { ascending: false })
    const result = data.filter((item => item.id != params.selectedVideo.id))
    setVideoList(result)
    if (data) {
      setLoading(false);
    }
  }

  const userLikeHandler = async (videoPost, isLike) => {
    if (!isLike) {
      const { data, error } = await supabase
        .from('VideoLikes')
        .insert([{
          postIdRef: videoPost.id,
          userEmail: user.primaryEmailAddress.emailAddress
        }])
        .select();
      console.log(error, data)
      GetLatestVideoList();
    }
    else {
      const { error } = await supabase
        .from('VideoLikes')
        .delete()
        .eq('postIdRef', videoPost.id)
        .eq('userEmail', user?.primaryEmailAddress?.emailAddress)
      GetLatestVideoList();
    }
  }

  return (
    <View>
      <TouchableOpacity style={{position: 'absolute', zIndex: 10, padding: 20, paddingTop: 50}}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      
      <FlatList
        data={videoList}
        style={{ zIndex: -1 }}
        pagingEnabled
        onScroll={e => {
          const index = Math.round(e.nativeEvent.contentOffset.y / (WindowHeight - BottomTabHeight))
          setCurrentVideoIndex(index)
        }}
        renderItem={({ item, index }) => (
          <PlayVideoListItem video={item} key={index}
            index={index}
            activeIndex={currentVideoIndex}
            userLikeHandler={userLikeHandler}
            user={user}
          />
        )}mpn 
      />
    </View>
  )
}
