import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomFormInput = ({disabled, alert, placeholder, value, onChangeText, multiline, keyboardType}) => {
  return (
    <View style={[styles.container, alert ? { borderColor: 'red'} : {borderColor: '#e8e8e8'}, disabled ? {backgroundColor: '#cccccc'} : {backgroundColor: '#fafafa'}]}>
      <TextInput editable={disabled ? false : true} selectTextOnFocus={disabled ? false : true} style={{fontSize: 15}} enablesReturnKeyAutomatically={true} placeholder={placeholder} value={value} onChangeText={onChangeText} multiline={multiline} keyboardType={keyboardType} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      
      width: '100%',
      borderWidth: 1,
      borderRadius:15,

      paddingHorizontal: 10,
      paddingVertical: 12,
    },
  })

export default CustomFormInput