import useFlatList from '@/hooks/useFlatList';
import { useFetchRadioBySessionKey } from '@/query/hook';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import RadioPlayer from '../renders/RenderRadio';
import { RadioSkeleton } from '../skeleton/RadioSkeleton';
import NoDataFound from '../ui/NoDataFound';

interface Props {
    session_key: string;
}

const Radios = ({ session_key }: Props) => {
    const { onViewableItemsChanged, viewableItems } = useFlatList();

    const {
        data: radioData,
        isLoading: isRadioLoading,
        refetch: refetchRadio,
    } = useFetchRadioBySessionKey(session_key);

    const renderEmptyRadio = () => {
        if (isRadioLoading) {
            return <RadioSkeleton />;
        } else {
            return <NoDataFound entityName="radio" />;
        }
    };

    return (
        <FlatList
            data={radioData}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={false} onRefresh={refetchRadio} tintColor={'#ee0000'} />}
            windowSize={5}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            ListEmptyComponent={renderEmptyRadio}
            onViewableItemsChanged={onViewableItemsChanged}
            renderItem={({ item }) => <RadioPlayer radioData={item} viewableItems={viewableItems} />}
        />
    );
};

export default Radios;

const styles = StyleSheet.create({
    listContainer: {
        gap: 6,
        paddingBottom: 20,
        paddingTop: 10,
    },
});
