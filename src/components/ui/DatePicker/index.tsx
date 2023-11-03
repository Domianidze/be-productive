import React from 'react';
import {Appearance, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import getTime from '@/util/getTime';

type TProps = {
  title?: string;
  confirmText?: string;
  placeholder?: string;
  minimumDate?: Date;
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  forwardedRef: React.RefObject<TextInput>;
};

const UIDatePicker: React.FC<TProps> = ({
  title,
  confirmText,
  placeholder,
  minimumDate,
  date,
  onChange,
  forwardedRef,
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
        title={title}
        locale={'en_GB'}
        confirmText={confirmText}
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
      <TextInput
        className="p-2 h-12 flex-1 justify-center text-white bg-dark-800 rounded-md"
        placeholderTextColor="rgb(107 114 128)"
        placeholder={placeholder}
        caretHidden={true}
        value={date && getTime(date)}
        onFocus={() => {
          forwardedRef.current?.blur();
          setOpen(true);
        }}
        ref={forwardedRef}
      />
    </>
  );
};

export default UIDatePicker;
