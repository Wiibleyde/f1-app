import Box from '@/theme/Box';
import Text from '@/theme/Text';
import React from 'react';

interface NoDataFoundProps {
    entityName?: string;
}

const NoDataFound = ({ entityName }: NoDataFoundProps) => {
    return (
        <Box>
            <Text variant="text" style={{ color: '#FFFFFF' }}>
                No {entityName} found.
                {'\n'}Please check your internet connection or try again later.
            </Text>
        </Box>
    );
};

export default NoDataFound;
