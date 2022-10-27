import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text, marginTop, type}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`], {marginTop: marginTop}]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        padding: 20,
        alignItems: 'center',
        borderRadius: 40,
    },
    container_PRIMARY: {
      backgroundColor: '#fc5858'
    },
    container_TERTIARY: {
      backgroundColor: '#FFF',
      borderColor: '#fc5858',
      borderWidth: 0.5,
    },
    text: {
        fontWeight: '700',
        fontSize: 18,
    },
    text_PRIMARY: {
      color:'white',
    },
    text_TERTIARY: {
      color: '#fc5858',
    }

})

export default CustomButton