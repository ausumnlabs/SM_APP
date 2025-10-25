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

export default function HouseholdScreen({ navigation }) {
  const [familyMembers] = useState([
    { id: '1', name: 'John Doe', relation: 'Self' },
    { id: '2', name: 'Jane Doe', relation: 'Spouse' },
    { id: '3', name: 'Jack Doe', relation: 'Son' },
  ]);

  const [dailyHelp] = useState([
    { id: '1', name: 'Mona Devi', type: 'Maid' },
  ]);

  const [vehicles] = useState([
    { id: '1', number: 'KA51MU4090', type: 'Car' },
  ]);

  const [pets] = useState([]);

  const SectionCard = ({ title, count, onPress, icon }) => (
    <TouchableOpacity style={styles.sectionCard} onPress={onPress}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons name={icon} size={20} color="#333" />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.manageButton}>
          <Text style={styles.manageText}>Manage</Text>
          <Ionicons name="chevron-forward" size={16} color="#FF9800" />
        </TouchableOpacity>
      </View>
      <Text style={styles.count}>{count}</Text>
    </TouchableOpacity>
  );

  const MemberCard = ({ name, info }) => (
    <View style={styles.memberCard}>
      <View style={styles.memberIcon}>
        <Ionicons name="person" size={20} color="#FF9800" />
      </View>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{name}</Text>
        <Text style={styles.memberDetail}>{info}</Text>
      </View>
      <TouchableOpacity style={styles.addIconButton}>
        <Ionicons name="add-circle" size={24} color="#FFD700" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <TouchableOpacity>
              <Text style={styles.manageAllText}>Manage</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            <MemberCard name="Family" info={`${familyMembers.length} members`} />
            <MemberCard name="Daily Help" info={dailyHelp.length > 0 ? dailyHelp[0].name : '+ Add'} />
            <MemberCard name="Vehicles" info={vehicles.length > 0 ? vehicles[0].number : '+ Add'} />
            <MemberCard name="Pets" info="+ Add" />
          </View>
        </View>

        <View style={styles.addressSection}>
          <View style={styles.addressHeader}>
            <Text style={styles.addressTitle}>My Address</Text>
            <TouchableOpacity>
              <Text style={styles.shareText}>Share</Text>
              <Ionicons name="share-outline" size={16} color="#FF9800" />
            </TouchableOpacity>
          </View>
          <Text style={styles.addressText}>
            Tower 1 1306, Prestige Lakeside Habitat, 28/2, SH 35, Devasthanagalu, Gunjur Village, Bengaluru-560087
          </Text>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Family Members</Text>
          {familyMembers.map((member) => (
            <View key={member.id} style={styles.detailCard}>
              <View style={styles.detailIcon}>
                <Ionicons name="people" size={24} color="#FF9800" />
              </View>
              <View style={styles.detailInfo}>
                <Text style={styles.detailName}>{member.name}</Text>
                <Text style={styles.detailMeta}>{member.relation}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Daily Help</Text>
          {dailyHelp.map((helper) => (
            <View key={helper.id} style={styles.detailCard}>
              <View style={styles.detailIcon}>
                <Ionicons name="person" size={24} color="#FF9800" />
              </View>
              <View style={styles.detailInfo}>
                <Text style={styles.detailName}>{helper.name}</Text>
                <Text style={styles.detailMeta}>{helper.type}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Vehicles</Text>
          {vehicles.map((vehicle) => (
            <View key={vehicle.id} style={styles.detailCard}>
              <View style={styles.detailIcon}>
                <Ionicons name="car" size={24} color="#FF9800" />
              </View>
              <View style={styles.detailInfo}>
                <Text style={styles.detailName}>{vehicle.number}</Text>
                <Text style={styles.detailMeta}>{vehicle.type}</Text>
              </View>
            </View>
          ))}
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
    padding: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  section: {
    padding: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  manageAllText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  memberCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  memberIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  memberInfo: {
    marginBottom: 10,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  memberDetail: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  addIconButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  addressSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  shareText: {
    fontSize: 14,
    color: '#FF9800',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  detailsSection: {
    padding: 20,
    paddingTop: 0,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detailCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  detailIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  detailInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  detailName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  detailMeta: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  manageButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  manageText: {
    fontSize: 14,
    color: '#FF9800',
    marginRight: 4,
  },
  count: {
    fontSize: 13,
    color: '#666',
  },
});
