import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import OtherUserProfileIntro from './OtherUserProfileIntro';
import { supabase } from '../../Utils/SupabaseConfig';
import UserPostList from '../Profile/UserPostList';

export default function OtherUserProfile() {

    const params=useRoute().params;
    const [postList,setPostList]=useState([]);
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    params&&GetUserPost();
  },[params])

  const GetUserPost=async()=>{
    
    setLoading(true)
    const {data,error}=await supabase
    .from('PostList')
    .select('*,VideoLikes(postIdRef,userEmail),Users(*)')
    .eq('emailRef',params.user.email)
    .order('id', { ascending: false })
    if(data)
    {
       
      setPostList(data)
      setLoading(false)
    }
    if(error)
    {
      setLoading(false)
    }
  }
  return (
    <View style={{padding:20,paddingTop:25}}>
     
     <FlatList
        data={[{id:1}]}
        renderItem={({item,index})=>(
            <View>
                 <OtherUserProfileIntro
        user={params.user}
        postList={postList}
      />
      <UserPostList
      postList={postList}
      GetLatestVideoList={GetUserPost}
      loading={loading}
      />
            </View>
        )}
     />
     
    </View>
  )
}