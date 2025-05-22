import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Animated } from 'react-native';
import ListHorizontal from '../components/listhorizontal';
import ItemSmall from '../components/itemsmall';
import products from '../data';

const categories = ['Semua', 'Sepatu', 'Jersey', 'Aksesoris', 'Tempat'];

export default function ChoxSportApp({ setFavorites, favorites }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'Semua' || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleFavorite = (item) => {
    if (!favorites.find((fav) => fav.title === item.title)) {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CHOXSPORT</Text>
      </View>

      <TextInput
        placeholder="Cari Produk"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        placeholderTextColor="#666"
      />

      <ListHorizontal
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ItemSmall item={item} onFavorite={handleFavorite} />
        )}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
});
