import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

interface usePlaySoundProps {
    recording_url: string;
}

const usePlaySound = ({ recording_url }: usePlaySoundProps) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(1);

    useEffect(() => {
        let isMounted = true;
        let loadedSound: Audio.Sound | null = null;

        async function loadSound() {
            if (recording_url) {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: recording_url },
                    { shouldPlay: false }
                );
                loadedSound = newSound;
                // Ajout : met à jour l'intervalle de progression à 50ms
                await newSound.setProgressUpdateIntervalAsync(50);
                const status = await newSound.getStatusAsync();
                if (isMounted) {
                    setSound(newSound);
                    setDuration(status.isLoaded && status.durationMillis ? status.durationMillis : 1);
                    setPosition(status.isLoaded && status.positionMillis ? status.positionMillis : 0);
                } else {
                    await newSound.unloadAsync();
                }
            }
        }

        loadSound();

        return () => {
            isMounted = false;
            if (loadedSound) {
                loadedSound.unloadAsync();
            }
        };
    }, [recording_url]);

    useEffect(() => {
        if (!sound) return;
        const onStatusUpdate = (status: any) => {
            if (status.isLoaded) {
                setPosition(status.positionMillis);
                setDuration(status.durationMillis || 1);
                if (status.didJustFinish) {
                    setIsPlaying(false);
                    sound.setPositionAsync(0);
                }
            }
        };
        sound.setOnPlaybackStatusUpdate(onStatusUpdate);
        return () => {
            sound.setOnPlaybackStatusUpdate(null);
        };
    }, [sound]);

    const handlePlay = async () => {
        if (sound) {
            await sound.playAsync();
            setIsPlaying(true);
        }
    };

    const handlePause = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    const handleStop = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.setPositionAsync(0);
            setIsPlaying(false);
            setPosition(0);
        }
    };

    const handleSeek = async (value: number) => {
        if (sound) {
            await sound.setPositionAsync(value);
            setPosition(value);
        }
    };

    return { isPlaying, position, duration, handlePlay, handlePause, handleStop, handleSeek };
};

export default usePlaySound;
