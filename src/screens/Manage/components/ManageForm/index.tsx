import React from 'react';
import {View, TextInput, Pressable, Text, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DUMMY_TODOS} from '@/data/DUMMY_DATA';
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

const ManageForm: React.FC<TProps> = ({id}) => {
  const navigation = useNavigation<any>();

  const startRef = React.useRef<TextInput>(null);
  const endRef = React.useRef<TextInput>(null);

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
    try {
      if (!inputs.todo) {
        throw new Error('The todo field is required');
      }

      if (!inputs.start) {
        throw new Error('The start field is required');
      }

      if (!inputs.end) {
        throw new Error('The end field is required');
      }

      if (inputs.end <= inputs.start) {
        throw new Error('The duration must be valid');
      }

      const conflictedTodos = DUMMY_TODOS.filter(item => {
        if (!inputs.start || !inputs.end || item.id === id) {
          return false;
        }

        return (
          (item.start >= inputs.start && item.start <= inputs.end) ||
          (item.end >= inputs.start && item.end <= inputs.end)
        );
      });

      if (conflictedTodos.length > 0) {
        throw new Error('The duration must not conflict');
      }

      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  React.useEffect(() => {
    const todo = DUMMY_TODOS.find(item => item.id === id);

    if (!todo) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id: _, ...updatedInputs} = todo;

    setInputs(updatedInputs);
  }, [id]);

  return (
    <View className="px-2 py-6 gap-6">
      <UIInput
        className="font-bold"
        placeholder="Todo"
        value={inputs.todo}
        onChangeText={inputChangeHandler.bind(this, 'todo')}
        autoFocus={true}
        returnKeyType={inputs.start && inputs.end ? 'default' : 'next'}
        onSubmitEditing={() =>
          !inputs.start
            ? startRef.current?.focus()
            : !inputs.end && endRef.current?.focus()
        }
      />
      <View className="flex-row gap-6">
        <UIDatePicker
          title="Start"
          confirmText={inputs.end ? 'Confirm' : 'Next'}
          placeholder="Start"
          date={inputs.start}
          onChange={date => {
            if (!inputs.end) {
              inputChangeHandler('start', date);
            }
            endRef.current?.focus();
          }}
          forwardedRef={startRef}
        />
        <View />
        <UIDatePicker
          title="End"
          placeholder="End"
          minimumDate={inputs.start}
          date={inputs.end}
          onChange={date => inputChangeHandler('end', date)}
          forwardedRef={endRef}
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
