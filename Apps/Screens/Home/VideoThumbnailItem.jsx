import { View, Text, Image } from 'react-native'
import React from 'react'

export default function VideoThumbnailItem({video}) {
  return (
    <View style={{flex:1}}>
      
    <Image source={{uri:video?.thumbnail}}
    style = {{width:'100%', height:250}}

    />





    </View>
  )
}