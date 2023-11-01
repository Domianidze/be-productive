import React from 'react';
import {View, ScrollView, Pressable, Text} from 'react-native';
import moment from 'moment';

type TProps = {
  activeDate: moment.Moment;
  setActiveDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
};

const DatePicker: React.FC<TProps> = ({activeDate, setActiveDate}) => {
  const scrollViewRef = React.useRef<ScrollView>(null);

  const [dates, setDates] = React.useState<moment.Moment[]>([]);

  const datePressHandler = (date: moment.Moment) => {
    setActiveDate(date);

    if (scrollViewRef.current) {
      const dateIndex = dates.findIndex(item => item.date() === date.date());

      scrollViewRef.current.scrollTo({
        x: 112 * (dateIndex - 1),
        y: 0,
        animated: true,
      });
    }
  };

  React.useEffect(() => {
    const updatedDates = [...new Array(7)].map((_, index) =>
      index > 0 ? moment().add(index, 'days') : moment(),
    );

    setDates(updatedDates);
  }, []);

  return (
    <View className="p-2">
      <Text className="pb-2 text-lg text-white font-bold">
        {activeDate.format('MMMM, Do, YYYY.')}
      </Text>
      <ScrollView
        className="flex-row gap-4"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}>
        {dates.map(item => {
          const isActive = item.date() === activeDate.date();

          return (
            <Pressable
              className={`h-24 w-24 justify-center items-center rounded-xl ${
                isActive ? 'bg-blue-500' : 'bg-white'
              }`}
              onPress={datePressHandler.bind(this, item)}
              key={item.toString()}>
              <Text
                className={`text-xl font-bold ${
                  isActive ? 'text-white' : 'text-black'
                }`}>
                {item.date()}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DatePicker;
