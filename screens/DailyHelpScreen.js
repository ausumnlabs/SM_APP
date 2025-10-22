import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DailyHelpScreen() {
  const [helpers, setHelpers] = useState([]);

  useEffect(() => {
    loadHelpers();
  }, []);

  const loadHelpers = async () => {
    try {
      const data = await AsyncStorage.getItem('dailyHelp');
      if (data) {
        setHelpers(JSON.parse(data));
      } else {
        const defaultHelpers = [
          { id: '1', name: 'Maid - Morning', type: 'Maid', phone: '9876543210', status: 'checked-in', time: '08:30 AM' },
          { id: '2', name: 'Cook - Evening', type: 'Cook', phone: '9876543211', status: 'pending', time: '06:00 PM' },
          { id: '3', name: 'Driver', type: 'Driver', phone: '9876543212', status: 'checked-out', time: '09:15 AM' },
        ];
        setHelpers(defaultHelpers);
        await AsyncStorage.setItem('dailyHelp', JSON.stringify(defaultHelpers));
      }
    } catch (error) {
      console.error('Error loading helpers:', error);
    }
  };

  const toggleStatus = async (id) => {
    const updated = helpers.map(helper => {
      if (helper.id === id) {
        const newStatus = helper.status === 'checked-in' ? 'checked-out' : 'checked-in';
        return { ...helper, status: newStatus, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) };
      }
      return helper;
    });
    setHelpers(updated);
    await AsyncStorage.setItem('dailyHelp', JSON.stringify(updated));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'checked-in':
        return '#27AE60';
      case 'checked-out':
        return '#E74C3C';
      default:
        return '#F39C12';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Maid':
        return 'home-outline';
      case 'Cook':
        return 'restaurant-outline';
      case 'Driver':
        return 'car-outline';
      default:
        return 'person-outline';
    }
  };

  const renderHelper = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.helperInfo}>
          <View style={[styles.iconContainer, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Ionicons name={getTypeIcon(item.type)} size={24} color={getStatusColor(item.status)} />
          </View>
          <View style={styles.helperDetails}>
            <Text style={styles.helperName}>{item.name}</Text>
            <Text style={styles.helperPhone}>{item.phone}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status === 'checked-in' ? 'In' : item.status === 'checked-out' ? 'Out' : 'Pending'}
          </Text>
        </View>
      </View>

      <View style={styles.timeContainer}>
        <Ionicons name="time-outline" size={16} color="#666" />
        <Text style={styles.timeText}>Last activity: {item.time}</Text>
      </View>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => toggleStatus(item.id)}
      >
        <Ionicons 
          name={item.status === 'checked-in' ? 'exit-outline' : 'enter-outline'} 
          size={18} 
          color="#4A90E2" 
        />
        <Text style={styles.actionText}>
          {item.status === 'checked-in' ? 'Check Out' : 'Check In'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Help Tracking</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={helpers}
        renderItem={renderHelper}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#FF9800',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  helperInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  helperDetails: {
    flex: 1,
  },
  helperName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  helperPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9800',
    marginLeft: 6,
  },
});
