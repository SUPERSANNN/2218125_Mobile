import React, { useState } from 'react';
import { 
  StyleSheet, Text, TouchableOpacity, View, Image, 
  ScrollView, TextInput, Modal 
} from 'react-native';

const categories = ['Semua', 'Sepatu', 'Jersey', 'Aksesoris', 'Tempat'];

export default function ChoxSportApp() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [modalVisible, setModalVisible] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'Semua' || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ChoxSport</Text>
      
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.categoryText}>Kategori</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder="Cari Produk"
          placeholderTextColor="#FFF"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Pilih Kategori</Text>
            <View style={styles.categoryContainer}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryBox,
                    selectedCategory === category && styles.selectedCategory,
                  ]}
                  onPress={() => {
                    setSelectedCategory(category);
                    setModalVisible(false);
                  }}
                >
                  <Text 
                    style={[
                      styles.categoryTextStyle,
                      selectedCategory === category && styles.selectedText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.productList}>
        {filteredProducts.map((item, index) => (
          <View key={index} style={styles.product}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.productPrice}>{item.price}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={() => console.log(`${item.title} Dibeli!`)}>
              <Text style={styles.buyNowText}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const products = [
  { 
    title: 'Sepatu Bola', 
    image: 'https://images.unsplash.com/photo-1511426463457-0571e247d816?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    category: 'Sepatu',
    price: 'Rp 30.000'
  },
  { 
    title: 'Sewa ALL Jersey ', 
    image: 'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    category: 'Jersey',
    price: 'Rp 50.000'
  },
  { 
    title: 'Sewa Properties Bola', 
    image: 'https://plus.unsplash.com/premium_photo-1682435576307-a71fec9529be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    category: 'Aksesoris',
    price: 'Rp 15.000'
  },
  { 
    title: 'Sewa Sepatu Basket', 
    image: 'https://images.unsplash.com/photo-1694729238828-028c0b74c579?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    category: 'Sepatu',
    price: 'Rp 45.000'
  },
  { 
    title: 'Sewa Sepatu Futsal', 
    image: 'https://images.unsplash.com/photo-1673229745042-36d3e41445e5?q=80&w=1550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    category: 'Sepatu',
    price: 'Rp 40.000'
  },
  { 
    title: 'Sewa Lapangan Futsal', 
    image: 'https://images.unsplash.com/photo-1587384474964-3a06ce1ce699?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    category: 'Tempat',
    price: 'Rp 250.000'
  },
  { 
    title: 'Sewa Lapangan Bola', 
    image: 'https://plus.unsplash.com/premium_photo-1671489203034-fc619a2de3bf?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    category: 'Tempat',
    price: 'Rp 400.000'
  },
  {
  title: 'Sewa Lapangan Basket', 
  image: 'https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
  category: 'Tempat',
  price: 'Rp 300.000'
},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3cb371', 
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#404040',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#FFF',
  },
  categoryText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  product: {
    backgroundColor: '#0B0C10',
    borderRadius: 10,
    width: '48%',
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  productPrice: {
    fontSize: 18,
    color: '#FFF',
    marginVertical: 5,
  },
  buyButton: {
    backgroundColor: '#ffa500',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buyNowText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
