import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/chat';
import { askNotificationPermission } from '../lib/notifications';

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

export default function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState('');

  useEffect(() => {
    askNotificationPermission();
  }, []);

  const isEmpty = text.trim() === '';

  function handleSend() {
    sendMessage(eventId, text.trim());
    setText('');
  }

  // newest first
  const newestFirst = [...messages].reverse();

  return (
    <View style={styles.panel}>
      <Text style={styles.heading}>Live chat</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Write a message"
        maxLength={200}
      />
      <Pressable
        onPress={handleSend}
        disabled={isEmpty}
        style={[styles.button, isEmpty && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>

      {status === 'connecting' && <Text style={styles.status}>Connecting</Text>}
      {status === 'error' && <Text style={styles.status}>Chat unavailable</Text>}
      {status === 'live' && messages.length === 0 && (
        <Text style={styles.status}>No messages yet</Text>
      )}

      {newestFirst.map((m) => (
        <Text key={m.id} style={styles.message}>
          {m.author}: {m.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginTop: 24,
  },
  heading: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  input: {
    minHeight: 44,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d9dee7',
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    minHeight: 44,
    marginTop: 10,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d4ed8',
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
  },
  status: {
    fontSize: 16,
    color: '#5b6472',
  },
  message: {
    marginBottom: 8,
    fontSize: 16,
    color: '#374151',
  },
});
