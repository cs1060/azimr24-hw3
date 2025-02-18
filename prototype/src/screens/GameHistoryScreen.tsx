import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Chip, Avatar, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, GameHistory } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'GameHistory'>;

const GameHistoryScreen = ({ route }: Props) => {
  const { history = [] } = route.params || {};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Game History</Text>
        {history.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content>
              <Text style={styles.emptyText}>No games completed yet</Text>
            </Card.Content>
          </Card>
        ) : (
          history.map((game) => (
            <Card key={game.id} style={styles.gameCard}>
              <Card.Content>
                <View style={styles.header}>
                  <View>
                    <Text style={styles.gameTitle}>{game.title}</Text>
                    <Text style={styles.date}>{formatDate(game.date)}</Text>
                  </View>
                  <Chip
                    mode="flat"
                    style={[
                      styles.resultChip,
                      game.result === 'win'
                        ? styles.winChip
                        : styles.lossChip,
                    ]}
                  >
                    {game.result.toUpperCase()}
                  </Chip>
                </View>

                <View style={styles.stats}>
                  <View style={styles.statItem}>
                    <MaterialCommunityIcons
                      name="basketball"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.statText}>{game.points} PTS</Text>
                  </View>
                </View>

                <View style={styles.teammates}>
                  <Text style={styles.sectionTitle}>Teammates</Text>
                  {game.teammates.map((teammate) => (
                    <List.Item
                      key={teammate.id}
                      title={teammate.name}
                      titleStyle={styles.playerName}
                      left={() => (
                        <Avatar.Image
                          size={40}
                          source={{ uri: teammate.avatar }}
                        />
                      )}
                    />
                  ))}
                </View>

                {!game.confirmed && (
                  <View style={styles.pendingSection}>
                    <Text style={styles.pendingTitle}>
                      Pending Confirmations
                    </Text>
                    {game.pendingConfirmations.map((player) => (
                      <List.Item
                        key={player.id}
                        title={player.name}
                        titleStyle={styles.playerName}
                        left={() => (
                          <Avatar.Image
                            size={40}
                            source={{ uri: player.avatar }}
                          />
                        )}
                        right={() => (
                          <MaterialCommunityIcons
                            name="clock-outline"
                            size={24}
                            color={COLORS.warning}
                          />
                        )}
                      />
                    ))}
                  </View>
                )}
              </Card.Content>
            </Card>
          ))
        )}
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
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
    color: COLORS.text,
  },
  emptyCard: {
    backgroundColor: COLORS.white,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.gray,
  },
  gameCard: {
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.padding,
  },
  gameTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  date: {
    color: COLORS.gray,
    marginTop: SIZES.base / 2,
  },
  resultChip: {
    minWidth: 80,
    justifyContent: 'center',
  },
  winChip: {
    backgroundColor: COLORS.success,
  },
  lossChip: {
    backgroundColor: COLORS.error,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  statText: {
    marginLeft: SIZES.base,
    fontSize: SIZES.h4,
    color: COLORS.text,
  },
  teammates: {
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    marginBottom: SIZES.base,
    color: COLORS.text,
  },
  playerName: {
    color: COLORS.text,
  },
  pendingSection: {
    marginTop: SIZES.padding,
    backgroundColor: COLORS.lightWarning,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  pendingTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    marginBottom: SIZES.base,
    color: COLORS.warning,
  },
});

export default GameHistoryScreen;
