import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  RefreshControl, ActivityIndicator, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth, API_URL } from '../../context/AuthContext';

interface Questionnaire {
  id: string;
  name: string;
  description: string;
  is_default: boolean;
  created_at: string;
  clauses?: any[];
}

const standardIcons: Record<string, { icon: string; color: string; bg: string }> = {
  'ISO 45001': { icon: '🛡️', color: '#DC2626', bg: '#FEF2F2' },
  'ISO 9001': { icon: '⭐', color: '#2563EB', bg: '#EFF6FF' },
  'ISO 14001': { icon: '🌿', color: '#059669', bg: '#ECFDF5' },
  'FSSC 22000': { icon: '🍎', color: '#D97706', bg: '#FFFBEB' },
};

function getStandardInfo(name: string) {
  for (const [key, value] of Object.entries(standardIcons)) {
    if (name.includes(key)) return value;
  }
  return { icon: '📋', color: '#64748B', bg: '#F1F5F9' };
}

export default function QuestionnairesScreen() {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => { fetchQuestionnaires(); }, []);

  const fetchQuestionnaires = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/questionnaires`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestionnaires(response.data.questionnaires);
    } catch (error) {
      console.error('Error fetching questionnaires:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchQuestionnaires();
  }, []);

  const renderQuestionnaireItem = ({ item }: { item: Questionnaire }) => {
    const info = getStandardInfo(item.name);
    const clauseCount = item.clauses?.length || 0;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/questionnaire/${item.id}`)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: info.bg }]}>
          <Text style={styles.iconEmoji}>{info.icon}</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
            {item.is_default && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>✓ Official</Text>
              </View>
            )}
          </View>
          {item.description && (
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          )}
          <View style={styles.footer}>
            <View style={styles.clauseInfo}>
              <Ionicons name="list-outline" size={14} color="#94A3B8" />
              <Text style={styles.clauseText}>{clauseCount} clauses</Text>
            </View>
            <View style={styles.arrowContainer}>
              <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1E40AF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>ISO Standards</Text>
        <Text style={styles.headerSub}>Select a standard to view its audit questionnaire</Text>
      </View>

      {questionnaires.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="document-text-outline" size={48} color="#CBD5E1" />
          </View>
          <Text style={styles.emptyTitle}>No Standards Available</Text>
          <Text style={styles.emptyText}>Standards will appear here once configured</Text>
        </View>
      ) : (
        <FlatList
          data={questionnaires}
          renderItem={renderQuestionnaireItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1E40AF" />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },

  headerSection: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 4,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  headerSub: { fontSize: 14, color: '#94A3B8' },

  listContent: { padding: 16 },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 52, height: 52, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  iconEmoji: { fontSize: 24 },
  cardContent: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  title: { flex: 1, fontSize: 16, fontWeight: '700', color: '#0F172A', marginRight: 8 },
  defaultBadge: {
    backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
  },
  defaultText: { fontSize: 10, fontWeight: '600', color: '#059669' },
  description: { fontSize: 13, color: '#64748B', marginBottom: 10, lineHeight: 18 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  clauseInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  clauseText: { fontSize: 12, color: '#94A3B8' },
  arrowContainer: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  emptyIconContainer: {
    width: 88, height: 88, borderRadius: 44, backgroundColor: '#F1F5F9',
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
  },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#64748B', textAlign: 'center' },
});
