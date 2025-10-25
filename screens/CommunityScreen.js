import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  FlatList,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommunityScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('feed');
  
  // Sample data
  const posts = [
    {
      id: '1',
    },
    {
      id: '2',
    },
  ];

  const events = [
    { id: '1', title: 'Yoga in the Park', date: 'Oct 28, 9:00 AM', location: 'Community Park' },
    { id: '2', title: 'Book Club Meeting', date: 'Nov 2, 6:30 PM', location: 'Community Center' },
  ];

  const groups = [
    { id: '1', name: 'Fitness Group', members: 45, icon: 'fitness' },
    { id: '2', name: 'Book Club', members: 28, icon: 'book' },
    { id: '3', name: 'Gardening Club', members: 32, icon: 'leaf' },
  ];

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={24} color="#666" />
        </View>
        <View>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={20} color="#666" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEvent = ({ item }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventDate}>
        <Text style={styles.eventDay}>{item.date.split(' ')[0]}</Text>
        <Text style={styles.eventMonth}>{item.date.split(' ')[1]}</Text>
      </View>
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventMeta}>
          <Ionicons name="time" size={14} color="#666" />
          <Text style={styles.eventText}>{item.date.split(',').slice(1).join(',')}</Text>
        </View>
        <View style={styles.eventMeta}>
          <Ionicons name="location" size={14} color="#666" />
          <Text style={styles.eventText}>{item.location}</Text>
        </View>
      </View>
    </View>
  );

  const renderGroup = ({ item }) => (
    <View style={styles.groupCard}>
      <View style={styles.groupIcon}>
        <Ionicons name={item.icon} size={24} color="#FF9800" />
      </View>
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.groupMembers}>{item.members} members</Text>
      </View>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FF9800" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Neighbor!</Text>
          <Text style={styles.subtitle}>Connect with your community</Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search community posts, events, and more..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Compact Icon Tabs with Labels */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'feed' && styles.activeTab]}
          onPress={() => setActiveTab('feed')}
        >
          <Ionicons 
            name="newspaper" 
            size={22} 
            color={activeTab === 'feed' ? '#FF9800' : '#666'}
          />
          <Text style={[styles.tabLabel, activeTab === 'feed' && styles.activeTabLabel]}>
            Feed
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}
        >
          <Ionicons 
            name="calendar" 
            size={22} 
            color={activeTab === 'events' ? '#FF9800' : '#666'}
          />
          <Text style={[styles.tabLabel, activeTab === 'events' && styles.activeTabLabel]}>
            Events
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'groups' && styles.activeTab]}
          onPress={() => setActiveTab('groups')}
        >
          <Ionicons 
            name="people" 
            size={22} 
            color={activeTab === 'groups' ? '#FF9800' : '#666'}
          />
          <Text style={[styles.tabLabel, activeTab === 'groups' && styles.activeTabLabel]}>
            Groups
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'marketplace' && styles.activeTab]}
          onPress={() => setActiveTab('marketplace')}
        >
          <Ionicons 
            name="cart" 
            size={22} 
            color={activeTab === 'marketplace' ? '#FF9800' : '#666'}
          />
          <Text style={[styles.tabLabel, activeTab === 'marketplace' && styles.activeTabLabel]}>
            Market
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'feed' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Community Feed</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={posts}
              renderItem={renderPost}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.postsList}
            />
          </>
        )}

        {activeTab === 'events' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={events}
              renderItem={renderEvent}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.eventsList}
            />
          </>
        )}

        {activeTab === 'groups' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Neighborhood Groups</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={groups}
              renderItem={renderGroup}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.groupsList}
            />
          </>
        )}

        {activeTab === 'marketplace' && (
          <View style={styles.marketplacePlaceholder}>
            <Ionicons name="cart" size={48} color="#DDD" />
            <Text style={styles.placeholderText}>Marketplace Coming Soon</Text>
            <Text style={styles.placeholderSubtext}>Buy, sell, or trade with your neighbors</Text>
          </View>
        )}
      </ScrollView>

      {/* Create Post Button */}
      <TouchableOpacity 
        style={styles.createPostButton}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FF9800',
    paddingTop: 50,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  notificationIcon: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
    width: '25%',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    color: '#666',
    textAlign: 'center',
  },
  activeTabLabel: {
    color: '#FF9800',
    fontWeight: '500',
  },
  activeTab: {
    backgroundColor: '#FFF5E6',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    color: '#FF9800',
    fontSize: 14,
  },
  postsList: {
    paddingBottom: 16,
  },
  postCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 6,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userName: {
    fontWeight: '600',
    color: '#333',
    fontSize: 15,
  },
  postTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 1,
  },
  postContent: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
    marginBottom: 8,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12,
  },
  eventsList: {
    paddingBottom: 16,
  },
  eventCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 6,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  eventDate: {
    backgroundColor: '#FFF5E6',
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    width: 60,
  },
  eventDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  eventMonth: {
    fontSize: 11,
    color: '#FF9800',
    marginTop: 1,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  eventText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12,
  },
  groupsList: {
    paddingBottom: 16,
  },
  groupCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 6,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  groupMembers: {
    fontSize: 11,
    color: '#999',
  },
  joinButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  joinButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 13,
  },
  marketplacePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#BBB',
    marginTop: 8,
    textAlign: 'center',
  },
  createPostButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default CommunityScreen;
