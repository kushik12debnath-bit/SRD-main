import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert,
  Platform, Image, ActivityIndicator, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout, token } = useAuth();
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [qualifications, setQualifications] = useState('');
  const [certifications, setCertifications] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [isEditingQualifications, setIsEditingQualifications] = useState(false);
  const [savingQualifications, setSavingQualifications] = useState(false);

  useEffect(() => { fetchProfilePicture(); }, []);

  const fetchProfilePicture = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.profile_picture) setProfilePicture(response.data.profile_picture);
      setQualifications(response.data.qualifications || '');
      setCertifications(response.data.certifications || '');
      setYearsExperience(response.data.years_experience || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { alert('Camera roll permissions needed'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 0.7 });
    if (!result.canceled && result.assets[0]) {
      setUploading(true);
      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = async () => { await uploadProfilePicture(reader.result as string); };
      reader.readAsDataURL(blob);
    }
  };

  const uploadProfilePicture = async (base64Image: string) => {
    try {
      const response = await axios.put(`${API_URL}/api/auth/profile-picture`, { profile_picture: base64Image }, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.profile_picture) { setProfilePicture(response.data.profile_picture); alert('Profile picture updated!'); }
    } catch (error) { alert('Failed to upload picture'); } finally { setUploading(false); }
  };

  const deleteProfilePicture = async () => {
    if (!window.confirm('Delete your profile picture?')) return;
    try {
      setUploading(true);
      await axios.put(`${API_URL}/api/auth/profile-picture`, { profile_picture: null }, { headers: { Authorization: `Bearer ${token}` } });
      setProfilePicture(null);
    } catch (error) { alert('Failed to delete picture'); } finally { setUploading(false); }
  };

  const handleSaveQualifications = async () => {
    try {
      setSavingQualifications(true);
      await axios.put(`${API_URL}/api/auth/qualifications`, { qualifications, certifications, years_of_experience: yearsExperience }, { headers: { Authorization: `Bearer ${token}` } });
      setIsEditingQualifications(false);
      await fetchProfilePicture();
      alert('Qualifications updated!');
    } catch (error) { alert('Failed to update'); } finally { setSavingQualifications(false); }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) { logout(); }
  };

  const getInitials = () => {
    const name = user?.full_name || user?.username || '';
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarLarge}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.avatarImage} resizeMode="cover" />
            ) : (
              <Text style={styles.avatarInitials}>{getInitials()}</Text>
            )}
            {uploading && <View style={styles.uploadOverlay}><ActivityIndicator size="small" color="#FFF" /></View>}
          </View>
          <View style={styles.avatarActions}>
            <TouchableOpacity style={styles.avatarBtn} onPress={pickImage} disabled={uploading}>
              <Ionicons name="camera" size={16} color="#3B82F6" />
              <Text style={styles.avatarBtnText}>Photo</Text>
            </TouchableOpacity>
            {profilePicture && (
              <TouchableOpacity style={[styles.avatarBtn, styles.deleteBtn]} onPress={deleteProfilePicture} disabled={uploading}>
                <Ionicons name="trash-outline" size={16} color="#EF4444" />
                <Text style={[styles.avatarBtnText, { color: '#EF4444' }]}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={styles.profileName}>{user?.full_name || user?.username}</Text>
        <Text style={styles.profileUsername}>@{user?.username}</Text>
        {user?.is_admin && (
          <View style={styles.adminChip}>
            <Ionicons name="shield-checkmark" size={12} color="#FCD34D" />
            <Text style={styles.adminChipText}>Administrator</Text>
          </View>
        )}
      </View>

      {/* Qualifications */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Qualifications</Text>
          {!isEditingQualifications ? (
            <TouchableOpacity onPress={() => setIsEditingQualifications(true)} style={styles.editBtn}>
              <Ionicons name="create-outline" size={18} color="#3B82F6" />
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActions}>
              <TouchableOpacity onPress={handleSaveQualifications} disabled={savingQualifications} style={styles.saveBtn}>
                {savingQualifications ? <ActivityIndicator size="small" color="#059669" /> : <Ionicons name="checkmark-circle" size={24} color="#059669" />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setIsEditingQualifications(false); fetchProfilePicture(); }} style={styles.cancelBtn}>
                <Ionicons name="close-circle" size={24} color="#EF4444" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.card}>
          <InfoRow icon="🎓" label="Qualifications" value={qualifications} editing={isEditingQualifications} onChangeText={setQualifications} />
          <InfoRow icon="📜" label="Certifications" value={certifications} editing={isEditingQualifications} onChangeText={setCertifications} />
          <InfoRow icon="⏱️" label="Experience" value={yearsExperience ? `${yearsExperience} years` : ''} editing={isEditingQualifications} onChangeText={setYearsExperience} numeric />
        </View>
      </View>

      {/* Standards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Supported Standards</Text>
        <View style={styles.card}>
          {['ISO 45001:2018 — Occupational Health & Safety', 'ISO 9001:2015 — Quality Management', 'ISO 14001:2015 — Environmental Management', 'FSSC 22000 V6.0 — Food Safety'].map((s, i) => (
            <View key={i} style={styles.standardRow}>
              <Text style={styles.standardIcon}>{['🛡️', '⭐', '🌿', '🍎'][i]}</Text>
              <Text style={styles.standardName}>{s}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
        <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>GO AUDIT v1.0.0</Text>
        <Text style={styles.footerSub}>By Saila Ruidas × Emergent Lab</Text>
      </View>
    </ScrollView>
  );
}

function InfoRow({ icon, label, value, editing, onChangeText, numeric }: any) {
  return (
    <View style={infoStyles.row}>
      <Text style={infoStyles.icon}>{icon}</Text>
      <View style={infoStyles.textContainer}>
        <Text style={infoStyles.label}>{label}</Text>
        {editing ? (
          <TextInput style={infoStyles.input} placeholder={`Enter ${label.toLowerCase()}`} placeholderTextColor="#94A3B8" value={value} onChangeText={onChangeText} keyboardType={numeric ? 'numeric' : 'default'} />
        ) : (
          <Text style={infoStyles.value}>{value || 'Not specified'}</Text>
        )}
      </View>
    </View>
  );
}

const infoStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  icon: { fontSize: 20, marginRight: 12, width: 28 },
  textContainer: { flex: 1 },
  label: { fontSize: 12, color: '#94A3B8', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '600' },
  value: { fontSize: 15, color: '#0F172A', fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, padding: 10, fontSize: 14, color: '#0F172A', backgroundColor: '#F8FAFC', marginTop: 4 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#0F172A', alignItems: 'center', paddingVertical: 32, paddingHorizontal: 24 },
  avatarSection: { alignItems: 'center', marginBottom: 16 },
  avatarLarge: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#1E40AF', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#3B82F6', overflow: 'hidden', marginBottom: 12 },
  avatarImage: { width: '100%', height: '100%' },
  avatarInitials: { fontSize: 36, fontWeight: '700', color: '#FFFFFF' },
  uploadOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  avatarActions: { flexDirection: 'row', gap: 10 },
  avatarBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, gap: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  avatarBtnText: { fontSize: 12, fontWeight: '600', color: '#93C5FD' },
  deleteBtn: { borderColor: 'rgba(239,68,68,0.3)' },
  profileName: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  profileUsername: { fontSize: 14, color: '#94A3B8', marginBottom: 10 },
  adminChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(252,211,77,0.15)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 16, gap: 4 },
  adminChipText: { fontSize: 12, fontWeight: '600', color: '#FCD34D' },

  section: { padding: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  editBtnText: { fontSize: 14, fontWeight: '600', color: '#3B82F6' },
  editActions: { flexDirection: 'row', gap: 8 },
  saveBtn: { padding: 2 },
  cancelBtn: { padding: 2 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },

  standardRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  standardIcon: { fontSize: 20, marginRight: 12 },
  standardName: { fontSize: 14, color: '#0F172A', fontWeight: '500', flex: 1 },

  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', marginHorizontal: 16, marginTop: 8, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#FEE2E2', gap: 8 },
  logoutText: { fontSize: 16, fontWeight: '600', color: '#EF4444' },

  footer: { alignItems: 'center', paddingVertical: 24 },
  footerText: { fontSize: 12, color: '#94A3B8', fontWeight: '600' },
  footerSub: { fontSize: 11, color: '#CBD5E1', marginTop: 2 },
});
