import { StyleSheet, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";
import { useEffect } from "react";

export function DriverSkeleton() {
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
        <Animated.View style={[styles.pilotItem, animatedStyle]}>
            <View style={styles.pilotContent}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <View style={[styles.skeletonPosition, styles.skeleton]} /> */}
                        <View style={[styles.skeletonAcronym, styles.skeleton]} />
                        <View style={[styles.skeletonNumber, styles.skeleton]} />
                        <View style={[styles.skeletonName, styles.skeleton]} />
                    </View>
                    <View style={[styles.skeletonTeam, styles.skeleton]} />
                </View>
                <View style={styles.skeletonCircle} />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    pilotItem: {
        backgroundColor: '#1a1918',
        borderRadius: 10,
        marginVertical: 4,
        overflow: 'hidden',
        borderLeftWidth: 4,
        borderLeftColor: '#232323',
    },
    pilotContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
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
});