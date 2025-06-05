import { ViewToken } from "react-native";
import { useSharedValue } from "react-native-reanimated";


const useFlatList = () => {

    const viewableItems = useSharedValue<ViewToken[]>([]);

    const onViewableItemsChanged = ({ viewableItems: vItems }: { viewableItems: ViewToken[] }) => {
        viewableItems.value = vItems;
    };

    return {
        viewableItems,
        onViewableItemsChanged,
    };

}

export default useFlatList