import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

const GradientLinear = props => {
  return (
    <LinearGradient
      colors={['#006cdb', '#4fcfff', '#0090fa']}
      startPoint={10}
      endPoint={50}
      locations={[0, 50, 100]}
      style={[styles.headBlock, props.style]}>
      {props.children}
    </LinearGradient>
  );
};

export default GradientLinear;

const styles = StyleSheet.create({
  headBlock: {
    width: '100%',
    height: 100,
  },
});
