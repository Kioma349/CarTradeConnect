import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

export default function OtherUserProfileIntro({user,postList}) {
 
  const [totalPostLikes,setTotalPostLikes]=useState(0);
  useEffect(()=>{
    postList&&calculateTotalLikes();
  },[postList])
  const calculateTotalLikes=()=>{
    let totalLikes=0;
    postList.forEach(element=>{
        console.log(element.VideoLikes?.length);
        totalLikes=totalLikes+element.VideoLikes?.length;
    })
    setTotalPostLikes(totalLikes);

}
  return (
    <View style={{marginTop:30}}>
    <Text style={{
      fontFamily:'outfit-bold',
      fontSize:24
    }}>Profile</Text>

    <View style={{alignItems:'center',marginTop:20}}>
      <Image source={{uri:user.profileImage}}
          style={{
              width:90,
              height:90,
              borderRadius:99
          }}
      />
      <Text style={{
          fontSize:22,
          fontFamily:'outfit-medium'
      }}>{user?.name}</Text>
      <Text style={{
          fontSize:17,
          fontFamily:'outfit',
          color:Colors.BACKGROUND_TRASNP
      }}>{user?.email}</Text>
    </View>
    <View style={{marginTop:20,
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between'}}>
          <View style={{
              padding:20,
              alignItems:'center'
          }}>
              <Ionicons name="videocam" size={24} color="black" />
              <Text style={{
                  fontFamily:'outfit-bold',
                  fontSize:20
              }}>{postList?.length} Post</Text>
          </View>
          <View style={{
              padding:20,
              alignItems:'center'
          }}>
              <Ionicons name="heart" size={24} color="black" />
              <Text style={{
                  fontFamily:'outfit-bold',
                  fontSize:20
              }}>{totalPostLikes} Likes</Text>
          </View>
    </View>
  </View>
  )
}