import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'

export default function PreviewScreen() {

  const params = useRoute().params;



  useEffect(() => {
    console.log(params);
  },[]);



  
  return (
    <View>
      <Text>PreviewScreen</Text>
    </View>
  )
}