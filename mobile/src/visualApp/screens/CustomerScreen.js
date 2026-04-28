import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
import SecondaryButton from '../components/SecondaryButton';

export default function CustomerScreen({ rut, setRut, name, setName, onContinue, onSkip }) {
  return (
    <ScreenContainer>
      <Header title="Cliente" />
      <TextInput value={rut} onChangeText={setRut} placeholder="RUT" style={styles.input} />
      <TextInput value={name} onChangeText={setName} placeholder="Nombre" style={styles.input} />
      <PrimaryButton label="Guardar cliente" onPress={onContinue} />
      <SecondaryButton label="Omitir" onPress={onSkip} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
});
