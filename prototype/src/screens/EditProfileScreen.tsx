import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Avatar,
  Portal,
  Modal,
  Switch,
  Chip,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, UserProfile } from '../types/navigation';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfileScreen = ({ navigation, route }: Props) => {
  const initialProfile: UserProfile = route.params?.profile || {
    name: '',
    email: '',
    location: '',
    position: '',
    skillLevel: '',
    avatar: 'https://via.placeholder.com/100',
    bio: '',
    preferredCourts: [],
    availability: {
      weekdays: false,
      weekends: false,
      preferredTimes: [],
    },
    stats: {
      gamesPlayed: 0,
      winRate: '0%',
      avgPoints: 0,
      reputation: 0,
    },
  };

  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isSkillModalVisible, setSkillModalVisible] = useState(false);
  const [isPositionModalVisible, setPositionModalVisible] = useState(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [isCourtsModalVisible, setCourtsModalVisible] = useState(false);

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const positions = ['Guard', 'Forward', 'Center'];
  const availableTimes = [
    'Early Morning (6-9 AM)',
    'Morning (9 AM-12 PM)',
    'Afternoon (12-4 PM)',
    'Evening (4-8 PM)',
    'Night (8-11 PM)',
  ];
  const courts = [
    'Indoor Courts',
    'Outdoor Courts',
    'Community Centers',
    'School Gyms',
    'Public Parks',
  ];

  const inputTheme = {
    colors: {
      text: 'black',
      placeholder: COLORS.gray,
      primary: COLORS.primary,
    },
  };

  const handleChangePhoto = async () => {
    try {
      if (Platform.OS === 'web') {
        const result = await DocumentPicker.getDocumentAsync({
          type: 'image/*',
        });

        if (result.assets && result.assets[0]) {
          setProfile({ ...profile, avatar: result.assets[0].uri });
        }
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to change your photo!');
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled && result.assets[0]) {
          setProfile({ ...profile, avatar: result.assets[0].uri });
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Error selecting image. Please try again.');
    }
  };

  const togglePreferredTime = (time: string) => {
    const times = profile.availability?.preferredTimes || [];
    const newTimes = times.includes(time)
      ? times.filter((t) => t !== time)
      : [...times, time];
    setProfile({
      ...profile,
      availability: {
        ...profile.availability!,
        preferredTimes: newTimes,
      },
    });
  };

  const togglePreferredCourt = (court: string) => {
    const courts = profile.preferredCourts || [];
    const newCourts = courts.includes(court)
      ? courts.filter((c) => c !== court)
      : [...courts, court];
    setProfile({
      ...profile,
      preferredCourts: newCourts,
    });
  };

  const handleSave = () => {
    if (!profile.name || !profile.email || !profile.location) {
      alert('Please fill in all required fields');
      return;
    }
    if (route.params?.onSave) {
      route.params.onSave(profile);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Avatar.Image size={100} source={{ uri: profile.avatar }} />
          <Button
            mode="outlined"
            onPress={handleChangePhoto}
            style={styles.changePhotoButton}
          >
            Change Photo
          </Button>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Name *"
            value={profile.name}
            onChangeText={(text) => setProfile({ ...profile, name: text })}
            mode="outlined"
            style={styles.input}
            theme={inputTheme}
          />

          <TextInput
            label="Email *"
            value={profile.email}
            onChangeText={(text) => setProfile({ ...profile, email: text })}
            mode="outlined"
            style={styles.input}
            theme={inputTheme}
            keyboardType="email-address"
          />

          <TextInput
            label="Phone"
            value={profile.phone}
            onChangeText={(text) => setProfile({ ...profile, phone: text })}
            mode="outlined"
            style={styles.input}
            theme={inputTheme}
            keyboardType="phone-pad"
          />

          <TextInput
            label="Location *"
            value={profile.location}
            onChangeText={(text) => setProfile({ ...profile, location: text })}
            mode="outlined"
            style={styles.input}
            theme={inputTheme}
          />

          <Button
            mode="outlined"
            onPress={() => setPositionModalVisible(true)}
            style={styles.input}
          >
            {profile.position || 'Select Position'}
          </Button>

          <Button
            mode="outlined"
            onPress={() => setSkillModalVisible(true)}
            style={styles.input}
          >
            {profile.skillLevel || 'Select Skill Level'}
          </Button>

          <TextInput
            label="Bio"
            value={profile.bio}
            onChangeText={(text) => setProfile({ ...profile, bio: text })}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
            theme={inputTheme}
          />

          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.switchContainer}>
            <Text>Available on Weekdays</Text>
            <Switch
              value={profile.availability?.weekdays}
              onValueChange={(value) =>
                setProfile({
                  ...profile,
                  availability: {
                    ...profile.availability!,
                    weekdays: value,
                  },
                })
              }
            />
          </View>
          <View style={styles.switchContainer}>
            <Text>Available on Weekends</Text>
            <Switch
              value={profile.availability?.weekends}
              onValueChange={(value) =>
                setProfile({
                  ...profile,
                  availability: {
                    ...profile.availability!,
                    weekends: value,
                  },
                })
              }
            />
          </View>

          <Button
            mode="outlined"
            onPress={() => setTimeModalVisible(true)}
            style={styles.input}
          >
            Preferred Times
          </Button>

          <Button
            mode="outlined"
            onPress={() => setCourtsModalVisible(true)}
            style={styles.input}
          >
            Preferred Courts
          </Button>
        </View>

        <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
          Save Changes
        </Button>
      </ScrollView>

      <Portal>
        <Modal
          visible={isSkillModalVisible}
          onDismiss={() => setSkillModalVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Select Skill Level</Text>
          {skillLevels.map((level) => (
            <Button
              key={level}
              mode={profile.skillLevel === level ? 'contained' : 'outlined'}
              onPress={() => {
                setProfile({ ...profile, skillLevel: level });
                setSkillModalVisible(false);
              }}
              style={styles.modalButton}
            >
              {level}
            </Button>
          ))}
        </Modal>

        <Modal
          visible={isPositionModalVisible}
          onDismiss={() => setPositionModalVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Select Position</Text>
          {positions.map((pos) => (
            <Button
              key={pos}
              mode={profile.position === pos ? 'contained' : 'outlined'}
              onPress={() => {
                setProfile({ ...profile, position: pos });
                setPositionModalVisible(false);
              }}
              style={styles.modalButton}
            >
              {pos}
            </Button>
          ))}
        </Modal>

        <Modal
          visible={isTimeModalVisible}
          onDismiss={() => setTimeModalVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Select Preferred Times</Text>
          <View style={styles.chipContainer}>
            {availableTimes.map((time) => (
              <Chip
                key={time}
                selected={profile.availability?.preferredTimes.includes(time)}
                onPress={() => togglePreferredTime(time)}
                style={styles.chip}
              >
                {time}
              </Chip>
            ))}
          </View>
          <Button
            mode="contained"
            onPress={() => setTimeModalVisible(false)}
            style={styles.modalButton}
          >
            Done
          </Button>
        </Modal>

        <Modal
          visible={isCourtsModalVisible}
          onDismiss={() => setCourtsModalVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Select Preferred Courts</Text>
          <View style={styles.chipContainer}>
            {courts.map((court) => (
              <Chip
                key={court}
                selected={profile.preferredCourts?.includes(court)}
                onPress={() => togglePreferredCourt(court)}
                style={styles.chip}
              >
                {court}
              </Chip>
            ))}
          </View>
          <Button
            mode="contained"
            onPress={() => setCourtsModalVisible(false)}
            style={styles.modalButton}
          >
            Done
          </Button>
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
  content: {
    padding: SIZES.padding,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  changePhotoButton: {
    marginTop: SIZES.padding,
  },
  form: {
    marginBottom: SIZES.padding * 2,
  },
  input: {
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginTop: SIZES.padding,
    marginBottom: SIZES.base,
    color: COLORS.text,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  saveButton: {
    marginBottom: SIZES.padding * 2,
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
  modalButton: {
    marginBottom: SIZES.base,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.base,
    marginBottom: SIZES.padding,
  },
  chip: {
    marginBottom: SIZES.base,
  },
});

export default EditProfileScreen;
