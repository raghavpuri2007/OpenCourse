import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import starFilled from '../../screens/images/star_filled.png'
import starOutlined from '../../screens/images/star_outlined.png'

const CustomRating = ({alert, maxRating, defaultRating, setDefaultRating}) => {
    return (
        <View style={[styles.customRatingBar, alert ? {borderColor: 'red', borderWidth: 1} : null]}>
        {
          maxRating.map((item, key) => {
            return (
              <TouchableOpacity activeOpacity={0.7} key={item} onPress={() => setDefaultRating(item)}>
                <Image style={styles.starImg} source={
                  item <= defaultRating ? starFilled : starOutlined
                } />
              </TouchableOpacity>
            )
          })
        }
        </View>
      )
}
const styles = StyleSheet.create({
    customRatingBar: {
      justifyContent: 'center',
      flexDirection: 'row',
      height: 50,
      alignItems:'center',
      borderRadius: 15,
    },
    starImg: {
      width: 30,
      height: 30,
      resizeMode: 'cover'
    }
  })
export default CustomRating