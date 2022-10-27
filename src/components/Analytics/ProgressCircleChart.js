import ProgressCircle from 'react-native-progress-circle'
import {Text} from "react-native"
import React from 'react'

const ProgressCircleChart = ({percent, text, radius, borderWidth}) => {
  return (
    <ProgressCircle
            percent={percent}
            radius={radius ? radius : 50}
            borderWidth={borderWidth ? borderWidth : 8}
            color="#fc5858"
            shadowColor="#998f8e"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{text}</Text>
    </ProgressCircle>
  )
}

export default ProgressCircleChart