import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useStorage } from '@/hooks/useStorage';
import OnBoardingScreen from '../onboarding';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Couleurs F1
const F1_RED = '#E10600';
const F1_RED_TRANSPARENT = 'rgba(225, 6, 0, 0.5)';

const TAB_ICONS: Record<string, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
    index: 'flag-checkered',
    drivers: 'racing-helmet',
    settings: 'cog',
    // showcar: 'car-convertible',
};

function TabBarIcon({ routeName, color, focused }: { routeName: string; color: string; focused: boolean }) {
    const iconName = TAB_ICONS[routeName] || 'home';
    const Icon = (
        <MaterialCommunityIcons size={28} name={iconName} color={color} />
    );

    if (focused) {
        return (
            <View style={{ alignItems: 'center', width: '100%' }}>
                <View style={styles.activeTabIndicator} />
                <LinearGradient
                    colors={[F1_RED_TRANSPARENT, 'transparent']}
                    style={styles.iconContainer}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                >
                    {Icon}
                </LinearGradient>
            </View>
        );
    }
    return (
        <View style={{ alignItems: 'center', width: '100%' }}>
            <View style={styles.iconContainer}>{Icon}</View>
        </View>
    );
}

import type { ViewStyle } from 'react-native';

const tabBarStyle: ViewStyle = {
    ...(Platform.OS === 'ios' ? { position: 'absolute' as ViewStyle['position'] } : {}),
    backgroundColor: '#000',
    height: 80,
    paddingBottom: 10,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
};

export default function TabLayout() {
    const { storageItem: isOnBoarding } = useStorage<boolean>('onboarding', true);

    if (isOnBoarding) {
        return <OnBoardingScreen />;
    }

    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarActiveTintColor: F1_RED,
                tabBarInactiveTintColor: '#888888',
                headerShown: false,
                tabBarStyle,
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon routeName={route.name} color={color} focused={focused} />
                ),
            })}
        >
            <Tabs.Screen name="index" options={{ title: 'Races' }} />
            <Tabs.Screen name="drivers" options={{ title: 'Drivers' }} />
            <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    activeTabIndicator: {
        position: 'absolute',
        top: -3,
        width: 60,
        height: 4,
        backgroundColor: F1_RED,
        borderRadius: 1.5,
    },
    iconContainer: {
        width: 60,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});