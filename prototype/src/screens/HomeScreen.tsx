import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import {
  Text,
  Card,
  Button,
  Searchbar,
  Chip,
  Portal,
  Modal,
  Switch,
  TextInput,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList, GamePlayer, GameHistory } from '../types/navigation';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabScreenProps<MainTabParamList, 'Home'>['navigation'],
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

interface Game {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  players: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Pickup' | 'Tournament' | 'Training' | 'League';
  prizePool?: string;
  cost?: string;
  courtType: 'Indoor' | 'Outdoor';
  distance: number;
  description?: string;
  rules?: string[];
  host?: string;
  equipment?: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  teamSize: number;
}

const gamesData: Game[] = [
  {
    id: '1',
    title: '3v3 Tournament',
    location: 'West Side Courts',
    date: 'Feb 20, 2025',
    time: '1:00 PM',
    players: '3v3',
    teamSize: 3,
    skillLevel: 'Advanced',
    type: 'Tournament',
    prizePool: '$500',
    courtType: 'Indoor',
    distance: 2.5,
    cost: '$20 entry fee',
    coordinates: { latitude: 40.785091, longitude: -73.968285 },
    description: 'Competitive 3v3 tournament with cash prizes!',
    rules: ['Full court', 'Games to 21', 'Winners stay on'],
    host: 'Mike Johnson',
    equipment: ['Bring your own ball', 'Water available'],
  },
  {
    id: '2',
    title: 'Weekly Pickup Game',
    location: 'Community Center',
    date: 'Feb 18, 2025',
    time: '6:00 PM',
    players: '5v5',
    teamSize: 5,
    skillLevel: 'Intermediate',
    type: 'Pickup',
    courtType: 'Indoor',
    distance: 1.2,
    coordinates: { latitude: 40.775091, longitude: -73.978285 },
    description: 'Regular pickup game, all welcome!',
    rules: ['Half court', 'Games to 15', 'Winners stay on'],
    host: 'Sarah Chen',
    equipment: ['Balls provided', 'Indoor court'],
  },
  {
    id: '3',
    title: 'Basketball Training Session',
    location: 'Elite Sports Center',
    date: 'Feb 19, 2025',
    time: '4:00 PM',
    players: '3v3',
    teamSize: 3,
    skillLevel: 'Beginner',
    type: 'Training',
    courtType: 'Indoor',
    distance: 3.8,
    cost: '$15 per session',
    coordinates: { latitude: 40.795091, longitude: -73.958285 },
    description: 'Professional training session for beginners',
    rules: ['Focus on fundamentals', 'All equipment provided'],
    host: 'Coach Thompson',
    equipment: ['Balls provided', 'Training equipment available'],
  },
  {
    id: '4',
    title: 'Summer League Game',
    location: 'City Park Courts',
    date: 'Feb 21, 2025',
    time: '5:30 PM',
    players: '5v5',
    teamSize: 5,
    skillLevel: 'Advanced',
    type: 'League',
    courtType: 'Outdoor',
    distance: 4.2,
    cost: '$100 per team',
    coordinates: { latitude: 40.765091, longitude: -73.988285 },
    description: 'Official summer league games',
    rules: ['Full court', 'Official refs', 'League rules apply'],
    host: 'City Parks League',
    equipment: ['Game balls provided', 'Team jerseys required'],
  },
  {
    id: '5',
    title: 'Morning Pickup',
    location: 'Downtown YMCA',
    date: 'Feb 18, 2025',
    time: '7:00 AM',
    players: '3v3',
    teamSize: 3,
    skillLevel: 'Intermediate',
    type: 'Pickup',
    courtType: 'Indoor',
    distance: 0.8,
    coordinates: { latitude: 40.755091, longitude: -73.998285 },
    description: 'Early morning pickup games',
    rules: ['Half court', 'Games to 15', 'Call your own fouls'],
    host: 'YMCA Basketball Club',
    equipment: ['Balls available', 'Indoor court'],
  },
];

const gamePlayerMap: { [key: string]: GamePlayer[] } = {
  '1': [
    {
      id: 'mike',
      name: 'Mike Johnson',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 'player1',
      name: 'James Wilson',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 'player2',
      name: 'Lisa Chen',
      avatar: 'https://via.placeholder.com/40',
    },
  ],
  '2': [
    {
      id: 'sarah',
      name: 'Sarah Chen',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 'player3',
      name: 'David Kim',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 'player4',
      name: 'Maria Garcia',
      avatar: 'https://via.placeholder.com/40',
    },
  ],
  '3': [
    {
      id: 'coach',
      name: 'Coach Thompson',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 'player5',
      name: 'Alex Rodriguez',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 'player6',
      name: 'Emma Wilson',
      avatar: 'https://via.placeholder.com/40',
    },
  ],
  '4': [
    {
      id: 'league',
      name: 'League Admin',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 'player7',
      name: 'Marcus Johnson',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 'player8',
      name: 'Sophie Lee',
      avatar: 'https://via.placeholder.com/40',
    },
  ],
  '5': [
    {
      id: 'ymca',
      name: 'YMCA Host',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 'player9',
      name: 'Chris Taylor',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 'player10',
      name: 'Rachel Park',
      avatar: 'https://via.placeholder.com/40',
    },
  ],
};

const HomeScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [joinedGames, setJoinedGames] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState('10');
  const [showIndoorOnly, setShowIndoorOnly] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);

  const filters = {
    type: ['Pickup', 'Tournament', 'Training', 'League'],
    skill: ['Beginner', 'Intermediate', 'Advanced'],
  };

  const initialRegion = {
    latitude: 40.785091,
    longitude: -73.968285,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const filterGames = useCallback(() => {
    return gamesData.filter((game) => {
      // Search query filter
      if (
        searchQuery &&
        !game.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !game.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !game.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !game.skillLevel.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Distance filter
      if (game.distance > parseFloat(maxDistance)) {
        return false;
      }

      // Indoor/Outdoor filter
      if (showIndoorOnly && game.courtType !== 'Indoor') {
        return false;
      }

      // Free/Paid filter
      if (showFreeOnly && game.cost) {
        return false;
      }

      // Type and skill level filters
      if (
        selectedFilters.length > 0 &&
        !selectedFilters.includes(game.type) &&
        !selectedFilters.includes(game.skillLevel)
      ) {
        return false;
      }

      return true;
    });
  }, [searchQuery, maxDistance, showIndoorOnly, showFreeOnly, selectedFilters]);

  const handleJoinGame = (gameId: string) => {
    if (joinedGames.includes(gameId)) {
      setJoinedGames(joinedGames.filter(id => id !== gameId));
    } else {
      setJoinedGames([...joinedGames, gameId]);
    }
  };

  const handleGameComplete = (gameId: string, gameReport: GameHistory) => {
    setCompletedGames([...completedGames, gameId]);
    setJoinedGames(joinedGames.filter(id => id !== gameId));
    setGameHistory([...gameHistory, gameReport]);
  };

  const handleReportGame = (game: Game) => {
    const gamePlayers = gamePlayerMap[game.id] || [];
    const otherPlayers = gamePlayers.filter(player => player.id !== 'currentUser');
    
    navigation.navigate('GameReport', {
      gameId: game.id,
      gameName: game.title,
      players: otherPlayers,
      teamSize: game.teamSize,
      onGameComplete: handleGameComplete,
    });
  };

  const handleViewHistory = () => {
    navigation.navigate('GameHistory', {
      history: gameHistory,
    });
  };

  const isGameJoined = (gameId: string) => joinedGames.includes(gameId);

  const filteredGames = filterGames().filter(game => !completedGames.includes(game.id));

  const inputTheme = {
    colors: {
      text: COLORS.black,
      placeholder: COLORS.gray,
      primary: COLORS.primary,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerActions}>
          <Searchbar
            placeholder="Search games..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            theme={inputTheme}
            inputStyle={{ color: COLORS.black }}
          />
          <Button
            mode="text"
            onPress={handleViewHistory}
            icon="history"
          >
            History
          </Button>
        </View>
        <View style={styles.filterActions}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedFilters.map((filter) => (
              <Chip
                key={filter}
                onClose={() => toggleFilter(filter)}
                style={styles.filterChip}
                textStyle={styles.chipText}
              >
                {filter}
              </Chip>
            ))}
          </ScrollView>
          <Button
            mode="outlined"
            onPress={() => setFilterModalVisible(true)}
            icon="filter-variant"
            textColor={COLORS.primary}
          >
            Filters
          </Button>
        </View>
      </View>

      {Platform.OS === 'web' ? (
        <View style={styles.mapPlaceholder}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={48}
            color={COLORS.primary}
          />
          <Text style={styles.mapPlaceholderText}>
            Map View (Available on mobile devices)
          </Text>
        </View>
      ) : (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {filteredGames.map((game) => (
            <Marker
              key={game.id}
              coordinate={game.coordinates}
              title={game.title}
              description={game.location}
            />
          ))}
        </MapView>
      )}

      <ScrollView style={styles.gamesList}>
        <Text style={styles.sectionTitle}>
          {searchQuery || selectedFilters.length > 0
            ? 'Search Results'
            : 'Nearby Games'}
        </Text>
        {filteredGames.map((game) => (
          <Card key={game.id} style={styles.gameCard}>
            <Card.Content>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <View style={styles.gameInfo}>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    color={COLORS.primary}
                  />
                  <Text style={styles.infoText}>
                    {game.location} ({game.distance.toFixed(1)} km)
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={20}
                    color={COLORS.primary}
                  />
                  <Text style={styles.infoText}>{game.date}</Text>
                </View>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                  <Text style={styles.infoText}>{game.time}</Text>
                </View>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={20}
                    color={COLORS.primary}
                  />
                  <Text style={styles.infoText}>{game.players} players</Text>
                </View>
                <View style={styles.tags}>
                  <Chip style={styles.tag} textStyle={styles.chipText}>
                    {game.type}
                  </Chip>
                  <Chip style={styles.tag} textStyle={styles.chipText}>
                    {game.skillLevel}
                  </Chip>
                  <Chip style={styles.tag} textStyle={styles.chipText}>
                    {game.courtType}
                  </Chip>
                  {game.prizePool && (
                    <Chip style={styles.tag} textStyle={styles.chipText}>
                      {game.prizePool}
                    </Chip>
                  )}
                  {game.cost && (
                    <Chip style={styles.tag} textStyle={styles.chipText}>
                      {game.cost}
                    </Chip>
                  )}
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                mode={isGameJoined(game.id) ? "outlined" : "contained"}
                onPress={() => handleJoinGame(game.id)}
                style={styles.actionButton}
              >
                {isGameJoined(game.id) ? 'Leave Game' : 'Join Game'}
              </Button>
              <Button
                mode="outlined"
                onPress={() => setSelectedGame(game)}
                style={styles.actionButton}
              >
                View Details
              </Button>
              {isGameJoined(game.id) && (
                <Button
                  mode="outlined"
                  onPress={() => handleReportGame(game)}
                  style={styles.actionButton}
                >
                  Report Game
                </Button>
              )}
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

      <Portal>
        <Modal
          visible={isFilterModalVisible}
          onDismiss={() => setFilterModalVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          <ScrollView>
            <Text style={styles.modalTitle}>Filter Games</Text>
            
            <Text style={styles.filterTitle}>Distance</Text>
            <TextInput
              mode="outlined"
              label="Maximum distance (km)"
              value={maxDistance}
              onChangeText={setMaxDistance}
              keyboardType="numeric"
              style={styles.input}
              theme={inputTheme}
            />

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Indoor courts only</Text>
              <Switch
                value={showIndoorOnly}
                onValueChange={setShowIndoorOnly}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Free games only</Text>
              <Switch
                value={showFreeOnly}
                onValueChange={setShowFreeOnly}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.filterTitle}>Game Type</Text>
            <View style={styles.chipGroup}>
              {filters.type.map((filter) => (
                <Chip
                  key={filter}
                  selected={selectedFilters.includes(filter)}
                  onPress={() => toggleFilter(filter)}
                  style={styles.filterChip}
                  textStyle={styles.chipText}
                >
                  {filter}
                </Chip>
              ))}
            </View>

            <Text style={styles.filterTitle}>Skill Level</Text>
            <View style={styles.chipGroup}>
              {filters.skill.map((filter) => (
                <Chip
                  key={filter}
                  selected={selectedFilters.includes(filter)}
                  onPress={() => toggleFilter(filter)}
                  style={styles.filterChip}
                  textStyle={styles.chipText}
                >
                  {filter}
                </Chip>
              ))}
            </View>

            <Button
              mode="contained"
              onPress={() => setFilterModalVisible(false)}
              style={styles.applyButton}
            >
              Apply Filters
            </Button>
          </ScrollView>
        </Modal>

        <Modal
          visible={selectedGame !== null}
          onDismiss={() => setSelectedGame(null)}
          contentContainerStyle={styles.modalContent}
        >
          {selectedGame && (
            <ScrollView>
              <Text style={styles.modalTitle}>{selectedGame.title}</Text>
              
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Host</Text>
                <Text style={styles.modalText}>{selectedGame.host}</Text>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Description</Text>
                <Text style={styles.modalText}>{selectedGame.description}</Text>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Rules</Text>
                {selectedGame.rules?.map((rule, index) => (
                  <View key={index} style={styles.ruleItem}>
                    <MaterialCommunityIcons
                      name="circle-small"
                      size={20}
                      color={COLORS.primary}
                    />
                    <Text style={styles.modalText}>{rule}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Equipment</Text>
                {selectedGame.equipment?.map((item, index) => (
                  <View key={index} style={styles.ruleItem}>
                    <MaterialCommunityIcons
                      name="circle-small"
                      size={20}
                      color={COLORS.primary}
                    />
                    <Text style={styles.modalText}>{item}</Text>
                  </View>
                ))}
              </View>

              <Button
                mode={isGameJoined(selectedGame.id) ? "outlined" : "contained"}
                onPress={() => handleJoinGame(selectedGame.id)}
                style={styles.modalButton}
              >
                {isGameJoined(selectedGame.id) ? 'Leave Game' : 'Join Game'}
              </Button>
            </ScrollView>
          )}
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
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.base,
  },
  searchBar: {
    marginBottom: SIZES.base,
    backgroundColor: COLORS.white,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.base,
  },
  filterChip: {
    marginRight: SIZES.base,
    backgroundColor: COLORS.lightPrimary,
  },
  chipText: {
    color: COLORS.text,
  },
  map: {
    height: 200,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    marginTop: SIZES.base,
    color: COLORS.text,
  },
  gamesList: {
    flex: 1,
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
    color: COLORS.text,
  },
  gameCard: {
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.white,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gameTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.base,
    color: COLORS.text,
  },
  gameInfo: {
    marginTop: SIZES.base,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base / 2,
  },
  infoText: {
    marginLeft: SIZES.base,
    fontSize: SIZES.body1,
    color: COLORS.text,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.base,
  },
  tag: {
    marginRight: SIZES.base,
    marginBottom: SIZES.base,
    backgroundColor: COLORS.lightPrimary,
  },
  actionButton: {
    marginHorizontal: SIZES.base / 2,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    margin: SIZES.padding,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
    color: COLORS.text,
  },
  modalSection: {
    marginBottom: SIZES.padding,
  },
  modalSectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    marginBottom: SIZES.base,
    color: COLORS.text,
  },
  modalText: {
    fontSize: SIZES.body1,
    color: COLORS.text,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base / 2,
  },
  modalButton: {
    marginTop: SIZES.padding,
  },
  filterTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    marginTop: SIZES.padding,
    marginBottom: SIZES.base,
    color: COLORS.text,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.base,
  },
  input: {
    marginBottom: SIZES.base,
    backgroundColor: COLORS.white,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SIZES.base,
  },
  switchLabel: {
    fontSize: SIZES.body1,
    color: COLORS.text,
  },
  applyButton: {
    marginTop: SIZES.padding,
  },
});

export default HomeScreen;
