import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState('John Doe');
  const [flatNumber, setFlatNumber] = useState('Tower 1 1306');
  const [stats, setStats] = useState({
    visitors: 7,
    updates: 3,
  });

  useEffect(() => {
    loadData();
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    try {
      const visitors = await AsyncStorage.getItem('visitors');
      const complaints = await AsyncStorage.getItem('complaints');
      const userData = await AsyncStorage.getItem('userData');
      
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.name || 'John Doe');
      }
      
      if (visitors) {
        const visitorsList = JSON.parse(visitors);
        setStats(prev => ({ ...prev, visitors: visitorsList.length }));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const QuickActionCard = ({ icon, title, color, badge, onPress }) => (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: color || '#F5F5F5' }]}>
        <Ionicons name={icon} size={26} color={color ? '#fff' : '#333'} />
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.flatNumber}>{flatNumber}</Text>
            <Text style={styles.adSupported}>Ad-Supported</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.headerIcon}
              onPress={() => navigation.navigate('Search')}
            >
              <Ionicons name="search-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="chatbubble-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileIcon}>
              <Text style={styles.profileText}>AM</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.addressCard}>
          <Text style={styles.addressText}>
            Tower 1-1306, Prestige Lakeside Habitat
          </Text>
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addFlatButton}>
          <Ionicons name="add-circle-outline" size={24} color="#333" />
          <Text style={styles.addFlatText}>Add Flat/Villa/Office</Text>
        </TouchableOpacity>

        <View style={styles.bannerImage}>
          <View style={styles.adBadge}>
            <Text style={styles.adBadgeText}>Ad</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('QuickActions')}>
              <Ionicons name="apps" size={24} color="#FF9800" />
              <Text style={styles.customizeText}>Customise</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionsGrid}>
            <QuickActionCard
              icon="person-add-outline"
              title="Pre-Approve"
              color="#8E44AD"
              onPress={() => navigation.navigate('VisitorsTab', { screen: 'AddVisitor' })}
            />
            <QuickActionCard
              icon="wallet-outline"
              title="Payments"
              color="#3498DB"
            />
            <QuickActionCard
              icon="chatbubbles-outline"
              title="Helpdesk"
              color="#E74C3C"
              onPress={() => navigation.navigate('HelpdeskTab', { screen: 'Helpdesk' })}
            />
            <QuickActionCard
              icon="calendar-outline"
              title="Amenities"
              color="#9B59B6"
              onPress={() => navigation.navigate('Services')}
            />
            <QuickActionCard
              icon="card-outline"
              title="Get SBI Card"
              color="#2ECC71"
            />
            <QuickActionCard
              icon="document-text-outline"
              title="Notices"
              badge="38"
              onPress={() => navigation.navigate('Noticeboard')}
            />
            <QuickActionCard
              icon="sparkles-outline"
              title="Cleaning Ess..."
              color="#27AE60"
            />
            <QuickActionCard
              icon="add-circle-outline"
              title="View More"
              color="#FFD700"
              onPress={() => navigation.navigate('QuickActions')}
            />
          </View>
        </View>

        <View style={styles.visitorSection}>
          <View style={styles.visitorHeader}>
            <View style={styles.visitorStats}>
              <Ionicons name="people" size={16} color="#333" />
              <Text style={styles.visitorStatsText}>{stats.visitors} Visitors</Text>
              <Text style={styles.visitorStatsSeparator}>and</Text>
              <Ionicons name="notifications" size={16} color="#333" />
              <Text style={styles.visitorStatsText}>{stats.updates} Updates</Text>
            </View>
          </View>

          <View style={styles.visitorUpdates}>
            <Text style={styles.visitorUpdatesTitle}>Visitor Updates</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllLink}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color="#FF9800" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.visitorList}>
            {[1, 2, 3, 4, 5].map((i) => (
              <View key={i} style={styles.visitorCard}>
                <View style={styles.visitorAvatar}>
                  <Ionicons name="person" size={24} color="#666" />
                </View>
                <Text style={styles.visitorName}>Visitor{i}+1</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.paymentCard}>
          <View style={styles.paymentIcon}>
            <Ionicons name="wallet" size={24} color="#FF9800" />
          </View>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentAmount}>₹4,718.08</Text>
            <Text style={styles.paymentText}>Tap to Settle Now! Please ignore if already paid.</Text>
          </View>
        </View>

        <View style={styles.eventCard}>
          <View style={styles.eventIcon}>
            <Ionicons name="calendar" size={20} color="#FF9800" />
          </View>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>Shweta is hosting a new event!</Text>
            <Text style={styles.eventSubtitle}>💃 *Shweta Dance Classes* 💃</Text>
          </View>
        </View>
      </ScrollView>
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
    padding: 15,
    backgroundColor: '#E8E0D5',
  },
  headerLeft: {
    flex: 1,
  },
  flatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  adSupported: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 15,
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#A0916D',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  profileText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  addressCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 15,
    marginTop: -20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  addFlatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
  },
  addFlatText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  bannerImage: {
    height: 150,
    backgroundColor: '#4A6572',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 12,
    position: 'relative',
  },
  adBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  adBadgeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    padding: 15,
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  customizeText: {
    fontSize: 12,
    color: '#FF9800',
    marginTop: 2,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  actionCard: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionText: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  visitorSection: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  visitorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  visitorStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visitorStatsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 5,
  },
  visitorStatsSeparator: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
  },
  visitorUpdates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  visitorUpdatesTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  viewAllLink: {
    fontSize: 13,
    color: '#FF9800',
    fontWeight: '600',
  },
  visitorList: {
    marginHorizontal: -15,
    paddingHorizontal: 15,
  },
  visitorCard: {
    alignItems: 'center',
    marginRight: 15,
  },
  visitorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  visitorName: {
    fontSize: 12,
    color: '#333',
  },
  paymentCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  paymentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  paymentText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  eventSubtitle: {
    fontSize: 13,
    color: '#666',
  },
});
