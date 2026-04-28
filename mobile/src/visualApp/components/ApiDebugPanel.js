import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ApiDebugPanel({ baseUrl }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>API:</Text>
      <Text style={styles.value}>{baseUrl}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 8, padding: 8, backgroundColor: '#EEF2FF', borderRadius: 8 },
  label: { fontWeight: '700', color: '#1E3A8A' },
  value: { color: '#1F2937', fontSize: 12 },
});
