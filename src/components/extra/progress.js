import React from 'react';
import { StyleSheet, View } from 'react-native';

const Progress = (props) => {
  return (
    <View>
      <View style={[{ width: props.data + '%', backgroundColor: props.color }, styles.topProgress]}></View>
      <View style={styles.bottomProgress}></View>
    </View>
  );
}

export default Progress;

const styles = StyleSheet.create({
  topProgress: {
    height: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  bottomProgress: {
    position: 'absolute',
    width: '100%',
    height: 10,
    backgroundColor: '#EEE',
    borderRadius: 10,
  }
})