import { Driver } from '@/query/hook';
import Box from '@/theme/Box';
import Text from '@/theme/Text';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

export function DriverItem({ item }: { item: Driver }) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    router.push({ pathname: '/pilot/[broadcaster_name]', params: { broadcaster_name: item.broadcast_name } });
  }

  return (
    <TouchableOpacity style={[styles.pilotItem, { borderLeftColor: `#${item.team_colour}` }]} onPress={handlePress}>
      <Box style={styles.pilotContent}>
        <Box style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: `#b5b5b5`, fontSize: 12 }}>{item.name_acronym}</Text>
            <Text style={{ color: `#b5b5b5`, fontSize: 12, marginLeft: 8 }}>{item.driver_number}</Text>
            <Text style={styles.pilotName}>{item.broadcast_name}</Text>
          </Box>
          <Text style={{ color: `#${item.team_colour}`, fontSize: 12 }}>{item.team_name}</Text>
        </Box>
        <Image
          source={{ uri: item.headshot_url }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginLeft: 'auto',
          }}
        />
      </Box>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pilotItem: {
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    marginVertical: 4,
    overflow: 'hidden',
    borderLeftWidth: 4,
  },
  pilotContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderLeftColor: '#ee0000',
  },
  pilotName: {
    color: '#FFFFFF',
    fontSize: 16,
    padding: 10,
  },
});
