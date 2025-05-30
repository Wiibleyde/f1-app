import { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';

import Box from '@/theme/Box';
import Text from '@/theme/Text';
import { useFetchDrivers } from '@/query/hook';
import { DriverItem } from '@/components/drivers/DriverItem';
import Header from '@/components/ui/Header';

export default function HomeScreen() {
    const { data, isLoading, refetch, isRefetching } = useFetchDrivers();

    return (
        <Box style={styles.container}>
            <Header title="F1 Drivers" backButton={false} />

            {isLoading ? (
                <ActivityIndicator size="large" color="#ee0000" />
            ) : (
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={'#ee0000'} />
                    }
                    data={data?.slice(0, 20).sort((a, b) => a.driver_number - b.driver_number)}
                    renderItem={({ item }) => <DriverItem item={item} key={item.full_name} />}
                    keyExtractor={(item) => item.broadcast_name}
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
        gap: 8,
        paddingBottom: 70,
    },
    emptyText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
