import React from 'react';
import {Pressable, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import notifee from '@notifee/react-native';
import {deleteTodo} from '@/db';

type TProps = {
  id?: string;
};

const DeleteButton: React.FC<TProps> = ({id}) => {
  const navigation = useNavigation<any>();

  const pressHandler = () => {
    if (!id) {
      return;
    }

    const onPress = async () => {
      try {
        await deleteTodo(+id);

        await notifee.cancelTriggerNotification(id.toString());

        navigation.goBack();
      } catch (error: any) {
        console.error(error);
      }
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
      <Entypo name="trash" color="rgb(239, 68, 68)" size={20} />
    </Pressable>
  );
};

export default DeleteButton;
