import Header from '@/components/ui/Header';
import Layout from '@/components/ui/Layout';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Leaderboard from '@/components/session/Leaderboard';
import Radios from '@/components/session/Radios';

const SessionScreen = () => {
    const { session_key } = useLocalSearchParams<{ session_key: string }>();
    const [activeSection, setActiveSection] = useState<'classement' | 'radio'>('classement');

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
                {activeSection === 'classement' ? (
                    <Leaderboard session_key={session_key as string} />
                ) : (
                    <Radios session_key={session_key as string} />
                )}
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
    noDataContainer: {
        padding: 20,
        alignItems: 'center',
    },
    noDataText: {
        color: '#777',
    }
});
