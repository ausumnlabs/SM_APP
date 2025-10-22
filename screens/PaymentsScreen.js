import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentsScreen() {
  const [dueAmount] = useState(5000);
  const [history] = useState([
    { id: '1', month: 'September 2025', amount: 5000, status: 'Paid', date: 'Sep 5, 2025' },
    { id: '2', month: 'August 2025', amount: 5000, status: 'Paid', date: 'Aug 3, 2025' },
    { id: '3', month: 'July 2025', amount: 5000, status: 'Paid', date: 'Jul 2, 2025' },
    { id: '4', month: 'June 2025', amount: 5000, status: 'Paid', date: 'Jun 1, 2025' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Payments</Text>
          <Text style={styles.headerSubtitle}>Manage your dues</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.dueCard}>
            <View style={styles.dueHeader}>
              <Ionicons name="wallet" size={32} color="#4A90E2" />
              <Text style={styles.dueLabel}>Current Due</Text>
            </View>
            <Text style={styles.dueAmount}>₹{dueAmount.toLocaleString()}</Text>
            <Text style={styles.dueMonth}>October 2025 Maintenance</Text>
            
            <TouchableOpacity style={styles.payButton}>
              <Ionicons name="card" size={20} color="#fff" />
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment History</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {history.map((payment) => (
            <View key={payment.id} style={styles.historyCard}>
              <View style={styles.historyIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#27AE60" />
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyMonth}>{payment.month}</Text>
                <Text style={styles.historyDate}>{payment.date}</Text>
              </View>
              <View style={styles.historyRight}>
                <Text style={styles.historyAmount}>₹{payment.amount.toLocaleString()}</Text>
                <View style={styles.paidBadge}>
                  <Text style={styles.paidText}>{payment.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <TouchableOpacity style={styles.methodCard}>
            <View style={styles.methodIcon}>
              <Ionicons name="card-outline" size={24} color="#4A90E2" />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>Credit/Debit Card</Text>
              <Text style={styles.methodSubtitle}>Pay with your card</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.methodCard}>
            <View style={styles.methodIcon}>
              <Ionicons name="phone-portrait-outline" size={24} color="#4A90E2" />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>UPI</Text>
              <Text style={styles.methodSubtitle}>Pay via UPI apps</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.methodCard}>
            <View style={styles.methodIcon}>
              <Ionicons name="business-outline" size={24} color="#4A90E2" />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>Net Banking</Text>
              <Text style={styles.methodSubtitle}>Pay via your bank</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
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
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  dueCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dueLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
  },
  dueAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dueMonth: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  payButton: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  historyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  historyIcon: {
    marginRight: 12,
    justifyContent: 'center',
  },
  historyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  historyMonth: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  historyDate: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  historyRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  paidBadge: {
    backgroundColor: '#27AE6020',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 4,
  },
  paidText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#27AE60',
  },
  methodCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  methodIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  methodSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});
