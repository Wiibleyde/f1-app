import Text from '@/theme/Text';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const ResetButton = () => {
    const handleResetDataDebug = () => {
        AsyncStorage.clear()
        router.replace('/onboarding');
    };

    return (
        <TouchableOpacity style={styles.resetButton} onPress={handleResetDataDebug}>
            <Ionicons name="refresh-circle" size={20} color="#fff" />
            <Text style={styles.resetButtonText}>Reset data</Text>
        </TouchableOpacity>
    );
};

export default ResetButton;

const styles = StyleSheet.create({
    resetButton: {
        backgroundColor: '#FF1801',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
    },
    resetButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});
