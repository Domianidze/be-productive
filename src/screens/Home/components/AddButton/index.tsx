import React from 'react';
import {Pressable, Text} from 'react-native';

const AddButton: React.FC = () => {
  return (
    <Pressable className="absolute right-6 bottom-6 w-12 h-12 justify-center items-center bg-white rounded-xl">
      <Text className="text-lg">+</Text>
    </Pressable>
  );
};

export default AddButton;
