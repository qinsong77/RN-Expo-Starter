import { View } from 'react-native'

import LottieView from 'lottie-react-native'

export const TravelBusView = () => {
  return (
    <View className="flex max-h-80 w-full items-center justify-center">
      <LottieView
        source={require('../assets/lottie/travel_bus.json')}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
        autoPlay
        loop
        speed={0.7}
        resizeMode="cover"
      />
    </View>
  )
}
