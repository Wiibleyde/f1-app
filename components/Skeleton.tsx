import { StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";
import { useEffect } from "react";

export function Skeleton({ width = '100%', height = 20, borderRadius = 4 }: { width?: number | `${number}%`; height?: number; borderRadius?: number }) {
    const opacity = useSharedValue(0.6);

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
        <Animated.View style={[styles.skeleton, { width, height, borderRadius }, animatedStyle]} />
    );
}

const styles = StyleSheet.create({
    skeleton: {
        width: '100%',
        height: 20,
        borderRadius: 4,
        backgroundColor: '#333',
    },
    skeletonCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#333',
    },
    skeletonLine: {
        width: '100%',
        height: 12,
        borderRadius: 4,
        backgroundColor: '#333',
    },
});