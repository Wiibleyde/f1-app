import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
    children: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
}

const Button = ({
    children,
    onPress,
    disabled = false
}: ButtonProps) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
            <Text style={styles.textButton}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderColor: '#ee0000',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderTopRightRadius: 20,
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})