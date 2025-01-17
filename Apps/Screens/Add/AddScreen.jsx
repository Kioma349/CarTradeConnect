import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../Utils/Colors'
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useNavigation } from '@react-navigation/native';

export default function AddScreen() {



          const navigation = useNavigation();


          // Utilisé pour accédé a la selection du fichier à uploder
          const SelectionVideoFile = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All, // All, Videos, Images je laisse All pour tout
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            // console.log(result); // result contient les informations de l'image selectionné

            if (!result.canceled) {
              console.log("Selection cancelled");
        
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

                  // console.log("Voici le thumbail",uri); // uri contient le thumbnail de la video

                  // setImage(uri); // uri contient le thumbnail de la video

                  navigation.navigate('preview-screen',{
                    video:videoUri,
                    thumbnail:uri

                  })

                } catch (e) {
                  console.warn(e);
                  console.warn("Error generating thumbnail:", e.message);
                  alert('Failed to generate thumbnail. Please try again.');
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
                    color:Colors.WHITE}}>Sélectionne ta vidéo</Text>
              
              
        </TouchableOpacity>


    </View>
  )
}