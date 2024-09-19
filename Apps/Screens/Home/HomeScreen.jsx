import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { useClerk } from '@clerk/clerk-expo';

export default function HomeScreen() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();  // Appel de la fonction de déconnexion
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur HomeScreen</Text>
      <Button title="Déconnexion" onPress={handleSignOut} color="#FF6347" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Couleur de fond de l'écran
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Couleur du texte
  }
});
