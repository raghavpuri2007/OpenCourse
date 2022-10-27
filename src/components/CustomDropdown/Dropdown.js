import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Dropdown = ({alert, defaultValue, data, text, onSelect}) => {
  return (
    <View style={styles.container}>
    <SelectDropdown data={data} onSelect={onSelect} buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem
        reset();
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }} 
      defaultValue={defaultValue !== "" ? defaultValue : null}
      defaultButtonText={text}
      buttonStyle={alert ? {width: '100%', borderRadius: 15, borderColor: 'red', borderWidth: 1} : {width: '100%', borderRadius: 15}}
      textStyle
      rowStyle={{backgroundColor: 'grey'}}
      dropdownIconPosition={'right'}
      renderDropdownIcon={isOpened => {
        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
      }}
      />
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default Dropdown