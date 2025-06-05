import NoDataFound from '@/components/NoDataFound';
import RenderRace from '@/components/RenderRace';
import RaceSkeleton from '@/components/skeleton/RaceSkeleton';
import Header from '@/components/ui/Header';
import Layout from '@/components/ui/Layout';
import useFlatList from '@/hooks/useFlatList';
import { useFetchRacesFromYear } from '@/query/hook';
import { FlatList, RefreshControl, StyleSheet, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export default function HomeScreen() {
    const currentYear = new Date().getFullYear();

    const { data, isLoading, refetch, isRefetching } = useFetchRacesFromYear(currentYear);

    const {onViewableItemsChanged, viewableItems} = useFlatList();

    const renderEmptyRace = () => {
        if (isLoading) {
            return <RaceSkeleton />;
        } else {
            return <NoDataFound entityName="races" />;
        }
    };

    
    return (
        <Layout>
            <FlatList
                data={data}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={'#ee0000'} />}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Header title={`Races ${currentYear}`} />}
                windowSize={1}
                initialNumToRender={6}
                maxToRenderPerBatch={6}
                ListEmptyComponent={renderEmptyRace}
                onViewableItemsChanged={onViewableItemsChanged}
                renderItem={({ item }) => <RenderRace item={item} index={item.meeting_key} viewableItems={viewableItems} />}
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
        paddingBottom: 90,
    },
    emptyText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
