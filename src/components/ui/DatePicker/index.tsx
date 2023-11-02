import React from 'react';
import {Appearance, Pressable, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

type TProps = {
  className?: string;
  placeholder?: string;
  date: Date | undefined;
  onChange: (date: Date) => void;
};

const UIDatePicker: React.FC<TProps> = ({placeholder, date, onChange}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <DatePicker
        modal
        mode="time"
        theme="auto"
        locale={'en_GB'}
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
          {date ? moment(date).format('HH:mm') : placeholder}
        </Text>
      </Pressable>
    </>
  );
};

export default UIDatePicker;
