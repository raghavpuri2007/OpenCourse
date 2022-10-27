import { View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import React from 'react'
import {
    LineChart
  } from "react-native-chart-kit";
const CustomLineChart = ({yAxisSuffix, data, labels}) => {
    const {height, width} = useWindowDimensions()
  return (
    <View style={styles.container}>
        <Text style={styles.title}>AP Scores vs Year</Text>
        <LineChart
            data={{
            labels: labels,
            datasets: [{data: data}]
            }}
            width={width} // from react-native
            height={220}
            yAxisSuffix={yAxisSuffix ? yAxisSuffix : ""}
            yAxisInterval={1} // optional, defaults to 1
            
            chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />
        <Text style={styles.caption}>Average Ap Scores are represented on the vertical axis and the year is represented on the horizontal axis. As we can see, 2022 has lower scores than the average.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fb8c00'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
    },
    caption: {
        textAlign: 'center'
    }
    
  })

export default CustomLineChart