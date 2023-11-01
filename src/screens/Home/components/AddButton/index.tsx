import React from 'react';
import {Pressable} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const AddButton: React.FC = () => {
  return (
    <Pressable className="absolute right-6 bottom-6 w-12 h-12 justify-center items-center bg-white rounded-xl">
      <Entypo name="plus" size={24} />
    </Pressable>
  );
};

export default AddButton;
