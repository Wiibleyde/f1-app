import DriverDetails from '@/components/drivers/DriverDetails';
import DriverIdentity from '@/components/drivers/DriverIdentity';
import { DriverDetailSkeleton } from '@/components/skeleton/DriverDetailSkeleton';
import Header from '@/components/ui/Header';
import Layout from '@/components/ui/Layout';
import NoDataFound from '@/components/ui/NoDataFound';
import { useFetchDriverByBroadcasterName, useFetchSessionByKey } from '@/query/hook';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function PilotScreen() {
    const { broadcaster_name } = useLocalSearchParams();
    const { data, isLoading: isDriverLoading } = useFetchDriverByBroadcasterName(broadcaster_name as string);

    const [sessionKey, setSessionKey] = useState<string | null>(null);

    const { data: sessionData, isLoading: isSessionDataLoading } = useFetchSessionByKey(sessionKey || '', {
        enabled: Boolean(sessionKey),
    });

    const isLoading = isDriverLoading || isSessionDataLoading;

    useEffect(() => {
        if (data?.session_key) {
            setSessionKey(data.session_key.toString());
        }
    }, [data]);

    if (isLoading) {
        return (
            <Layout>
                <Stack.Screen options={{ headerShown: false }} />
                <Header title="Driver Details" backButton />
                <DriverDetailSkeleton />
            </Layout>
        );
    }

    if (!data || !sessionData) {
        return (
            <Layout>
                <Stack.Screen options={{ headerShown: false }} />
                <Header title="Driver Details" backButton />
                <NoDataFound entityName='Driver' />
            </Layout>
        );
    }

    // Dynamic team color for styling
    const teamColor = `#${data.team_colour || 'ff0000'}`;
    const teamColorLight = `${teamColor}50`;

    return (
        <Layout>
            <Stack.Screen options={{ headerShown: false }} />
            <Header title={`${data.first_name} ${data.last_name}`} backButton />

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <DriverIdentity
                    first_name={data.first_name}
                    last_name={data.last_name}
                    team_name={data.team_name}
                    teamColor={teamColor}
                    teamColorLight={teamColorLight}
                    country_code={data.country_code}
                    headshot_url={data.headshot_url}
                />

                {/* Driver details cards */}
                <DriverDetails
                    driver_number={data.driver_number}
                    name_acronym={data.name_acronym}
                    team_name={data.team_name}
                    teamColor={teamColor}
                    teamColorLight={teamColorLight}
                    country_code={data.country_code}
                    session_key={data.session_key}
                    sessionData={sessionData}
                    session_type={sessionData.session_type}
                    location={sessionData.location}
                    date_start={sessionData.date_start}
                />
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
    },
});
