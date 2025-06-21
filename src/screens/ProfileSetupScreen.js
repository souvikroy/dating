import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileSetupScreen({ navigation }) {
  const [profileData, setProfileData] = useState({
    photos: [],
    bio: '',
    occupation: '',
    education: '',
    interests: [],
    location: '',
  });

  const [availableInterests] = useState([
    'Travel', 'Music', 'Movies', 'Sports', 'Reading', 'Cooking',
    'Art', 'Photography', 'Dancing', 'Fitness', 'Gaming', 'Nature'
  ]);

  const pickImage = async () => {
    if (profileData.photos.length >= 6) {
      Alert.alert('Limit Reached', 'You can only add up to 6 photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileData({
        ...profileData,
        photos: [...profileData.photos, result.assets[0].uri]
      });
    }
  };

  const removePhoto = (index) => {
    const newPhotos = profileData.photos.filter((_, i) => i !== index);
    setProfileData({ ...profileData, photos: newPhotos });
  };

  const toggleInterest = (interest) => {
    const interests = profileData.interests.includes(interest)
      ? profileData.interests.filter(i => i !== interest)
      : [...profileData.interests, interest];
    
    setProfileData({ ...profileData, interests });
  };

  const handleComplete = () => {
    if (profileData.photos.length === 0) {
      Alert.alert('Missing Photos', 'Please add at least one photo');
      return;
    }

    if (!profileData.bio.trim()) {
      Alert.alert('Missing Bio', 'Please write a short bio about yourself');
      return;
    }

    if (profileData.interests.length === 0) {
      Alert.alert('Missing Interests', 'Please select at least one interest');
      return;
    }

    // TODO: Save profile data
    console.log('Profile setup completed:', profileData);
    Alert.alert('Success', 'Profile setup completed!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>Let others get to know you better</Text>
        </View>

        {/* Photos Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos (Add up to 6)</Text>
          <View style={styles.photosGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <TouchableOpacity
                key={index}
                style={styles.photoSlot}
                onPress={index < profileData.photos.length ? () => removePhoto(index) : pickImage}
              >
                {profileData.photos[index] ? (
                  <>
                    <Image source={{ uri: profileData.photos[index] }} style={styles.photo} />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removePhoto(index)}
                    >
                      <Ionicons name="close-circle" size={24} color="#FF6B6B" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.addPhotoPlaceholder}>
                    <Ionicons name="camera-outline" size={32} color="#CCC" />
                    <Text style={styles.addPhotoText}>Add Photo</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <TextInput
            style={styles.bioInput}
            placeholder="Write a short bio about yourself..."
            value={profileData.bio}
            onChangeText={(text) => setProfileData({ ...profileData, bio: text })}
            multiline
            maxLength={500}
          />
          <Text style={styles.characterCount}>{profileData.bio.length}/500</Text>
        </View>

        {/* Basic Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputContainer}>
            <Ionicons name="briefcase-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Occupation"
              value={profileData.occupation}
              onChangeText={(text) => setProfileData({ ...profileData, occupation: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="school-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Education"
              value={profileData.education}
              onChangeText={(text) => setProfileData({ ...profileData, education: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={profileData.location}
              onChangeText={(text) => setProfileData({ ...profileData, location: text })}
            />
          </View>
        </View>

        {/* Interests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsGrid}>
            {availableInterests.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestTag,
                  profileData.interests.includes(interest) && styles.interestTagSelected
                ]}
                onPress={() => toggleInterest(interest)}
              >
                <Text style={[
                  styles.interestText,
                  profileData.interests.includes(interest) && styles.interestTextSelected
                ]}>
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.completeButtonText}>Complete Profile</Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoSlot: {
    width: '30%',
    aspectRatio: 0.8,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  addPhotoPlaceholder: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#CCC',
  },
  addPhotoText: {
    color: '#CCC',
    fontSize: 12,
    marginTop: 5,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  characterCount: {
    textAlign: 'right',
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 15,
    paddingBottom: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  interestTagSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  interestText: {
    color: '#666',
    fontSize: 14,
  },
  interestTextSelected: {
    color: 'white',
  },
  completeButton: {
    backgroundColor: '#FF6B6B',
    margin: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomPadding: {
    height: 30,
  },
});
