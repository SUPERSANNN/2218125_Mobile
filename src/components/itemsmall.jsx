import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function ItemSmall({ item, onFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite(item);
  };

  return (
    <View
      style={{
        backgroundColor: '#0B0C10',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
        width: '48%',
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: '100%',
          height: 120,
          borderRadius: 10,
          resizeMode: 'cover',
        }}
      />
      <Text style={{ color: '#FFF', fontSize: 16, marginVertical: 5 }}>{item.title}</Text>
      <Text style={{ color: '#FFF', fontSize: 14 }}>{item.price}</Text>

      <TouchableOpacity
        style={{ backgroundColor: 'orange', padding: 8, borderRadius: 5, marginTop: 5 }}
        onPress={() => console.log(`${item.title} Dibeli!`)}
      >
        <Text style={{ fontWeight: 'bold', color: 'black' }}>Beli</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleFavorite} style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 16 }}>{isFavorite ? '❤️ Favorit' : '🤍 Tambah Favorit'}</Text>
      </TouchableOpacity>
    </View>
  );
}
