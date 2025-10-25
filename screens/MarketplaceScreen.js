import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const MarketplaceScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FF9800" />
      <View style={styles.content}>
        {/* Content will be added here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
});

export default MarketplaceScreen;
