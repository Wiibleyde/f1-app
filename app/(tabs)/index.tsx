import { StyleSheet, FlatList, ActivityIndicator, Pressable, TouchableOpacity } from 'react-native';

import Box from '@/theme/Box';
import Text from '@/theme/Text';
import { useEffect, useState } from 'react';

const url = 'https://api.openf1.org/v1/meetings?year='

// Type pour les courses
interface Race {
  circuit_key: string;
  circuit_short_name: string;
  country_code: string;
  country_key: string;
  country_name: string;
  date_start: string;
  gmt_offset: string;
  location: string;
  meeting_key: string;
  meeting_name: string;
  meeting_official_name: string;
  year: number;
}

export default function HomeScreen() {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear();
  const urlWithYear = `${url}${currentYear}`;

  const fetchRaces = async () => {
    try {
      setLoading(true);
      const response = await fetch(urlWithYear);
      const data: any[] = (await response.json());
      setRaces(data.reverse());
    } catch (error) {
      console.error('Error fetching races:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRaces();
  }, []);

  const renderRaceItem = ({ item }: { item: Race }) => (
    <TouchableOpacity style={styles.raceItem}>
      <Box style={styles.raceContent}>
        <Text style={styles.raceName}>{item.meeting_name}</Text>
        <Text style={styles.raceLocation}>{item.location}, {item.country_code}</Text>
        <Text style={styles.raceDate}>{new Date(item.date_start).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}</Text>
        <Text style={styles.raceDate}>{new Date(item.date_start).toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        })}</Text>
      </Box>
    </TouchableOpacity>
  );

  return (
    <Box style={styles.container}>
      <Text variant="title" textAlign="center" style={styles.title}>
        Courses F1 2025
      </Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#FF1801" />
      ) : (
        <FlatList
          data={races}
          renderItem={renderRaceItem}
          keyExtractor={(item) => item.meeting_key.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Box style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Aucune course disponible</Text>
            </Box>
          }
        />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    paddingTop: 50,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  listContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  raceItem: {
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    marginVertical: 8,
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: '#FF1801',
  },
  raceContent: {
    padding: 16,
  },
  raceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  raceLocation: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 4,
  },
  raceDate: {
    fontSize: 14,
    color: '#999999',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
  }
});
