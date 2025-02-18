import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Button, ProgressBar, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../types/navigation';

type Props = CompositeNavigationProp<
  BottomTabScreenProps<MainTabParamList, 'Challenges'>['navigation'],
  NativeStackNavigationProp<RootStackParamList>
>;

// Dummy data for challenges
const challenges = [
  {
    id: '1',
    title: 'Three-Point Master',
    description: 'Make 50 three-pointers in pickup games',
    progress: 35,
    total: 50,
    reward: '500 XP',
    type: 'Shooting',
    status: 'active',
  },
  {
    id: '2',
    title: 'Team Player',
    description: 'Play 20 games with different teammates',
    progress: 20,
    total: 20,
    reward: 'Team Player Badge',
    type: 'Social',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Tournament Champion',
    description: 'Win a 3v3 tournament',
    progress: 0,
    total: 1,
    reward: '1000 XP + Champion Badge',
    type: 'Achievement',
    status: 'active',
  },
];

const ChallengesScreen = ({ navigation }: { navigation: Props }) => {
  const [activeTab, setActiveTab] = useState('active');

  const filteredChallenges = challenges.filter(
    (challenge) => challenge.status === activeTab
  );

  const handleFindGames = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Challenges</Text>
        <View style={styles.tabs}>
          <Button
            mode={activeTab === 'active' ? 'contained' : 'outlined'}
            onPress={() => setActiveTab('active')}
            style={styles.tab}
          >
            Active
          </Button>
          <Button
            mode={activeTab === 'completed' ? 'contained' : 'outlined'}
            onPress={() => setActiveTab('completed')}
            style={styles.tab}
          >
            Completed
          </Button>
        </View>
      </View>

      <ScrollView style={styles.challengesList}>
        {filteredChallenges.map((challenge) => (
          <Card key={challenge.id} style={styles.challengeCard}>
            <Card.Content>
              <View style={styles.challengeHeader}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Chip icon="trophy" style={styles.typeChip}>
                  {challenge.type}
                </Chip>
              </View>
              
              <Text style={styles.description}>{challenge.description}</Text>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressText}>
                    Progress: {challenge.progress}/{challenge.total}
                  </Text>
                  <Text style={styles.rewardText}>{challenge.reward}</Text>
                </View>
                <ProgressBar
                  progress={challenge.progress / challenge.total}
                  color={COLORS.primary}
                  style={styles.progressBar}
                />
              </View>

              {challenge.status === 'active' && (
                <View style={styles.tips}>
                  <MaterialCommunityIcons
                    name="lightbulb-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                  <Text style={styles.tipText}>
                    Tip: Join more games to complete this challenge faster!
                  </Text>
                </View>
              )}
            </Card.Content>
            <Card.Actions>
              {challenge.status === 'active' ? (
                <Button mode="contained" onPress={handleFindGames}>
                  Find Games
                </Button>
              ) : (
                <Button mode="contained" onPress={() => {}} disabled>
                  Completed
                </Button>
              )}
              <Button mode="outlined" onPress={() => {}}>
                Share
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
  },
  tabs: {
    flexDirection: 'row',
    gap: SIZES.base,
  },
  tab: {
    flex: 1,
  },
  challengesList: {
    flex: 1,
    padding: SIZES.padding,
  },
  challengeCard: {
    marginBottom: SIZES.padding,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  challengeTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    flex: 1,
    marginRight: SIZES.base,
  },
  typeChip: {
    backgroundColor: COLORS.lightPrimary,
  },
  description: {
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  progressContainer: {
    marginBottom: SIZES.padding,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.base,
  },
  progressText: {
    color: COLORS.gray,
  },
  rewardText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  tips: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightPrimary,
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    marginTop: SIZES.base,
  },
  tipText: {
    marginLeft: SIZES.base,
    color: COLORS.primary,
    flex: 1,
  },
});

export default ChallengesScreen;
