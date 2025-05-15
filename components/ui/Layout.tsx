import Box from '@/theme/Box';
import React from 'react';
import { StyleSheet } from 'react-native';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <Box style={styles.container}>{children}</Box>;
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: '5%',
    backgroundColor: '#000000',
  },
});
