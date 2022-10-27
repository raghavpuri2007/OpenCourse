import { KeyboardAvoidingView, View, Text, Image, StyleSheet, useWindowDimensions, Pressable, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import Landing from '../images/Landing.png'
import CustomButton from "../../components/CustomButtons/CustomButton"
import { useNavigation } from "@react-navigation/core"
const LandingScreen = () => {
  const {height, width} = useWindowDimensions()
  const navigation = useNavigation()

  const onLogin = () => {
    navigation.navigate("Login")
  }

  const onRegister = () => {
    navigation.navigate("Register")
  }
  return (
    <KeyboardAvoidingView style={styles.root} behavior="padding">
    <Image source={Landing} style={[styles.logo, {aspectRatio: 1 / 1, height: '35%', marginTop: 50}]} resizeMode="contain" />
        <Text style={[styles.title, {paddingVertical: height * 0.08}]}>Hey! Welcome.</Text>
        <Text style={{textAlign: 'center', width: '95%'}}>We share and recieve personal feedback about high school classes.</Text>
        <CustomButton text="Get Started" type="PRIMARY" marginTop={30} onPress={onRegister} />
        <CustomButton text="I already have an account" type="TERTIARY" marginTop={30} onPress={onLogin} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        width: '40%',
        height: '40%',
        maxWidth: 300,
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
    }
})

export default LandingScreen