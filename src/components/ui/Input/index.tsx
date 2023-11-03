import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

const UIInput: React.FC<TextInputProps> = props => {
  return (
    <TextInput
      {...props}
      className={`p-2 h-12 text-white bg-dark-800 rounded-md ${props.className}`}
      placeholderTextColor="rgb(107 114 128)"
    />
  );
};

export default UIInput;
