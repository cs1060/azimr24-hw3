import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

const LandingScreen = ({ navigation }: Props) => {
  const handleGetStarted = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="basketball"
            size={80}
            color={COLORS.primary}
          />
          <Text style={styles.title}>PlayX</Text>
          <Text style={styles.subtitle}>Find your next game</Text>
        </View>

        <View style={styles.features}>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={32}
              color={COLORS.primary}
            />
            <Text style={styles.featureTitle}>Find Games</Text>
            <Text style={styles.featureText}>
              Discover pickup games, tournaments, and training sessions near you
            </Text>
          </View>

          <View style={styles.featureItem}>
            <MaterialCommunityIcons
              name="chart-line"
              size={32}
              color={COLORS.primary}
            />
            <Text style={styles.featureTitle}>Track Progress</Text>
            <Text style={styles.featureText}>
              Keep track of your stats and improve your game
            </Text>
          </View>

          <View style={styles.featureItem}>
            <MaterialCommunityIcons
              name="account-group"
              size={32}
              color={COLORS.primary}
            />
            <Text style={styles.featureTitle}>Connect</Text>
            <Text style={styles.featureText}>
              Meet other players and build your basketball network
            </Text>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={handleGetStarted}
          style={styles.button}
        >
          Get Started
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SIZES.padding,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: SIZES.padding * 2,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: SIZES.padding,
    marginBottom: SIZES.base,
  },
  subtitle: {
    fontSize: SIZES.h3,
    color: COLORS.text,
  },
  features: {
    marginBottom: SIZES.padding * 2,
  },
  featureItem: {
    alignItems: 'center',
    marginBottom: SIZES.padding * 1.5,
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.base,
    marginBottom: SIZES.base,
  },
  featureText: {
    fontSize: SIZES.body1,
    color: COLORS.gray,
    textAlign: 'center',
  },
  button: {
    marginBottom: SIZES.padding,
  },
});

export default LandingScreen;
