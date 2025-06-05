import RenderSession from '@/components/RenderSession';
import SessionSkeleton from '@/components/skeleton/SessionSkeleton';
import Header from '@/components/ui/Header';
import Layout from '@/components/ui/Layout';
import { useFetchRaceSessions } from '@/query/hook';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

const MeetingScreen = () => {
    const { meeting_key } = useLocalSearchParams<{ meeting_key: string }>();
    const { data, refetch, isRefetching } = useFetchRaceSessions(meeting_key);

    return (
        <Layout>
            <Stack.Screen options={{ headerShown: false }} />
            <FlatList
                data={data}
                renderItem={({ item }) => <RenderSession item={item} />}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={'#ee0000'} />}
                ListHeaderComponent={<Header title="Sessions" backButton />}
                windowSize={1}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
            />
        </Layout>
    );
};

export default MeetingScreen;

const styles = StyleSheet.create({
    listContainer: {
        gap: 16,
        paddingBottom: 70,
    },
});
