import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import LoginScreen from './Apps/Screens/LoginScreen/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import HomeScreen from './Apps/Screens/Home/HomeScreen';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
      'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
      'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
      'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  return (
    <ClerkProvider publishableKey={Constants.expoConfig.extra.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <View style={styles.container}>
     
                <SignedIn>

                     {/* //<Text>Vous êtes connecté</Text> */}
                     <HomeScreen />

                </SignedIn>

                
                <SignedOut>
                    <LoginScreen />
                </SignedOut>

     </View>
     </ClerkProvider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
