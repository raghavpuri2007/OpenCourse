import { KeyboardAvoidingView, View, Text, Image, StyleSheet, useWindowDimensions, Pressable, ScrollView, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomInput from "../../components/CustomInput/CustomInput"
import CustomSignInButton from "../../components/CustomSignInProviderButtons/CustomSignIn"
import SignUpButton from "../../components/CustomButtons/CustomButton"
import GoogleLogo from '../images/google.png'
import AppleLogo from '../images/apple.png'
import Register from '../images/Register.png'
import {auth, db} from "../../../firebase";
import { setDoc, doc } from "firebase/firestore/lite"
import {useNavigation } from "@react-navigation/core"
import {createUserWithEmailAndPassword} from "firebase/auth"

const SignUpScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        resetState()
    });
    return unsubscribe;
    }, [navigation])
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [firstNameAlert, setFirstNameAlert] = useState(false)
    const [lastNameAlert, setLastNameAlert] = useState(false)
    const [emailAlert, setEmailAlert] = useState(false)
    const [passwordAlert, setPasswordAlert] = useState(false)

    const {height, width} = useWindowDimensions()
    const resetState = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")

        setFirstNameAlert(false)
        setLastNameAlert(false)
        setEmailAlert(false)
        setPasswordAlert(false)
    }
    const onRegisterPressed = () => {
        setFirstNameAlert(false)
        setLastNameAlert(false)
        setEmailAlert(false)
        setPasswordAlert(false)
        if(firstName === "") {
            setFirstNameAlert(true)
        }
        if(lastName === "") {
            setLastNameAlert(true)
        }
        if(email === "") {
            setEmailAlert(true)
        }
        if(password === "" || password.length < 8) {
            setPasswordAlert(true)
        }
        console.log(firstNameAlert, lastNameAlert, passwordAlert, emailAlert)
        if(firstNameAlert || lastNameAlert || passwordAlert || emailAlert ) {
            Alert.alert(
                "Error",
                "There seems to be an error. Please make sure all fields are correctly entered. Email must be valid and password must be at least 8 characters.",
                [
                    {
                      text: "Ok",
                      onPress: () => {},
                    }
                ]
            )
        } else {
            createUserWithEmailAndPassword(auth, email, password).then(async(cred) => {
                const docRef = doc(db, 'users', auth.currentUser.uid ? auth.currentUser.uid  : "");
                await setDoc(docRef, {
                    firstName: firstName.replace(/\s/g, ''),
                    lastName: lastName.replace(/\s/g, ''),
                    email,
                })
                navigation.navigate("Home")
            }).catch((error) => {
                setEmailAlert(true);
                setPasswordAlert(true);
                Alert.alert(
                    "Error",
                    "Email or Password was invalid",
                    [
                        {
                            text: "Ok",
                            onPress: () => {},
                        }
                    ]
                )
            })
        }
    }
    const onPrivacyPolicyPressed = () => {
        console.warn("Privacy Policy")
    }

    const onTermsOfUsePressed = () => {
        console.warn("Terms Of Use")
    }

    const onLogin = () => {
        navigation.navigate("Login")
    }
    return (
        <KeyboardAvoidingView style={styles.root} behavior="padding">
        <Image source={Register} style={[styles.logo, {aspectRatio: 1 / 1, height: '20%', marginTop: 40}]} resizeMode="contain" />
            <Text style={[styles.title, {paddingVertical: height * 0.02}]}>Create Account</Text>
            <CustomInput alert={firstNameAlert} placeholder="First Name" value={firstName} setValue={setFirstName}/>
            <CustomInput alert={lastNameAlert}placeholder="Last Name" value={lastName} setValue={setLastName}/>
            <CustomInput alert={emailAlert}placeholder="Email" value={email} setValue={setEmail}/>
            <CustomInput alert={passwordAlert} placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
            {/*<Text style={styles.text}>By registering, you confirm that you accept our <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and <Text onPress={onPrivacyPolicyPressed} style={styles.link}>Privacy Policy</Text></Text>*/}
            <SignUpButton text="Register" onPress={onRegisterPressed} marginTop={30} type='PRIMARY' />
            <Text style={{marginTop: height * 0.05, fontWeight: 'bold'}} >Already have an account? <Text onPress={onLogin} style={{color: '#f54545'}}>Login</Text></Text>
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
    text: {
        color: '#a8a2a2',
        width: '88%',
    },
    link:{
        color: '#f54545',
        fontWeight: '500'
    },
    customProviderContainer:{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly'
      }
  })

export default SignUpScreen