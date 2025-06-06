import usePlaySound from '@/hooks/usePlaySound';
import useSlider from '@/hooks/useSlider';
import { useFetchDriverByNumber } from '@/query/hook';
import Text from '@/theme/Text';
import { RadioData } from '@/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewToken } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface RenderRadioProps {
    radioData: RadioData;
    viewableItems: SharedValue<ViewToken[]>;
}

const RenderRadio = memo(({
    radioData,
    viewableItems
}: RenderRadioProps) => {

    const { data: driver } = useFetchDriverByNumber(radioData.driver_number, radioData.session_key);

    const { duration, handlePause, handlePlay, handleSeek, handleStop, isPlaying, position } = usePlaySound({
        recording_url: radioData.recording_url,
    });

    const { setSliderValue, sliderValue } = useSlider({ position });

    const rStyle = useAnimatedStyle(() => {
        const isViewable = Boolean(
            viewableItems.value
                .filter((item) => item.isViewable)
                .find((viewableItem) => viewableItem.item.recording_url === radioData.recording_url)
        );

        return {
            opacity: withTiming(isViewable ? 1 : 0),
            transform: [
                {
                    scale: withTiming(isViewable ? 1 : 0.6),
                },
            ],
        };
    }, []);

    return (
        <Animated.View style={[rStyle, styles.radioItem]}>
            <Text style={styles.title}>
                {driver?.first_name ? `${driver.first_name} ${driver.last_name}` : 'Unknown Driver'}
            </Text>

            {radioData.date && <Text style={styles.dateText}>{new Date(radioData.date).toLocaleString('fr-FR')}</Text>}

            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration}
                value={sliderValue}
                minimumTrackTintColor="#e10600"
                maximumTrackTintColor="#555"
                thumbTintColor="#e10600"
                onValueChange={(value) => {
                    setSliderValue(value);
                }}
                onSlidingComplete={(value) => {
                    handleSeek(value);
                }}
                disabled={duration <= 1}
            />
            <View style={styles.timeRow}>
                <Text style={styles.timeText}>{(duration > 0 ? (sliderValue / duration) * 100 : 0).toFixed(1)}%</Text>
                <Text style={styles.timeText}>
                    {(sliderValue / 1000).toFixed(2)}s / {(duration / 1000).toFixed(2)}s
                </Text>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity
                    onPress={handlePlay}
                    disabled={isPlaying}
                    style={[styles.button, isPlaying && styles.buttonDisabled]}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons name="play" size={22} color={isPlaying ? '#555' : '#e10600'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handlePause}
                    disabled={!isPlaying}
                    style={[styles.button, !isPlaying && styles.buttonDisabled]}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons name="pause" size={22} color={!isPlaying ? '#555' : '#e10600'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleStop} style={styles.button} activeOpacity={0.7}>
                    <MaterialCommunityIcons name="stop" size={22} color="#e10600" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
});

RenderRadio.displayName = 'RenderRadio';

export default RenderRadio;

const styles = StyleSheet.create({
    radioItem: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        backgroundColor: '#181a20',
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#23242a',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 2,
        letterSpacing: 0.5,
    },
    dateText: {
        fontSize: 11,
        color: '#e10600',
        textAlign: 'center',
        marginBottom: 2,
    },
    slider: {
        width: '100%',
        height: 30,
        marginVertical: 8,
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
        color: '#aaa',
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
        backgroundColor: '#23242a',
        marginHorizontal: 0,
    },
    buttonDisabled: {
        backgroundColor: '#23242a',
    },
});
