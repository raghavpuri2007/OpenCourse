import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView source={require('./images/loader.json')} autoplay loop />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0,0.3)',
    zIndex: 1
    }
})
export default AppLoader