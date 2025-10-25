import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  FlatList,
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

  const sliderImages = [
    { id: '1', uri: 'https://picsum.photos/600/300?random=1' },
    { id: '2', uri: 'https://picsum.photos/600/300?random=2' },
    { id: '3', uri: 'https://picsum.photos/600/300?random=3' },
  ];

  const { width: viewportWidth } = Dimensions.get('window');

  useEffect(() => {
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

    loadData();
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const QuickActionCard = ({ icon, title, badge, onPress }) => {
    const handlePress = () => {
      console.log(`Quick action pressed: ${title}`);
      console.log('Navigation object:', navigation);
      console.log('Available routes:', navigation.getState()?.routes);
      
      if (onPress) {
        onPress();
      } else if (title === 'Amenities') {
        console.log('Navigating to QuickActions...');
        navigation.navigate('QuickActions');
      }
    };

    return (
      <TouchableOpacity style={styles.actionCard} onPress={handlePress}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={26} color="#FF9800" />
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.actionText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const handleCreatePost = () => {
    // First navigate to the Social tab
    navigation.navigate('Social');
    // Then navigate to CreatePost screen after a small delay
    setTimeout(() => {
      navigation.navigate('CreatePost');
    }, 100);
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome, {userName.split(' ')[0]}</Text>
          <TouchableOpacity 
            style={styles.createPostButton}
            onPress={handleCreatePost}
          >
            <Ionicons name="add-circle" size={28} color="#FF9800" />
          </TouchableOpacity>
        </View>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Slider */}
          <View style={styles.sliderContainer}>
            <FlatList
              data={sliderImages}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={[styles.slide, { width: viewportWidth - 30 }]}>
                  <Image 
                    source={{ uri: item.uri }} 
                    style={styles.sliderImage} 
                    resizeMode="cover"
                  />
                </View>
              )}
            />
            <View style={styles.pagination}>
              {sliderImages.map((_, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.paginationDot,
                    { backgroundColor: i === 0 ? '#FF9800' : '#D9D9D9' }
                  ]} 
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
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
                onPress={() => {}}
              />
              <QuickActionCard
                icon="chatbubbles-outline"
                title="Helpdesk"
                onPress={() => navigation.navigate('HelpdeskTab', { screen: 'Helpdesk' })}
              />
              <QuickActionCard
                icon="calendar-outline"
                title="Amenities"
                onPress={() => {
                  console.log('Navigating to Amenities...');
                  navigation.navigate('Amenities');
                }}
              />
              <QuickActionCard
                icon="create-outline"
                options={({ navigation }) => ({
                  title: 'SM_APP',
                  headerRight: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity 
                        style={{ marginRight: 20 }}
                        onPress={() => navigation.navigate('Social', { screen: 'CreatePost' })}
                      >
                        <Ionicons name="add-circle" size={28} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => navigation.navigate('Profile')}
                      >
                        <Ionicons name="person-circle-outline" size={28} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ),
                })}
                title="Find Homes"
              />
              <QuickActionCard
                icon="add-circle-outline"
                title="View More"
                onPress={() => navigation.navigate('QuickActions')}
              />
              <QuickActionCard
                icon="document-text-outline"
                title="Notices"
                onPress={() => navigation.navigate('Noticeboard')}
              />
              <QuickActionCard
                icon="home-search-outline"
                title="Find Homes"
              />
              />
            </View>
          </View>

          <View style={styles.visitorSection}>
            <View style={styles.visitorHeader}>
              <View style={styles.visitorStats}>
                <Ionicons name="people" size={16} color="#333" />
                <Text style={styles.visitorStatsText}>{stats.visitors} Visitors</Text>
                <Text style={styles.visitorStatsSeparator}>•</Text>
                <Text style={styles.visitorStatsText}>{stats.updates} Updates</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('VisitorsTab')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.visitorCard}>
              <View style={styles.visitorInfo}>
                <View style={styles.visitorAvatar}>
                  <Ionicons name="person" size={24} color="#666" />
                </View>
                <View style={styles.visitorDetails}>
                  <Text style={styles.visitorName}>No recent visitors</Text>
                  <Text style={styles.visitorTime}>Check back later for updates</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </View>

          <View style={styles.paymentCard}>
            <View style={styles.paymentIcon}>
              <Ionicons name="wallet" size={24} color="#FF9800" />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentAmount}></Text>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  createPostButton: {
    padding: 8,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10, // Add padding at the top to account for the header
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100, // Add padding at the bottom to ensure content isn't hidden behind the tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  sliderContainer: {
    height: 150,
    marginTop: 12,
    marginHorizontal: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  slide: {
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  visitorSection: {
    marginTop: 4,
    paddingHorizontal: 15,
    marginBottom: 10,
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
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
