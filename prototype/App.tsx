import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList } from './src/types/navigation';

// Import screens (to be created)
import LandingScreen from './src/screens/LandingScreen';
import SignupScreen from './src/screens/SignupScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import MainTabs from './src/navigation/MainTabs';
import EditProfileScreen from './src/screens/EditProfileScreen';
import GameReportScreen from './src/screens/GameReportScreen';
import GameHistoryScreen from './src/screens/GameHistoryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Landing"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                headerShown: true,
                title: 'Edit Profile',
                headerBackTitle: 'Back',
              }}
            />
            <Stack.Screen
              name="GameReport"
              component={GameReportScreen}
              options={{
                headerShown: true,
                title: 'Report Game',
                headerBackTitle: 'Back',
              }}
            />
            <Stack.Screen
              name="GameHistory"
              component={GameHistoryScreen}
              options={{
                headerShown: true,
                title: 'Game History',
                headerBackTitle: 'Back',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
