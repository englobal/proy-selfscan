import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
import SecondaryButton from '../components/SecondaryButton';

export default function HomeScreen({ query, setQuery, onSearch, onCart, onCancel }) {
  return (
    <ScreenContainer>
      <Header title="Buscar productos" />
      <TextInput value={query} onChangeText={setQuery} placeholder="Ej: EUCER" style={styles.input} />
      <View style={styles.row}>
        <PrimaryButton label="Buscar" onPress={onSearch} />
      </View>
      <View style={styles.row}>
        <SecondaryButton label="Ver carrito" onPress={onCart} />
      </View>
      <View style={styles.row}>
        <SecondaryButton label="Cancelar compra" onPress={onCancel} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
  row: { marginBottom: 10 },
});
