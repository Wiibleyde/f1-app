import NoDataFound from '@/components/NoDataFound';
import RenderSession from '@/components/RenderSession';
import SessionSkeleton from '@/components/skeleton/SessionSkeleton';
import Header from '@/components/ui/Header';
import Layout from '@/components/ui/Layout';
import { useFetchRaceSessions } from '@/query/hook';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const MeetingScreen = () => {
    const { meeting_key } = useLocalSearchParams<{ meeting_key: string }>();
    const { data, refetch, isRefetching, isLoading } = useFetchRaceSessions(meeting_key);

    const renderEmptyComponent = () => {
        if (isLoading) {
            return <SessionSkeleton />;
        } else {
            return <NoDataFound entityName="sessions" />;
        }
    };

    return (
        <Layout>
            <Stack.Screen options={{ headerShown: false }} />
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <Animated.View entering={FadeInDown.delay(index * 100)}>
                        <RenderSession item={item} />
                    </Animated.View>
                )}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={'#ee0000'} />}
                ListHeaderComponent={<Header title="Sessions" backButton />}
                windowSize={1}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                ListEmptyComponent={renderEmptyComponent}
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
