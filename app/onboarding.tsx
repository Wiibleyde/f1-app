import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, Dimensions, Animated, ScrollView, Image } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { logo, sliderInformations, videoSource } from '@/constants/OnBoarding';
import Box from '@/theme/Box';
import { router, Stack } from 'expo-router';
import RenderSlide from '@/components/RenderSlider';
import { useStorage } from '@/hooks/useStorage';
import Dot from '@/components/onBoarding/Dot';
import Logo from '@/components/onBoarding/Logo';

const { width } = Dimensions.get('window');

export default function OnBoardingScreen() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { saveStorageItem: setIsOnBoarding } = useStorage<boolean>('onboarding', true);

    const player = useVideoPlayer(videoSource, (p) => {
        p.loop = true;
        p.volume = 0;
        p.play();
    });

    const dotAnimations = useRef(
        sliderInformations.map((_, i) => ({
            width: new Animated.Value(i === 0 ? 40 : 10),
            opacity: new Animated.Value(i === 0 ? 1 : 0.5),
        }))
    ).current;

    useEffect(() => {
        player.play();
        scrollX.setValue(0);
        dotAnimations.forEach((dot, i) => {
            dot.width.setValue(i === 0 ? 40 : 10);
            dot.opacity.setValue(i === 0 ? 1 : 0.5);
        });
    }, []);

    useEffect(() => {
        const listener = scrollX.addListener(({ value }) => {
            const position = value / width;
            sliderInformations.forEach((_, i) => {
                const dist = Math.abs(position - i);
                dotAnimations[i].width.setValue(dist < 1 ? 40 - dist * 30 : 10);
                dotAnimations[i].opacity.setValue(dist < 1 ? 1 - dist * 0.5 : 0.5);
            });

            const newIndex = Math.round(position);
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < sliderInformations.length) {
                setCurrentIndex(newIndex);
            }
        });

        return () => scrollX.removeListener(listener);
    }, [currentIndex]);

    const handlePress = () => {
        setIsOnBoarding(false);
        router.replace('/');
    };

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const onScrollEnd = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        if (index >= 0 && index < sliderInformations.length) setCurrentIndex(index);
    };

    return (
        <Box style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <VideoView
                style={styles.backgroundVideo}
                player={player}
                contentFit="cover"
            />

            <Logo />

            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                onMomentumScrollEnd={onScrollEnd}
                contentContainerStyle={{ flexGrow: 1 }}
                decelerationRate="fast"
            >
                {sliderInformations.map((item, i) => (
                    <RenderSlide key={i} item={item} />
                ))}
            </ScrollView>

            <Box style={styles.paginationContainer}>
                {sliderInformations.map((_, i) => (
                    <Dot
                        key={i}
                        index={i}
                        currentIndex={currentIndex}
                        dotAnimations={dotAnimations}
                    />
                ))}
            </Box>

            <Box style={[styles.stepContainer, { justifyContent: currentIndex === 0 ? 'flex-start' : 'flex-end' }]}>
                {currentIndex === 0 && <Button onPress={handlePress}>Skip</Button>}
                {currentIndex === sliderInformations.length - 1 && <Button onPress={handlePress}>Start</Button>}
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0,
        width: 'auto',
    },
    paginationContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepContainer: {
        flexDirection: 'row',
        width: '90%',
        position: 'absolute',
        bottom: 40,
    },
});
