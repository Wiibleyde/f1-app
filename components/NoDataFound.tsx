import Box from '@/theme/Box';
import Text from '@/theme/Text';
import React from 'react'

interface NoDataFoundProps {
    entiyName?: string;
}

const NoDataFound = ({
    entiyName
}: NoDataFoundProps) => {
    return (
        <Box >
            <Text variant='text' style={{ color: '#FFFFFF' }}>
                No {entiyName} found.
                {'\n'}Please check your internet connection or try again later.
            </Text>
        </Box>
    )
}

export default NoDataFound