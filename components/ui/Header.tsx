import Box from '@/theme/Box'
import Text from '@/theme/Text'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface HeaderProps {
    backButton?: boolean
    title: string
}

const Header = ({
    title,
    backButton = false
}: HeaderProps) => {
    return (
        <Box style={styles.header}>
            {backButton && <TouchableOpacity onPress={() => router.back()}>
                <Image
                    source={require('@/assets/images/back.svg')}
                    style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                    }}
                />
            </TouchableOpacity>}
            <Text variant="title" textAlign='center' color='text'>
                {title}
            </Text>
        </Box>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: "auto",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        gap: 10,
        paddingVertical: 20,
    },
    title: {
        color: '#FFFFFF',
    }
})