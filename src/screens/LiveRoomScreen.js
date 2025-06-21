import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LiveRoomScreen({ route, navigation }) {
  const { room, isHost } = route.params;
  const [isMuted, setIsMuted] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: 'Alex',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      isSpeaking: true,
      isMuted: false,
      isHost: true,
    },
    {
      id: 2,
      name: 'Sarah',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      isSpeaking: true,
      isMuted: false,
      isHost: false,
    },
    {
      id: 3,
      name: 'Mike',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      isSpeaking: false,
      isMuted: true,
      isHost: false,
    },
    {
      id: 4,
      name: 'Emma',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
      isSpeaking: false,
      isMuted: true,
      isHost: false,
    },
    {
      id: 5,
      name: 'You',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      isSpeaking: false,
      isMuted: false,
      isHost: isHost,
    },
  ]);

  // Sample matches to invite
  const [matches] = useState([
    {
      id: 1,
      name: 'Isabella',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      isOnline: true,
    },
    {
      id: 2,
      name: 'Sophie',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
      isOnline: false,
    },
    {
      id: 3,
      name: 'Emma',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      isOnline: true,
    },
  ]);

  const leaveRoom = () => {
    Alert.alert(
      'Leave Room',
      'Are you sure you want to leave this room?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Leave', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  const inviteUser = (user) => {
    Alert.alert(
      'Invite Sent!',
      `${user.name} has been invited to join the room. They'll get a notification if they're online.`,
      [{ text: 'OK' }]
    );
    setShowInviteModal(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Update user's mute status in participants
    setParticipants(prev => 
      prev.map(p => p.name === 'You' ? { ...p, isMuted: !isMuted } : p)
    );
  };

  const raiseHand = () => {
    setIsHandRaised(!isHandRaised);
    if (!isHandRaised) {
      Alert.alert('Hand Raised', 'You raised your hand to speak. The host will be notified.');
    }
  };

  const speakers = participants.filter(p => p.isSpeaking);
  const listeners = participants.filter(p => !p.isSpeaking);

  const renderParticipant = (participant, isSpeaker = false) => (
    <View key={participant.id} style={[styles.participantItem, isSpeaker && styles.speakerItem]}>
      <View style={styles.participantImageContainer}>
        <Image source={{ uri: participant.photo }} style={styles.participantImage} />
        {participant.isSpeaking && (
          <View style={styles.speakingIndicator}>
            <View style={[styles.speakingDot, { opacity: Math.random() > 0.5 ? 1 : 0.3 }]} />
          </View>
        )}
        {participant.isMuted && (
          <View style={styles.mutedIndicator}>
            <Ionicons name="mic-off" size={12} color="white" />
          </View>
        )}
        {participant.isHost && (
          <View style={styles.hostBadge}>
            <Ionicons name="star" size={10} color="white" />
          </View>
        )}
      </View>
      <Text style={[styles.participantName, isSpeaker && styles.speakerName]} numberOfLines={1}>
        {participant.name}
      </Text>
    </View>
  );

  const renderInviteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.inviteItem}
      onPress={() => inviteUser(item)}
    >
      <Image source={{ uri: item.photo }} style={styles.invitePhoto} />
      <View style={styles.inviteInfo}>
        <Text style={styles.inviteName}>{item.name}</Text>
        <Text style={[styles.inviteStatus, { color: item.isOnline ? '#4CAF50' : '#999' }]}>
          {item.isOnline ? 'Online' : 'Offline'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.inviteButton}
        onPress={() => inviteUser(item)}
      >
        <Text style={styles.inviteButtonText}>Invite</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-down" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowInviteModal(true)}>
            <Ionicons name="person-add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.roomInfo}>
          <Text style={styles.roomName}>{room.name}</Text>
          <Text style={styles.roomDescription}>{room.description}</Text>
          <View style={styles.roomStats}>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
            <Text style={styles.participantCount}>
              {participants.length} people
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Speakers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Speaking ({speakers.length})</Text>
          <View style={styles.speakersGrid}>
            {speakers.map(speaker => renderParticipant(speaker, true))}
          </View>
        </View>

        {/* Listeners Section */}
        {listeners.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Listening ({listeners.length})</Text>
            <View style={styles.listenersGrid}>
              {listeners.map(listener => renderParticipant(listener, false))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={leaveRoom}
        >
          <Ionicons name="log-out-outline" size={24} color="#F44336" />
          <Text style={[styles.controlText, { color: '#F44336' }]}>Leave</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, isHandRaised && styles.controlButtonActive]}
          onPress={raiseHand}
        >
          <Ionicons 
            name={isHandRaised ? "hand-left" : "hand-left-outline"} 
            size={24} 
            color={isHandRaised ? "white" : "#666"} 
          />
          <Text style={[styles.controlText, isHandRaised && { color: 'white' }]}>
            {isHandRaised ? 'Lower' : 'Raise'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, isMuted && styles.mutedButton]}
          onPress={toggleMute}
        >
          <Ionicons 
            name={isMuted ? "mic-off" : "mic"} 
            size={24} 
            color={isMuted ? "white" : "#666"} 
          />
          <Text style={[styles.controlText, isMuted && { color: 'white' }]}>
            {isMuted ? 'Unmute' : 'Mute'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Invite Modal */}
      <Modal
        visible={showInviteModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowInviteModal(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Invite to Room</Text>
            <View style={{ width: 60 }} />
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.inviteSubtitle}>
              Invite your matches to join this live audio room
            </Text>
            <FlatList
              data={matches}
              renderItem={renderInviteItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.inviteList}
            />
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
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  roomInfo: {
    alignItems: 'center',
  },
  roomName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  roomDescription: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 15,
  },
  roomStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF4444',
    marginRight: 6,
  },
  liveText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  participantCount: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  content: {
    flex: 1,
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
  speakersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  listenersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  participantItem: {
    alignItems: 'center',
    width: 80,
  },
  speakerItem: {
    width: 100,
  },
  participantImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  participantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  speakingIndicator: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 33,
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  speakingDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  mutedIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#F44336',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostBadge: {
    position: 'absolute',
    top: -2,
    left: -2,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  participantName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  speakerName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  controlButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    minWidth: 70,
  },
  controlButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  mutedButton: {
    backgroundColor: '#F44336',
  },
  controlText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
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
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inviteSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inviteList: {
    flex: 1,
  },
  inviteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  invitePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  inviteInfo: {
    flex: 1,
  },
  inviteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  inviteStatus: {
    fontSize: 14,
  },
  inviteButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  inviteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
