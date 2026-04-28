import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';

export default function SuccessScreen({ onRestart }) {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Compra realizada con exito</Text>
      <PrimaryButton label="Nueva compra" onPress={onRestart} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '800', marginBottom: 20 },
});
