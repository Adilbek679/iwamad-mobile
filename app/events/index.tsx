import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import EventRow from '../../src/components/EventRow';
import { events } from '../../src/data/events';

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [search, setSearch] = useState('');

  // the list is computed on every render, only the text is in state
  const shownEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase()),
  );

  function toggleSaved(id: number) {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((savedId) => savedId !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  }

  const header = (
    <View>
      <Text style={styles.hint}>Long-press an event to save it. Saved: {savedIds.length}</Text>
      <TextInput
        style={styles.search}
        value={search}
        onChangeText={setSearch}
        placeholder="Search events"
      />
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      data={shownEvents}
      keyExtractor={(e) => String(e.id)}
      ListHeaderComponent={header}
      renderItem={({ item }) => (
        <EventRow
          event={item}
          saved={savedIds.includes(item.id)}
          onPress={() => router.push(`/events/${item.id}`)}
          onLongPress={() => toggleSaved(item.id)}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={<Text style={styles.empty}>No events match</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  listContent: {
    padding: 16,
  },
  hint: {
    marginBottom: 10,
    fontSize: 14,
    color: '#5b6472',
  },
  search: {
    minHeight: 44,
    marginBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d9dee7',
    borderRadius: 8,
    fontSize: 16,
  },
  separator: {
    height: 10,
  },
  empty: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 16,
    color: '#5b6472',
  },
});
