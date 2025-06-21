# 💕 LoveConnect - Dating App

A modern, feature-rich dating mobile application built with React Native and Expo.

## Features

### Core Features
- 🔐 **User Authentication** - Login and signup with email/password
- 👤 **Profile Setup** - Complete profile creation with photos, bio, and interests
- 💫 **Swipe Interface** - Tinder-like swipe mechanism for discovering users
- 💕 **Matching System** - Get matched when both users like each other
- 💬 **Real-time Messaging** - Chat with your matches
- 📱 **Responsive Design** - Beautiful UI that works on all screen sizes

### Additional Features
- 📸 **Photo Management** - Upload up to 6 photos
- 🏷️ **Interest Tags** - Select and display your interests
- 📍 **Location Integration** - Show distance between users
- 🔔 **Push Notifications** - Get notified of new matches and messages
- ⚙️ **Settings** - Comprehensive app settings and preferences
- 👀 **Privacy Controls** - Manage your visibility and privacy settings

## Tech Stack

- **Frontend**: React Native
- **Framework**: Expo
- **Navigation**: React Navigation v6
- **Icons**: Expo Vector Icons
- **Animations**: React Native Reanimated
- **Image Handling**: Expo Image Picker
- **Location**: Expo Location
- **UI Components**: Custom styled components

## Project Structure

```
DatingApp/
├── App.js                    # Main app entry point
├── package.json             # Dependencies and scripts
├── app.json                 # Expo configuration
├── src/
│   └── screens/            # All app screens
│       ├── LoginScreen.js          # User login
│       ├── SignupScreen.js         # User registration
│       ├── ProfileSetupScreen.js   # Profile creation
│       ├── SwipeScreen.js          # Main discovery interface
│       ├── MatchesScreen.js        # List of matches
│       ├── ChatScreen.js           # Messaging interface
│       ├── ProfileScreen.js        # User profile view
│       └── SettingsScreen.js       # App settings
└── README.md               # This file
```

## Getting Started

### Prerequisites

1. **Install Node.js** (v16 or later)
   - Download from [nodejs.org](https://nodejs.org/)

2. **Install Expo CLI**
   ```bash
   npm install -g @expo/cli
   ```

3. **Install Expo Go app** on your mobile device
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation

1. **Navigate to the project directory**
   ```bash
   cd DatingApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device**
   - Scan the QR code with Expo Go app (Android)
   - Scan with Camera app (iOS) and open in Expo Go

### Alternative Development Options

- **iOS Simulator**: `npm run ios` (requires Xcode on macOS)
- **Android Emulator**: `npm run android` (requires Android Studio)
- **Web Browser**: `npm run web`

## Screen Overview

### 1. Authentication Flow
- **Login Screen**: Email/password authentication with beautiful gradient design
- **Signup Screen**: Complete registration form with validation

### 2. Profile Setup
- **Profile Setup Screen**: Photo upload, bio writing, interests selection, and basic info

### 3. Main App Flow
- **Swipe Screen**: Card-based interface with swipe gestures and match detection
- **Matches Screen**: List of all matched users with last messages
- **Chat Screen**: Real-time messaging interface with typing indicators
- **Profile Screen**: User's own profile with edit options
- **Settings Screen**: Comprehensive settings for privacy, notifications, and account management

## Key Components

### Swipe Interface
- Gesture-based card swiping with visual feedback
- Smooth animations using React Native Reanimated
- Match detection with 30% simulation rate
- "Like" and "Pass" indicators during swipe

### Navigation
- Stack navigation for authentication flow
- Tab navigation for main app
- Smooth transitions between screens

### Messaging
- Real-time chat interface
- Message bubbles with timestamps
- Keyboard avoiding view for better UX

## Customization

### Colors and Branding
The app uses a consistent color scheme:
- Primary: `#FF6B6B` (coral red)
- Secondary: `#FF8E53` (orange)
- Accent: `#FF6B9D` (pink)

### Adding New Features

1. **Create new screen** in `src/screens/`
2. **Add navigation** in `App.js`
3. **Update dependencies** in `package.json` if needed

## Future Enhancements

- [ ] Backend integration with Firebase or similar
- [ ] Real-time messaging with WebSocket
- [ ] Push notifications
- [ ] Video calling feature
- [ ] Advanced matching algorithms
- [ ] Social media integration
- [ ] In-app purchases for premium features
- [ ] Photo verification system
- [ ] Advanced privacy controls

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Feel free to use it as a starting point for your own dating app!

## Support

For questions or issues:
- Create an issue in the repository
- Check the [Expo documentation](https://docs.expo.dev/)
- Visit [React Native documentation](https://reactnative.dev/docs/getting-started)

---

Made with ❤️ using React Native and Expo
