import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatPrice } from '../utils/formatPrice';
import { colors } from '../theme/colors';

export default function PriceRow({ label, value, bold }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.value, bold && styles.bold]}>{formatPrice(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { color: colors.text },
  value: { color: colors.text },
  bold: { fontWeight: '700' },
});
