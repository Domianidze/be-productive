import React from 'react';
import {Pressable, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

type TProps = {
  id?: string;
};

const DeleteButton: React.FC<TProps> = ({id}) => {
  const navigation = useNavigation<any>();

  const pressHandler = () => {
    if (!id) {
      return;
    }

    const onPress = () => {
      navigation.goBack();
    };

    Alert.alert('Remove todo', 'Are you sure you want to remove this todo?', [
      {
        text: 'Cancel',
      },
      {
        style: 'destructive',
        text: 'Remove',
        onPress,
      },
    ]);
  };

  if (!id) {
    return null;
  }

  return (
    <Pressable onPress={pressHandler}>
      <Entypo name="trash" color={'rgb(239, 68, 68)'} size={20} />
    </Pressable>
  );
};

export default DeleteButton;
