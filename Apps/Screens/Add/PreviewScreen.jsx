import { View, Text, TextInput, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import Colors from '../../Utils/Colors'


export default function PreviewScreen() {

  const params = useRoute().params;



  useEffect(() => {
    console.log(params);
  },[]);



  
  return (
    <View style={{padding: 20, backgroundColor:Colors.WHITE, flex:1}}>
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
              <TextInput
              
              numberOfLines={3}
              placeholder='Description'
              style={{
                borderWidth: 2,
                width: '100%',
                height: 50,
                borderRadius: 10,
                marginTop: 50,
                borderColor: Colors.BACKGROUND_TRASNP,
                paddingHorizontal:20

                
                
                
              }}
              
              />

      </View>
      
    </View>
  )
}