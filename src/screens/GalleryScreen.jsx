import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Animated } from 'react-native';
import products from '../data';

const GalleryScreen = () => {
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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.header}>Galeri Produk</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#C8E6C9',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1B5E20',
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#E0F2F1',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2E7D32',
  },
  price: {
    fontSize: 14,
    color: '#388E3C',
  },
});

export default GalleryScreen;
