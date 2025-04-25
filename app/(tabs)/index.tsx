import { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';

import Box from '@/theme/Box';
import Text from '@/theme/Text';
import { useFetchRacesFromYear } from '@/query/hook';
import RenderRace from '@/components/RenderRace';

export default function HomeScreen() {
  const currentYear = new Date().getFullYear();

  const { data, isLoading, refetch, isRefetching } = useFetchRacesFromYear(currentYear);

  return (
    <Box style={styles.container}>
      <Text variant="title" textAlign="center" style={styles.title}>
        Courses F1 {currentYear}
      </Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#ee0000" />
      ) : (
        <FlatList
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={'#ee0000'} />}
          data={data}
          renderItem={({ item, index }) => <RenderRace item={item} index={index} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: '5%',
    backgroundColor: '#000000',
  },
  title: {
    alignSelf: 'flex-start',
    color: '#FFFFFF',
    marginBottom: 35,
    marginTop: 10,
  },
  listContainer: {
    gap: 16,
    paddingBottom: 70,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
