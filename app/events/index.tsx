import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import EventRow from '../../src/components/EventRow';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [search, setSearch] = useState('');

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text style={styles.message}>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={styles.button}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  // the list is computed on every render, only the text is in state
  const shownEvents = data.filter((event) =>
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
      refreshing={isRefetching}
      onRefresh={() => refetch()}
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f6f7fb',
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: '#5b6472',
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#b91c1c',
  },
  button: {
    minHeight: 44,
    marginTop: 20,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d4ed8',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
  },
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
