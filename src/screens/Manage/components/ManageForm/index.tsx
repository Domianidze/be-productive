import React from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  Alert,
  GestureResponderEvent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import notifee from '@notifee/react-native';
import moment from 'moment';
import {getTodos, getTodo, addTodo, editTodo} from '@/db';
import UIInput from '@/components/ui/Input';
import UIDatePicker from '@/components/ui/DatePicker';
import createTriggerNotification from '@/util/createTriggerNotification';

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

  const doneHandler = async (_?: GestureResponderEvent, end?: Date) => {
    try {
      if (!inputs.todo) {
        throw new Error('Please fill out the "Todo" field');
      }

      if (!inputs.start) {
        throw new Error('Please fill out the "Start" field');
      }

      const endDate = end || inputs.end;

      if (!endDate) {
        throw new Error('Please fill out the "End" field');
      }

      if (endDate <= inputs.start) {
        throw new Error('The duration must be valid');
      }

      const todos = await getTodos();

      const conflictedTodos = todos.filter(item => {
        if (!inputs.start || !endDate || (id && item.id === +id)) {
          return false;
        }

        return (
          (item.start >= inputs.start && item.start <= endDate) ||
          (item.end >= inputs.start && item.end <= endDate) ||
          (item.start <= inputs.start && item.end >= endDate)
        );
      });

      if (conflictedTodos.length > 0) {
        throw new Error('The duration must not conflict');
      }

      if (id) {
        await editTodo({
          id: +id,
          todo: inputs.todo,
          start: inputs.start,
          end: endDate,
        });

        await notifee.cancelTriggerNotification(id.toString());
      } else {
        const todo = await addTodo({
          todo: inputs.todo,
          start: inputs.start,
          end: endDate,
        });

        id = todo[0].insertId.toString();
      }

      const minutesUntilTodo =
        (inputs.start.getTime() - new Date().getTime()) / 60000;

      if (id && minutesUntilTodo > 0) {
        const notificationDate =
          minutesUntilTodo >= 10
            ? moment(inputs.start).subtract(10, 'm').toDate()
            : moment(new Date()).add(1, 'm').toDate();

        await createTriggerNotification({
          id,
          title: 'Todo starting soon',
          body: `The "${inputs.todo}" todo is starting soon!`,
          date: notificationDate,
        });
      }

      navigation.goBack();
    } catch (error: any) {
      if (error.message) {
        Alert.alert('Error', error.message);
      } else {
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    const preFillInputs = async () => {
      if (!id) {
        return;
      }

      const todo = await getTodo(+id);

      if (!todo) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {id: _, ...updatedInputs} = todo;

      setInputs(updatedInputs);
    };

    preFillInputs();
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
        onSubmitEditing={event => {
          if (!event.nativeEvent.text) {
            Alert.alert('Error', 'The "Todo" field is required');
            return;
          }

          if (!inputs.start) {
            startRef.current?.focus();
          } else if (!inputs.end) {
            endRef.current?.focus();
          }
        }}
      />
      <View className="flex-row gap-6">
        <UIDatePicker
          title="Start"
          confirmText={inputs.end ? 'Confirm' : 'Next'}
          placeholder="Start"
          date={inputs.start}
          onChange={date => {
            inputChangeHandler('start', date);

            if (!inputs.end) {
              endRef.current?.focus();
            }
          }}
          forwardedRef={startRef}
        />
        <View />
        <UIDatePicker
          title="End"
          placeholder="End"
          confirmText={inputs.todo && inputs.start ? 'Done' : 'Confirm'}
          minimumDate={inputs.start}
          date={inputs.end}
          onChange={date => {
            inputChangeHandler('end', date);

            if (inputs.todo && inputs.start) {
              doneHandler(undefined, date);
            }
          }}
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
