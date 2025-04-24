import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import { useState, useRef, useEffect } from "react";

const videoSource = require('../assets/bg.mp4');

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

    const renderSlide = ({ item, index }: { item: string[], index: number }) => {
        return (
            <View style={styles.slideContainer}>
                <ThemedText style={styles.slideTitle}>{item[0]}</ThemedText>
                <ThemedText style={styles.slideSubtitle}>{item[1]}</ThemedText>
            </View>
        );
    };

    const handleNext = () => {
        if (currentIndex < sliderInformations.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
            setCurrentIndex(currentIndex - 1);
        }
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
            
            <View style={styles.paginationContainer}>
                {sliderInformations.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === currentIndex ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>

            <View style={styles.navigationContainer}>
                {currentIndex > 0 ? (
                    <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
                        <ThemedText style={styles.navButtonText}>Précédent</ThemedText>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.navButton} onPress={handleSkip}>
                        <ThemedText style={styles.navButtonText}>Passer</ThemedText>
                    </TouchableOpacity>
                )}

                {currentIndex < sliderInformations.length - 1 ? (
                    <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                        <ThemedText style={styles.navButtonText}>Suivant</ThemedText>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.navButton} onPress={handleSkip}>
                        <ThemedText style={styles.navButtonText}>Commencer</ThemedText>
                    </TouchableOpacity>
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
    },
    slideTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    slideSubtitle: {
        fontSize: 18,
        textAlign: 'center',
    },
    paginationContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#FFFFFF',
    },
    inactiveDot: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
});