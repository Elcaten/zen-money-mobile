import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import * as React from 'react';
import {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {ZenText} from '../../../components/ZenText';

export const DateField: React.FC<{value?: Date; onChange: (value: Date) => void}> = ({value, onChange: _onChange}) => {
  value = value ?? new Date();

  const [show, setShow] = useState(false);
  const onChange = (_: any, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios');
    _onChange(selectedDate || value!);
  };

  return (
    <TouchableOpacity onPress={() => setShow((v) => !v)} style={styles.wrapper}>
      <ZenText>{dayjs(value).format('DD MMM YYYY')}</ZenText>
      {show && <DateTimePicker value={value} mode="date" is24Hour={true} display="default" onChange={onChange} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    padding: 4,
  },
});
