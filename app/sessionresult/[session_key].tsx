import { DriverItem } from '@/components/drivers/DriverItem';
import Header from '@/components/ui/Header';
import Layout from '@/components/ui/Layout';
import { Driver, useFetchDrivers, useFetchPositionBySessionKey } from '@/query/hook';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native';

const SessionScreen = () => {
    const { session_key } = useLocalSearchParams<{ session_key: string }>();
    const { data: positions, isLoading, isRefetching, refetch } = useFetchPositionBySessionKey(session_key);

    const { data: drivers, isLoading: isDriverLoading } = useFetchDrivers();

    const classement: Driver[] = (positions ?? []).map((pos) => {
        const driver = drivers?.find((d) => d.driver_number === pos.driver_number);
        // Provide default values for required fields to satisfy Driver type
        return { ...driver, ...pos } as Driver;
    });

    return (
        <Layout>
            <Stack.Screen options={{ headerShown: false }} />
            <Header title="Session" backButton />
            {isLoading || isDriverLoading || !positions || !drivers ? (
                <ActivityIndicator size="large" color="#ee0000" />
            ) : (
                <FlatList
                    data={classement}
                    renderItem={({ item }) => <DriverItem item={item} />}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefetching}
                            onRefresh={() => {
                                refetch();
                            }}
                            tintColor={'#ee0000'}
                        />
                    }
                />
            )}
        </Layout>
    );
};

export default SessionScreen;

const styles = StyleSheet.create({
    listContainer: {
        gap: 6,
        paddingBottom: 70,
    },
});
