import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
  Alert, StatusBar,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { user, loading, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  if (loading) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.splashLogo}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>✓</Text>
          </View>
          <Text style={styles.splashTitle}>GO AUDIT</Text>
          <Text style={styles.splashSub}>Loading...</Text>
          <ActivityIndicator size="small" color="#FFFFFF" style={{ marginTop: 16 }} />
        </View>
      </View>
    );
  }

  if (user) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.splashLogo}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>✓</Text>
          </View>
          <Text style={styles.splashTitle}>GO AUDIT</Text>
          <Text style={styles.splashSub}>Welcome back, {user.full_name || user.username}!</Text>
          <TouchableOpacity style={styles.dashboardButton} onPress={() => window.location.href = '/SRD-main/(tabs)/audits'}>
            <Text style={styles.dashboardButtonText}>Go to Dashboard →</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutLink} onPress={() => {}}>
            <Text style={styles.logoutLinkText}>Or logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircleLarge}>
              <Text style={styles.logoIconLarge}>✓</Text>
            </View>
          </View>
          <Text style={styles.brandTitle}>GO AUDIT</Text>
          <Text style={styles.brandSubtitle}>ISO Audit Management System</Text>
        </View>

        {/* Login Card */}
        <View style={styles.loginCard}>
          <Text style={styles.cardTitle}>Sign In</Text>
          <Text style={styles.cardSubtitle}>Enter your credentials to continue</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor="#94A3B8"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                editable={!loggingIn}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loggingIn}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.inputIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loggingIn && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loggingIn}
            activeOpacity={0.8}
          >
            {loggingIn ? (
              <View style={styles.buttonLoading}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={styles.loginButtonText}>  Signing in...</Text>
              </View>
            ) : (
              <Text style={styles.loginButtonText}>Sign In →</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.standardsRow}>
            <View style={styles.standardChip}>
              <Text style={styles.standardText}>ISO 45001</Text>
            </View>
            <View style={styles.standardChip}>
              <Text style={styles.standardText}>ISO 9001</Text>
            </View>
            <View style={styles.standardChip}>
              <Text style={styles.standardText}>ISO 14001</Text>
            </View>
            <View style={styles.standardChip}>
              <Text style={styles.standardText}>FSSC 22000</Text>
            </View>
          </View>
          <Text style={styles.footerText}>Developed by Saila Ruidas</Text>
          <Text style={styles.footerCollab}>In collaboration with Emergent Lab</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Splash / Loading
  splashContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    alignItems: 'center',
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 4,
    marginTop: 20,
  },
  splashSub: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 8,
  },
  dashboardButton: {
    marginTop: 32,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  dashboardButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutLink: {
    marginTop: 16,
  },
  logoutLinkText: {
    color: '#64748B',
    fontSize: 14,
  },

  // Header
  header: {
    backgroundColor: '#0F172A',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  logoCircleLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#3B82F6',
  },
  logoIconLarge: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 4,
    marginBottom: 4,
  },
  brandSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },

  // Login Card
  loginCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 28,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    paddingVertical: 0,
  },
  loginButton: {
    backgroundColor: '#1E40AF',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonLoading: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Footer
  footer: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 40,
    alignItems: 'center',
  },
  standardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  standardChip: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  standardText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footerText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 2,
  },
  footerCollab: {
    fontSize: 11,
    color: '#475569',
  },
});
