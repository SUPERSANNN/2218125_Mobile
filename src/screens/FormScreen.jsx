// src/screens/FormScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';

const FormScreen = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('https://68236c6365ba05803396b1f1.mockapi.io/api/data', {
        title,
        price,
        category,
        image,
      });
      Alert.alert('Berhasil', 'Data berhasil ditambahkan');
      setTitle('');
      setPrice('');
      setCategory('');
      setImage('');
    } catch (error) {
      Alert.alert('Error', 'Gagal menambahkan data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Form Tambah Data</Text>
      <TextInput
        placeholder="Judul Produk"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Harga Produk"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Kategori"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="URL Gambar"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />

      {/* Preview gambar dari URL */}
      {image !== '' && (
        <Image
          source={{ uri: image }}
          style={styles.previewImage}
          resizeMode="cover"
        />
      )}

      <Button title="Simpan" onPress={handleSubmit} color="#2E7D32" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E7D32',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#81C784',
  },
});

export default FormScreen;
