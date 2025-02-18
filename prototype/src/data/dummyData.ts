export const games = [
  {
    id: '1',
    type: '3v3',
    location: {
      name: 'Central Park Court',
      latitude: 40.785091,
      longitude: -73.968285,
    },
    availableSlots: 2,
    skillLevel: 'Intermediate',
    startTime: '2:00 PM',
    players: ['John D.', 'Mike R.', 'Sarah K.'],
  },
  {
    id: '2',
    type: '5v5',
    location: {
      name: 'Brooklyn Heights Court',
      latitude: 40.697940,
      longitude: -73.995861,
    },
    availableSlots: 3,
    skillLevel: 'Advanced',
    startTime: '4:30 PM',
    players: ['Alex M.', 'Chris B.', 'David L.'],
  },
];

export const challenges = [
  {
    id: '1',
    title: 'Nike 3v3 Tournament',
    description: 'Join the biggest 3v3 tournament in the city!',
    reward: '500 points',
    endDate: '2025-03-15',
    sponsor: 'Nike',
    image: 'placeholder-nike.jpg',
  },
  {
    id: '2',
    title: 'Weekly Free Throw Challenge',
    description: 'Make 50 free throws this week',
    reward: '100 points',
    endDate: '2025-02-24',
    sponsor: null,
    image: 'placeholder-challenge.jpg',
  },
];

export const badges = [
  {
    id: '1',
    name: 'Rookie',
    description: 'Played first game',
    icon: 'star-outline',
  },
  {
    id: '2',
    name: 'Team Player',
    description: 'Played 10 games',
    icon: 'account-group',
  },
  {
    id: '3',
    name: 'Champion',
    description: 'Won 5 games in a row',
    icon: 'trophy',
  },
];

export const premiumFeatures = [
  {
    id: '1',
    title: 'Advanced Stats',
    description: 'Track detailed performance metrics',
    icon: 'chart-line',
  },
  {
    id: '2',
    title: 'Priority Game Joining',
    description: 'Get early access to popular games',
    icon: 'flash',
  },
  {
    id: '3',
    title: 'Video Highlights',
    description: 'Save and share your best moments',
    icon: 'video',
  },
];
