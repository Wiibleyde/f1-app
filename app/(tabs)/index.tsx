import { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useFetchRacesFromYear } from '@/query/hook';
import RenderRace from '@/components/RenderRace';
import Layout from '@/components/ui/Layout';
import Header from '@/components/ui/Header';
import Box from '@/theme/Box';
import Text from '@/theme/Text';
import RaceSkeleton from '@/components/skeleton/RaceSkeleton';

export default function HomeScreen() {
    const currentYear = new Date().getFullYear();

    const { data, isLoading, refetch, isRefetching } = useFetchRacesFromYear(currentYear);

    return (
        <Layout>

            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={refetch}
                        tintColor={'#ee0000'}
                    />
                }
                data={data}
                renderItem={({ item }) => <RenderRace item={item} index={item.meeting_key} isLoading={isLoading} />}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Header title={`Races ${currentYear}`} />}
                windowSize={1}
                initialNumToRender={6}
                maxToRenderPerBatch={6}
                ListEmptyComponent={
                    <Box>
                        <Text>
                            No drivers found.
                            {'\n'}Please check your internet connection or try again later.
                        </Text>
                    </Box>
                }
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
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
