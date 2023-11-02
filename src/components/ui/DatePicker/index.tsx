import React from 'react';
import {Appearance, Pressable, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment = require('moment');
import getTime from '@/util/getTime';

type TProps = {
  placeholder?: string;
  minimumDate?: Date;
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

const UIDatePicker: React.FC<TProps> = ({
  placeholder,
  minimumDate,
  date,
  onChange,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (minimumDate && date && minimumDate >= date) {
      onChange(undefined);
    }
  }, [minimumDate, date, onChange]);

  return (
    <>
      <DatePicker
        modal
        mode="time"
        theme="auto"
        locale={'en_GB'}
        minimumDate={minimumDate && moment(minimumDate).add(1, 'm').toDate()}
        textColor={Appearance.getColorScheme() === 'dark' ? 'white' : 'black'}
        open={open}
        date={date || new Date()}
        onConfirm={updatedDate => {
          onChange(updatedDate);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Pressable
        className="p-2 h-12 flex-1 justify-center bg-dark-800 rounded-md"
        onPress={setOpen.bind(this, true)}>
        <Text className={date ? 'text-white' : 'text-gray-500'}>
          {date ? getTime(date) : placeholder}
        </Text>
      </Pressable>
    </>
  );
};

export default UIDatePicker;
