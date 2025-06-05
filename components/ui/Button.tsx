import Text from '@/theme/Text';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonProps {
    children: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    variant?: 'active' | 'inactive';
}

const Button = ({ children, onPress, disabled = false, variant = 'active' }: ButtonProps) => {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        onPress?.();
    };

    return (
        <TouchableOpacity
            style={[styles.button, variant === 'active' ? styles.activeButton : styles.inactiveButton]}
            onPress={handlePress}
            disabled={disabled}
        >
            <Text variant="text" color="text">
                {children}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 2,
        borderTopWidth: 2,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderTopRightRadius: 20,
    },
    activeButton: {
        borderColor: '#ee0000',
    },
    inactiveButton: {
        borderColor: 'transparent',
    },
});
