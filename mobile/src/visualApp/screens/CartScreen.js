import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import PriceRow from '../components/PriceRow';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
import SecondaryButton from '../components/SecondaryButton';
import { formatPrice } from '../utils/formatPrice';

export default function CartScreen({ items, total, onCheckout, onBack }) {
  return (
    <ScreenContainer>
      <Header title="Carrito" />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No hay productos en el carrito.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.qty}>x{item.quantity}</Text>
            <Text style={styles.price}>{formatPrice(item.price * item.quantity)}</Text>
          </View>
        )}
      />
      <PriceRow label="Total" value={total} bold />
      <PrimaryButton label="Continuar" onPress={onCheckout} disabled={!items.length} />
      <View style={{ marginTop: 10 }}>
        <SecondaryButton label="Seguir comprando" onPress={onBack} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  item: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  name: { fontWeight: '600' },
  qty: { color: '#6B7280' },
  price: { color: '#065F46', fontWeight: '700' },
});
