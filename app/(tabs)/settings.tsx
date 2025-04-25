import { StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Box from '@/theme/Box';
import Text from '@/theme/Text';
import { useStorage } from '@/hooks/useStorage';
import { useState } from 'react';

export default function SettingsScreen() {
  const { clearStorage } = useStorage<boolean>('onboarding', false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleResetDataDebug = () => {
    clearStorage();
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.title}>
        <Text variant="title" color="text">
          Paramètres
        </Text>
      </Box>

      <Box style={styles.content}>
        {/* Section Préférences */}
        <Box style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>

          <Box style={styles.settingItem}>
            <Box style={styles.settingInfo}>
              <Ionicons name="moon" size={24} color="#FF1801" />
              <Text style={styles.settingText}>Mode sombre</Text>
            </Box>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#FF1801' }}
              thumbColor="#f4f3f4"
              disabled={true} // Disable the switch for now
            />
          </Box>

          <Box style={styles.settingItem}>
            <Box style={styles.settingInfo}>
              <Ionicons name="notifications" size={24} color="#FF1801" />
              <Text style={styles.settingText}>Notifications</Text>
            </Box>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#FF1801' }}
              thumbColor="#f4f3f4"
              disabled={true} // Disable the switch for now
            />
          </Box>
        </Box>

        {/* Section À propos */}
        <Box style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Box style={styles.settingInfo}>
              <Ionicons name="information-circle" size={24} color="#FF1801" />
              <Text style={styles.settingText}>Version de l'application</Text>
            </Box>
            <Text style={styles.versionText}>1.0.0</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Box style={styles.settingInfo}>
              <Ionicons name="document-text" size={24} color="#FF1801" />
              <Text style={styles.settingText}>Conditions d'utilisation</Text>
            </Box>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>
        </Box>

        {/* Section Développeur */}
        <Box style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Développeur</Text>
          <TouchableOpacity style={styles.resetButton} onPress={handleResetDataDebug}>
            <Ionicons name="refresh-circle" size={20} color="#fff" />
            <Text style={styles.resetButtonText}>Réinitialiser les données</Text>
          </TouchableOpacity>
        </Box>
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
    color: '#FFFFFF',
    marginBottom: 20,
  },
  content: {
    width: '100%',
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  section: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginBottom: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lastSection: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 12,
  },
  versionText: {
    color: '#888',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#FF1801',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
