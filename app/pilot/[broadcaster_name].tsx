import Header from '@/components/ui/Header';
import Layout from '@/components/ui/Layout';
import { useFetchDriverByBroadcasterName } from '@/query/hook';
import Box from '@/theme/Box';
import Text from '@/theme/Text';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, Animated, StyleSheet } from 'react-native';
import { useRef, useEffect } from 'react';

export default function PilotScreen() {
  const { broadcaster_name } = useLocalSearchParams();
  const { data } = useFetchDriverByBroadcasterName(broadcaster_name as string);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, [data]);

  if (!data) {
    return (
      <Layout>
        <Stack.Screen options={{ headerShown: false }} />
        <Header title="Détails du pilote" backButton />
        <Box style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </Box>
      </Layout>
    );
  }

  // Dynamic team color for styling
  const teamColor = `#${data.team_colour || "ff0000"}`;
  const teamColorLight = `${teamColor}50`;

  return (
    <Layout>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title={`${data.first_name} ${data.last_name}`} backButton />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero section with driver image and number */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <LinearGradient
            colors={[teamColorLight, '#00000000']}
            style={styles.heroGradient}
          >
            <Box style={styles.driverInfoContainer}>
              <Box style={styles.driverInfo}>
                <Text variant="title" style={styles.driverName}>
                  {data.first_name}
                  <Text variant="title" style={{ color: teamColor }}> {data.last_name}</Text>
                </Text>
                
                <Box style={styles.teamBox}>
                  <Box style={[styles.teamColorIndicator, { backgroundColor: teamColor }]} />
                  <Text variant="text" style={styles.teamName}>
                    {data.team_name}
                  </Text>
                </Box>
                
                <Box style={styles.countryBox}>
                  <Text variant="text" style={styles.countryCode}>
                    {data.country_code ? `${data.country_code} ${getFlagEmoji(data.country_code)}` : 'Non spécifié'}
                  </Text>
                </Box>
              </Box>
              
              <Image
                source={{ uri: data.headshot_url }}
                style={styles.driverImage}
                contentFit="cover"
                transition={500}
              />
            </Box>
          </LinearGradient>
        </Animated.View>
        
        {/* Driver details cards */}
        <Animated.View style={[styles.statsContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text variant="title" style={styles.sectionTitle}>Informations</Text>
          <Box style={styles.statsGrid}>
            <Box style={[styles.statCard, { borderColor: teamColorLight }]}>
              <Text variant="title" style={styles.statTitle}>Numéro</Text>
              <Text variant="text" style={[styles.statValue, { color: teamColor }]}>{data.driver_number}</Text>
            </Box>
            
            <Box style={[styles.statCard, { borderColor: teamColorLight }]}>
              <Text variant="title" style={styles.statTitle}>Acronyme</Text>
              <Text variant="text" style={styles.statValue}>{data.name_acronym}</Text>
            </Box>
            
            <Box style={[styles.statCard, { borderColor: teamColorLight }]}>
              <Text variant="title" style={styles.statTitle}>Pays</Text>
              <Text variant="text" style={styles.statValue}>
                {data.country_code ? `${data.country_code} ${getFlagEmoji(data.country_code)}` : 'Non spécifié'}
              </Text>
            </Box>
            
            <Box style={[styles.statCard, { borderColor: teamColorLight }]}>
              <Text variant="title" style={styles.statTitle}>Écurie</Text>
              <Text variant="text" style={[styles.statValue, { color: teamColor }]}>{data.team_name}</Text>
            </Box>
          </Box>
          
          {/* Extra section */}
          <Text variant="title" style={styles.sectionTitle}>Session</Text>
          <Box style={[styles.fullWidthCard, { borderColor: teamColorLight }]}>
            <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box>
                <Text variant="title" style={styles.statTitle}>Diffusion</Text>
                <Text variant="text" style={styles.statValue}>{data.broadcast_name}</Text>
              </Box>
              <Box>
                <Text variant="title" style={styles.statTitle}>Session</Text>
                <Text variant="text" style={styles.statValue}>#{data.session_key}</Text>
              </Box>
              <Box>
                <Text variant="title" style={styles.statTitle}>Meeting</Text>
                <Text variant="text" style={styles.statValue}>#{data.meeting_key}</Text>
              </Box>
            </Box>
          </Box>
          
          {/* Team color indicator */}
          <Box style={[styles.teamColorCard, { borderColor: teamColorLight }]}>
            <Text variant="title" style={styles.statTitle}>Couleur de l'écurie</Text>
            <Box style={styles.colorRow}>
              <Box style={[styles.colorSquare, { backgroundColor: teamColor }]} />
              <Text variant="text" style={styles.statValue}>#{data.team_colour}</Text>
            </Box>
          </Box>
        </Animated.View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  heroGradient: {
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
    marginHorizontal: 15,
  },
  driverNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  driverInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  driverInfo: {
    flex: 1,
    paddingRight: 10,
  },
  driverName: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  teamBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  teamColorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  teamName: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  countryBox: {
    marginTop: 10,
  },
  countryCode: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  driverImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  statsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF10',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
  },
  fullWidthCard: {
    backgroundColor: '#FFFFFF10',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
  },
  teamColorCard: {
    backgroundColor: '#FFFFFF10',
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
    borderWidth: 1,
  },
  statTitle: {
    fontSize: 14,
    color: '#FFFFFFAA',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  colorSquare: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
});

function getFlagEmoji(countryCode: string | null) {
  // Return empty string if countryCode is null or undefined
  if (!countryCode) {
    return '';
  }

  // Convert 3-letter country codes to 2-letter ISO codes
  const countryCodeMapping: Record<string, string> = {
    NED: 'NL', // Netherlands
    GBR: 'GB', // Great Britain
    GER: 'DE', // Germany
    MON: 'MC', // Monaco
    FRA: 'FR', // France
    ESP: 'ES', // Spain
    MEX: 'MX', // Mexico
    AUS: 'AU', // Australia
    CAN: 'CA', // Canada
    THA: 'TH', // Thailand
    JPN: 'JP', // Japan
    CHN: 'CN', // China
    FIN: 'FI', // Finland
    DEN: 'DK', // Denmark
    ITA: 'IT', // Italy
    USA: 'US', // United States
    ARG: 'AR', // Argentina
    BRA: 'BR', // Brazil
  };

  const isoCode = countryCodeMapping[countryCode] || countryCode;

  if (isoCode.length !== 2) {
    return '';
  }

  const codePoints = isoCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
