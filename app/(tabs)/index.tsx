import NoDataFound from '@/components/NoDataFound';
import RenderRace from '@/components/RenderRace';
import RaceSkeleton from '@/components/skeleton/RaceSkeleton';
import Header from '@/components/ui/Header';
import Layout from '@/components/ui/Layout';
import { useFetchRacesFromYear } from '@/query/hook';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

export default function HomeScreen() {
    const currentYear = new Date().getFullYear();

    const { data, isLoading, refetch, isRefetching } = useFetchRacesFromYear(currentYear);

    const renderEmptyRace = () => {
        if (isLoading) {
            return <RaceSkeleton />;
        } else {
            return (
                <NoDataFound entityName="races" />
            );
        }
    }

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
                    />
                }
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Header title={`Races ${currentYear}`} />}
                windowSize={1}
                initialNumToRender={6}
                maxToRenderPerBatch={6}
                ListEmptyComponent={renderEmptyRace}
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
