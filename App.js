import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './Apps/Screens/LoginScreen/LoginScreen';
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from '@clerk/clerk-expo';
import HomeScreen from './Apps/Screens/Home/HomeScreen';

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
        'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
        'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    });

    console.log("App Component Rendered"); // Ajout d'un log pour le rendu général de l'apps

    return (
        <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>

        <ClerkLoaded>
            <View style={styles.container}>

            
                <SignedIn>
                 <HomeScreen/>
                 
                </SignedIn>

                
                <SignedOut>
                    <LoginScreen/>
                </SignedOut>
                
            </View>
            </ClerkLoaded>
        </ClerkProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
