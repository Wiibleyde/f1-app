import useFlatList from '@/hooks/useFlatList';
import { useFetchDriversBySessionKey, useFetchPositionBySessionKey } from '@/query/hook';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import DriverItem from '../renders/RenderDriver';
import { DriverSkeleton } from '../skeleton/DriverSkeleton';
import NoDataFound from '../ui/NoDataFound';
import { Driver } from '@/types';

interface Props {
    session_key: string;
}

const Leaderboard = ({ session_key }: Props) => {
    const { data: positions, isRefetching, refetch } = useFetchPositionBySessionKey(session_key);
    const { data: drivers, isLoading: isDriverLoading } = useFetchDriversBySessionKey(session_key);
    const { onViewableItemsChanged, viewableItems } = useFlatList();

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
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={'#ee0000'} />}
            windowSize={8}
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            ListEmptyComponent={renderEmptyLeaderboard}
            onViewableItemsChanged={onViewableItemsChanged}
            renderItem={({ item, index }) => (
                <DriverItem item={item} position={index + 1} viewableItems={viewableItems} />
            )}
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
