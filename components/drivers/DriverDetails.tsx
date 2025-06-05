import Box from '@/theme/Box'
import Text from '@/theme/Text'
import { formatLastSessionDate } from '@/utils/date'
import { getFlagEmoji } from '@/utils/flag'
import * as Clipboard from 'expo-clipboard'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, TouchableOpacity } from 'react-native'
import DriverInformation from './DriverInformation'

interface DriverDetailsProps {
    driver_number: number
    name_acronym: string
    country_code: string
    team_name: string
    teamColor: string
    teamColorLight: string
    sessionData: any
    session_key: number
    session_type: string
    location: string
    date_start: string
}

const DriverDetails = ({
    driver_number,
    name_acronym,
    country_code,
    team_name,
    teamColor,
    teamColorLight,
    sessionData,
    session_key,
    session_type,
    location,
    date_start,
}: DriverDetailsProps) => {

    const [colorCopied, setColorCopied] = useState(false);

    // Animation values
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

    const copyColorToClipboard = async (color: string) => {
        try {
            await Clipboard.setStringAsync(color);
            setColorCopied(true);
            setTimeout(() => setColorCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };

    const handleLastRacePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        router.push({ pathname: '/sessionresult/[session_key]', params: { session_key: session_key.toString() || '' } });
    };

    return (
        <Animated.View
            style={[styles.statsContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
            <Text variant="title" style={styles.sectionTitle}>
                Informations
            </Text>

            <Box style={styles.statsGrid}>

                <DriverInformation
                    teamColorLight={teamColorLight}
                    teamColor={teamColor}
                    title="Driver number"
                    value={driver_number}
                />

                <DriverInformation
                    teamColorLight={teamColorLight}
                    title="Acronym"
                    value={name_acronym}
                />

                <DriverInformation
                    teamColorLight={teamColorLight}
                    title="Country"
                    value={country_code ? `${country_code} ${getFlagEmoji(country_code)}` : 'Non spécifié'}
                />

                <DriverInformation
                    teamColorLight={teamColorLight}
                    title="Team"
                    value={team_name}
                    teamColor={teamColor}
                />
            </Box>

            {/* Team color indicator */}
            <TouchableOpacity
                style={[styles.teamColorCard, { borderColor: teamColorLight }]}
                onPress={() => copyColorToClipboard(teamColor)}
                activeOpacity={0.7}
            >
                <Text variant="title" style={styles.statTitle}>
                    Team color
                </Text>
                <Box style={styles.colorRow}>
                    <Box style={[styles.colorSquare, { backgroundColor: teamColor }]} />
                    <Box style={styles.colorValueContainer}>
                        <Text variant="text" style={styles.statValue}>
                            {teamColor}
                        </Text>
                        {colorCopied && <Animated.Text style={styles.copiedText}>Copied!</Animated.Text>}
                    </Box>
                </Box>
            </TouchableOpacity>

            {/* Extra section - styled as a button */}
            <TouchableOpacity
                onPress={handleLastRacePress}
                activeOpacity={0.7}
                style={[styles.buttonContainer, { backgroundColor: teamColor }]}
            >
                <Box style={styles.buttonContent}>
                    <Text variant="title" style={styles.buttonTitle}>
                        Last event
                    </Text>
                    <Text variant="text" style={styles.buttonText}>
                        {sessionData ?
                            `${session_type || ''}, ${location || ''} (${formatLastSessionDate(date_start)})` :
                            'Loading race information...'}
                    </Text>
                </Box>
                <Text style={styles.buttonIcon}>→</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default DriverDetails

const styles = StyleSheet.create({
    statsContainer: {
        padding: 15,
    },
    sectionTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    fullWidthCard: {
        backgroundColor: '#FFFFFF10',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
    },
    teamColorCard: {
        backgroundColor: '#FFFFFF10',
        borderRadius: 15,
        padding: 15,
        marginBottom: 30,
        borderWidth: 1,
    },
    statTitle: {
        fontSize: 14,
        color: '#FFFFFFAA',
        marginBottom: 5,
    },
    statValue: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    colorSquare: {
        width: 20,
        height: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    colorValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    copiedText: {
        color: '#4CAF50',
        fontSize: 14,
    },
    buttonContainer: {
        borderRadius: 12,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonContent: {
        flex: 1,
    },
    buttonTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        opacity: 0.9,
    },
    buttonIcon: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
})

