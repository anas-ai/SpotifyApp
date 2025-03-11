import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const LiveComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.liveText}>🔴 Live Now</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 10,
  },
  liveText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LiveComponent;
