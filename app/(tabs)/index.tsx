import { StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';

import Box from '@/theme/Box';
import Text from '@/theme/Text';
import { Race, useFetchRacesFromYear } from '@/query/hook';

export default function HomeScreen() {

  const currentYear = new Date().getFullYear();

  const { data, isLoading, refetch, isRefetching } = useFetchRacesFromYear(currentYear)

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

      {isLoading ? (
        <ActivityIndicator size="large" color="#ee0000" />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={"#ee0000"} />
          }
          data={data}
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
