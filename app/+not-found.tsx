import Header from '@/components/ui/Header';
import Layout from '@/components/ui/Layout';
import Box from '@/theme/Box';
import Text from '@/theme/Text';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {
    return (
        <Layout>
            <Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
            <Header title="Oops!" backButton />
            <Box style={styles.container}>
                <Box style={styles.iconBox}>
                    <Ionicons name="alert-circle-outline" size={64} color="#FF1801" />
                </Box>
                <Text variant="title" color="text" textAlign="center" style={styles.title}>
                    Page Not Found
                </Text>
                <Text style={styles.subtitle}>
                    Sorry, the page you are looking for does not exist or has been moved.
                </Text>
            </Box>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        paddingHorizontal: 24,
    },
    iconBox: {
        marginBottom: 24,
    },
    title: {
        marginBottom: 12,
        color: '#FFF',
    },
    subtitle: {
        color: '#888',
        fontSize: 16,
        textAlign: 'center',
    },
});
