import React from 'react'
import { RadioSkeleton } from '../skeleton/RadioSkeleton';
import NoDataFound from '../NoDataFound';
import { useFetchRadioBySessionKey } from '@/query/hook';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { RadioPlayer } from '../radio/RadioPlayer';

interface Props {
    session_key: string;
}

const Radios = ({
    session_key
}: Props) => {

    const { data: radioData, isLoading: isRadioLoading, refetch: refetchRadio } = useFetchRadioBySessionKey(session_key);


    const renderEmptyRadio = () => {
        if (isRadioLoading) {
            return <RadioSkeleton />;
        } else {
            return <NoDataFound entityName='radio' />;
        }
    }

    return (
        <FlatList
            data={radioData}
            renderItem={({ item }) => (
                <RadioPlayer radioData={item} />
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={() => {
                        refetchRadio();
                    }}
                    tintColor={'#ee0000'}
                />
            }
            windowSize={1}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            ListEmptyComponent={renderEmptyRadio}
        />
    );
}

export default Radios

const styles = StyleSheet.create({
    listContainer: {
        gap: 6,
        paddingBottom: 20,
        paddingTop: 10,
    }
});