import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

export function RadioSkeleton() {
    const opacity = useSharedValue(0.4);

    useEffect(() => {
        opacity.value = withRepeat(
            withTiming(0.9, { duration: 800 }),
            -1,
            true
        );
    }, [opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[styles.radioItem, animatedStyle]}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonDate} />
            <View style={styles.skeletonSlider} />
            <View style={styles.skeletonTimeRow}>
                <View style={styles.skeletonTime} />
                <View style={styles.skeletonTime} />
            </View>
            <View style={styles.skeletonControls}>
                <View style={styles.skeletonButton} />
                <View style={styles.skeletonButton} />
                <View style={styles.skeletonButton} />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: '#232323',
        borderRadius: 4,
        marginRight: 8,
    },
    skeletonPosition: {
        width: 20,
        height: 16,
    },
    skeletonAcronym: {
        width: 32,
        height: 12,
    },
    skeletonNumber: {
        width: 24,
        height: 12,
        marginLeft: 0,
    },
    skeletonName: {
        width: 150,
        height: 16,
        marginLeft: 8,
    },
    skeletonTeam: {
        width: 130,
        height: 12,
        marginTop: 8,
        marginLeft: 0,
    },
    skeletonCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#232323',
        marginLeft: 'auto',
    },
    // --- Styles pour le skeleton RadioPlayer ---
    radioItem: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        backgroundColor: '#181a20',
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#23242a",
        marginTop: 10,
    },
    skeletonTitle: {
        width: '60%',
        height: 18,
        backgroundColor: '#232323',
        borderRadius: 4,
        alignSelf: 'center',
        marginBottom: 6,
    },
    skeletonDate: {
        width: '40%',
        height: 12,
        backgroundColor: '#232323',
        borderRadius: 4,
        alignSelf: 'center',
        marginBottom: 8,
    },
    skeletonSlider: {
        width: '100%',
        height: 8,
        backgroundColor: '#232323',
        borderRadius: 4,
        marginBottom: 6,
    },
    skeletonTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
        paddingHorizontal: 2,
    },
    skeletonTime: {
        width: 32,
        height: 10,
        backgroundColor: '#232323',
        borderRadius: 4,
    },
    skeletonControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 4,
    },
    skeletonButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#232323',
        marginHorizontal: 4,
    },
});