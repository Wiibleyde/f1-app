import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStorage<T>(key: string, defaultValue: T | null = null) {
    const [storageItem, setStorageItem] = useState<T | null>(defaultValue);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
            setStorageItem(parsedValue);
            return parsedValue;
        } catch {
            return defaultValue;
        }
    };

    const saveStorageItem = async (value: T) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            setStorageItem(value);
        } catch {
        }
    };

    const clearStorage = async () => {
        try {
            await AsyncStorage.removeItem(key);
            setStorageItem(defaultValue);
        } catch {
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return [storageItem, saveStorageItem, clearStorage];
}