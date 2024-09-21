import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import Colors from '../../Utils/Colors'


export default function PreviewScreen() {

  const params = useRoute().params;



  useEffect(() => {
    console.log(params);
  },[]);



  
  return (
    <View style={{padding: 20}}>
      <View style={{
        alignItems: 'center',
        marginTop: 45,
      }}>
            <Text 
            style={{ 
              fontFamily:'outfit-bold', 
              fontSize:20}} 
              
              > Add Details</Text>

              <Image source={{ uri:params?.thumbnail }}
              style={{
                width: 200,
                height: 300,
                borderRadius: 15,
                marginTop: 15
                
              }}/>

      </View>
      
    </View>
  )
}