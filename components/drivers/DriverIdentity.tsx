import Box from '@/theme/Box';
import Text from '@/theme/Text';
import { getFlagEmoji } from '@/utils/flag';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface DriverIdentityProps {
    first_name: string;
    last_name: string;
    team_name: string;
    teamColor: string;
    teamColorLight: string;
    country_code: string;
    headshot_url: string;
}

const DriverIdentity = ({
    first_name,
    last_name,
    team_name,
    teamColor,
    teamColorLight,
    country_code,
    headshot_url,
}: DriverIdentityProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    return (
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LinearGradient colors={[teamColorLight, '#00000000']} style={styles.heroGradient}>
                <Box style={styles.DriverIdentityContainer}>
                    <Box style={styles.DriverIdentity}>
                        <Text variant="title" style={styles.driverName}>
                            {first_name}
                            <Text variant="title" style={{ color: teamColor, fontSize: 22 }}>
                                {' '}
                                {last_name}
                            </Text>
                        </Text>

                        <Box style={styles.teamBox}>
                            <Box style={[styles.teamColorIndicator, { backgroundColor: teamColor }]} />
                            <Text variant="text" style={styles.teamName}>
                                {team_name}
                            </Text>
                        </Box>

                        <Box style={styles.countryBox}>
                            <Text variant="text" style={styles.countryCode}>
                                {country_code ? `${country_code} ${getFlagEmoji(country_code)}` : 'Non spécifié'}
                            </Text>
                        </Box>
                    </Box>

                    <Image
                        source={{ uri: headshot_url }}
                        style={styles.driverImage}
                        contentFit="cover"
                        transition={500}
                    />
                </Box>
            </LinearGradient>
        </Animated.View>
    );
};

export default DriverIdentity;

const styles = StyleSheet.create({
    heroGradient: {
        padding: 20,
        borderRadius: 20,
        marginTop: 20,
        marginHorizontal: 15,
    },
    DriverIdentityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    DriverIdentity: {
        flex: 1,
        paddingRight: 10,
    },
    driverName: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
    teamColorIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    teamName: {
        fontSize: 15,
        color: '#FFFFFF',
    },
    teamBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    countryBox: {
        marginTop: 10,
    },
    countryCode: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    driverImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
});
