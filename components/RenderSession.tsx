import { RaceSession } from '@/query/hook'
import Box from '@/theme/Box'
import Text from '@/theme/Text'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { formatDate, getDay, getMonthThreeLetters } from '@/utils/date'

interface RenderSessionProps {
    item: RaceSession
}

const RenderSession = ({
    item
}: RenderSessionProps) => {

    return (
        <TouchableOpacity style={styles.container}>
            <Box style={styles.sessionInfosContainer}>
                <Text variant="date" style={styles.sessionDate}>
                    {getDay(item.date_start)}
                </Text>
                <Box style={styles.sessionInfosMonthContainer}>
                    <Text variant="date" style={styles.sessionDate}>
                        {getMonthThreeLetters(item.date_start)}
                    </Text>
                </Box>
            </Box>

            <Box style={styles.sessionBorder} />

            <Box style={styles.raceTrackerInfosContainer}>
                <Text variant="date" style={styles.raceInfosText}>
                    {item.session_name}
                </Text>
                <Text variant="text" style={styles.raceInfosCountry}>
                    {item.country_name}
                </Text>
                <Text variant="date" style={styles.raceName}>
                    {item.session_type}
                </Text>
                <Text variant="text" style={styles.raceName}>
                    {formatDate(item)}
                </Text>
            </Box>

        </TouchableOpacity>
    )
}

export default RenderSession

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 115,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1a1918',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 6
    },
    sessionInfosMonthContainer: {
        backgroundColor: '#30302f',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    sessionDate: {
        color: '#999999',
    },
    sessionInfosContainer: {
        width: '15%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    sessionBorder: {
        width: 2,
        height: '100%',
        backgroundColor: '#ee0000',
        borderRadius: 50,
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
        color: '#CCCDD7',
    },
    raceInfosText: {
        color: '#FFFFFF',
    },
    raceInfosCountry: {
        color: '#ffffff',
        fontFamily: 'Formula1Bold',
    },
})