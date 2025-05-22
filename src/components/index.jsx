import React, { useState } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import ListHorizontal from './listhorizontal';
import ItemSmall from './itemsmall';
import products from '../data';

const categories = ['Semua', 'Sepatu', 'Jersey', 'Aksesoris', 'Tempat'];

export default function ChoxSportApp({ setFavorites, favorites }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'Semua' || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleFavorite = (item) => {
    if (!favorites.find(fav => fav.title === item.title)) {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>ChoxSport</Text>

      <TextInput
        placeholder="Cari Produk"
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 8,
          marginVertical: 10,
          backgroundColor: 'white',
        }}
      />

      <ListHorizontal categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ItemSmall item={item} onFavorite={handleFavorite} />}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </View>
  );
}
