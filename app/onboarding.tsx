import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, Dimensions, Animated, ScrollView, Image } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { logo, sliderInformations, videoSource } from '@/constants/OnBoarding';
import Box from '@/theme/Box';
import { router, Stack } from 'expo-router';
import RenderSlide from '@/components/RenderSlider';
import { useStorage } from '@/hooks/useStorage';

const { width } = Dimensions.get('window');

export default function OnBoardingScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { saveStorageItem: setIsOnBoarding } = useStorage<boolean>('onboarding', true);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.volume = 0;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  useEffect(() => {
    if (!isPlaying) {
      player.play();
    }
  }, [isPlaying]);

  const dotAnimations = useRef(
    sliderInformations.map((_, index) => ({
      width: new Animated.Value(index === 0 ? 40 : 10),
      opacity: new Animated.Value(index === 0 ? 1 : 0.5),
    }))
  ).current;

  useEffect(() => {
    // Set initial value for scrollX to ensure it's in sync
    scrollX.setValue(0);

    // Ensure first dot is correctly sized
    dotAnimations[0].width.setValue(40);
    dotAnimations[0].opacity.setValue(1);
  }, []);

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      const exactPosition = value / width;

      sliderInformations.forEach((_, index) => {
        const distance = Math.abs(exactPosition - index);

        // Width calculation
        const calculatedWidth = distance < 1 ? 40 - distance * 30 : 10;
        dotAnimations[index].width.setValue(calculatedWidth);

        // Opacity calculation
        const calculatedOpacity = distance < 1 ? 1 - distance * 0.5 : 0.5;
        dotAnimations[index].opacity.setValue(calculatedOpacity);
      });

      const newIndex = Math.round(exactPosition);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < sliderInformations.length) {
        setCurrentIndex(newIndex);
      }
    });

    return () => {
      scrollX.removeListener(listener);
    };
  }, [currentIndex, width]);

  const handlePress = () => {
    setIsOnBoarding(false);
    router.replace('/');
  };

  // Modified handleScroll to use Animated.event for native driver benefits
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false } // Must be false because we animate width which is a layout property
  );

  const handleMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    if (index >= 0 && index < sliderInformations.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <Box style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <VideoView style={styles.backgroundVideo} player={player} contentFit="cover" />
      <Box style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </Box>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{ flexGrow: 1 }}
        decelerationRate="fast" // Improves scrolling performance
      >
        {sliderInformations.map((item, index) => (
          <RenderSlide key={index} item={item} />
        ))}
      </ScrollView>

      <Box style={styles.paginationContainer}>
        {sliderInformations.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.paginationDot,
              {
                width: dotAnimations[index].width,
                backgroundColor: index === currentIndex ? '#FF0000' : 'rgba(255, 255, 255, 0.5)',
                opacity: dotAnimations[index].opacity,
              },
            ]}
          />
        ))}
      </Box>

      <Box style={[styles.stepContainer, { justifyContent: currentIndex === 0 ? 'flex-start' : 'flex-end' }]}>
        {currentIndex == 0 && <Button onPress={handlePress}>Passer</Button>}
        {currentIndex == sliderInformations.length - 1 && <Button onPress={handlePress}>Commencer</Button>}
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
  paginationDot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
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
  stepContainer: {
    flexDirection: 'row',
    width: '90%',
    position: 'absolute',
    bottom: 40,
  },
});
