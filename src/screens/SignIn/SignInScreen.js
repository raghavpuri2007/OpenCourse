import { ActivityIndicator, KeyboardAvoidingView, View, Text, Image, StyleSheet, Pressable, ScrollView, useWindowDimensions, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import Login from '../images/Login.png'
import GoogleLogo from '../images/google.png'
import AppleLogo from '../images/apple.png'
import CustomInput from "../../components/CustomInput/CustomInput"
import SignInButton from "../../components/CustomButtons/CustomButton"
import CustomSignInButton from "../../components/CustomSignInProviderButtons/CustomSignIn"
import { useNavigation } from "@react-navigation/core"
import {auth} from "../../../firebase";
import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
const SignInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {height, width} = useWindowDimensions()
  const navigation = useNavigation()
  
  const onSignInPressed = () => {
    signInWithEmailAndPassword(auth, email, password).then(() => {
      console.log("HERE")
    }).catch((err) => {
      Alert.alert(
        "Error",
        "There seems to be an error. You may have entered an invalid email or password.",
        [
          {
            text: "Ok",
            onPress: () => {}
          }
        ]
      )
    });
  }

  const onForgotPasswordPressed = () => {
    console.warn("Forgot password")
  }

  const onRegister = () => {
    navigation.navigate("Register")
  }
  return (
    <KeyboardAvoidingView style={styles.root} behavior="padding">
        <Image source={Login} style={[styles.logo, {aspectRatio: 1 / 1, height: '25%', marginTop: 40}]} resizeMode="contain" />
        <Text style={[styles.title, {paddingVertical: height * 0.02}]}>Welcome Back!</Text>
        <CustomInput placeholder="Email" value={email} setValue={setEmail}/>
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
        <Pressable onPress={onForgotPasswordPressed} style={{width: '100%', alignItems: 'center'}}>
          <Text style={{color: '#f54545', fontWeight: '500'}}>Forgot Password?</Text>
        </Pressable>
        <SignInButton text="Login" onPress={onSignInPressed} marginTop={60} type='PRIMARY'/>
        <Text style={{marginTop: 'auto', fontWeight: 'bold'}} >Don't have an account? <Text onPress={onRegister} style={{color: '#f54545'}}>Register now</Text></Text>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  logo: {
      width: '40%',
      height: '40%',
      maxWidth: 300,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
  }, 
  customProviderContainer:{
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  }
})

export default SignInScreen