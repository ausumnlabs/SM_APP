import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  ScrollView,
  FlatList,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ServicesScreen = ({ navigation }) => {
  // Services data
  const serviceCategories = [
    {
      id: '1',
      title: 'Home Cleaning',
      icon: 'home',
      services: [
        'Bathroom Cleaning',
        'Kitchen Cleaning',
        'Full Home Deep Cleaning',
        'Sofa & Carpet Cleaning',
        'Full Home Pest Control'
      ]
    },
    {
      id: '2',
      title: 'Repairs & Maintenance',
      icon: 'build',
      services: [
        'Appliance Repair',
        'AC Services',
        'Plumbing',
        'Electrical',
        'Carpentry',
        'Painting'
      ]
    },
    {
      id: '3',
      title: 'Women at Home',
      icon: 'female',
      services: [
        'Ladies Only Services',
        'Beauty Services',
        'Cooking & Tiffin',
        'Elderly Care',
        'Child Care'
      ]
    },
    {
      id: '4',
      title: 'Transportation',
      icon: 'car',
      services: [
        'Airport Cabs',
        'Local City Rides',
        'Outstation Cabs',
        'Car Rental',
        'Car Wash & Cleaning'
      ]
    },
    {
      id: '5',
      title: 'Relocation',
      icon: 'business',
      services: [
        'Packers & Movers',
        'Home Shifting',
        'Office Relocation',
        'Vehicle Transport',
        'Packing Materials'
      ]
    },
    {
      id: '6',
      title: 'Property Services',
      icon: 'business',
      services: [
        'Property Management',
        'Rental Services',
        'Legal Services',
        'Vastu Consultation',
        'Home Inspection'
      ]
    },
    {
      id: '7',
      title: 'Wellness',
      icon: 'medkit',
      services: [
        'Doctor at Home',
        'Physiotherapy',
        'Yoga & Fitness',
        'Diet & Nutrition',
        'Mental Wellness'
      ]
    },
    {
      id: '8',
      title: 'Events & Photography',
      icon: 'camera',
      services: [
        'Photography',
        'Videography',
        'Event Planning',
        'Catering Services',
        'Decorations'
      ]
    },
  ];

  const popularServices = [
    { id: '1', name: 'AC Service & Repair', icon: 'snow' },
    { id: '2', name: 'Plumber', icon: 'water' },
    { id: '3', name: 'Electrician', icon: 'flash' },
    { id: '4', name: 'Carpenter', icon: 'hammer' },
    { id: '5', name: 'Pest Control', icon: 'bug' },
    { id: '6', name: 'Beauty Services', icon: 'cut' },
  ];

  const renderServiceCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.serviceCard}
      onPress={() => navigation.navigate('ServiceDetails', { category: item })}
    >
      <View style={styles.serviceIcon}>
        <Ionicons name={item.icon} size={28} color="#FF9800" />
      </View>
      <Text style={styles.serviceTitle}>{item.title}</Text>
      <Text style={styles.serviceSubtitle}>
        {item.services.slice(0, 2).join(' • ')}...
      </Text>
      <Text style={styles.seeMore}>See all {item.services.length} services</Text>
    </TouchableOpacity>
  );

  const renderPopularService = ({ item }) => (
    <TouchableOpacity 
      style={styles.popularService}
      onPress={() => navigation.navigate('ServiceProvider', { service: item })}
    >
      <View style={styles.popularIcon}>
        <Ionicons name={item.icon} size={24} color="#FF9800" />
      </View>
      <Text style={styles.popularServiceText} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header with Search */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Services</Text>
          <Text style={styles.headerSubtitle}>Book trusted professionals for all your needs</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Popular Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularServices}
            renderItem={renderPopularService}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.popularServicesList}
          />
        </View>

        {/* All Service Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Categories</Text>
          <FlatList
            data={serviceCategories}
            renderItem={renderServiceCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={styles.serviceRow}
            contentContainerStyle={styles.servicesList}
          />
        </View>

        {/* How It Works */}
        <View style={styles.howItWorks}>
          <Text style={styles.howItWorksTitle}>How It Works</Text>
          <View style={styles.stepsContainer}>
            {[
              {id: '1', icon: 'search', title: 'Choose a Service', desc: 'Browse services and select what you need'},
              {id: '2', icon: 'calendar', title: 'Pick a Time', desc: 'Select a date and time that works for you'},
              {id: '3', icon: 'checkmark-circle', title: 'Relax & Enjoy', desc: 'A verified professional will arrive on time'},
            ].map((step, index) => (
              <View key={step.id} style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDesc}>{step.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Emergency Button */}
      <TouchableOpacity style={styles.emergencyButton}>
        <Ionicons name="alert-circle" size={24} color="#fff" />
        <Text style={styles.emergencyButtonText}></Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  searchButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    margin: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  popularServicesList: {
    paddingRight: 8,
  },
  popularService: {
    width: 100,
    alignItems: 'center',
    marginRight: 12,
  },
  popularIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  popularServiceText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  serviceRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  servicesList: {
    paddingBottom: 8,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    minHeight: 32,
  },
  seeMore: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '500',
  },
  howItWorks: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  howItWorksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  stepsContainer: {
    marginBottom: 8,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  emergencyButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  emergencyButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  createPostButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#FF9800',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ServicesScreen;
