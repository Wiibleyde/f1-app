import { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useFetchRacesFromYear } from '@/query/hook';
import RenderRace from '@/components/RenderRace';
import Layout from '@/components/ui/Layout';
import Header from '@/components/ui/Header';

export default function HomeScreen() {
    const currentYear = new Date().getFullYear();

    const { data, isLoading, refetch, isRefetching } = useFetchRacesFromYear(currentYear);

    return (
        <Layout>
            <Header title={`Races ${currentYear}`} />

            {isLoading ? (
                <ActivityIndicator size="large" color="#ee0000" />
            ) : (
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={'#ee0000'} />
                    }
                    data={data}
                    renderItem={({ item, index }) => <RenderRace item={item} index={index} />}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
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
