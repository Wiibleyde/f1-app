import { Race } from '@/query/hook';
import Box from '@/theme/Box';
import Text from '@/theme/Text';
import { getDay, getLastDay, getMonthThreeLetters } from '@/utils/date';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, ViewToken } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface RenderRaceProps {
    item: Race;
    index: number;
    viewableItems: SharedValue<ViewToken[]>;
}

const RenderRace = memo(({
    viewableItems,
    item,
    index
}: RenderRaceProps) => {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        router.push({ pathname: '/racesessions/[meeting_key]', params: { meeting_key: item.meeting_key } });
    };

    // Impossible de déplacer ça dans un hook, le fait de filtré fait planter l'application
    // meme si je dois le filter de manière explicit
    const rStyle = useAnimatedStyle(() => {
        const isViewable = Boolean(
            viewableItems.value
                .filter((item) => item.isViewable)
                .find((viewableItem) => viewableItem.item.meeting_key === item.meeting_key));

        return {
            opacity: withTiming(isViewable ? 1 : 0),
            transform: [
                {
                    scale: withTiming(isViewable ? 1 : 0.6),
                },
            ],
        }
    }, [])

    return (
        <Animated.View style={rStyle}>

            <TouchableOpacity style={styles.container} onPress={handlePress}>
                <Box style={styles.raceInfosContainer}>
                    <Box style={styles.raceInfosDateContainer}>
                        <Text variant="date" style={styles.raceDate}>
                            {getDay(item.date_start)}
                        </Text>
                        <Text variant="date" style={styles.raceDate}>
                            -
                        </Text>
                        <Text variant="date" style={styles.raceDate}>
                            {getLastDay(item.date_start)}
                        </Text>
                    </Box>
                    <Box style={styles.raceInfosMonthContainer}>
                        <Text variant="date" style={styles.raceDate}>
                            {getMonthThreeLetters(item.date_start)}
                        </Text>
                    </Box>
                </Box>

                <Box style={styles.raceBorder} />

                <Box style={styles.raceTrackerInfosContainer}>
                    <Text variant="date" style={styles.raceInfosText}>
                        Course {(index + 1).toString().padStart(2, '0')}
                    </Text>
                    <Text variant="text" style={styles.raceInfosCountry}>
                        {item.country_name}
                    </Text>
                    <Text variant="date" style={styles.raceName}>
                        {item.meeting_name}
                    </Text>
                </Box>
            </TouchableOpacity>
        </Animated.View>
    );
});

export default RenderRace;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 105,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1a1918',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    raceInfosContainer: {
        width: '15%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    raceInfosDateContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
    },
    raceInfosMonthContainer: {
        backgroundColor: '#30302f',
        borderRadius: 8,
        paddingHorizontal: 7,
        paddingVertical: 4,
        marginTop: 4,
        alignSelf: 'flex-start',
        flexShrink: 0,
    },
    raceTrackerInfosContainer: {
        width: '71%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 6,
    },
    raceName: {
        fontSize: 14,
        color: '#CCCDD7',
    },
    raceLocation: {
        fontSize: 16,
        color: '#CCCCCC',
        marginBottom: 4,
    },
    raceDate: {
        color: '#999999',
    },
    raceBorder: {
        width: 2,
        height: '100%',
        backgroundColor: '#ee0000',
        borderRadius: 50,
    },
    raceInfosText: {
        color: '#FFFFFF',
    },
    raceInfosCountry: {
        color: '#ffffff',
        fontFamily: 'Formula1Bold',
    },
});
