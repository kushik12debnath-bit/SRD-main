import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { user, loading, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoggingIn(true);
    try {
      await login(username, password);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoggingIn(false);
    }
  };

  // Show loading spinner
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // If logged in, show dashboard link
  if (user) {
    return (
      <View style={styles.center}>
        <Text style={styles.welcomeText}>Welcome, {user.full_name || user.username}!</Text>
        <Text style={styles.subText}>You are logged in.</Text>
        <TouchableOpacity style={styles.button} onPress={() => window.location.href = '/SRD-main/(tabs)/audits'}>
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Login form
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>GO AUDIT</Text>
          <Text style={styles.subtitle}>Your Complete Audit Solution</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!loggingIn}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loggingIn}
          />

          <TouchableOpacity
            style={[styles.button, loggingIn && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loggingIn}
          >
            <Text style={styles.buttonText}>
              {loggingIn ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.creditsContainer}>
          <Text style={styles.creditsText}>Developed by</Text>
          <Text style={styles.creditsName}>Saila Ruidas</Text>
          <Text style={styles.creditsSub}>In collaboration with Emergent Lab</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 24 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 48 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280' },
  form: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16, backgroundColor: '#F9FAFB' },
  button: { backgroundColor: '#3B82F6', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  creditsContainer: { alignItems: 'center', marginTop: 32, paddingTop: 24, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  creditsText: { fontSize: 12, color: '#9CA3AF', marginBottom: 4 },
  creditsName: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4 },
  creditsSub: { fontSize: 12, color: '#6B7280' },
  loadingText: { marginTop: 12, fontSize: 14, color: '#6B7280' },
  welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  subText: { fontSize: 14, color: '#6B7280', marginBottom: 24 },
});
