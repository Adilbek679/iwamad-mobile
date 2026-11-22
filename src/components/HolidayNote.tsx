import { StyleSheet, Text } from 'react-native';
import { useHolidays } from '../hooks/useHolidays';

type HolidayNoteProps = {
  date: string;
};

export default function HolidayNote({ date }: HolidayNoteProps) {
  const year = Number(date.slice(0, 4));
  const { data, isPending, isError } = useHolidays(year);

  if (isPending) {
    return <Text style={styles.note}>Checking holidays</Text>;
  }

  if (isError) {
    return <Text style={styles.note}>Holidays unavailable</Text>;
  }

  const holiday = data.find((item) => item.date === date);

  if (holiday) {
    return <Text style={styles.holiday}>Public holiday: {holiday.name}</Text>;
  }

  return <Text style={styles.note}>Not a public holiday</Text>;
}

const styles = StyleSheet.create({
  note: {
    marginBottom: 6,
    fontSize: 16,
    color: '#5b6472',
  },
  holiday: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#b45309',
  },
});
