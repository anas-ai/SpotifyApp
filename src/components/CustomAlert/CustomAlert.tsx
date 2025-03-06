import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import ReactNativeModal from 'react-native-modal';

const CustomAlert = ({ isVisible, message, type, onClose }:any) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Fade animation

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Hide alert after 2 seconds
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onClose());
      }, 2000);
    }
  }, [isVisible]);

  return (
    <ReactNativeModal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut" backdropOpacity={0}>
      <Animated.View style={[styles.alertBox, { opacity: fadeAnim, backgroundColor: type === 'success' ? 'green' : 'red' }]}>
        <Text style={styles.alertText}>{message}</Text>
      </Animated.View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  alertBox: {
    padding: 15,
    borderRadius: 10,
    position: 'absolute',
    alignSelf: 'center',
    bottom:50
  },
  alertText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomAlert;
