import { Driver, useFetchDrivers, useFetchPositionBySessionKey } from '@/query/hook';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, ViewToken } from 'react-native';
import NoDataFound from '../NoDataFound';
import { DriverSkeleton } from '../skeleton/DriverSkeleton';
import { useSharedValue } from 'react-native-reanimated';
import DriverItem from '../drivers/DriverItem';

interface Props {
    session_key: string;
}

const Leaderboard = ({ session_key }: Props) => {
    const viewableItems = useSharedValue<ViewToken[]>([]);
    const { data: positions, isRefetching, refetch } = useFetchPositionBySessionKey(session_key);
    const { data: drivers, isLoading: isDriverLoading } = useFetchDrivers();

    const classement: Driver[] = (positions ?? []).map((pos) => {
        const driver = drivers?.find((d) => d.driver_number === pos.driver_number);
        return { ...driver, ...pos } as Driver;
    });

    const renderEmptyLeaderboard = () => {
        if (isDriverLoading) {
            return <DriverSkeleton />;
        } else {
            return <NoDataFound entityName="leaderboard" />;
        }
    };

    return (
        <FlatList
            data={classement}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={isRefetching}
                    onRefresh={refetch}
                    tintColor={'#ee0000'}
                />
            }
            windowSize={1}
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            ListEmptyComponent={renderEmptyLeaderboard}
            onViewableItemsChanged={({ viewableItems: vItems }) => {
                viewableItems.value = vItems;
            }}
            renderItem={({ item, index }) => <DriverItem item={item} position={index + 1} viewableItems={viewableItems} />}
        />
    );
};

export default Leaderboard;

const styles = StyleSheet.create({
    listContainer: {
        gap: 6,
        paddingBottom: 20,
        paddingTop: 10,
    },
});
