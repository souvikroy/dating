import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  PanResponder,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function SwipeScreen({ navigation }) {
  // Sample user data - in a real app, this would come from an API
  const [users] = useState([
    {
      id: 1,
      name: 'Emma',
      age: 25,
      bio: 'Love traveling and photography. Looking for someone to explore the world with! 📸✈️',
      photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400'],
      distance: '2 miles away',
      occupation: 'Photographer',
      interests: ['Travel', 'Photography', 'Art'],
    },
    {
      id: 2,
      name: 'Sophie',
      age: 28,
      bio: 'Fitness enthusiast and dog lover. Weekend hiker seeking adventure buddy! 🏔️🐕',
      photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'],
      distance: '5 miles away',
      occupation: 'Personal Trainer',
      interests: ['Fitness', 'Nature', 'Dogs'],
    },
    {
      id: 3,
      name: 'Isabella',
      age: 24,
      bio: 'Artist and coffee addict. Love deep conversations and late night coffee dates ☕🎨',
      photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'],
      distance: '1 mile away',
      occupation: 'Graphic Designer',
      interests: ['Art', 'Coffee', 'Movies'],
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (_, gestureState) => {
        pan.setValue({ x: gestureState.dx, y: gestureState.dy });
        
        // Scale effect while dragging
        const dragDistance = Math.abs(gestureState.dx);
        const scaleValue = Math.max(0.95, 1 - dragDistance / (screenWidth * 2));
        scale.setValue(scaleValue);
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        
        const swipeThreshold = screenWidth * 0.3;
        const velocityThreshold = 0.7;

        if (
          gestureState.dx > swipeThreshold ||
          gestureState.vx > velocityThreshold
        ) {
          // Swipe right (like)
          handleSwipe('like');
        } else if (
          gestureState.dx < -swipeThreshold ||
          gestureState.vx < -velocityThreshold
        ) {
          // Swipe left (pass)
          handleSwipe('pass');
        } else {
          // Return to center
          Animated.parallel([
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }),
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    })
  ).current;

  const handleSwipe = (action) => {
    const direction = action === 'like' ? screenWidth * 1.5 : -screenWidth * 1.5;
    
    Animated.parallel([
      Animated.timing(pan, {
        toValue: { x: direction, y: 0 },
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      if (action === 'like') {
        // Check for match (simulate 30% chance)
        if (Math.random() < 0.3) {
          Alert.alert(
            '💕 It\'s a Match!',
            `You and ${users[currentIndex].name} liked each other!`,
            [
              { text: 'Keep Swiping', style: 'cancel' },
              { text: 'Send Message', onPress: () => navigation.navigate('Chat', { user: users[currentIndex] }) },
            ]
          );
        }
      }
      
      // Reset animations and move to next user
      pan.setValue({ x: 0, y: 0 });
      scale.setValue(1);
      opacity.setValue(1);
      setCurrentIndex(currentIndex + 1);
    });
  };

  const handleButtonPress = (action) => {
    handleSwipe(action);
  };

  if (currentIndex >= users.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.noMoreCards}>
          <Ionicons name="heart-outline" size={80} color="#FF6B6B" />
          <Text style={styles.noMoreCardsTitle}>No more profiles!</Text>
          <Text style={styles.noMoreCardsText}>
            Check back later for new people in your area
          </Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => setCurrentIndex(0)}
          >
            <Text style={styles.refreshButtonText}>Start Over</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentUser = users[currentIndex];
  const nextUser = users[currentIndex + 1];

  const rotateCard = pan.x.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = pan.x.interpolate({
    inputRange: [0, screenWidth / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const passOpacity = pan.x.interpolate({
    inputRange: [-screenWidth / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>💕 LoveConnect</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        {/* Next card (behind) */}
        {nextUser && (
          <View style={[styles.card, styles.nextCard]}>
            <Image source={{ uri: nextUser.photos[0] }} style={styles.cardImage} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.cardGradient}
            >
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{nextUser.name}, {nextUser.age}</Text>
                <Text style={styles.cardDistance}>{nextUser.distance}</Text>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Current card */}
        <Animated.View
          style={[
            styles.card,
            styles.currentCard,
            {
              transform: [
                { translateX: pan.x },
                { translateY: pan.y },
                { rotate: rotateCard },
                { scale: scale },
              ],
              opacity: opacity,
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Image source={{ uri: currentUser.photos[0] }} style={styles.cardImage} />
          
          {/* Swipe indicators */}
          <Animated.View style={[styles.likeIndicator, { opacity: likeOpacity }]}>
            <Text style={styles.likeText}>LIKE</Text>
          </Animated.View>
          
          <Animated.View style={[styles.passIndicator, { opacity: passOpacity }]}>
            <Text style={styles.passText}>PASS</Text>
          </Animated.View>

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.cardGradient}
          >
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{currentUser.name}, {currentUser.age}</Text>
              <Text style={styles.cardOccupation}>{currentUser.occupation}</Text>
              <Text style={styles.cardDistance}>{currentUser.distance}</Text>
              <Text style={styles.cardBio}>{currentUser.bio}</Text>
              
              <View style={styles.interestsContainer}>
                {currentUser.interests.slice(0, 3).map((interest, index) => (
                  <View key={index} style={styles.interestTag}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>

      {/* Action buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          onPress={() => handleButtonPress('pass')}
        >
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.superLikeButton]}
          onPress={() => Alert.alert('Super Like!', 'Super like feature coming soon!')}
        >
          <Ionicons name="star" size={25} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={() => handleButtonPress('like')}
        >
          <Ionicons name="heart" size={30} color="white" />
        </TouchableOpacity>
      </View>
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
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: screenWidth - 40,
    height: screenHeight * 0.65,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  currentCard: {
    position: 'absolute',
  },
  nextCard: {
    position: 'absolute',
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  cardInfo: {
    padding: 20,
  },
  cardName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  cardOccupation: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 5,
  },
  cardDistance: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    marginBottom: 10,
  },
  cardBio: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 15,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  likeIndicator: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    transform: [{ rotate: '15deg' }],
  },
  likeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  passIndicator: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#F44336',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    transform: [{ rotate: '-15deg' }],
  },
  passText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  passButton: {
    backgroundColor: '#F44336',
  },
  superLikeButton: {
    backgroundColor: '#2196F3',
    width: 50,
    height: 50,
  },
  likeButton: {
    backgroundColor: '#4CAF50',
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noMoreCardsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  noMoreCardsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  refreshButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
