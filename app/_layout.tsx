import { ThemeProvider } from '@shopify/restyle';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import Splash from './splash';
import theme from '@/theme/default';
import { queryClient } from '@/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
});

export default function RootLayout() {
    const [isLoading, setIsLoading] = useState(true);
    const [loaded] = useFonts({
        Formula1Regular: require('../assets/fonts/Formula1-Regular.ttf'),
        Formula1Bold: require('../assets/fonts/Formula1-Bold.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [loaded, isLoading]);

    if (!loaded || isLoading) {
        return <Splash />;
    }

    return (
        <ThemeProvider theme={theme}>
            <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
            </PersistQueryClientProvider>
        </ThemeProvider>
    );
}
