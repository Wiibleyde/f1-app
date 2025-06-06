import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export function DriverDetailSkeleton() {
    const opacity = useSharedValue(0.4);

    useEffect(() => {
        opacity.value = withRepeat(withTiming(0.9, { duration: 800 }), -1, true);
    }, [opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            {/* Titre */}
            <View style={styles.skeletonTitle} />

            {/* Grid d'infos */}
            <View style={styles.statsGrid}>
                <View style={styles.skeletonCard} />
                <View style={styles.skeletonCard} />
                <View style={styles.skeletonCard} />
                <View style={styles.skeletonCard} />
            </View>

            {/* Couleur équipe */}
            <View style={styles.skeletonTeamColorCard}>
                <View style={styles.skeletonTeamColorTitle} />
                <View style={styles.colorRow}>
                    <View style={styles.colorSquare} />
                    <View style={styles.colorValue} />
                </View>
            </View>

            {/* Bouton dernier event */}
            <View style={styles.skeletonButton}>
                <View style={styles.skeletonButtonTitle} />
                <View style={styles.skeletonButtonText} />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    skeletonTitle: {
        width: "100%",
        height: 160,
        borderRadius: 20,
        backgroundColor: '#232323',
        marginTop: 20,
        marginBottom: 18,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    skeletonCard: {
        width: '48%',
        height: 52,
        backgroundColor: '#232323',
        borderRadius: 15,
        marginBottom: 15,
    },
    skeletonTeamColorCard: {
        backgroundColor: '#232323',
        borderRadius: 15,
        padding: 15,
        marginBottom: 30,
    },
    skeletonTeamColorTitle: {
        width: 80,
        height: 16,
        borderRadius: 4,
        backgroundColor: '#1a1918',
        marginBottom: 12,
    },
    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    colorSquare: {
        width: 20,
        height: 20,
        borderRadius: 5,
        backgroundColor: '#1a1918',
        marginRight: 10,
    },
    colorValue: {
        width: 70,
        height: 16,
        borderRadius: 4,
        backgroundColor: '#1a1918',
    },
    skeletonButton: {
        borderRadius: 12,
        padding: 15,
        backgroundColor: '#232323',
        marginBottom: 10,
    },
    skeletonButtonTitle: {
        width: 90,
        height: 16,
        borderRadius: 4,
        backgroundColor: '#1a1918',
        marginBottom: 8,
    },
    skeletonButtonText: {
        width: 180,
        height: 14,
        borderRadius: 4,
        backgroundColor: '#1a1918',
    },
});
