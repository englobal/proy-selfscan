import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: 10,
  },
  text: { color: '#FFFFFF', textAlign: 'center' },
});
