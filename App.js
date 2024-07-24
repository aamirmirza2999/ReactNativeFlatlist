import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const data = [
    { id: '1', name: 'Apple', price: 1.0 },
    { id: '2', name: 'Banana', price: 0.5 },
    { id: '3', name: 'Cherry', price: 2.0 },
    { id: '4', name: 'Date', price: 3.0 },
    { id: '5', name: 'Elderberry', price: 1.5 },
  ];

  const filteredData = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return data
      .filter(item => item.name.toLowerCase().includes(lowercasedQuery))
      .map(item => ({
        ...item,
        totalPrice: item.price * 1.2, // Adding a computed field
      }))
      .reduce((acc, item) => {
        acc.push(item);
        return acc;
      }, []);
  }, [searchQuery, data]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.totalPrice.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f8f8f8',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontSize: 18,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
});

export default App;
