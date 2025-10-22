import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'email'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Navigate to OTP screen
    navigation.navigate('OTP', { 
      contactInfo: loginMethod === 'phone' ? phoneNumber : email,
      method: loginMethod 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Get Started</Text>
        
        <View style={styles.formContainer}>
          <Text style={styles.instructionText}>
            Please enter your {loginMethod === 'phone' ? 'mobile number' : 'email address'} to proceed further
          </Text>

          {loginMethod === 'phone' ? (
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter Mobile Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.emailInput}
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}

          <TouchableOpacity
            style={styles.switchMethod}
            onPress={() => setLoginMethod(loginMethod === 'phone' ? 'email' : 'phone')}
          >
            <Text style={styles.switchMethodText}>
              Use {loginMethod === 'phone' ? 'Email' : 'Mobile Number'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.logoContainer}>
            <Ionicons name="business" size={24} color="#FF9800" />
            <Text style={styles.logoText}>mygate</Text>
          </View>
          <View style={styles.securityInfo}>
            <InfoItem icon="checkmark-circle" text="Does not sell or trade your data" />
            <InfoItem icon="shield-checkmark" text="Is ISO 27001 certified for information security" />
            <InfoItem icon="lock-closed" text="Encrypts and secures your data" />
            <InfoItem icon="document-text" text="Is certified GDPR ready, the gold standard in data privacy" />
          </View>
          <TouchableOpacity>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.linkText}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const InfoItem = ({ icon, text }) => (
  <View style={styles.infoItem}>
    <Ionicons name={icon} size={16} color="#666" />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    marginTop: 20,
  },
  formContainer: {
    marginBottom: 40,
  },
  instructionText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  countryCode: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRightWidth: 2,
    borderRightColor: '#333',
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emailInput: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  switchMethod: {
    alignItems: 'center',
    marginBottom: 30,
  },
  switchMethodText: {
    fontSize: 15,
    color: '#333',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#D3D3D3',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  footer: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  securityInfo: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  linkText: {
    fontSize: 13,
    color: '#333',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
});
