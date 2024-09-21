import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../Utils/Colors'
import * as VideoThumbnails from 'expo-video-thumbnails';


export default function AddScreen() {


          // Utilisé pour accédé a la selection de l'image à uploder


          const SelectionVideoFile = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All, // All, Videos, Images je laisse All pour tout
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            console.log(result);

            if (!result.canceled) {
              console.log(result.assets[0].uri);
              GenerateVideoThumbnail(result.assets[0].uri);


              // // Utilisé pour generer thumbnail de la video
              // setImage(result.assets[0].uri);
            }
          };

              // Utilisé pour generer thumbnail de la video


              const GenerateVideoThumbnail = async (videoUri) => {
                try {
                  const { uri } = await VideoThumbnails.getThumbnailAsync(
                    videoUri,
                    {
                      time: 10000,
                    }
                  );

                  console.log("Voici le thumbail",uri);
                  // setImage(uri); // uri contient le thumbnail de la video
                } catch (e) {
                  console.warn(e);
                }
              };

              
          return (
            <View 
            style={{
              padding:20,
              alignItems:'center',
              display:'flex',
              justifyContent:'center',
              flex:1
            }}>
            <Image source={require('./../../../assets/images/folder.png')} 
            style={{
                  width:140,
                  height:140,
                
              }}
              />

                <Text 
                  style={{
                  fontFamily:'outfit-bold',
                  fontSize:25,
                  marginTop:20
                                    }}>Ajouter votre annonce</Text>

                  <Text 
                      style={{
                      textAlign:'center',
                      fontFamily:'outfit',
                      marginTop:13,
                      }}>Ajoutez une vidéo complète de votre véhicule</Text>


        <TouchableOpacity 

              onPress={SelectionVideoFile}
              style={{
                backgroundColor:Colors.BLACK,
                padding:10,
                paddingHorizontal:55,
                borderRadius:99,
                marginTop:20


              }}>
                  <Text 
                  style={{
                    fontFamily:'outfit',
                    color:Colors.WHITE
                  }}>Sélectionne ta vidéo</Text>
              
              
        </TouchableOpacity>


    </View>
  )
}