import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

export default function AmenitiesScreen() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const amenities = [
    { id: '1', name: 'Clubhouse', icon: 'business', color: '#FF9800', available: 'Available' },
    { id: '2', name: 'Swimming Pool', icon: 'water', color: '#FF9800', available: 'Available' },
    { id: '3', name: 'Gym', icon: 'barbell', color: '#FF9800', available: 'Booked' },
    { id: '4', name: 'Tennis Court', icon: 'tennisball', color: '#FF9800', available: 'Available' },
    { id: '5', name: 'Basketball Court', icon: 'basketball', color: '#FF9800', available: 'Available' },
    { id: '6', name: 'Party Hall', icon: 'musical-notes', color: '#FF9800', available: 'Available' },
  ];

  const timeSlots = [
    '06:00 AM - 08:00 AM',
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM',
    '08:00 PM - 10:00 PM',
  ];

  const bookAmenity = (amenity) => {
    if (amenity.available === 'Booked') {
      Alert.alert('Not Available', 'This amenity is currently booked');
      return;
    }
    setSelectedAmenity(amenity);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    if (!selectedDate || !selectedSlot) {
      Alert.alert('Error', 'Please select date and time slot');
      return;
    }
    
    Alert.alert(
      'Booking Confirmed',
      `${selectedAmenity.name} booked for ${selectedDate} at ${selectedSlot}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowBookingModal(false);
            setSelectedDate('');
            setSelectedSlot('');
          }
        }
      ]
    );
  };

  const renderAmenityCard = (amenity) => (
    <TouchableOpacity
      key={amenity.id}
      style={styles.amenityCard}
      onPress={() => bookAmenity(amenity)}
    >
      <View style={[styles.amenityIcon, { backgroundColor: amenity.color + '20' }]}>
        <Ionicons name={amenity.icon} size={32} color={amenity.color} />
      </View>
      <Text style={styles.amenityName}>{amenity.name}</Text>
      <View style={[
        styles.statusBadge,
        { backgroundColor: amenity.available === 'Available' ? '#27AE6020' : '#E74C3C20' }
      ]}>
        <Text style={[
          styles.statusText,
          { color: amenity.available === 'Available' ? '#27AE60' : '#E74C3C' }
        ]}>
          {amenity.available}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Amenities & Services</Text>
          <Text style={styles.headerSubtitle}>Book facilities and services</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.amenitiesGrid}>
            {amenities.map(amenity => renderAmenityCard(amenity))}
          </View>
        </View>

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
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Book {selectedAmenity?.name}
              </Text>
              <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Select Date</Text>
              <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: '#FF9800' }
                }}
                minDate={new Date().toISOString().split('T')[0]}
                theme={{
                  todayTextColor: '#FF9800',
                  arrowColor: '#FF9800',
                }}
              />

              <Text style={[styles.label, { marginTop: 20 }]}>Select Time Slot</Text>
              <View style={styles.slotsContainer}>
                {timeSlots.map((slot, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.slotChip,
                      selectedSlot === slot && styles.slotChipSelected
                    ]}
                    onPress={() => setSelectedSlot(slot)}
                  >
                    <Text style={[
                      styles.slotText,
                      selectedSlot === slot && styles.slotTextSelected
                    ]}>
                      {slot}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmBooking}
              >
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  amenityIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  amenityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
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
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  slotChip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  slotChipSelected: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  slotText: {
    fontSize: 13,
    color: '#666',
  },
  slotTextSelected: {
    color: '#fff',
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
