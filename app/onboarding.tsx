import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, Dimensions } from "react-native";

const videoSource = require('../assets/bg.mp4');

export default function OnBoardingScreen() {
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
    
    const sliderInformations = [
        [
            "Bienvenue sur F1 App",
            "Plongez au coeurs des courses de F1"
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
            {/* {sliderInformations.map((slide, index) => (
                <ThemedView key={index} style={styles.stepContainer}>
                    <ThemedText type="title">{slide[0]}</ThemedText>
                    <ThemedText>{slide[1]}</ThemedText>
                </ThemedView>
            ))} */}
        </ThemedView>
        </>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
    },
    stepContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "auto",
    },
});