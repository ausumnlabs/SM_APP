import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NoticeboardScreen() {
  const [notices] = useState([
    {
      id: '1',
      title: 'Annual General Meeting',
      content: 'The AGM will be held on Oct 30, 2025 at 6:00 PM in the clubhouse. All residents are requested to attend.',
      date: '2025-10-20',
      priority: 'high',
      icon: 'megaphone',
      color: '#E74C3C'
    },
    {
      id: '2',
      title: 'Water Supply Interruption',
      content: 'Water supply will be interrupted on Oct 25 from 10 AM to 2 PM for maintenance work.',
      date: '2025-10-18',
      priority: 'medium',
      icon: 'water',
      color: '#F39C12'
    },
    {
      id: '3',
      title: 'Festival Celebration',
      content: 'Diwali celebration on Oct 28 at 7:00 PM. All residents are invited!',
      date: '2025-10-15',
      priority: 'low',
      icon: 'sparkles',
      color: '#27AE60'
    },
    {
      id: '4',
      title: 'Maintenance Update',
      content: 'Monthly maintenance for November is due by Oct 31. Please clear your dues on time.',
      date: '2025-10-12',
      priority: 'medium',
      icon: 'cash',
      color: '#4A90E2'
    },
  ]);

  const renderNotice = ({ item }) => (
    <View style={styles.noticeCard}>
      <View style={styles.noticeHeader}>
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <Ionicons name={item.icon} size={24} color={item.color} />
        </View>
        <View style={styles.noticeInfo}>
          <Text style={styles.noticeTitle}>{item.title}</Text>
          <Text style={styles.noticeDate}>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
        </View>
        {item.priority === 'high' && (
          <View style={styles.priorityBadge}>
            <Text style={styles.priorityText}>Important</Text>
          </View>
        )}
      </View>
      <Text style={styles.noticeContent}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Noticeboard</Text>
        <Text style={styles.headerSubtitle}>Stay updated with announcements</Text>
      </View>

      <FlatList
        data={notices}
        renderItem={renderNotice}
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    padding: 15,
  },
  noticeCard: {
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
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  noticeInfo: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noticeDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  priorityBadge: {
    backgroundColor: '#E74C3C20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#E74C3C',
  },
  noticeContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
