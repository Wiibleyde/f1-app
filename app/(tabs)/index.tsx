import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useFetchRacesFromYear } from '@/query/hook';
import RenderRace from '@/components/RenderRace';
import Layout from '@/components/ui/Layout';
import Header from '@/components/ui/Header';
import NoDataFound from '@/components/NoDataFound';

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
                renderItem={(
                    { item }) =>
                    <RenderRace
                        item={item}
                        index={item.meeting_key}
                        isLoading={isLoading}
                    />
                }
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Header title={`Races ${currentYear}`} />}
                windowSize={1}
                initialNumToRender={6}
                maxToRenderPerBatch={6}
                ListEmptyComponent={
                    <NoDataFound
                        entiyName='races'
                    />
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
