import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OTPScreen({ route, navigation }) {
  const { contactInfo, method } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(55);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      // Navigate to signup screen
      navigation.navigate('Signup', { contactInfo, method });
    } else {
      Alert.alert('Error', 'Please enter complete OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Signup</Text>

        <Text style={styles.infoText}>
          OTP has been sent to you on your mobile phone and email ID
        </Text>

        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>
            +91-{contactInfo}
          </Text>
          <TouchableOpacity>
            <Ionicons name="create-outline" size={20} color="#FF9800" />
          </TouchableOpacity>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>
            {method === 'email' ? contactInfo : 'snehatalawar07@gmail.com'}
          </Text>
          <TouchableOpacity>
            <Ionicons name="create-outline" size={20} color="#FF9800" />
          </TouchableOpacity>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              keyboardType="number-pad"
              maxLength={1}
            />
          ))}
        </View>

        <Text style={styles.resendText}>
          Resend OTP after {timer} sec
        </Text>

        <Text style={styles.noteText}>
          Users with Non Indian Mobile Numbers will receive the OTP on the registered Email Address.
        </Text>

        <TouchableOpacity
          style={[styles.verifyButton, otp.join('').length === 6 && styles.verifyButtonActive]}
          onPress={handleVerify}
        >
          <Text style={[styles.verifyButtonText, otp.join('').length === 6 && styles.verifyButtonTextActive]}>
            Verify
          </Text>
        </TouchableOpacity>
      </View>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  resendText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  noteText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 20,
  },
  verifyButton: {
    backgroundColor: '#D3D3D3',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  verifyButtonActive: {
    backgroundColor: '#FFD700',
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  verifyButtonTextActive: {
    color: '#333',
  },
});
