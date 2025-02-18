import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const inputTheme = {
    colors: {
      text: 'black',
      placeholder: COLORS.gray,
      primary: COLORS.primary,
    },
  };

  const handleSignup = () => {
    // Here you would typically handle the signup process
    // For now, we'll just navigate to the onboarding screen
    navigation.navigate('Onboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join the basketball community and start finding games near you
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
            theme={inputTheme}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
            theme={inputTheme}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            theme={inputTheme}
          />

          <Button
            mode="contained"
            onPress={handleSignup}
            style={styles.button}
          >
            Sign Up
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.goBack()}
            style={styles.textButton}
          >
            Already have an account? Sign In
          </Button>
        </View>
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
    flex: 1,
    padding: SIZES.padding,
  },
  header: {
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding * 3,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  subtitle: {
    fontSize: SIZES.body1,
    color: COLORS.gray,
  },
  form: {
    gap: SIZES.padding,
  },
  input: {
    backgroundColor: COLORS.white,
  },
  button: {
    marginTop: SIZES.padding,
  },
  textButton: {
    marginTop: SIZES.base,
  },
});

export default SignupScreen;
