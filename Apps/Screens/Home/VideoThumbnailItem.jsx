import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { supabase } from '../../Utils/SupabaseConfig'
import { s3bucket } from '../../Utils/S3BucketConfig';

export default function VideoThumbnailItem({video}) {
  return (
    <View style={{flex:1, margin:5}}>
      <View style={{position:'absolute', zIndex:10, bottom:0, padding:5}}>

        <View>

            <Image source={{uri:video?.Users?.profileImage}}
            style={{width:20, height:20, backgroundColor:Colors.WHITE, borderRadius:99}}
            
            />
            <Text style={{color:Colors.WHITE,
                fontFamily:'outfit-bold',fontSize:12, marginLeft:5, marginTop:5, textShadowColor:Colors.BLACK, textShadowRadius:10, textShadowOffset:{width:1, height:1}
            }}>{video?.Users?.username}</Text>
        </View>


      </View>
    <Image source={{uri:video?.thumbnail}}
    style = {{width:'100%', height:250, borderRadius:10}}

    />





    </View>
  )
}