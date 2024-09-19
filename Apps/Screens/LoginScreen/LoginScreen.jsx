import React from 'react'
import * as WebBrowser from 'expo-web-browser';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image';
import { Video, ResizeMode } from 'expo-av';
import Colors from '../../Screens/Utils/Colors';
import { useWarmpUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
//import {supabase} from '../../Screens/Utils/SupabaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

    useWarmpUpBrowser();

        const { startOAuthFlow } = useOAuth({ strategy:"oauth_google"});

        const onPress = React.useCallback(async () => {
            try {
                const { createdSessionId, signIn, signUp, setActive } = 
                
                await startOAuthFlow();

                if (createdSessionId) {
                    setActive({ session: createdSessionId});
                } else {
                    // use signUp or signIn for nexr steps such as MFA
                }    

                } catch(err) {
                    console.error("OAuth error", err);
                }
            }, []);

  return (
    <View style={{flex:1, }}>
    <Video
    style={styles.video}
   
    source={{
        uri: 'https://videos.pexels.com/video-files/20153917/20153917-uhd_2560_1440_24fps.mp4',
    }}
    
    shouldPlay
    resizeMode='cover'
    isLooping={true}
    />

<View style={{
            display:'flex',
            alignItems:'center',
            paddingTop:100, //position des 2 texts 
            flex:1,
            paddingHorizontal:20,
            backgroundColor:Colors.BACKGROUND_TRASNP,

        }}>
            <Text 
            style={{
                    fontFamily:'outfit-bold',
                    color:Colors.WHITE,
                    fontSize:35,

            }}
            
            >CarTradeConnect Login </Text>

<Text
            style={{
                fontFamily:'outfit',
                color:Colors.WHITE,
                fontSize:17,
                textAlign:'center',
                marginTop:15,
            }}
            >Best Easy Trade Car Application</Text>

            <TouchableOpacity 
                onPress = {onPress} 
            style={{
                    display:'flex',
                    alignItems:'center',
                    gap:10,
                    flexDirection:'row',
                    backgroundColor:Colors.WHITE,
                    padding:10,
                    paddingHorizontal:55,
                    borderRadius:99,
                    position:'absolute',
                    bottom:300
                }}>
            <Image source={require('./../../../assets/images/google.png')}
                    style={{
                        width:30,
                        height:30
                    }}
                    />
                 <Text style={{
                    fontFamily:'outfit',
                 }} >Se connecter avec google</Text>
            </TouchableOpacity>
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
    video:{
        height: '100%',
        width:470,
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,

    }
})