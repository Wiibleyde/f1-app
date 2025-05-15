import Box from '@/theme/Box'
import Text from '@/theme/Text'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface ItemProps {
    icon: React.ComponentProps<typeof Ionicons>['name']
    text: string
    children?: React.ReactNode
}

const Item = ({
    icon,
    text,
    children
}: ItemProps) => {
    return (
        <TouchableOpacity style={styles.settingItem}>
            <Box style={styles.settingInfo}>
                <Ionicons name={icon} size={24} color="#FF1801" />
                <Text style={styles.settingText}>{text}</Text>
            </Box>
            {children}
        </TouchableOpacity>
    )
}

export default Item

const styles = StyleSheet.create({
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        color: '#FFF',
        fontSize: 16,
        marginLeft: 12,
    }
})