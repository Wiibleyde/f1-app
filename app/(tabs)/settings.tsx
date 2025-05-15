import { StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Box from '@/theme/Box';
import Text from '@/theme/Text';
import Section from '@/components/settings/Section';
import Item from '@/components/settings/Item';
import ResetButton from '@/components/settings/ResetButton';

export default function SettingsScreen() {

    return (
        <Box style={styles.container}>
            <Box style={styles.title}>
                <Text variant="title" color="text" textAlign="left">
                    Settings
                </Text>
            </Box>

            <Box style={styles.content}>
                <Section title="Preferences">

                    <Item icon='moon' text='Dark Mode'>
                        <Switch
                            value={true}
                            trackColor={{ true: '#FF1801' }}
                            thumbColor="#f4f3f4"
                            disabled={true}
                        />
                    </Item>

                    <Item icon='notifications' text='Notifications'>
                        <Switch
                            value={false}
                            trackColor={{ false: '#767577' }}
                            thumbColor="#f4f3f4"
                            disabled={true}
                        />
                    </Item>
                </Section>

                <Section title="About">
                    <Item icon='information-circle' text='Application version'>
                        <Text style={styles.versionText}>1.0.0</Text>
                    </Item>

                    <Item icon='document-text' text='Terms of Use'>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </Item>
                </Section>

                <Section title="Developer">
                    <ResetButton />
                </Section>
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        paddingTop: 50,
        backgroundColor: '#000000',
    },
    title: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        color: '#FFFFFF',
        marginLeft: "5%",
        marginBottom: 20,
    },
    content: {
        width: '100%',
        paddingBottom: 20,
        paddingHorizontal: 16,
    },
    versionText: {
        color: '#888',
        fontSize: 16,
    },
});
