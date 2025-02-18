import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen = ({ navigation }: Props) => {
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string | null>(null);

  const skillLevels = [
    {
      level: 'Beginner',
      description: 'New to basketball or playing casually',
    },
    {
      level: 'Intermediate',
      description: 'Played in school or recreational leagues',
    },
    {
      level: 'Advanced',
      description: 'Played competitively or at college level',
    },
  ];

  const handleComplete = () => {
    if (!selectedSkillLevel) return;
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome to PlayX!</Text>
        <Text style={styles.subtitle}>Let's set up your profile</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's your skill level?</Text>
          {skillLevels.map((skill) => (
            <TouchableOpacity
              key={skill.level}
              style={[
                styles.skillCard,
                selectedSkillLevel === skill.level && styles.selectedSkillCard,
              ]}
              onPress={() => setSelectedSkillLevel(skill.level)}
            >
              <View style={styles.skillHeader}>
                <Text
                  style={[
                    styles.skillLevel,
                    selectedSkillLevel === skill.level && styles.selectedSkillText,
                  ]}
                >
                  {skill.level}
                </Text>
                {selectedSkillLevel === skill.level && (
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={24}
                    color={COLORS.white}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.skillDescription,
                  selectedSkillLevel === skill.level && styles.selectedSkillText,
                ]}
              >
                {skill.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          mode="contained"
          onPress={handleComplete}
          style={styles.button}
          disabled={!selectedSkillLevel}
        >
          Let's Play!
        </Button>
      </ScrollView>
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
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    marginBottom: SIZES.base,
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.h3,
    marginBottom: SIZES.padding * 2,
    color: COLORS.text,
    textAlign: 'center',
  },
  section: {
    marginBottom: SIZES.padding * 2,
  },
  sectionTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
    color: COLORS.text,
  },
  skillCard: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  selectedSkillCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  skillLevel: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  skillDescription: {
    fontSize: SIZES.body1,
    color: COLORS.text,
  },
  selectedSkillText: {
    color: COLORS.white,
  },
  button: {
    marginTop: SIZES.padding,
  },
});

export default OnboardingScreen;
