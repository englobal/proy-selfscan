import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import PriceRow from '../components/PriceRow';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';

export default function ReceiptScreen({ payment, onFinish }) {
  return (
    <ScreenContainer>
      <Header title="Comprobante" />
      <View style={styles.card}>
        <Text>ID: {payment?.receiptId}</Text>
        <PriceRow label="Total" value={payment?.total || 0} />
        <PriceRow label="Pagado" value={payment?.amountPaid || 0} />
        <PriceRow label="Vuelto" value={payment?.change || 0} bold />
      </View>
      <PrimaryButton label="Finalizar" onPress={onFinish} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB' },
});
