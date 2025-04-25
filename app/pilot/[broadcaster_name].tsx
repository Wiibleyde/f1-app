import Header from "@/components/ui/Header";
import Layout from "@/components/ui/Layout";
import { useFetchDriverByBroadcasterName } from "@/query/hook";
import Box from "@/theme/Box";
import Text from "@/theme/Text";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function PilotScreen() {
    const { broadcaster_name } = useLocalSearchParams();

    const { data } = useFetchDriverByBroadcasterName(broadcaster_name as string);

    return (
        <Layout>
            <Stack.Screen options={{ headerShown: false }} />
            <Header title="Détails du pilote" backButton />
            <Box style={{ 
                alignSelf: 'center', 
                flexDirection: "row", 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderWidth: 2, 
                borderColor: '#FFFFFF50', 
                borderRadius: 20, 
                marginTop: 30,
                marginHorizontal: 10, 
                padding: 15, 
                backgroundColor: '#FFFFFF20',
                maxWidth: '95%',
                height: 140
            }}>
                <Box style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text variant="title" textAlign="left" style={{ color: '#FFFFFF' }}>
                        {data?.driver_number}
                    </Text>
                    <Text variant="text" textAlign="left" style={{ color: '#FFFFFF', marginTop: 10 }}>
                        {data?.first_name} {data?.last_name}
                    </Text>
                    <Text variant="text" textAlign="left" style={{ color: `#${data?.team_colour}`, marginTop: 10 }}>
                        {data?.team_name}
                    </Text>
                </Box>
                <Image
                    source={{ uri: data?.headshot_url }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        marginLeft: 10
                    }}
                />
            </Box>

            <Box style={{ rowGap: 20, marginTop: 30, gridTemplateColumns: 'repeat(2, 2fr)', maxWidth: '95%', alignSelf: 'center' }}>
                <Box style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFFF20', borderRadius: 20, padding: 15 }}>
                    <Text variant="title" textAlign="left" style={{ color: '#FFFFFF', fontSize: 20 }}>
                        Code de pays
                    </Text>
                    <Text variant="text" textAlign="left" style={{ color: '#FFFFFF', marginTop: 10 }}>
                        {data?.country_code}
                    </Text>
                </Box>
                <Box style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFFF20', borderRadius: 20, padding: 15 }}>
                    <Text variant="title" textAlign="left" style={{ color: '#FFFFFF', fontSize: 20 }}>
                        Écurie
                    </Text>
                    <Text variant="text" textAlign="left" style={{ color: '#FFFFFF', marginTop: 10 }}>
                        {data?.team_name}
                    </Text>
                </Box>
                <Box style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFFF20', borderRadius: 20, padding: 15 }}>
                    <Text variant="title" textAlign="left" style={{ color: '#FFFFFF', fontSize: 20 }}>
                        Nom de diffusion
                    </Text>
                    <Text variant="text" textAlign="left" style={{ color: '#FFFFFF', marginTop: 10 }}>
                        {data?.broadcast_name}
                    </Text>
                </Box>
            </Box>
        </Layout>
    );
}