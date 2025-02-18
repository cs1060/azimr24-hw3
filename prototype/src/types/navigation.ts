export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  location: string;
  position: string;
  skillLevel: string;
  avatar: string;
  bio?: string;
  preferredCourts?: string[];
  availability?: {
    weekdays: boolean;
    weekends: boolean;
    preferredTimes: string[];
  };
  stats: {
    gamesPlayed: number;
    winRate: string;
    avgPoints: number;
    reputation: number;
  };
}

export interface GamePlayer {
  id: string;
  name: string;
  avatar: string;
}

export interface GameHistory {
  id: string;
  title: string;
  date: string;
  result: 'win' | 'loss';
  points: number;
  teammates: GamePlayer[];
  confirmed: boolean;
  pendingConfirmations: GamePlayer[];
}

export type RootStackParamList = {
  Landing: undefined;
  Signup: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  EditProfile: {
    profile: UserProfile;
    onSave: (profile: UserProfile) => void;
  };
  GameReport: {
    gameId: string;
    gameName: string;
    players: GamePlayer[];
    teamSize: number;
    onGameComplete: (gameId: string, gameReport: GameHistory) => void;
  };
  GameHistory: {
    history: GameHistory[];
  };
};

export type MainTabParamList = {
  Home: undefined;
  Challenges: undefined;
  Profile: undefined;
};
