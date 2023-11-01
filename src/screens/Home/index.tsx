import React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import {StackParamList} from '@root/App';
import DatePicker from './components/DatePicker';
import TodoList from './components/TodoList';
import AddButton from './components/AddButton';

type TProps = NativeStackScreenProps<StackParamList, 'home'>;

const HomeScreen: React.FC<TProps> = () => {
  const [activeDate, setActiveDate] = React.useState<moment.Moment>(moment());

  return (
    <View className="relative flex-1">
      <DatePicker activeDate={activeDate} setActiveDate={setActiveDate} />
      <TodoList activeDate={activeDate} />
      <AddButton />
    </View>
  );
};

export default HomeScreen;
