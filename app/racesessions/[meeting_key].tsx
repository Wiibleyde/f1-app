import Header from '@/components/ui/Header'
import Layout from '@/components/ui/Layout'
import { useFetchRaceSessions } from '@/query/hook'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'

const MeetingScreen = () => {

    const { meeting_key } = useLocalSearchParams<{ meeting_key: string }>();
    console.log(meeting_key)
    const { data, isLoading } = useFetchRaceSessions(meeting_key)
    console.log(data, isLoading)

    return (
        <Layout>
            <Stack.Screen options={{ headerShown: false }} />
            <Header title='Sessions' backButton />
        </Layout>
    )
}

export default MeetingScreen