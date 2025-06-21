import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LiveRoomsScreen({ navigation }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');

  const [liveRooms] = useState([
    {
      id: 1,
      name: 'Music Lovers Unite 🎵',
      description: 'Share your favorite songs and discover new music',
      category: 'Music',
      participants: 12,
      maxParticipants: 20,
      host: {
        name: 'Alex',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      },
      isLive: true,
      speakers: [
        { name: 'Alex', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' },
        { name: 'Sarah', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50' },
        { name: 'Mike', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50' },
      ],
    },
    {
      id: 2,
      name: 'Travel Stories ✈️',
      description: 'Share your travel experiences and get recommendations',
      category: 'Travel',
      participants: 8,
      maxParticipants: 15,
      host: {
        name: 'Emma',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      },
      isLive: true,
      speakers: [
        { name: 'Emma', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50' },
        { name: 'John', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50' },
      ],
    },
    {
      id: 3,
      name: 'Late Night Conversations 🌙',
      description: 'Deep talks and philosophical discussions',
      category: 'General',
      participants: 6,
      maxParticipants: 10,
      host: {
        name: 'Sophie',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
      },
      isLive: true,
      speakers: [
        { name: 'Sophie', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50' },
        { name: 'David', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50' },
      ],
    },
  ]);

  const categories = ['General', 'Music', 'Travel', 'Sports', 'Art', 'Food', 'Tech'];

  const createRoom = () => {
    if (!roomName.trim()) {
      Alert.alert('Error', 'Please enter a room name');
      return;
    }

    const newRoom = {
      id: Date.now(),
      name: roomName,
      description: roomDescription,
      category: selectedCategory,
      participants: 1,
      maxParticipants: 20,
      host: {
        name: 'You',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      },
      isLive: true,
      speakers: [
        { name: 'You', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' },
      ],
    };

    setShowCreateModal(false);
    setRoomName('');
    setRoomDescription('');
    navigation.navigate('LiveRoom', { room: newRoom, isHost: true });
  };

  const joinRoom = (room) => {
    navigation.navigate('LiveRoom', { room, isHost: false });
  };

  const renderRoom = ({ item }) => (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() => joinRoom(item)}
    >
      <View style={styles.roomHeader}>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
        <Text style={styles.categoryTag}>{item.category}</Text>
      </View>

      <Text style={styles.roomName}>{item.name}</Text>
      <Text style={styles.roomDescription}>{item.description}</Text>

      <View style={styles.roomStats}>
        <View style={styles.participantCount}>
          <Ionicons name="people" size={16} color="#666" />
          <Text style={styles.participantText}>
            {item.participants}/{item.maxParticipants}
          </Text>
        </View>
        <View style={styles.hostInfo}>
          <Text style={styles.hostText}>Hosted by {item.host.name}</Text>
        </View>
      </View>

      <View style={styles.speakersRow}>
        <Text style={styles.speakersLabel}>Speaking:</Text>
        <View style={styles.speakersAvatars}>
          {item.speakers.slice(0, 3).map((speaker, index) => (
            <Image
              key={index}
              source={{ uri: speaker.photo }}
              style={[
                styles.speakerAvatar,
                { marginLeft: index > 0 ? -8 : 0 }
              ]}
            />
          ))}
          {item.speakers.length > 3 && (
            <View style={styles.moreSpeakers}>
              <Text style={styles.moreSpeakersText}>+{item.speakers.length - 3}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Rooms 🎤</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>Join audio conversations with people around you</Text>
      </View>

      <FlatList
        data={liveRooms}
        renderItem={renderRoom}
        keyExtractor={(item) => item.id.toString()}
        style={styles.roomsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.roomsListContent}
      />

      {/* Create Room Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCreateModal(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Create Room</Text>
            <TouchableOpacity onPress={createRoom}>
              <Text style={styles.createModalButton}>Create</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Room Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="What's your room about?"
                value={roomName}
                onChangeText={setRoomName}
                maxLength={50}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.descriptionInput]}
                placeholder="Tell people what to expect..."
                value={roomDescription}
                onChangeText={setRoomDescription}
                multiline
                maxLength={150}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.categoriesGrid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      selectedCategory === category && styles.categoryChipSelected
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text style={[
                      styles.categoryChipText,
                      selectedCategory === category && styles.categoryChipTextSelected
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  createButton: {
    backgroundColor: '#FF6B6B',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  roomsList: {
    flex: 1,
  },
  roomsListContent: {
    padding: 15,
  },
  roomCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginRight: 6,
  },
  liveText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  categoryTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    color: '#666',
  },
  roomName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  roomDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  roomStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  participantCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
  hostInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  hostText: {
    fontSize: 12,
    color: '#999',
  },
  speakersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speakersLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  speakersAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speakerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
  },
  moreSpeakers: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
  },
  moreSpeakersText: {
    fontSize: 8,
    color: '#666',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  createModalButton: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryChipSelected: {
    backgroundColor: '#FF6B6B',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#666',
  },
  categoryChipTextSelected: {
    color: 'white',
  },
});
