import { Dimensions, StyleSheet, View } from "react-native";
import Text from "@/theme/Text";

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
            <Text variant="title" color="text" style={styles.slideTitle}>{item.title}</Text>
            <Text variant="text" color="text">{item.subtitle}</Text>
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
        textAlign: 'center',
    },
});