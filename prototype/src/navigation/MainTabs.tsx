import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { MainTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.lightGray,
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerStyle: {
          backgroundColor: COLORS.white,
          borderBottomColor: COLORS.lightGray,
          borderBottomWidth: 1,
        },
        headerTintColor: COLORS.text,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="basketball" size={size} color={color} />
          ),
          title: 'Games',
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
