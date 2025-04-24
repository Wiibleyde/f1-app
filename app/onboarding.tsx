import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, Dimensions, FlatList, View, Animated, ScrollView, Image } from "react-native";
import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";

const videoSource = require('../assets/bg.mp4');
// Change from SVG to PNG or JPG format which is natively supported
const logo = require('@/assets/images/f1.png'); // Make sure this file exists

export default function OnBoardingScreen() {
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

    const sliderInformations = [
        [
            "Bienvenue sur F1 App",
            "Plongez au coeur des courses de F1"
        ],
        [
            "Suivez les courses en direct",
            "Ne ratez plus aucune course"
        ],
        [
            "Découvrez les pilotes",
            "Apprenez à connaître vos pilotes préférés"
        ],
        [
            "Explorez les circuits",
            "Visitez les circuits de F1"
        ]
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList<string[]>>(null);
    
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
                    duration: 150, // Reduced from 300 to 150 for faster animation
                    useNativeDriver: false,
                }),
                Animated.timing(dotAnimations[index].opacity, {
                    toValue: index === currentIndex ? 1 : 0.5,
                    duration: 150, // Reduced from 300 to 150 for faster animation
                    useNativeDriver: false,
                }),
            ]).start();
        });
    }, [currentIndex]);

    const renderSlide = ({ item, index }: { item: string[], index: number }) => {
        return (
            <View style={styles.slideContainer}>
                <ThemedText style={styles.slideTitle}>{item[0]}</ThemedText>
                <ThemedText style={styles.slideSubtitle}>{item[1]}</ThemedText>
            </View>
        );
    };

    const handleSkip = () => {
        // Navigate to app's main screen or complete onboarding
        // Add your navigation code here
    };

    // This is an onboarding screen with a background video (./assets/videos/bg.mp4)
    // With a slider of 4 slides
    return (<>
        <VideoView
            style={styles.backgroundVideo}
            player={player}
            nativeControls={false}
            contentFit="cover"
        />
        <ThemedView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image 
                    source={logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <FlatList
                ref={flatListRef}
                data={sliderInformations}
                renderItem={renderSlide}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                keyExtractor={(_, index) => index.toString()}
                onMomentumScrollEnd={(event) => {
                    const slideIndex = Math.round(
                        event.nativeEvent.contentOffset.x / width
                    );
                    setCurrentIndex(slideIndex);
                }}
            />

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

            <View style={styles.passContainer}>
                {currentIndex === 0 && (
                    <Button onPress={handleSkip}>
                        Passer
                    </Button>
                )}
            </View>

            <View style={styles.continueContainer}>
                {currentIndex === sliderInformations.length - 1 && (
                    <Button onPress={handleSkip}>
                        Commencer
                    </Button>
                )}
            </View>
        </ThemedView>
    </>);
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    stepContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "auto",
    },
    slideContainer: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20, // Add padding at the top to prevent text cutoff
        paddingHorizontal: 20, // Add horizontal padding for better text display
    },
    slideTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10, // Add margin at the top to prevent text cutoff
        paddingTop: 5, // Additional padding to ensure text is visible
        includeFontPadding: true, // Ensure font includes proper padding
        color: '#FFFFFF', // Force white color for title text
    },
    slideSubtitle: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 10, // Add some horizontal padding
        color: '#FFFFFF', // Force white color for subtitle text
    },
    paginationContainer: {
        flexDirection: 'row',
        position: 'absolute',
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
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
    },
    navButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    logoContainer: {
        position: 'absolute',
        top: 60, // Increased top margin for better visibility
        left: 20,
        zIndex: 10, // Ensure the logo appears above other elements
    },
    logo: {
        width: 110,
        height: 40,
    },
});