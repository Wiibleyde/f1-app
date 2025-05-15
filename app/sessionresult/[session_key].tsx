import { DriverItem } from '@/components/drivers/DriverItem';
import Header from '@/components/ui/Header';
import Layout from '@/components/ui/Layout';
import { Driver, useFetchDrivers, useFetchPositionBySessionKey, useFetchRadioBySessionKey } from '@/query/hook';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RadioPlayer } from '@/components/radio/RadioPlayer';

const SessionScreen = () => {
    const { session_key } = useLocalSearchParams<{ session_key: string }>();
    const { data: positions, isLoading, isRefetching, refetch } = useFetchPositionBySessionKey(session_key);
    const { data: drivers, isLoading: isDriverLoading } = useFetchDrivers();
    const { data: radioData, isLoading: isRadioLoading, refetch: refetchRadio } = useFetchRadioBySessionKey(session_key);

    const [activeSection, setActiveSection] = useState<'classement' | 'radio'>('classement');

    const classement: Driver[] = (positions ?? []).map((pos) => {
        const driver = drivers?.find((d) => d.driver_number === pos.driver_number);
        return { ...driver, ...pos } as Driver;
    });

    const renderContent = () => {
        if (activeSection === 'classement') {
            if (isLoading || isDriverLoading || !positions || !drivers) {
                return <ActivityIndicator size="large" color="#ee0000" />;
            }

            return (
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
                                refetchRadio();
                            }}
                            tintColor={'#ee0000'}
                        />
                    }
                />
            );
        } else {
            if (isRadioLoading) {
                return <ActivityIndicator size="large" color="#ee0000" />;
            }

            if (radioData && radioData.length > 0) {
                return (
                    <FlatList
                        data={radioData}
                        renderItem={({ item }) => (
                            <RadioPlayer radioData={item} />
                        )}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={() => {
                                    refetchRadio();
                                }}
                                tintColor={'#ee0000'}
                            />
                        }
                    />
                );
            }

            return (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>Aucun extrait radio disponible</Text>
                </View>
            );
        }
    };

    return (
        <Layout>
            <Stack.Screen options={{ headerShown: false }} />
            <Header title="Session" backButton />

            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tabButton, activeSection === 'classement' && styles.activeTabButton]} 
                    onPress={() => setActiveSection('classement')}
                >
                    <Text style={[styles.tabText, activeSection === 'classement' && styles.activeTabText]}>Classement</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tabButton, activeSection === 'radio' && styles.activeTabButton]} 
                    onPress={() => setActiveSection('radio')}
                >
                    <Text style={[styles.tabText, activeSection === 'radio' && styles.activeTabText]}>Radio</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                {renderContent()}
            </View>
        </Layout>
    );
};

export default SessionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTabButton: {
        borderBottomWidth: 2,
        borderBottomColor: '#ee0000',
    },
    tabText: {
        fontSize: 16,
        color: '#333',
    },
    activeTabText: {
        fontWeight: 'bold',
        color: '#ee0000',
    },
    listContainer: {
        gap: 6,
        paddingBottom: 20,
        paddingTop: 10,
    },
    noDataContainer: {
        padding: 20,
        alignItems: 'center',
    },
    noDataText: {
        color: '#777',
    }
});
