import React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Box from '@/theme/Box';

const Splash = () => {
    return (
        <Box style={styles.container}>
            <Image source={require('@/assets/images/f1.svg')} contentFit="contain" style={styles.logo} />
        </Box>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 160,
        height: 40,
    },
});
