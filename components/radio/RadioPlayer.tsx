import { Driver, RadioData, useFetchDrivers } from "@/query/hook";
import Text from "@/theme/Text";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export function RadioPlayer({ radioData }: { radioData: RadioData }) {
    const audioSource = radioData.recording_url;
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(1);

    const [currentDriver, setCurrentDriver] = useState<Driver | null>(null);

    const { data: drivers } = useFetchDrivers();

    useEffect(() => {
        if (drivers) {
            const driver = drivers.find((d) => d.driver_number === radioData.driver_number);
            setCurrentDriver(driver || null);
        }
    }, [drivers, radioData.driver_number]);

    useEffect(() => {
        let isMounted = true;
        let loadedSound: Audio.Sound | null = null;

        async function loadSound() {
            if (audioSource) {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: audioSource },
                    { shouldPlay: false }
                );
                loadedSound = newSound;
                const status = await newSound.getStatusAsync();
                if (isMounted) {
                    setSound(newSound);
                    setDuration(status.isLoaded && status.durationMillis ? status.durationMillis : 1);
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
    }, [audioSource]);

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound, audioSource]);

    useEffect(() => {
        let interval: number | null = null;
        let subscription: any = null;
        if (sound) {
            subscription = sound.setOnPlaybackStatusUpdate((status: any) => {
                if (status.isLoaded) {
                    setPosition(status.positionMillis);
                    setDuration(status.durationMillis || 1);
                    if (status.didJustFinish) {
                        setIsPlaying(false);
                        sound.setPositionAsync(0);
                    }
                }
            });
            if (isPlaying) {
                interval = setInterval(async () => {
                    const status = await sound.getStatusAsync();
                    if (status.isLoaded) {
                        setPosition(status.positionMillis);
                        setDuration(status.durationMillis || 1);
                    }
                }, 500);
            }
        }
        return () => {
            if (interval) clearInterval(interval);
            if (sound && subscription) {
                sound.setOnPlaybackStatusUpdate(null);
            }
        };
    }, [sound, isPlaying]);

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

    return (
        <View style={styles.radioItem}>
            <Text style={styles.title}>{currentDriver ? `${currentDriver.first_name} ${currentDriver.last_name}` : 'Extrait radio'}</Text>
            {radioData.date && (
                <Text style={styles.dateText}>
                    {new Date(radioData.date).toLocaleString('fr-FR')}
                </Text>
            )}
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                onSlidingComplete={handleSeek}
                minimumTrackTintColor="#e10600"
                maximumTrackTintColor="#333"
                thumbTintColor="#e10600"
                disabled={!sound}
            />
            <View style={styles.timeRow}>
                <Text style={styles.timeText}>{Math.floor(position / 1000)}s</Text>
                <Text style={styles.timeText}>{Math.floor(duration / 1000)}s</Text>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity
                    onPress={handlePlay}
                    disabled={isPlaying}
                    style={[styles.button, isPlaying && styles.buttonDisabled]}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons
                        name="play"
                        size={22}
                        color={isPlaying ? "#555" : "#e10600"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handlePause}
                    disabled={!isPlaying}
                    style={[styles.button, !isPlaying && styles.buttonDisabled]}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons
                        name="pause"
                        size={22}
                        color={!isPlaying ? "#555" : "#e10600"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleStop}
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons
                        name="stop"
                        size={22}
                        color="#e10600"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    radioItem: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        backgroundColor: '#181a20',
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#23242a",
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#fff",
        textAlign: 'center',
        marginBottom: 2,
        letterSpacing: 0.5,
    },
    dateText: {
        fontSize: 11,
        color: "#e10600",
        textAlign: 'center',
        marginBottom: 2,
    },
    slider: {
        width: '100%',
        height: 8,
        marginBottom: 0,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
        paddingHorizontal: 2,
    },
    timeText: {
        fontSize: 11,
        color: "#aaa",
        fontVariant: ['tabular-nums'],
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        gap: 8,
    },
    button: {
        padding: 7,
        borderRadius: 16,
        backgroundColor: "#23242a",
        marginHorizontal: 0,
    },
    buttonDisabled: {
        backgroundColor: "#23242a",
    },
});