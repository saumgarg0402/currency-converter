
import { Stack } from '@fluentui/react/lib/Stack';
import React from 'react';
import { Text } from '@fluentui/react/lib/Text';

const Header = () => {

    return (
        <Stack styles={{ root: { width: '100%', height: 100, backgroundColor: '#282c34'}}} horizontal={true} horizontalAlign="center">
            <Text styles={{ root: { marginTop: 25, fontWeight: 600, fontSize: 36, color: '#fff'}}}>Currency Converter</Text>
        </Stack>
    )
}

export default Header;