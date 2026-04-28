import React from 'react';
import { FlatList } from 'react-native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import ScreenContainer from '../components/ScreenContainer';
import SecondaryButton from '../components/SecondaryButton';

export default function SearchResultsScreen({ products, onAdd, onBack }) {
  return (
    <ScreenContainer>
      <Header title="Resultados" />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} onAdd={onAdd} />}
      />
      <SecondaryButton label="Volver" onPress={onBack} />
    </ScreenContainer>
  );
}
