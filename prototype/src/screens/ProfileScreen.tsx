import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { Text, Avatar, Card, Button, List, Portal, Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList, UserProfile } from '../types/navigation';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabScreenProps<MainTabParamList, 'Profile'>['navigation'],
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen = ({ navigation }: Props) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, NY',
    position: 'Forward',
    skillLevel: 'Intermediate',
    avatar: 'https://via.placeholder.com/80',
    bio: 'Basketball enthusiast looking for pickup games!',
    preferredCourts: ['Indoor Courts', 'Community Centers'],
    availability: {
      weekdays: true,
      weekends: true,
      preferredTimes: ['Evening (4-8 PM)', 'Night (8-11 PM)'],
    },
    stats: {
      gamesPlayed: 28,
      winRate: '64%',
      avgPoints: 12.5,
      reputation: 850,
    },
  });

  const [isUploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', {
      profile,
      onSave: (updatedProfile: UserProfile) => {
        setProfile(updatedProfile);
      },
    });
  };

  const handleUploadVideo = async () => {
    try {
      if (Platform.OS === 'web') {
        const result = await DocumentPicker.getDocumentAsync({
          type: 'video/*',
        });

        if (result.assets && result.assets[0]) {
          setSelectedVideo(result.assets[0].uri);
          setUploadModalVisible(true);
        }
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to upload videos!');
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled && result.assets[0]) {
          setSelectedVideo(result.assets[0].uri);
          setUploadModalVisible(true);
        }
      }
    } catch (error) {
      console.error('Error picking video:', error);
      alert('Error selecting video. Please try again.');
    }
  };

  const handleConfirmUpload = async () => {
    // Here you would typically upload the video to your backend
    // For now, we'll just show a success message
    alert('Video uploaded successfully!');
    setSelectedVideo(null);
    setUploadModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Image
            size={80}
            source={{ uri: profile.avatar }}
          />
          <Text style={styles.name}>{profile.name}</Text>
          <View style={styles.levelBadge}>
            <MaterialCommunityIcons
              name="star"
              size={16}
              color={COLORS.primary}
            />
            <Text style={styles.levelText}>Level 8</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.position}>{profile.position}</Text>
            <Text style={styles.skillLevel}>{profile.skillLevel}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.stats.gamesPlayed}</Text>
            <Text style={styles.statLabel}>Games</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.stats.winRate}</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.stats.avgPoints}</Text>
            <Text style={styles.statLabel}>Avg Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.stats.reputation}</Text>
            <Text style={styles.statLabel}>Rep Points</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Highlights</Text>
          <Card style={styles.highlightsCard}>
            <Card.Content>
              <Text style={styles.emptyStateText}>
                Record and share your best plays!
              </Text>
              <Button
                mode="contained"
                onPress={handleUploadVideo}
                style={styles.uploadButton}
              >
                Upload Highlight
              </Button>
            </Card.Content>
          </Card>
        </View>

        <List.Section>
          <List.Subheader style={styles.settingsHeader}>Settings</List.Subheader>
          <List.Item
            title="Edit Profile"
            left={props => (
              <List.Icon {...props} icon="account-edit" color={COLORS.primary} />
            )}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={handleEditProfile}
            style={styles.listItem}
            titleStyle={styles.listItemTitle}
          />
          <List.Item
            title="Notifications"
            left={props => <List.Icon {...props} icon="bell" color={COLORS.primary} />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            style={styles.listItem}
            titleStyle={styles.listItemTitle}
          />
          <List.Item
            title="Privacy"
            left={props => <List.Icon {...props} icon="shield" color={COLORS.primary} />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            style={styles.listItem}
            titleStyle={styles.listItemTitle}
          />
          <List.Item
            title="Help & Support"
            left={props => (
              <List.Icon {...props} icon="help-circle" color={COLORS.primary} />
            )}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            style={styles.listItem}
            titleStyle={styles.listItemTitle}
          />
        </List.Section>
      </ScrollView>

      <Portal>
        <Modal
          visible={isUploadModalVisible}
          onDismiss={() => setUploadModalVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Upload Highlight</Text>
          {selectedVideo && (
            <Text style={styles.selectedFileText}>
              Selected video: {selectedVideo.split('/').pop()}
            </Text>
          )}
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={() => setUploadModalVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleConfirmUpload}
              style={styles.modalButton}
            >
              Upload
            </Button>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  name: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginTop: SIZES.base,
    color: COLORS.text,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightPrimary,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.radius,
    marginTop: SIZES.base,
  },
  levelText: {
    marginLeft: SIZES.base / 2,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    marginTop: SIZES.base,
  },
  position: {
    marginRight: SIZES.padding,
    color: COLORS.text,
  },
  skillLevel: {
    color: COLORS.text,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: SIZES.body2,
    color: COLORS.text,
  },
  section: {
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
    color: COLORS.text,
  },
  highlightsCard: {
    backgroundColor: COLORS.white,
  },
  emptyStateText: {
    textAlign: 'center',
    marginBottom: SIZES.padding,
    color: COLORS.text,
  },
  uploadButton: {
    marginTop: SIZES.base,
  },
  settingsHeader: {
    fontSize: SIZES.h4,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  listItem: {
    backgroundColor: COLORS.white,
  },
  listItemTitle: {
    color: COLORS.text,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    margin: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  modalTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
    color: COLORS.text,
  },
  selectedFileText: {
    marginBottom: SIZES.padding,
    color: COLORS.text,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SIZES.base,
  },
  modalButton: {
    minWidth: 100,
  },
});

export default ProfileScreen;
