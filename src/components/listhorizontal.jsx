import React from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

export default function ListHorizontal({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <View style={{ paddingHorizontal: 10, marginBottom: 15 }}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCategory(category)}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              marginHorizontal: 5, // Jarak antar kategori
              backgroundColor: selectedCategory === category ? 'orange' : 'white',
              borderRadius: 8,
              borderWidth: 1,
              minWidth: 90,
              alignItems: 'center',
              justifyContent: 'center',
              height: 42, // Sesuaikan agar tidak terlalu besar
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: selectedCategory === category ? 'white' : 'black' }}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
