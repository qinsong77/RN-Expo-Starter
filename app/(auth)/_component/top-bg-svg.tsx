import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { useColorTokens } from '@/hooks'

// https://getwaves.io/
export default function TopBgSvg() {
  const { brand } = useColorTokens()
  return (
    <View className="-mt-6 h-32 w-full">
      <Svg
        height="100%"
        width="100%"
        viewBox="0 0 1440 320"
      >
        <Path
          fill={brand}
          fill-opacity="1"
          d="M0,64L34.3,74.7C68.6,85,137,107,206,128C274.3,149,343,171,411,160C480,149,549,107,617,80C685.7,53,754,43,823,69.3C891.4,96,960,160,1029,197.3C1097.1,235,1166,245,1234,245.3C1302.9,245,1371,235,1406,229.3L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></Path>
      </Svg>
    </View>
  )
}
