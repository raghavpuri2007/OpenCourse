import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from './src/screens/SignIn/SignInScreen'
import SignUpScreen from './src/screens/SignUp/SignUpScreen'
import HomeScreen from './src/screens/Home/HomeScreen'
import AddScreen from './src/screens/Add/AddScreen'
import FullPostScreen from './src/screens/Home/FullPostScreen'
import ProfileScreen from './src/screens/Profile/ProfileScreen'
import LandingScreen from './src/screens/Landing/LandingScreen'
import CourseScreen from './src/screens/Home/CourseModal'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from "@react-navigation/core"
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import {auth} from "./firebase";
import {onAuthStateChanged} from "firebase/auth"
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
  })
  


  const AuthStack = () => {
    return (
      <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={SignInScreen} />
        <Stack.Screen name="Register" component={SignUpScreen} />
      </Stack.Navigator>
    )
  }
  const AppStack = () => {
    return (
      <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if(route.name === 'HomeTabs') {
            iconName = focused ? 'home' : 'home-outline'
          } else if(route.name === 'Add') {
            iconName = focused ? 'plus-circle' : 'plus-circle-outline'
            size = 35;
          } else {
            iconName = focused ? 'account-circle' : 'account-circle-outline'
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fc5858',
        tabBarInactiveTintColor: '#998f8e',
        tabBarShowLabel: false,
        headerShown: false
      })}>
        <Tab.Screen name="HomeTabs" component={HomeTabs} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="ProfileTabs" component={ProfileTabs} />
      </Tab.Navigator>
    )
  }
  const HomeTabs = () => {
    return (
      <RootStack.Navigator initialRouteName="Home">
        <Stack.Group screenOptions={{ headerShown: false, gestureEnabled: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="FullPost" component={FullPostScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
          <Stack.Screen name="CreateCourse" component={CourseScreen} />
        </Stack.Group>
      </RootStack.Navigator>
    )
  }

  const ProfileTabs = () => {
    return (
      <RootStack.Navigator initialRouteName="Profile">
        <Stack.Group screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="FullPost" component={FullPostScreen} />
        </Stack.Group>
      </RootStack.Navigator>
    )
  }
  

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        {loggedIn ? 
          <Stack.Screen name="AppStack" component={AppStack} /> :
          <Stack.Screen name="AuthStack" component={AuthStack} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  },
});
