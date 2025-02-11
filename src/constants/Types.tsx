import {TextStyle, ViewStyle} from 'react-native';

type ResponsiveTextTypes = {
  title?: string;
  fontColor?: string;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  fontStyle?: TextStyle;
};

type CustomButtonProps = {
  onPress?: () => void;
  title?: string;
  titleStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  loading?: boolean;
  disabled?: boolean;
  type?: 'solid' | 'clear' | 'outline';
};

type FlatListProps ={
    title? :string,
    
}
export type {ResponsiveTextTypes, CustomButtonProps};
