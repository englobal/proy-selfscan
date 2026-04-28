import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function BarcodeScanner({ onScan }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>Scanner simulado</Text>
      <Pressable style={styles.btn} onPress={() => onScan('267658')}>
        <Text style={styles.btnText}>Escanear EUCER</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 12, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, marginBottom: 12 },
  text: { marginBottom: 8, color: '#374151' },
  btn: { backgroundColor: '#111827', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#FFFFFF', fontWeight: '700' },
});
