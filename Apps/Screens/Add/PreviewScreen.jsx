import { View, Text, TextInput, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useState } from 'react';
import { s3bucket } from '../../Utils/S3BucketConfig';

import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../Utils/Colors'



export default function PreviewScreen() {

      const params = useRoute().params;
      const navigation = useNavigation();
      const [description, setDescription] = useState("");



  useEffect(() => {
    console.log(params);
  },[]);


        // Fonction pour publier la video
      const publishHandler = () => {

        UploadFileToAws(params.video,'video'); //On envoie la video sur AWS
      

    }

    const UploadFileToAws=async(file)=>{
      // On va envoyer le fichier sur le serveur AWS
      const fileType= file.split('.').pop(); //ex : mp4, .jpg
      let type; // Déclaration de la variable type
      if (['mp4', 'mov', 'avi'].includes(fileType)) {
        type = 'video'; // C'est une vidéo
      } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
        type = 'image'; // C'est une image
      }

      const params={
        Bucket:'cartradeconnect-app',
        Key:`linus-${Date.now()}.${fileType}`,	//Ex. linus-Ferrari.mp4
        Body: await fetch(file).then(resp=>resp.blob()), //permet de recuperer le fichier
        ACL:'public-read', //permet de dire que le fichier est public
        ContentType:type=='video'?`video/${fileType}`:`image/${fileType}`, // permet de dire à AWS le type de fichier
      }

          try{
            const data=await s3bucket.upload(params)
            .promise().then(resp=>{
              console.log("Fichier Chargé ...");
              console.log("RESP:",resp);
            })
          }catch(e)
          {
            console.log(e);
          }
          
           
    }

    return (
    <KeyboardAvoidingView style={{backgroundColor:Colors.WHITE, flex:1}}>
      <ScrollView style={{padding: 20,}}>


        <TouchableOpacity 
        
        onPress={() => navigation.goBack()}
        
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          marginTop: 10,
        }}>
          <Ionicons name="arrow-back-circle-sharp" size={54} color="black" />
          <Text style={{fontFamily:'outfit', fontSize:18}}>Retour</Text>
        </TouchableOpacity>

     
       <View style={{
        alignItems: 'center',
        marginTop: 80,
        

      }}>
            <Text 
            style={{ 
              fontFamily:'outfit-bold', 
              fontSize:20 }}> Add Details</Text>

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

              onChangeText={(value)=>setDescription(value)} //recupere la valeur de la description

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
              <TouchableOpacity 

              onPress={publishHandler}

                      style={{
                        backgroundColor:Colors.BLACK,
                        padding:20,
                        paddingHorizontal:65,
                        borderRadius:99,
                        marginTop:60


                      }}>
                          <Text 
                          style={{
                            fontFamily:'outfit',
                            color:Colors.WHITE}}>Publier</Text>

              </TouchableOpacity>
          </View>
        </ScrollView>
      
      </KeyboardAvoidingView>

  )
}