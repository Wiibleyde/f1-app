import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import OnBoardingScreen from '../onboarding';
import { useStorage } from '@/hooks/useStorage';

import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { storageItem: isOnBoarding, saveStorageItem: setIsOnBoarding } = useStorage<boolean>('onboarding', true);

  if (isOnBoarding) {
    return (
      <OnBoardingScreen onboardingComplete={() => { setIsOnBoarding(false); }} />
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="races"
        options={{
          title: "Courses",
          tabBarIcon: ({ color }) => <Fontisto size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pilots"
        options={{
          title: "Pilotes",
          tabBarIcon: ({ color }) => <Fontisto size={28} name="persons" color={color} />,
        }}
      />
    </Tabs>
  );
}
