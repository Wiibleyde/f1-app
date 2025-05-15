import Box from '@/theme/Box'
import Text from '@/theme/Text'
import React from 'react'
import { StyleSheet } from 'react-native'

interface SectionProps {
    title: string
    children?: React.ReactNode
}

const Section = ({
    title,
    children
}: SectionProps) => {
    return (
        <Box style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </Box>
    )
}

export default Section

const styles = StyleSheet.create({
        section: {
        backgroundColor: '#1C1C1E',
        borderRadius: 12,
        marginBottom: 24,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFF',
        marginBottom: 16,
    },
})