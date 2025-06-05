import Box from '@/theme/Box';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const SessionSkeleton = () => {
    // Animation de l'opacité en boucle
    const opacity = useSharedValue(0.5);

    useEffect(() => {
        opacity.value = withRepeat(
            withTiming(1, {
                duration: 800,
                easing: Easing.inOut(Easing.ease),
            }),
            -1, // boucle infinie
            true // effet aller-retour
        );
    }, [opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Box style={styles.container}>
            <View style={styles.raceInfosContainer}>
                <View style={styles.raceInfosDateContainer}>
                    <Animated.View style={[styles.skeletonText, styles.raceDate, animatedStyle]} />
                </View>
                <View style={[styles.raceInfosMonthContainer,  { width: 45, height: 16 }, animatedStyle]}>
                </View>
            </View>

            <View style={styles.raceTrackerInfosContainer}>
                <Animated.View style={[styles.skeletonText, styles.raceInfosText, { width: 130 }, animatedStyle]} />
                <Animated.View style={[styles.skeletonText, styles.raceInfosCountry, { width: 90 }, animatedStyle]} />
                <Animated.View style={[styles.skeletonText, styles.raceInfosCountry, { width: 90 }, animatedStyle]} />
                <Animated.View style={[styles.skeletonText, styles.raceName, { width: 180 }, animatedStyle]} />
            </View>
        </Box>
    )
}

export default SessionSkeleton

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 135,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1a1918',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    raceInfosContainer: {
        width: '15%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    raceInfosDateContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
    },
    raceInfosMonthContainer: {
        backgroundColor: '#232323',
        borderRadius: 8,
        paddingHorizontal: 7,
        paddingVertical: 4,
        marginTop: 4,
        alignSelf: 'flex-start',
        flexShrink: 0,
    },
    raceTrackerInfosContainer: {
        width: '71%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 6,
    },
    raceName: {
        height: 20,
        borderRadius: 6,
        backgroundColor: '#232323',
        marginTop: 1,
    },
    raceDate: {
        height: 16,
        width: 18,
        borderRadius: 4,
        backgroundColor: '#232323',
        marginHorizontal: 2,
    },
    raceInfosText: {
        height: 14,
        borderRadius: 4,
        backgroundColor: '#232323',
        marginBottom: 3,
    },
    raceInfosCountry: {
        height: 16,
        borderRadius: 4,
        backgroundColor: '#232323',
        marginBottom: 3,
    },
    skeletonText: {
        backgroundColor: '#232323',
    },
});