import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import UIInput from '@/components/ui/Input';
import UIDatePicker from '@/components/ui/DatePicker';

type TInputs = {
  todo?: string;
  start?: Date;
  end?: Date;
};

type TProps = {
  id?: string;
};

const ManageForm: React.FC<TProps> = () => {
  const navigation = useNavigation<any>();

  const [inputs, setInputs] = React.useState<TInputs>({
    todo: undefined,
    start: undefined,
    end: undefined,
  });

  const inputChangeHandler = (key: string, value: any) => {
    setInputs(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const doneHandler = () => {
    navigation.goBack();
  };

  return (
    <View className="px-2 py-6 gap-6">
      <UIInput
        placeholder="Todo"
        value={inputs.todo}
        onChangeText={inputChangeHandler.bind(this, 'todo')}
      />
      <View className="flex-row gap-6">
        <UIDatePicker
          className="bg-red-500"
          placeholder="Start"
          date={inputs.start}
          onChange={date => inputChangeHandler('start', date)}
        />
        <View />
        <UIDatePicker
          placeholder="End"
          date={inputs.end}
          onChange={date => inputChangeHandler('end', date)}
        />
      </View>
      <Pressable
        className="h-12 justify-center items-center bg-blue-500 rounded-lg"
        onPress={doneHandler}>
        <Text className="text-white font-bold">Done</Text>
      </Pressable>
    </View>
  );
};

export default ManageForm;
