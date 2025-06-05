import React from 'react';
import { ScrollView } from 'react-native';

const Texts = () => {
    const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: false,
    });

    const onScrollEnd = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        if (index >= 0 && index < sliderInformations.length) setCurrentIndex(index);
    };

    return (
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
    );
};

export default Texts;
