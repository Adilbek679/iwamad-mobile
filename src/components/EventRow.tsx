import { Pressable, StyleSheet, Text } from 'react-native';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  saved?: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export default function EventRow({ event, saved, onPress, onLongPress }: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.info}>
       {event.date} · {event.place}
      </Text>
      {saved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d9dee7',
    borderRadius: 8,
  },
  cardPressed: {
    backgroundColor: '#e8eefc',
    borderColor: '#1d4ed8',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  info: {
    marginTop: 4,
    fontSize: 14,
    color: '#5b6472',
  },
  saved: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#b45309',
  },
});
