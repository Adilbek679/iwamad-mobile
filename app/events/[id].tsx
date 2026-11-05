import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { events } from '../../src/data/events';

export default function EventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Stack.Screen options={{ title: 'Event' }} />
        <Text style={styles.title}>Event not found</Text>
        <Text style={styles.info}>No event with id {id}.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.info}>Date: {event.date}</Text>
      <Text style={styles.info}>Place: {event.place}</Text>
      <Text style={styles.info}>Seats: {event.seats}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 12,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  info: {
    marginBottom: 6,
    fontSize: 18,
    color: '#374151',
  },
});
