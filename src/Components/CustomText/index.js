import React from 'react';
import { Text } from 'react-native';

export default CustomText = ({ text, textSize, textWeight, align, paddingVertical,whiteTheme }) => (
  <Text style={
    [
      {
        color: whiteTheme?whiteTheme:'#fff',
        fontSize: textSize,
      },
      textWeight ? {
        fontWeight: textWeight
      } :
        {},
      align ? {
        textAlign: align
      } :
        {},
      paddingVertical ? {
        paddingVertical
      } :
        {}
    ]}
  >
    {text}
  </Text>
);
