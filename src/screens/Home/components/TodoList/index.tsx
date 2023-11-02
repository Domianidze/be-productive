import React from 'react';
import {View, ScrollView, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DUMMY_TODOS} from '@/data/DUMMY_DATA';
import getTime from '@/util/getTime';

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

  return (
    <View className="p-2 flex-1">
      <Text className="pb-2 text-lg text-white font-bold">Todos:</Text>
      <ScrollView className="relative" showsVerticalScrollIndicator={false}>
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
          const start = formatDate(item.start);
          const end = formatDate(item.end);

          const height = end - start;

          return (
            <Pressable
              className="absolute py-2 pl-12 w-full"
              style={{top: start * 96 + 24, height: height * 96}}
              onPress={() => navigation.navigate('manage', {id: item.id})}
              key={item.id}>
              <View className="p-3 w-full h-full bg-blue-500 rounded-xl">
                <Text className="pb-1 text-white font-bold">{item.todo}</Text>
                <Text className="text-white">
                  {getTime(item.start)} - {getTime(item.end)}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TodoList;
