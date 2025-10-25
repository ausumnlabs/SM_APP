import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreatePostScreen = ({ navigation }) => {
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollViewRef = useRef();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please allow access to your photos to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!postText.trim() && !selectedImage) {
      Alert.alert('Empty Post', 'Please add some text or an image to your post.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success', 'Your post has been created!');
      navigation.goBack();
    }, 1500);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity 
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={[styles.postButton, isSubmitting && styles.disabledButton]}>
            {isSubmitting ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            style={styles.input}
            placeholder="What's on your mind?"
            placeholderTextColor="#999"
            multiline
            value={postText}
            onChangeText={setPostText}
            onFocus={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          />
          
          {selectedImage && (
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: selectedImage }} 
                style={styles.image} 
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.removeImageButton}
                onPress={removeImage}
              >
                <Ionicons name="close-circle" size={24} color="#ff4444" />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.attachmentButton}
              onPress={pickImage}
            >
              <Ionicons name="image-outline" size={24} color="#4CAF50" />
              <Text style={styles.attachmentText}>Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.attachmentButton}>
              <Ionicons name="location-outline" size={24} color="#2196F3" />
              <Text style={styles.attachmentText}>Location</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  postButton: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  input: {
    fontSize: 16,
    color: '#333',
    minHeight: 120,
    textAlignVertical: 'top',
    padding: 0,
  },
  imageContainer: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 4,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
  },
  attachmentText: {
    marginLeft: 6,
    color: '#333',
    fontSize: 14,
  },
});

export default CreatePostScreen;
