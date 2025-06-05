import DriverItem from '@/components/drivers/DriverItem';
import NoDataFound from '@/components/NoDataFound';
import { DriverSkeleton } from '@/components/skeleton/DriverSkeleton';
import Header from '@/components/ui/Header';
import useFlatList from '@/hooks/useFlatList';
import { useFetchDrivers } from '@/query/hook';
import Box from '@/theme/Box';
import { FlatList, RefreshControl, StyleSheet, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export default function HomeScreen() {
    const { data, isLoading, refetch, isRefetching } = useFetchDrivers();

    const emptyDriver = () => {
        if (isLoading) {
            return <DriverSkeleton />;
        } else {
            return <NoDataFound entityName="drivers" />;
        }
    };

    const { onViewableItemsChanged, viewableItems } = useFlatList();

    return (
        <Box style={styles.container}>
            <FlatList
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={'#ee0000'} />}
                data={data?.slice(0, 20).sort((a, b) => a.driver_number - b.driver_number)}
                keyExtractor={(item) => item.broadcast_name}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Header title="F1 Drivers" backButton={false} />}
                windowSize={8}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                ListEmptyComponent={emptyDriver}
                onViewableItemsChanged={onViewableItemsChanged}
                renderItem={({ item }) => <DriverItem item={item} key={item.full_name} viewableItems={viewableItems} />}
            />
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
        gap: 8,
        paddingBottom: 90,
    },
    emptyText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
