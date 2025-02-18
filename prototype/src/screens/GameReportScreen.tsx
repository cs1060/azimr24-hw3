import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, TextInput, Button, List, Avatar, Portal, Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, GameHistory } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'GameReport'>;

const GameReportScreen = ({ navigation, route }: Props) => {
  const { gameId, gameName, players, teamSize, onGameComplete } = route.params;
  const [myPoints, setMyPoints] = useState('');
  const [didWin, setDidWin] = useState<boolean | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const maxTeammates = teamSize - 1; // Subtract 1 for the current user

  const handlePlayerToggle = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
      setError(null);
    } else {
      if (selectedPlayers.length >= maxTeammates) {
        setError(`You can only select ${maxTeammates} teammates for this game type`);
        return;
      }
      setSelectedPlayers([...selectedPlayers, playerId]);
      setError(null);
    }
  };

  const handleSubmit = () => {
    if (!myPoints || didWin === null) {
      setError('Please fill in all fields');
      return;
    }

    if (selectedPlayers.length !== maxTeammates) {
      setError(`Please select exactly ${maxTeammates} teammates`);
      return;
    }

    setError(null);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    const gameReport: GameHistory = {
      id: gameId,
      title: gameName,
      date: new Date().toISOString(),
      result: didWin ? 'win' : 'loss',
      points: parseInt(myPoints),
      teammates: players.filter(p => selectedPlayers.includes(p.id)),
      confirmed: false,
      pendingConfirmations: players.filter(p => selectedPlayers.includes(p.id)),
    };
    
    onGameComplete(gameId, gameReport);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{gameName}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Result</Text>
          <View style={styles.resultButtons}>
            <Button
              mode={didWin === true ? 'contained' : 'outlined'}
              onPress={() => setDidWin(true)}
              style={[styles.resultButton, styles.winButton]}
            >
              Won
            </Button>
            <Button
              mode={didWin === false ? 'contained' : 'outlined'}
              onPress={() => setDidWin(false)}
              style={[styles.resultButton, styles.loseButton]}
            >
              Lost
            </Button>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <TextInput
            label="Points Scored"
            value={myPoints}
            onChangeText={setMyPoints}
            keyboardType="number-pad"
            mode="outlined"
            style={styles.input}
            theme={{
              colors: {
                text: COLORS.text,
                placeholder: COLORS.gray,
              },
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Select Teammates ({selectedPlayers.length}/{maxTeammates})
          </Text>
          {players.map((player) => (
            <List.Item
              key={player.id}
              title={player.name}
              titleStyle={styles.playerName}
              left={() => (
                <Avatar.Image size={40} source={{ uri: player.avatar }} />
              )}
              right={() => (
                <MaterialCommunityIcons
                  name={selectedPlayers.includes(player.id) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={24}
                  color={COLORS.primary}
                />
              )}
              onPress={() => handlePlayerToggle(player.id)}
              style={[
                styles.playerItem,
                selectedPlayers.includes(player.id) && styles.selectedPlayerItem,
              ]}
            />
          ))}
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Submit Report
        </Button>
      </ScrollView>

      <Portal>
        <Modal
          visible={showConfirmation}
          onDismiss={() => setShowConfirmation(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Confirm Game Report</Text>
          <Text style={styles.modalText}>
            Please verify your game report:{'\n\n'}
            Result: {didWin ? 'Won' : 'Lost'}{'\n'}
            Points Scored: {myPoints}{'\n'}
            Teammates: {selectedPlayers.length} selected
          </Text>
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={() => setShowConfirmation(false)}
              style={styles.modalButton}
            >
              Edit
            </Button>
            <Button
              mode="contained"
              onPress={handleConfirm}
              style={styles.modalButton}
            >
              Confirm
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
  content: {
    padding: SIZES.padding,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
    color: COLORS.text,
  },
  section: {
    marginBottom: SIZES.padding * 2,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
    color: COLORS.text,
  },
  resultButtons: {
    flexDirection: 'row',
    gap: SIZES.padding,
  },
  resultButton: {
    flex: 1,
  },
  winButton: {
    borderColor: COLORS.success,
  },
  loseButton: {
    borderColor: COLORS.error,
  },
  input: {
    backgroundColor: COLORS.white,
  },
  playerItem: {
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base,
    borderRadius: SIZES.radius,
  },
  playerName: {
    color: COLORS.text,
  },
  selectedPlayerItem: {
    backgroundColor: COLORS.lightPrimary,
  },
  errorText: {
    color: COLORS.error,
    marginTop: SIZES.base,
  },
  submitButton: {
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
  modalText: {
    fontSize: SIZES.body1,
    color: COLORS.text,
    marginBottom: SIZES.padding,
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

export default GameReportScreen;
