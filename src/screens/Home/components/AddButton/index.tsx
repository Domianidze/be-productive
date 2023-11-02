import React from 'react';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

const AddButton: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      className="absolute right-6 bottom-6 w-12 h-12 justify-center items-center bg-white rounded-lg"
      onPress={() => navigation.navigate('manage')}>
      <Entypo name="plus" size={20} />
    </Pressable>
  );
};

export default AddButton;
