import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    notifications: true,
    showOnline: true,
    readReceipts: false,
    discoverable: true,
    soundEnabled: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Account deleted') },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, hasSwitch, switchValue, onPress, color = '#333' }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color={color} />
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color }]}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onPress}
          trackColor={{ false: '#E0E0E0', true: '#FF6B6B' }}
          thumbColor={switchValue ? 'white' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#CCC" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Discovery Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discovery</Text>
          
          <SettingItem
            icon="eye-outline"
            title="Show me on LoveConnect"
            subtitle="Turn this off to be invisible"
            hasSwitch={true}
            switchValue={settings.discoverable}
            onPress={() => toggleSetting('discoverable')}
          />

          <SettingItem
            icon="location-outline"
            title="Distance"
            subtitle="25 miles"
            onPress={() => Alert.alert('Distance', 'Distance settings coming soon!')}
          />

          <SettingItem
            icon="people-outline"
            title="Age Range"
            subtitle="18 - 35"
            onPress={() => Alert.alert('Age Range', 'Age range settings coming soon!')}
          />
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <SettingItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Messages, matches, and more"
            hasSwitch={true}
            switchValue={settings.notifications}
            onPress={() => toggleSetting('notifications')}
          />

          <SettingItem
            icon="volume-high-outline"
            title="Sound"
            subtitle="Play notification sounds"
            hasSwitch={true}
            switchValue={settings.soundEnabled}
            onPress={() => toggleSetting('soundEnabled')}
          />
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          
          <SettingItem
            icon="checkmark-done-outline"
            title="Read Receipts"
            subtitle="Let others know when you've read their messages"
            hasSwitch={true}
            switchValue={settings.readReceipts}
            onPress={() => toggleSetting('readReceipts')}
          />

          <SettingItem
            icon="radio-button-on-outline"
            title="Show Activity Status"
            subtitle="Let others see when you're online"
            hasSwitch={true}
            switchValue={settings.showOnline}
            onPress={() => toggleSetting('showOnline')}
          />

          <SettingItem
            icon="shield-outline"
            title="Block Users"
            subtitle="Manage blocked users"
            onPress={() => Alert.alert('Blocked Users', 'Blocked users management coming soon!')}
          />
        </View>

        {/* Account */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <SettingItem
            icon="person-outline"
            title="Edit Profile"
            subtitle="Change your photos and info"
            onPress={() => Alert.alert('Edit Profile', 'Profile editing coming soon!')}
          />

          <SettingItem
            icon="card-outline"
            title="Payment Settings"
            subtitle="Manage subscription and payments"
            onPress={() => Alert.alert('Payment', 'Payment settings coming soon!')}
          />

          <SettingItem
            icon="download-outline"
            title="Download My Data"
            subtitle="Get a copy of your data"
            onPress={() => Alert.alert('Download Data', 'Data download coming soon!')}
          />
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <SettingItem
            icon="help-circle-outline"
            title="Help Center"
            subtitle="Get help and support"
            onPress={() => Alert.alert('Help Center', 'Help center coming soon!')}
          />

          <SettingItem
            icon="mail-outline"
            title="Contact Us"
            subtitle="Send us feedback"
            onPress={() => Alert.alert('Contact', 'Contact form coming soon!')}
          />

          <SettingItem
            icon="information-circle-outline"
            title="About"
            subtitle="Version 1.0.0"
            onPress={() => Alert.alert('About', 'LoveConnect v1.0.0\nMade with ❤️')}
          />
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
          
          <SettingItem
            icon="log-out-outline"
            title="Sign Out"
            color="#FF9500"
            onPress={() => Alert.alert('Sign Out', 'Sign out functionality coming soon!')}
          />

          <SettingItem
            icon="trash-outline"
            title="Delete Account"
            subtitle="Permanently delete your account"
            color="#F44336"
            onPress={handleDeleteAccount}
          />
        </View>

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
  header: {
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
  section: {
    backgroundColor: 'white',
    margin: 15,
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
    padding: 20,
    paddingBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  bottomPadding: {
    height: 30,
  },
});
