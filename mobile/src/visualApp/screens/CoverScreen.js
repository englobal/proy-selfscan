import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';

export default function CoverScreen({ onStart }) {
  return (
    <ScreenContainer>
      <Header title="Auto atención" />
      <Text style={styles.title}>Bienvenido a SelfScan</Text>
      <Text style={styles.subtitle}>Escaneá productos, aplicá descuentos y pagá en segundos.</Text>
      <PrimaryButton label="Iniciar compra" onPress={onStart} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#475569', marginBottom: 20 },
});
