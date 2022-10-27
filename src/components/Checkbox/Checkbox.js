import { StyleSheet,View, Pressable, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Checkbox = ({onPress, text, checked}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.checkBox}>
            <MaterialCommunityIcons name={checked ? "checkbox-outline" : "checkbox-blank-outline"} size={25} />
        </View>
        <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 25,
        width: '100%',
    },
    checkBox: {
        marginRight: 5,
    },
    text: {
        fontSize: 16,
    }
})
export default Checkbox