import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../../styles/color'
import { globalStyles } from '../../styles/globalStyles'

const LoadingComponent = () => {
  return (
      <View
        style={[
          globalStyles.globalContainer,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <ActivityIndicator size="large" color={colors.ButtonColor} />
      </View>
  )
}

export default LoadingComponent