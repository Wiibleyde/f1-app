import Box from '@/theme/Box'
import Text from '@/theme/Text'
import React from 'react'
import { StyleSheet } from 'react-native'

interface DriverInformationProps {
    teamColorLight: string
    title: string
    value: string | number
    teamColor?: string
}

const DriverInformation = ({
    teamColorLight,
    title,
    value,
    teamColor = '#FFFFFF',
}: DriverInformationProps) => {
    return (
        <Box style={[styles.statCard, { borderColor: teamColorLight }]}>
            <Text variant="title" style={styles.statTitle}>
                {title}
            </Text>
            <Text variant="text" style={[styles.statValue, { color: teamColor }]}>
                {value}
            </Text>
        </Box>
    )
}

export default DriverInformation

const styles = StyleSheet.create({
    statCard: {
        width: '48%',
        backgroundColor: '#FFFFFF10',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
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
    }
})