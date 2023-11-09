import React from 'react';
import {View, ScrollView, Text, Pressable} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {getTodos} from '@/db';
import getTime from '@/util/getTime';
import {TTodo} from '@/types/main';

const formatDate = (date: Date) => {
  const splitTime = getTime(date).split(':');

  const decimal = 1 / (60 / +splitTime[1]);

  return +splitTime[0] + decimal;
};

type TProps = {
  activeDate: moment.Moment;
};

const TodoList: React.FC<TProps> = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const [todos, setTodos] = React.useState<TTodo[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const todosData = await getTodos();

        setTodos(todosData);
      } catch (error: any) {
        console.error(error);
      }
    };

    getData();
  }, [isFocused]);

  return (
    <View className="p-2 flex-1">
      <Text className="pb-2 text-lg text-white font-bold">Todos:</Text>
      <ScrollView className="relative" showsVerticalScrollIndicator={false}>
        {[...new Array(25)].map((_, index) => (
          <View key={index}>
            <View
              className={`h-12 flex-row items-center ${index >= 24 && 'pb-1'}`}>
              <Text className="w-12 text-white font-bold">
                {index < 24 ? `${index}:00` : '23:59'}
              </Text>
              <View className="h-[1px] w-full bg-white rounded-full" />
            </View>
            {index < 24 && (
              <View className="h-12 flex-row items-center">
                <Text className="w-12 text-gray-500 font-bold">{index}:30</Text>
                <View className="h-[1px] w-full bg-gray-500 rounded-full" />
              </View>
            )}
          </View>
        ))}

        {todos.map(item => {
          const start = formatDate(item.start);
          const end = formatDate(item.end);

          const height = end - start;

          return (
            <Pressable
              className="absolute pl-12 w-full"
              style={{
                top: start * 96 + 24,
                height: Math.max(height, 0.45) * 96,
              }}
              onPress={() => navigation.navigate('manage', {id: item.id})}
              key={item.id}>
              <View className="p-3 w-full h-full bg-blue-500 rounded-xl">
                <Text className="pb-1 text-white font-bold">{item.todo}</Text>
                {height >= 0.65 && (
                  <Text className="text-white">
                    {getTime(item.start)} - {getTime(item.end)}
                  </Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TodoList;
