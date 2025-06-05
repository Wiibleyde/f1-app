import { logo } from '@/constants/OnBoarding';
import Box from '@/theme/Box';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => {
    return (
        <Box style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
        </Box>
    );
};

export default Logo;

const styles = StyleSheet.create({
    logoContainer: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
    },
    logo: {
        width: 110,
        height: 40,
    },
});
