import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Animated, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const isFocused = useIsFocused();

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://68236c6365ba05803396b1f1.mockapi.io/api/data');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://68236c6365ba05803396b1f1.mockapi.io/api/data/${id}`);
      fetchData();
    } catch (error) {
      Alert.alert('Gagal hapus data');
    }
  };

  const handleEdit = async (id) => {
    try {
      await axios.put(`https://68236c6365ba05803396b1f1.mockapi.io/api/data/${id}`, {
        title: editTitle,
      });
      setEditId(null);
      fetchData();
    } catch (error) {
      Alert.alert('Gagal update data');
    }
  };

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

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      {editId === item.id ? (
        <>
          <TextInput
            style={styles.editInput}
            value={editTitle}
            onChangeText={setEditTitle}
          />
          <Button title="Simpan" color="#2E7D32" onPress={() => handleEdit(item.id)} />
        </>
      ) : (
        <>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => {
              setEditId(item.id);
              setEditTitle(item.title);
            }}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
        style={styles.profileImage}
      />
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>MR.TOTOK CS</Text>
      <Text style={styles.label}>NIM:</Text>
      <Text style={styles.value}>2218125</Text>
      <Button title="Tambah Data" onPress={() => navigation.navigate('Form')} color="#2E7D32" />

      <Text style={styles.subHeader}>Data Artikel:</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#C8E6C9',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#2E7D32',
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
    color: '#388E3C',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#1B5E20',
  },
  itemContainer: {
    backgroundColor: '#E0F2F1',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemImage: {
    height: 150,
    borderRadius: 8,
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  itemCategory: {
    fontSize: 14,
    color: '#1B5E20',
  },
  itemPrice: {
    fontSize: 14,
    color: '#388E3C',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    color: '#0277BD',
    fontWeight: 'bold',
  },
  deleteButton: {
    color: '#C62828',
    fontWeight: 'bold',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: 5,
    padding: 8,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
