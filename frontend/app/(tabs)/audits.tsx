import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth, API_URL } from '../../context/AuthContext';

interface Audit {
  id: string;
  title: string;
  questionnaire_name: string;
  status: string;
  created_at: string;
  updated_at: string;
  auditor?: string;
  auditor_name?: string;
}

export default function AuditsScreen() {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { token, user } = useAuth();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (token) fetchAudits();
    }, [token])
  );

  const fetchAudits = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/audits`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAudits(response.data.audits);
    } catch (error) {
      console.error('Error fetching audits:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAudits();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#059669';
      case 'in-progress': return '#D97706';
      default: return '#64748B';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return '#ECFDF5';
      case 'in-progress': return '#FFFBEB';
      default: return '#F1F5F9';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      default: return 'Draft';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const draftCount = audits.filter(a => a.status === 'draft').length;
  const inProgressCount = audits.filter(a => a.status === 'in-progress').length;
  const completedCount = audits.filter(a => a.status === 'completed').length;

  const renderAuditItem = ({ item }: { item: Audit }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/audit/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.cardLeft}>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusBg(item.status) }]}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {getStatusLabel(item.status)}
            </Text>
          </View>
        </View>
        <Text style={styles.cardSubtitle} numberOfLines={1}>{item.questionnaire_name}</Text>
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={12} color="#94A3B8" />
            <Text style={styles.metaText}>{formatDate(item.created_at)}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1E40AF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Welcome Header */}
      <View style={styles.welcomeHeader}>
        <Text style={styles.welcomeText}>Hello, {user?.full_name || user?.username} 👋</Text>
        <Text style={styles.welcomeSub}>{audits.length} total audits</Text>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { borderLeftColor: '#64748B' }]}>
          <Text style={styles.statNumber}>{draftCount}</Text>
          <Text style={styles.statLabel}>Draft</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#D97706' }]}>
          <Text style={styles.statNumber}>{inProgressCount}</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#059669' }]}>
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      {/* Audit List */}
      {audits.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="clipboard-outline" size={48} color="#CBD5E1" />
          </View>
          <Text style={styles.emptyTitle}>No Audits Yet</Text>
          <Text style={styles.emptyText}>
            Create your first audit to get started with ISO compliance tracking
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => router.push('/new-audit')}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle" size={20} color="#FFFFFF" />
            <Text style={styles.emptyButtonText}>Create Audit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Recent Audits</Text>
          </View>
          <FlatList
            data={audits}
            renderItem={renderAuditItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1E40AF" />}
          />
        </>
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/new-audit')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={26} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },

  // Welcome
  welcomeHeader: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 4,
  },
  welcomeText: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  welcomeSub: { fontSize: 14, color: '#94A3B8' },

  // Stats
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: { fontSize: 24, fontWeight: '800', color: '#0F172A' },
  statLabel: { fontSize: 11, fontWeight: '600', color: '#64748B', marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 },

  // List
  listHeader: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  listTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  listContent: { padding: 16, paddingTop: 4 },

  // Card
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLeft: { width: 4 },
  statusIndicator: { flex: 1 },
  cardBody: { flex: 1, padding: 14 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', flex: 1, marginRight: 8 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, gap: 4,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '600' },
  cardSubtitle: { fontSize: 13, color: '#64748B', marginBottom: 10 },
  cardMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: '#94A3B8' },

  // Empty
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  emptyIconContainer: {
    width: 88, height: 88, borderRadius: 44, backgroundColor: '#F1F5F9',
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
  },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#64748B', textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  emptyButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E40AF',
    paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, gap: 8,
  },
  emptyButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },

  // FAB
  fab: {
    position: 'absolute', right: 20, bottom: 20,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#1E40AF',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#1E40AF', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 8, elevation: 8,
  },
});
