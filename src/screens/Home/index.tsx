import React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import {StackParamList} from '@root/App';
import DatePicker from './components/DatePicker';

type TProps = NativeStackScreenProps<StackParamList, 'home'>;

const HomeScreen: React.FC<TProps> = () => {
  const [activeDate, setActiveDate] = React.useState<moment.Moment>(moment());

  return (
    <View>
      <DatePicker activeDate={activeDate} setActiveDate={setActiveDate} />
    </View>
  );
};

export default HomeScreen;
