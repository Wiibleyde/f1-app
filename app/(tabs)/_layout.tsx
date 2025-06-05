import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { HapticTab } from '@/components/HapticTab';
import OnBoardingScreen from '../onboarding';
import { useStorage } from '@/hooks/useStorage';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Couleurs F1
const F1_RED = '#E10600';
const F1_RED_TRANSPARENT = 'rgba(225, 6, 0, 0.5)';

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
                tabBarButton: HapticTab,
                tabBarStyle: {
                    ...Platform.select({
                        ios: {
                            position: 'absolute',
                        },
                        default: {},
                    }),
                    backgroundColor: '#000',
                    height: 80,
                    paddingBottom: 10,
                    borderTopWidth: 0, // Supprimé la bordure rouge du haut
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 10,
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold',
                    fontSize: 12,
                },
                tabBarItemStyle: {
                    position: 'relative',
                },
                tabBarIconStyle: {
                    marginTop: 3,
                },
                // Ajouter un indicateur personnalisé en fonction si l'onglet est actif
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'] = 'home';

                    if (route.name === 'index') {
                        iconName = 'flag-checkered';
                    } else if (route.name === 'drivers') {
                        iconName = 'racing-helmet';
                    } else if (route.name === 'settings') {
                        iconName = 'cog';
                    } 
                    // else if (route.name === 'showcar') {
                    //     iconName = 'car-convertible';
                    // }

                    return (
                        <View style={{ alignItems: 'center', width: '100%' }}>
                            {focused && <View style={styles.activeTabIndicator} />}
                            {focused ? (
                                <LinearGradient
                                    colors={[F1_RED_TRANSPARENT, 'transparent']}
                                    style={styles.iconContainer}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                >
                                    <MaterialCommunityIcons size={28} name={iconName} color={color} />
                                </LinearGradient>
                            ) : (
                                <View style={styles.iconContainer}>
                                    <MaterialCommunityIcons size={28} name={iconName} color={color} />
                                </View>
                            )}
                        </View>
                    );
                },
            })}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Races',
                }}
            />
            <Tabs.Screen
                name="drivers"
                options={{
                    title: 'Drivers',
                }}
            />
            {/* <Tabs.Screen
                name="showcar"
                options={{
                    title: 'Show Car',
                }}
            /> */}
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                }}
            />
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
