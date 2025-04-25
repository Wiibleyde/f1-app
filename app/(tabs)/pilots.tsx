import { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';

import Box from '@/theme/Box';
import Text from '@/theme/Text';
import { useFetchDrivers } from '@/query/hook';
import { DriverItem } from '@/components/drivers/DriverItem';

export default function HomeScreen() {
  const { data, isLoading, refetch, isRefetching } = useFetchDrivers();

  return (
    <Box style={styles.container}>
      <Text variant="title" textAlign="center" style={styles.title}>
        Pilotes F1
      </Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#ee0000" />
      ) : (
        <FlatList
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={'#ee0000'} />}
          //Get the 20 first drivers ordered by driver_number
          data={data?.slice(0, 20).sort((a, b) => a.driver_number - b.driver_number)}
          renderItem={({ item }) => <DriverItem item={item} />}
          keyExtractor={(item) => item.broadcast_name}
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
