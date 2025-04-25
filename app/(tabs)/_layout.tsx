import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import OnBoardingScreen from '../onboarding';
import { useStorage } from '@/hooks/useStorage';

import Fontisto from '@expo/vector-icons/Fontisto';

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
        tabBarActiveTintColor: "red",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
          backgroundColor: "black",
          height: 60,
          paddingBottom: 10,
        },
      }}>
      <Tabs.Screen
        name="index"
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
      <Tabs.Screen
        name="settings"
        options={{
          title: "Paramètres",
          tabBarIcon: ({ color }) => <Fontisto size={28} name="spinner-cog" color={color} />,
        }}
      />
    </Tabs>
  );
}

const style = StyleSheet.create({
  tabBar: {
    backgroundColor: "black",
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 10,
  },
});