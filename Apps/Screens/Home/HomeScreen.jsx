import { View, Text, Button, StyleSheet, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { supabase } from '../../Utils/SupabaseConfig';
import VideoThumbnailIItem from './VideoThumbnailIItem';


export default function HomeScreen() {
    const { user } = useUser();
    const [videoList, setVideoList] = useState([]);
    const [loading,setLoading]=useState(false);
    const [loadCount,setLoadCount]=useState(0);
    useEffect(() => {
      user && updateProfileImage();
      setLoadCount(0)
    }, [user])
  
  
    useEffect(()=>{
      GetLatestVideoList();
    },[loadCount])
  
    const updateProfileImage = async () => {
      const { data, error } = await supabase
        .from('Users')
        .update({ 'profileImage': user?.imageUrl })
        .eq('email', user?.primaryEmailAddress?.emailAddress)
        .is('profileImage', null)
        .select();
  
     
    }
  
    const GetLatestVideoList = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('PostList')
        .select('*,Users(username,name,profileImage),VideoLikes(postIdRef,userEmail)')
        .range(loadCount, loadCount+15)
        .order('id', { ascending: false })
  
        setVideoList(videoList=>[...videoList,...data]); 
      console.log(error)
      if(data)
      {
        setLoading(false);
      }
    }
    return (
      <View style={{ padding: 20, paddingTop: 25 }}>
        <View style={{
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center'
        }}>
          <Text style={{ fontSize: 30, fontFamily: 'outfit-bold' }}>
            Taka Tak</Text>
          <Image source={{ uri: user?.imageUrl }}
            style={{ width: 50, height: 50, borderRadius: 99 }}
          />
        </View>
        <View>
          <FlatList
            data={videoList} 
            numColumns={2}
            style={{display:'flex'}}
            onRefresh={GetLatestVideoList}
            refreshing={loading}
            onEndReached={()=>setLoadCount(loadCount+7)}
            onEndReachedThreshold={0.2}
            renderItem={({item,index})=>(
               <VideoThumbnailIItem video={item}
               refreshData={console.log} />
             
             
            )}
          />
        </View>
      </View>
    )
  }