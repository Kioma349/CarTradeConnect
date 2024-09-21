import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AddScreen from '../Screens/Add/AddScreen';
import PreviewScreen from '../Screens/Add/PreviewScreen';

const Stack = createStackNavigator();
export default function AddScreenNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="add-screen" component={AddScreen} />
      <Stack.Screen name="preview-screen" component={PreviewScreen} />
    </Stack.Navigator>
  )
}