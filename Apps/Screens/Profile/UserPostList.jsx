import { View, Text, FlatList } from 'react-native'
import React from 'react'
import VideoThumbnailIItem from '../Home/VideoThumbnailIItem'

export default function UserPostList({postList,GetLatestVideoList,loading}) {
  return (
    <View>
        <FlatList
          data={postList} 
          numColumns={2}
          style={{display:'flex'}}
          onRefresh={GetLatestVideoList}
          refreshing={loading}
          
          renderItem={({item,index})=>(
             <VideoThumbnailIItem video={item}
             refreshData={()=>GetLatestVideoList()} />
           
           
          )}
        />
  
    </View>
  )
}