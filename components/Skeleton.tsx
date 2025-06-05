import Box from "@/theme/Box";
import { StyleSheet } from "react-native";

export function Skeleton({ width = '100%', height = 20, borderRadius = 4 }: { width?: number | `${number}%`; height?: number; borderRadius?: number }) {
    return (
        <Box style={[styles.skeleton, { width, height, borderRadius }]} />
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