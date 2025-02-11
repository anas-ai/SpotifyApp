import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

interface SvgComponentProps extends SvgProps {
    color?: string; // Optional color prop
  }
  
const Eye = ({color='white',...props}: SvgComponentProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G
      stroke="#626262"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <Path d="M.833 10S4.167 3.333 10 3.333 19.167 10 19.167 10 15.833 16.667 10 16.667.833 10 .833 10Z" />
      <Path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={color} d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Eye
