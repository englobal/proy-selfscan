import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAdd }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.id}>ID: {product.id}</Text>
      </View>
      <Text style={styles.price}>{formatPrice(product.price)}</Text>
      <Pressable style={styles.btn} onPress={() => onAdd(product)}>
        <Text style={styles.btnLabel}>Agregar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  name: { color: colors.text, fontWeight: '600' },
  id: { color: colors.muted, fontSize: 12 },
  price: { color: colors.primary, fontWeight: '700', marginVertical: 8 },
  btn: { alignSelf: 'flex-start', backgroundColor: colors.accent, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  btnLabel: { color: colors.white, fontWeight: '700' },
});
