import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Firebase connection will be added later
// import { db } from '../config/firebase';
// import { collection, getDocs } from 'firebase/firestore';

// Define all quick actions data
const quickActionsData = [
  // Visitors & Security
  { id: 'invite-guest', icon: 'person-add-outline', title: 'Invite Guest', category: 'Visitors & Security', onPress: (nav) => nav.navigate('VisitorsTab', { screen: 'AddVisitor' }) },
  { id: 'cab-auto', icon: 'car-outline', title: 'Cab/Auto', category: 'Visitors & Security' },
  { id: 'allow-delivery', icon: 'cube-outline', title: 'Allow Delivery', category: 'Visitors & Security' },
  { id: 'visiting-help', icon: 'build-outline', title: 'Visiting Help', category: 'Visitors & Security' },
  { id: 'call-security', icon: 'call-outline', title: 'Call Security', category: 'Visitors & Security' },
  { id: 'message-guard', icon: 'mail-outline', title: 'Message Guard', category: 'Visitors & Security' },
  { id: 'mypasses', icon: 'card-outline', title: 'MyPasses', category: 'Visitors & Security' },
  { id: 'kid-exit', icon: 'exit-outline', title: 'Allow Kid Exit', category: 'Visitors & Security' },
  
  // Community
  { id: 'residents', icon: 'people-outline', title: 'Residents', category: 'Community' },
  { id: 'directory', icon: 'location-outline', title: 'Local Directory', category: 'Community' },
  { id: 'daily-help', icon: 'search-outline', title: 'Find Daily Help', category: 'Community' },
  { id: 'classes', icon: 'book-outline', title: 'Classes', category: 'Community' },
  
  // Feed
  { id: 'create-post', icon: 'create-outline', title: 'Create Post', category: 'Feed' },
  { id: 'create-poll', icon: 'stats-chart-outline', title: 'Create Poll', category: 'Feed' },
  { id: 'host-event', icon: 'calendar-outline', title: 'Host an Event', category: 'Feed' },
  { id: 'my-posts', icon: 'document-text-outline', title: 'My Posts', category: 'Feed' },
  
  // Smart Devices
  { id: 'manage-devices', icon: 'phone-portrait-outline', title: 'Manage Devices', category: 'Smart Devices' },
  { id: 'mypass-locks', icon: 'lock-closed-outline', title: 'Mypass Locks', category: 'Smart Devices' },
  
  // Marketplace
  { id: 'find-homes', icon: 'home-outline', title: 'Find Homes', category: 'Marketplace' },
  { id: 'my-listings', icon: 'list-outline', title: 'My Listings', category: 'Marketplace' },
  { id: 'create-listing', icon: 'add-circle-outline', title: 'Create a Listing', category: 'Marketplace' },
  
  // Household
  { id: 'my-family', icon: 'people-outline', title: 'My Family', category: 'Household', onPress: (nav) => nav.navigate('Household') },
  { id: 'daily-help', icon: 'person-outline', title: 'My Daily Help', category: 'Household' },
  { id: 'home-planner', icon: 'calendar-outline', title: 'Home Planner', category: 'Household' },
  { id: 'my-vehicles', icon: 'car-outline', title: 'My Vehicles', category: 'Household' },
  
  // Settings
  { id: 'test-notification', icon: 'notifications-outline', title: 'Test Notification', category: 'Settings' },
  { id: 'my-flat', icon: 'home-outline', title: 'My Flat', category: 'Settings' },
  { id: 'my-plans', icon: 'wallet-outline', title: 'My Plans', category: 'Settings' },
  { id: 'help-support', icon: 'help-circle-outline', title: 'Help & Support', category: 'Settings' },
  
  // Amenities
  { 
    id: 'clubhouse', 
    icon: 'home-outline', 
    title: 'Clubhouse', 
    category: 'Amenities',
    onPress: (nav) => nav.navigate('Amenities')
  },
  { 
    id: 'gym', 
    icon: 'barbell-outline', 
    title: 'Gym', 
    category: 'Amenities',
    onPress: (nav) => nav.navigate('Amenities')
  },
  { 
    id: 'swimming-pool', 
    icon: 'water-outline', 
    title: 'Swimming Pool', 
    category: 'Amenities',
    onPress: (nav) => nav.navigate('Amenities')
  },
  { 
    id: 'play-area', 
    icon: 'game-controller-outline', 
    title: 'Play Area', 
    category: 'Amenities',
    onPress: (nav) => nav.navigate('Amenities')
  },
  { 
    id: 'party-hall', 
    icon: 'wine-outline', 
    title: 'Party Hall', 
    category: 'Amenities',
    onPress: (nav) => nav.navigate('Amenities')
  },
  { 
    id: 'garden', 
    icon: 'leaf-outline', 
    title: 'Garden', 
    category: 'Amenities',
    onPress: (nav) => nav.navigate('Amenities')
  },
  { 
    id: 'tennis-court', 
    icon: 'tennisball-outline', 
    title: 'Tennis Court', 
    category: 'Amenities',
    onPress: (nav) => nav.navigate('Amenities')
  },
  { 
    id: 'badminton-court', 
    icon: 'tennisball-outline', 
    title: 'Badminton Court', 
    category: 'Amenities',
    onPress: (nav) => nav.navigate('Amenities')
  }
];

// Group actions by category
const groupByCategory = (actions) => {
  return actions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {});
};

// Static data for amenities
const staticAmenities = [
  { 
    id: '1', 
    name: 'Swimming Pool', 
    icon: 'water-outline', 
    available: true, 
    availableSlots: 3,
    description: 'Olympic-sized swimming pool with dedicated lanes'
  },
  { 
    id: '2', 
    name: 'Gym', 
    icon: 'barbell-outline', 
    available: true,
    description: 'Fully equipped gym with cardio and weight training'
  },
  { 
    id: '3', 
    name: 'Clubhouse', 
    icon: 'home-outline', 
    available: false,
    description: 'Community clubhouse for events and gatherings'
  },
  { 
    id: '4', 
    name: 'Tennis Court', 
    icon: 'tennisball-outline', 
    available: true, 
    availableSlots: 1,
    description: 'Professional tennis court with lighting'
  },
  { 
    id: '5', 
    name: 'Yoga Deck', 
    icon: 'body-outline', 
    available: true,
    availableSlots: 8,
    description: 'Open-air yoga and meditation space'
  },
  { 
    id: '6', 
    name: 'BBQ Area', 
    icon: 'restaurant-outline', 
    available: true,
    availableSlots: 2,
    description: 'Outdoor BBQ and dining area'
  },
];

// Mock function that returns static data
const fetchAmenities = async () => {
  console.log('Using static amenities data');
  return staticAmenities;
};

export default function QuickActionsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAmenities = async () => {
    console.log('Loading amenities...');
    try {
      setLoading(true);
      // Using a small timeout to simulate network request
      const data = await new Promise(resolve => 
        setTimeout(() => resolve(fetchAmenities()), 500)
      );
      console.log('Setting amenities state with data:', data);
      setAmenities(data);
    } catch (error) {
      console.error('Error loading amenities:', error);
      // Fallback to static data if there's an error
      setAmenities(staticAmenities);
    } finally {
      console.log('Finished loading amenities');
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAmenities();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadAmenities();
  };

  // Filter actions based on search query
  const filteredActions = useMemo(() => {
    if (!searchQuery.trim()) return quickActionsData;
    
    const query = searchQuery.toLowerCase();
    return quickActionsData.filter(
      action => action.title.toLowerCase().includes(query) || 
               action.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Group filtered actions by category
  const actionsByCategory = useMemo(() => {
    return groupByCategory(filteredActions);
  }, [filteredActions]);

  const QuickAction = ({ icon, title, onPress }) => (
    <TouchableOpacity 
      style={styles.actionCard} 
      onPress={() => onPress ? onPress(navigation) : null}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={28} color="#333" />
      </View>
      <Text style={styles.actionTitle} numberOfLines={2}>{title}</Text>
    </TouchableOpacity>
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleSearchSubmit = () => {
    Keyboard.dismiss();
  };

  // Filter amenities based on search query
  const filteredAmenities = useMemo(() => {
    console.log('Filtering amenities. Current amenities:', amenities);
    if (!searchQuery.trim()) {
      console.log('No search query, returning all amenities');
      return amenities;
    }
    const query = searchQuery.toLowerCase();
    const filtered = amenities.filter(amenity => {
      const matches = amenity.name.toLowerCase().includes(query) || 
                     (amenity.description && amenity.description.toLowerCase().includes(query));
      console.log(`Amenity ${amenity.name} matches search '${searchQuery}':`, matches);
      return matches;
    });
    console.log('Filtered amenities:', filtered);
    return filtered;
  }, [amenities, searchQuery]);

  const renderAmenityCard = (amenity) => {
    console.log('Rendering amenity card:', amenity);
    return (
      <TouchableOpacity 
        key={amenity.id}
        style={[
          styles.amenityCard,
          !amenity.available && styles.amenityCardDisabled
        ]}
        onPress={() => {
          console.log('Navigating to AmenitiesScreen with:', amenity.name);
          navigation.navigate('Amenities');
        }}
      >
        <View style={[
          styles.amenityIconContainer,
          !amenity.available && styles.amenityIconContainerDisabled
        ]}>
          <Ionicons 
            name={amenity.icon || 'star-outline'} 
            size={24} 
            color={amenity.available ? '#4CAF50' : '#9E9E9E'} 
          />
        </View>
        <Text 
          style={[
            styles.amenityName, 
            !amenity.available && styles.amenityNameDisabled
          ]} 
          numberOfLines={1}
        >
          {amenity.name}
        </Text>
        {amenity.available ? (
          <Text style={styles.amenityStatus}>
            {amenity.availableSlots ? `${amenity.availableSlots} slots left` : 'Available'}
          </Text>
        ) : (
          <Text style={styles.amenityStatusUnavailable}>Unavailable</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search amenities and features"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF9800']}
            tintColor="#FF9800"
          />
        }
      >
        {Object.entries(actionsByCategory).map(([category, actions]) => (
          <View key={category} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{category}</Text>
              {category === 'Visitors & Security' && (
                <TouchableOpacity style={styles.raiseAlertButton}>
                  <Ionicons name="warning" size={16} color="#E74C3C" />
                  <Text style={styles.raiseAlertText}>Raise Alert</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.grid}>
              {actions.map(action => (
                <QuickAction 
                  key={action.id}
                  icon={action.icon} 
                  title={action.title} 
                  onPress={action.onPress}
                />
              ))}
            </View>
            
            {category !== 'Visitors & Security' && (
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>
                  {category === 'Feed' ? 'View all posts' : 'View all'}
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#FF9800" />
              </TouchableOpacity>
            )}
          </View>
        ))}
        
        {/* Amenities Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllAmenities')}>
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color="#FF9800" />
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <ActivityIndicator size="large" color="#FF9800" style={styles.loader} />
          ) : (
            <View style={styles.amenitiesGrid}>
              {filteredAmenities.length > 0 ? (
                filteredAmenities.slice(0, 4).map(renderAmenityCard)
              ) : searchQuery ? (
                <View style={styles.noResults}>
                  <Ionicons name="search" size={48} color="#DDD" />
                  <Text style={styles.noResultsText}>No amenities found</Text>
                  <Text style={styles.noResultsSubtext}>Try a different search term</Text>
                </View>
              ) : (
                <Text style={styles.noAmenitiesText}>No amenities available at the moment</Text>
              )}
            </View>
          )}
        </View>

        {filteredActions.length === 0 && !searchQuery && (
          <View style={styles.noResults}>
            <Ionicons name="search" size={48} color="#DDD" />
            <Text style={styles.noResultsText}>No results found</Text>
            <Text style={styles.noResultsSubtext}>Try a different search term</Text>
          </View>
        )}
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    height: 40,
  },
  clearButton: {
    padding: 8,
    marginLeft: 4,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  noAmenitiesText: {
    color: '#666',
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  amenityCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  amenityCardDisabled: {
    opacity: 0.7,
  },
  amenityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  amenityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  amenityStatus: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  amenityStatusUnavailable: {
    fontSize: 12,
    color: '#F44336',
    fontWeight: '500',
  },
  amenityIconContainerDisabled: {
    backgroundColor: '#F5F5F5',
  },
  amenityNameDisabled: {
    color: '#9E9E9E',
  },
  loader: {
    marginVertical: 20,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
    paddingRight: 8,
  },
  section: {
    marginBottom: 25,
    paddingHorizontal: 20,
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
  raiseAlertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  raiseAlertText: {
    fontSize: 13,
    color: '#E74C3C',
    marginLeft: 4,
    fontWeight: '600',
  },
  viewAllText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  actionCard: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  actionTitle: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
});
