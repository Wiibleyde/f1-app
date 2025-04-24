import { Dimensions, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface RenderSlideProps {
    item: {
        title: string;
        subtitle: string;
    }
}

const RenderSlide = ({
    item
}: RenderSlideProps) => {
    return (
        <View style={styles.slideContainer}>
            <ThemedText style={styles.slideTitle}>{item.title}</ThemedText>
            <ThemedText style={styles.slideSubtitle}>{item.subtitle}</ThemedText>
        </View>
    );
};

export default RenderSlide;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    slideContainer: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    slideTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,
        paddingTop: 5,
        includeFontPadding: true,
        color: '#FFFFFF',
    },
    slideSubtitle: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 10,
        color: '#FFFFFF',
    },
});