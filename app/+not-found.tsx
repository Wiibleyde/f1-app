import Text from '@/theme/Text';
import { Stack } from 'expo-router';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <Text style={{ fontSize: 20, textAlign: 'center' }}>ça marche pas</Text>
        </>
    );
}
