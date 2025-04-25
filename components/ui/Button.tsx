import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import Text from '@/theme/Text';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

const Button = ({ children, onPress, disabled = false }: ButtonProps) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress?.();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} disabled={disabled}>
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
    borderColor: '#ee0000',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderTopRightRadius: 20,
  },
});
