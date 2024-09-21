import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home/HomeScreen';
import SearchScreen from '../Screens/Search/SearchScreen';
import AddScreen from '../Screens/Add/AddScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../Utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddScreenNavigation from '../Navigations/AddScreenNavigation';


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (


   <Tab.Navigator 
   screenOptions={{
    
        tarBarActiveTintColor:Colors.BLACK
        
        }}
    >
        
        <Tab.Screen name="Home" component={HomeScreen} 
        options={{
            headerShown:false,
            tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" size={size} color={color} />
            )
        }}
        
        />
           
           
            {/* SearchScreen */}

        <Tab.Screen name="Search" component={SearchScreen} 
        
        options={{
            headerShown:false,
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" size={size} color={color} />
            )
        }}
        
        />


        <Tab.Screen name="Add" component={AddScreenNavigation} 
        options={{

            headerShown:false,

            tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle" size={size} color={color} />
            )
        }}
        
        />



        <Tab.Screen name="Profile" component={ProfileScreen} 
        options={{
            headerShown:false,
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="people-circle" size={24} color="black" />
            )
        }}
        
        />


    </Tab.Navigator>
  )
}