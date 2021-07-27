import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import * as React from 'react';
import {useState} from 'react';
import {Platform} from 'react-native';
import {CalendarIcon} from '../Icons';
import {ListItem} from '../ListItem';
import {View} from '../View';

export interface DateTimeInputFieldProps {
  field: {
    value: Date;
    onChange: (date: Date) => void;
  };
}

export const DateTimeInputField: React.FC<DateTimeInputFieldProps> = ({field: {value, onChange: _onChange}}) => {
  const [show, setShow] = useState(false);

  const onChange = (_: any, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios');
    _onChange(selectedDate || value);
  };

  return (
    <View>
      <ListItem onPress={() => setShow(true)} bottomDivider>
        <CalendarIcon />
        <ListItem.Title>{dayjs(value).format('DD MMM YYYY')}</ListItem.Title>
      </ListItem>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
