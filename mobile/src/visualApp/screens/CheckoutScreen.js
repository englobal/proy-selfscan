import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Header from '../components/Header';
import PriceRow from '../components/PriceRow';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';

export default function CheckoutScreen({ total, amountPaid, setAmountPaid, onPay }) {
  return (
    <ScreenContainer>
      <Header title="Checkout" />
      <PriceRow label="Total" value={total} bold />
      <TextInput
        keyboardType="numeric"
        value={String(amountPaid || '')}
        onChangeText={setAmountPaid}
        placeholder="Monto pagado"
        style={styles.input}
      />
      <PrimaryButton label="Pagar" onPress={onPay} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
});
