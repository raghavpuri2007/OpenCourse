import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({alert, value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={[styles.container, alert ? { borderColor: 'red'} : {borderColor: '#e8e8e8'}]}>
      <TextInput placeholder={placeholder} value={value} onChangeText={setValue} secureTextEntry={secureTextEntry} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '90%',
      borderWidth: 1,
      borderRadius:15,

      paddingHorizontal: 10,
      paddingVertical: 20,
      marginVertical: 10
    },
  })

export default CustomInput