import Header from '@/components/ui/Header';
import Layout from '@/components/ui/Layout';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Leaderboard from '@/components/session/Leaderboard';
import Radios from '@/components/session/Radios';
import Button from '@/components/ui/Button';

const SessionScreen = () => {
    const { session_key } = useLocalSearchParams<{ session_key: string }>();

    // Pas de top tab car ça rentre en conflit avec le router expo-router
    const [activeSection, setActiveSection] = useState<'classement' | 'radio'>('classement');

    return (
        <Layout>
            <Stack.Screen options={{ headerShown: false }} />
            <Header title="Session" backButton />

            <View style={styles.tabContainer}>
                <Button
                    variant={activeSection === 'classement' ? 'active' : 'inactive'}
                    onPress={() => setActiveSection('classement')}
                >
                    Classement
                </Button>
                <Button
                    variant={activeSection === 'radio' ? 'active' : 'inactive'}
                    onPress={() => setActiveSection('radio')}
                >
                    Radios
                </Button>
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
        marginBottom: 5,
    },
});
