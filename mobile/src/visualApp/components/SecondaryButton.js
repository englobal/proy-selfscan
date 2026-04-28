import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

export default function SecondaryButton({ label, onPress }) {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { borderWidth: 1, borderColor: colors.primary, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  label: { color: colors.primary, fontWeight: '700' },
});
