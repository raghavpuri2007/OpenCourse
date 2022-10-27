import { Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'

const CustomSignIn = ({source, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image style={styles.logo} source={source} resizeMode="contain"/>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: '33%',
    height: 'auto',
    aspectRatio: 1 / 1,
  },
  container: {
    alignItems: 'center',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'white'
  }
})

export default CustomSignIn