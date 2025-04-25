import { useFetchRaceSessions } from '@/query/hook'
import Text from '@/theme/Text'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const MeetingScreen = () => {

    const { meeting_key } = useLocalSearchParams<{ meeting_key: string }>();
    console.log(meeting_key)
    const { data, isLoading } = useFetchRaceSessions(meeting_key)
    console.log(data, isLoading)

    return (
        <View>
            <Stack.Screen options={{ headerShown: false }} />
            <Text>{meeting_key}</Text>
        </View>
    )
}

export default MeetingScreen