import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import * as React from 'react';
import {useState} from 'react';
import {Platform} from 'react-native';
import {CalendarIcon} from './Icons';
import {ListItem} from './ListItem';
import {View} from './View';

export interface DateTimeInputProps {
  date: Date;
  onChange: (date: Date) => void;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({date, onChange: _onChange}) => {
  const [show, setShow] = useState(false);

  const onChange = (_: any, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios');
    _onChange(selectedDate || date);
  };

  return (
    <View>
      <ListItem onPress={() => setShow(true)} bottomDivider>
        <CalendarIcon size={24} />
        <ListItem.Title>{dayjs(date).format('DD MMM YYYY')}</ListItem.Title>
      </ListItem>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
