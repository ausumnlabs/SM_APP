import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuickActionsScreen({ navigation }) {
  const QuickAction = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={28} color="#333" />
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quick Actions</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search all features"
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Visitors & Security</Text>
            <TouchableOpacity style={styles.raiseAlertButton}>
              <Ionicons name="warning" size={16} color="#E74C3C" />
              <Text style={styles.raiseAlertText}>Raise Alert</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.grid}>
            <QuickAction icon="person-add-outline" title="Invite Guest" onPress={() => navigation.navigate('VisitorsTab', { screen: 'AddVisitor' })} />
            <QuickAction icon="car-outline" title="Cab/Auto" />
            <QuickAction icon="cube-outline" title="Allow Delivery" />
            <QuickAction icon="build-outline" title="Visiting Help" />
            <QuickAction icon="call-outline" title="Call Security" />
            <QuickAction icon="mail-outline" title="Message Guard" />
            <QuickAction icon="card-outline" title="MyPasses" />
            <QuickAction icon="exit-outline" title="Allow Kid Exit" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Community</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.viewAllText}>View all</Text>
              <Ionicons name="chevron-forward" size={16} color="#FF9800" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.grid}>
            <QuickAction icon="people-outline" title="Residents" />
            <QuickAction icon="location-outline" title="Local Directory" />
            <QuickAction icon="search-outline" title="Find Daily Help" />
            <QuickAction icon="book-outline" title="Classes" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Feed</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all posts</Text>
              <Ionicons name="chevron-forward" size={16} color="#FF9800" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.grid}>
            <QuickAction icon="create-outline" title="Create Post" />
            <QuickAction icon="stats-chart-outline" title="Create poll" />
            <QuickAction icon="calendar-outline" title="Host an Event" />
            <QuickAction icon="document-text-outline" title="My Posts" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smart Devices</Text>
          
          <View style={styles.grid}>
            <QuickAction icon="phone-portrait-outline" title="Manage Devices" />
            <QuickAction icon="lock-closed-outline" title="Mygate Locks" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Marketplace</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Explore</Text>
              <Ionicons name="chevron-forward" size={16} color="#FF9800" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.grid}>
            <QuickAction icon="home-outline" title="Find Homes" />
            <QuickAction icon="list-outline" title="My Listings" />
            <QuickAction icon="add-circle-outline" title="Create a listing" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Household</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Household')}>
              <Text style={styles.viewAllText}>Manage</Text>
              <Ionicons name="chevron-forward" size={16} color="#FF9800" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.grid}>
            <QuickAction icon="people-outline" title="My Family" onPress={() => navigation.navigate('Household')} />
            <QuickAction icon="person-outline" title="My Daily Help" />
            <QuickAction icon="calendar-outline" title="Home Planner" />
            <QuickAction icon="car-outline" title="My Vehicles" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
              <Ionicons name="chevron-forward" size={16} color="#FF9800" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.grid}>
            <QuickAction icon="notifications-outline" title="Test Notification" />
            <QuickAction icon="home-outline" title="My Flat" />
            <QuickAction icon="wallet-outline" title="My Plans" />
            <QuickAction icon="help-circle-outline" title="Help & Support" />
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
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
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
