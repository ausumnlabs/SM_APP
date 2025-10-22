import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({ route, navigation }) {
  const { contactInfo, method } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState(method === 'email' ? contactInfo : '');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to the Terms & Conditions');
      return;
    }

    // Save user data
    const userData = {
      name,
      email,
      phone: method === 'phone' ? contactInfo : '',
      isAuthenticated: true,
    };

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Signup</Text>

        <View style={styles.phoneInfo}>
          <Ionicons name="call-outline" size={20} color="#666" />
          <Text style={styles.phoneText}>+91-{method === 'phone' ? contactInfo : '9902938307'}</Text>
        </View>

        <Text style={styles.instructionText}>
          Please enter your name and email to proceed further
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setAgreedToTerms(!agreedToTerms)}
        >
          <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
            {agreedToTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text style={styles.link}>Terms & Conditions</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitButton, (!name || !email || !agreedToTerms) && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!name || !email || !agreedToTerms}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  phoneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  phoneText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  instructionText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 30,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  link: {
    color: '#FF9800',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#D3D3D3',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
});
