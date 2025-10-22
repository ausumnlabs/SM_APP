import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const popularSearches = [
    { id: '1', title: 'Daily help', icon: 'alarm' },
    { id: '2', title: 'Society Dues', icon: 'receipt' },
    { id: '3', title: 'Amenities', icon: 'water' },
    { id: '4', title: 'Visitor Preapprove', icon: 'person' },
    { id: '5', title: 'Resident Directory', icon: 'people' },
    { id: '6', title: 'Message Guard', icon: 'mail' },
    { id: '7', title: 'Guest Preapproval', icon: 'person-add' },
  ];

  const SearchItem = ({ title, icon }) => (
    <TouchableOpacity style={styles.searchItem}>
      <View style={styles.searchIcon}>
        <Ionicons name={icon} size={24} color="#333" />
      </View>
      <Text style={styles.searchTitle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="What are you looking for?"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Searches</Text>
          {popularSearches.map((item) => (
            <SearchItem key={item.id} title={item.title} icon={item.icon} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  searchInput: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  searchTitle: {
    fontSize: 16,
    color: '#333',
  },
});
