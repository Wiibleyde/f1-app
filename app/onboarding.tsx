import { ThemedView } from "@/components/ThemedView";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, Dimensions, View, Animated, ScrollView, Image } from "react-native";
import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import { logo, sliderInformations, videoSource } from "@/constants/OnBoarding";
import RenderSlide from "@/components/RenderSlider";

export default function OnBoardingScreen({onboardingComplete}: {onboardingComplete: any}) {
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    useEffect(() => {
        if (!isPlaying) {
            player.play();
        }
    }, [isPlaying]);

    const [currentIndex, setCurrentIndex] = useState(0);

    // Create animated values for each dot
    const dotAnimations = useRef(
        sliderInformations.map(() => ({
            width: new Animated.Value(10),
            opacity: new Animated.Value(0.5)
        }))
    ).current;

    // Update animations when current index changes
    useEffect(() => {
        sliderInformations.forEach((_, index) => {
            Animated.parallel([
                Animated.timing(dotAnimations[index].width, {
                    toValue: index === currentIndex ? 40 : 10,
                    duration: 150,
                    useNativeDriver: false,
                }),
                Animated.timing(dotAnimations[index].opacity, {
                    toValue: index === currentIndex ? 1 : 0.5,
                    duration: 150,
                    useNativeDriver: false,
                }),
            ]).start();
        });
    }, [currentIndex]);



    const handleSkip = () => {
    };

    const handleScroll = (event: any) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(slideIndex);
    };

    const handleContinue = () => {
        if (currentIndex === sliderInformations.length - 1) {
            onboardingComplete();
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <VideoView
                style={styles.backgroundVideo}
                player={player}
                contentFit="cover"
            />
            <View style={styles.logoContainer}>
                <Image
                    source={logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {sliderInformations.map((item, index) => (
                    <RenderSlide key={index} item={item} />
                ))}
            </ScrollView>

            <ScrollView pagingEnabled horizontal style={styles.paginationContainer} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
                {sliderInformations.map((_, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.paginationDot,
                            {
                                width: dotAnimations[index].width,
                                backgroundColor: currentIndex === index
                                    ? '#FF0000'
                                    : 'rgba(255, 255, 255, 0.5)',
                                opacity: dotAnimations[index].opacity
                            }
                        ]}
                    />
                ))}
            </ScrollView>

            {currentIndex === 0 && (
                <View style={styles.passContainer}>
                    <Button onPress={handleSkip}>
                        Passer
                    </Button>
                </View>
            )}

            {currentIndex === sliderInformations.length - 1 && (
                <View style={styles.continueContainer}>
                    <Button onPress={handleContinue}>
                        Commencer
                    </Button>
                </View>
            )}
        </ThemedView>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "auto",
    },
    paginationContainer: {
        flexDirection: 'row',
        bottom: 100,
        alignSelf: 'center',
    },
    paginationDot: {
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    passContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        position: 'absolute',
        bottom: 40,
    },
    continueContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
        position: 'absolute',
        bottom: 40,
    },
    navButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#ee0000',
    },
    navButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    logoContainer: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
    },
    logo: {
        width: 110,
        height: 40,
    },
});