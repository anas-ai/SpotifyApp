import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"
const PhoneIcon = (props: SvgProps) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width={24}
    height={24}
  >
    <Rect
      width={256}
      height={480}
      x={128}
      y={16}
      fill="#fff"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      
    />
    <Path
      fill="#fff"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M176 16h24a8 8 0 0 1 8 8h0a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16h0a8 8 0 0 1 8-8h24"
    />
  </Svg>
)
export default PhoneIcon
