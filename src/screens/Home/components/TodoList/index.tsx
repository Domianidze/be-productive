import React from 'react';
import {View, ScrollView, Text} from 'react-native';

const DUMMY_TODOS = [
  {
    id: 't1',
    title: 'BeProductive: Create todo list',
    startTime: '11:00',
    endTime: '19:00',
  },
];

const formatTime = (time: string) => {
  const splitTime = time.split(':');

  const decimal = 1 / (60 / +splitTime[1]);

  return +splitTime[0] + decimal;
};

type TProps = {
  activeDate: moment.Moment;
};

const TodoList: React.FC<TProps> = () => {
  return (
    <View className="p-2 flex-1">
      <Text className="pb-2 text-lg text-white font-bold">Todos:</Text>
      <ScrollView className="relative">
        {[...new Array(24)].map((_, index) => (
          <View key={index}>
            <View className="h-12 flex-row items-center">
              <Text className="w-12 text-white font-bold">{index}:00</Text>
              <View className="h-[1px] w-full bg-white rounded-full" />
            </View>
            {index < 23 && (
              <View className="h-12 flex-row items-center">
                <Text className="w-12 text-gray-500 font-bold">{index}:30</Text>
                <View className="h-[1px] w-full bg-gray-500 rounded-full" />
              </View>
            )}
          </View>
        ))}

        {DUMMY_TODOS.map(item => {
          const startTime = formatTime(item.startTime);
          const endTime = formatTime(item.endTime);

          const height = endTime - startTime;

          return (
            <View
              className="absolute py-2 pl-12 w-full"
              style={{top: startTime * 96 + 24, height: height * 96}}
              key={item.id}>
              <View className="p-3 w-full h-full bg-blue-500 rounded-xl">
                <Text className="pb-1 text-white font-bold">{item.title}</Text>
                <Text className="text-white">
                  {item.startTime} - {item.endTime}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TodoList;
