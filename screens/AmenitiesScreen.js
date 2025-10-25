import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  Platform,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

// Static data for amenities
const staticAmenities = [
  { 
    id: '1', 
    name: 'Swimming Pool', 
    icon: 'water-outline', 
    color: '#4CAF50',
    available: 'Available',
    availableSlots: 3,
    description: 'Olympic-sized swimming pool with dedicated lanes'
  },
  { 
    id: '2', 
    name: 'Gym', 
    icon: 'barbell-outline', 
    color: '#2196F3',
    available: 'Available',
    description: 'Fully equipped gym with cardio and weight training'
  },
  { 
    id: '3', 
    name: 'Clubhouse', 
    icon: 'home-outline', 
    color: '#9C27B0',
    available: 'Booked',
    description: 'Community clubhouse for events and gatherings'
  },
  { 
    id: '4', 
    name: 'Tennis Court', 
    icon: 'tennisball-outline', 
    color: '#FF9800',
    available: 'Available',
    availableSlots: 1,
    description: 'Professional tennis court with lighting'
  },
  { 
    id: '5', 
    name: 'Basketball Court', 
    icon: 'basketball-outline', 
    color: '#E91E63',
    available: 'Available',
    availableSlots: 0,
    description: 'Full-size basketball court with bleachers'
  },
  { 
    id: '6', 
    name: 'Party Hall', 
    icon: 'musical-notes-outline', 
    color: '#673AB7',
    available: 'Available',
    availableSlots: 2,
    description: 'Spacious hall for parties and events'
  },
];

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const isDateAvailable = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today && date <= new Date(today.setDate(today.getDate() + 30));
};

const AmenitiesScreen = () => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  
  // Date and time states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  // Generate time slots from 6 AM to 10 PM in 2-hour intervals
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 6; // 6 AM
    const endHour = 22;  // 10 PM
    
    for (let hour = startHour; hour < endHour; hour += 2) {
      const startTime = hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
      const endTime = hour + 2 > 12 ? `${hour + 2 - 12} PM` : `${hour + 2} AM`;
      slots.push(`${startTime} - ${endTime}`);
    }
    
    return slots;
  };
  
  const timeSlots = generateTimeSlots();

  const loadAmenities = async () => {
    try {
      setLoading(true);
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      setAmenities(staticAmenities);
    } catch (error) {
      console.error('Error loading amenities:', error);
      Alert.alert('Error', 'Failed to load amenities. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAmenities();
  }, []);

  const filteredAmenities = amenities.filter(amenity =>
    amenity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    amenity.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookAmenity = (amenity) => {
    console.log('Booking amenity:', amenity);
    if (amenity.available === 'Booked' || amenity.availableSlots === 0) {
      Alert.alert('Not Available', 'This amenity is currently not available for booking');
      return;
    }
    setSelectedAmenity(amenity);
    setSelectedDate(new Date());
    setSelectedSlot('');
    setAvailableSlots(timeSlots); // Reset available slots
    setShowDatePicker(Platform.OS === 'ios'); // Show date picker immediately on iOS
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Please select a date');
      return;
    }
    
    if (!selectedSlot) {
      Alert.alert('Error', 'Please select a time slot');
      return;
    }
    
    Alert.alert(
      'Booking Confirmation',
      `Confirm booking for ${selectedAmenity.name} on ${selectedDate} at ${selectedSlot}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // Update the amenity to show it's booked
            setAmenities(prev => 
              prev.map(a => 
                a.id === selectedAmenity.id 
                  ? { 
                      ...a, 
                      available: 'Booked', 
                      availableSlots: a.availableSlots - 1,
                      lastBooked: `${selectedDate} at ${selectedSlot}`
                    } 
                  : a
              )
            );
            
            // Show success message
            Alert.alert(
              'Booking Confirmed', 
              `${selectedAmenity.name} has been booked for ${selectedDate} at ${selectedSlot}`
            );
            
            // Reset form
            setShowBookingModal(false);
            setSelectedDate('');
            setSelectedSlot('');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderAmenityCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.amenityCard, item.available === 'Booked' && styles.bookedCard]}
      onPress={() => handleBookAmenity(item)}
      disabled={item.available === 'Booked'}
    >
      <View style={[styles.amenityIcon, { backgroundColor: `${item.color}20` }]}>
        <Ionicons name={item.icon} size={28} color={item.color} />
      </View>
      <View style={styles.amenityInfo}>
        <Text style={styles.amenityName}>{item.name}</Text>
        <Text style={styles.amenityDescription} numberOfLines={1}>{item.description}</Text>
      </View>
      <View style={[
        styles.statusBadge,
        { 
          backgroundColor: item.available === 'Available' ? '#27AE6020' : '#E74C3C20',
          opacity: item.available === 'Booked' ? 0.7 : 1
        }
      ]}>
        <Text style={[
          styles.statusText,
          { color: item.available === 'Available' ? '#27AE60' : '#E74C3C' }
        ]}>
          {item.available === 'Available' && item.availableSlots > 0 
            ? `${item.availableSlots} slots left` 
            : item.available}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Amenities</Text>
          <Text style={styles.headerSubtitle}>Book facilities and services</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search amenities..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#FF9800" />
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Amenities</Text>
            <FlatList
              data={filteredAmenities}
              renderItem={renderAmenityCard}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContent}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={loadAmenities}
                  colors={['#FF9800']}
                  tintColor="#FF9800"
                />
              }
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="search" size={48} color="#DDD" />
                  <Text style={styles.emptyText}>No amenities found</Text>
                  <Text style={styles.emptySubtext}>Try a different search term</Text>
                </View>
              }
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Bookings</Text>
          <View style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
              <Ionicons name="business" size={24} color="#FF9800" />
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>Clubhouse</Text>
                <Text style={styles.bookingDate}>Tomorrow, 06:00 PM - 08:00 PM</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showBookingModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowBookingModal(false);
          setShowDatePicker(false);
          setSelectedSlot('');
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Book {selectedAmenity?.name}</Text>
              
              <Text style={styles.label}>Select Date</Text>
              <TouchableOpacity 
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={20} color="#666" />
                <Text style={styles.dateInputText}>
                  {selectedDate ? formatDate(selectedDate) : 'Select a date'}
                </Text>
                <Ionicons 
                  name="chevron-down" 
                  size={20} 
                  color="#666" 
                  style={{ marginLeft: 'auto' }}
                />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  minimumDate={new Date()}
                  maximumDate={new Date(new Date().setDate(new Date().getDate() + 30))}
                  onChange={(event, date) => {
                    setShowDatePicker(Platform.OS === 'ios');
                    if (date) {
                      setSelectedDate(date);
                      // Generate available slots for the selected date
                      const slots = timeSlots.filter(slot => {
                        // Add your availability logic here
                        // For now, we'll just return all slots
                        return true;
                      });
                      setAvailableSlots(slots);
                    }
                  }}
                />
              )}
              
              {selectedDate && (
                <>
                  <Text style={[styles.label, { marginTop: 16 }]}>Select Time Slot</Text>
                  <ScrollView 
                    style={styles.timeSlotsContainer}
                    showsVerticalScrollIndicator={false}
                  >
                    {availableSlots.map((slot, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.timeSlot,
                          selectedSlot === slot && styles.selectedTimeSlot
                        ]}
                        onPress={() => setSelectedSlot(slot)}
                      >
                        <Text style={[
                          styles.timeSlotText,
                          selectedSlot === slot && styles.selectedTimeSlotText
                        ]}>
                          {slot}
                        </Text>
                        <Ionicons 
                          name="time-outline" 
                          size={16} 
                          color={selectedSlot === slot ? '#fff' : '#666'} 
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </>
              )}
              
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowBookingModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalButton, 
                    styles.confirmButton,
                    (!selectedDate || !selectedSlot) && styles.disabledButton
                  ]}
                  onPress={confirmBooking}
                  disabled={!selectedDate || !selectedSlot}
                >
                  <Text style={styles.confirmButtonText}>
                    {selectedDate && selectedSlot ? 'Confirm Booking' : 'Select Date & Time'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#333',
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  amenityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  bookedCard: {
    opacity: 0.7,
  },
  amenityInfo: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  amenityDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  amenityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 'auto',
    minWidth: 80,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  cancelButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E74C3C',
  },
  cancelText: {
    color: '#E74C3C',
    fontSize: 13,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateInputText: {
    flex: 1,
    marginLeft: 12,
    color: '#333',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  timeSlotsContainer: {
    maxHeight: 200,
    marginTop: 8,
    marginBottom: 8,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedTimeSlot: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  disabledButton: {
    opacity: 0.6,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AmenitiesScreen;
